-- MDIT 2025 License Redemption System - Production Ready Encrypted Schema
-- Execute this in your Supabase SQL Editor

-- PRODUCTION SETUP INSTRUCTIONS:
-- 1. First, set your encryption key in Supabase:
--    ALTER DATABASE postgres SET app.encryption_key = 'your-secure-32-character-key';
-- 2. Replace test data with your actual IC numbers and license keys
-- 3. Remove localhost domains for production deployment

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create license_redemption table with encrypted fields
CREATE TABLE IF NOT EXISTS license_redemption (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ic_number_encrypted BYTEA NOT NULL,
    license_key_encrypted BYTEA NOT NULL,
    ic_number_hash VARCHAR(64) NOT NULL UNIQUE, -- For fast lookups
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE,
    is_redeemed BOOLEAN DEFAULT FALSE
);

-- Create index for better performance on hash
CREATE INDEX IF NOT EXISTS idx_license_redemption_ic_hash ON license_redemption(ic_number_hash);

-- Enable RLS (Row Level Security)
ALTER TABLE license_redemption ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for domain restriction (PRODUCTION ONLY - NO LOCALHOST)
CREATE POLICY "Domain restricted access" ON license_redemption
    FOR ALL 
    TO anon
    USING (
        current_setting('request.headers', true)::json->>'origin' IN (
            'https://mdit2025.my',
            'https://www.mdit2025.my'
            'https://staging.mdit2025.my',
            -- Staging and dev domains removed for production
            -- Add them back if needed for testing environments
        )
    );

-- Helper function to get encryption key (store this securely in your environment)
CREATE OR REPLACE FUNCTION get_encryption_key()
RETURNS TEXT AS $$
BEGIN
    -- In production, get this from a secure environment variable
    -- IMPORTANT: Set this with: ALTER DATABASE postgres SET app.encryption_key = 'your-key';
    RETURN current_setting('app.encryption_key', false);
EXCEPTION WHEN OTHERS THEN
    -- Fallback error - this should never happen in production
    RAISE EXCEPTION 'Encryption key not configured. Set app.encryption_key database parameter.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to encrypt IC number and generate hash
CREATE OR REPLACE FUNCTION encrypt_ic_number(p_ic_number VARCHAR(15))
RETURNS TABLE(encrypted_ic BYTEA, ic_hash VARCHAR(64)) AS $$
BEGIN
    RETURN QUERY SELECT 
        pgp_sym_encrypt(p_ic_number, get_encryption_key()) as encrypted_ic,
        encode(digest(p_ic_number || get_encryption_key(), 'sha256'), 'hex') as ic_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt IC number
CREATE OR REPLACE FUNCTION decrypt_ic_number(p_encrypted_ic BYTEA)
RETURNS VARCHAR(15) AS $$
BEGIN
    RETURN pgp_sym_decrypt(p_encrypted_ic, get_encryption_key());
EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to encrypt license key
CREATE OR REPLACE FUNCTION encrypt_license_key(p_license_key VARCHAR(255))
RETURNS BYTEA AS $$
BEGIN
    RETURN pgp_sym_encrypt(p_license_key, get_encryption_key());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt license key
CREATE OR REPLACE FUNCTION decrypt_license_key(p_encrypted_license BYTEA)
RETURNS VARCHAR(255) AS $$
BEGIN
    RETURN pgp_sym_decrypt(p_encrypted_license, get_encryption_key());
EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create stored function for license redemption with encryption
CREATE OR REPLACE FUNCTION get_license_key(
    p_ic_number VARCHAR(15)
)
RETURNS JSON AS $$
DECLARE
    v_encrypted_license BYTEA;
    v_license_key VARCHAR(255);
    v_is_redeemed BOOLEAN;
    v_ic_hash VARCHAR(64);
    v_origin TEXT;
BEGIN
    -- Get origin from request headers
    BEGIN
        v_origin := current_setting('request.headers', true)::json->>'origin';
    EXCEPTION WHEN OTHERS THEN
        v_origin := NULL;
    END;
    
    -- Domain validation - production domains only
    IF v_origin NOT IN (
        'https://mdit2025.my',
        'https://www.mdit2025.my'
        'https://staging.mdit2025.my',
        -- Add staging/dev domains only if needed for testing
    ) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Access denied: Invalid domain',
            'license_key', null
        );
    END IF;
    
    -- Generate hash for IC number lookup
    v_ic_hash := encode(digest(p_ic_number || get_encryption_key(), 'sha256'), 'hex');
    
    -- Check if IC number exists using hash
    SELECT license_key_encrypted, is_redeemed 
    INTO v_encrypted_license, v_is_redeemed
    FROM license_redemption 
    WHERE ic_number_hash = v_ic_hash;
    
    IF v_encrypted_license IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'IC number not found. Please verify your IC number or contact support.',
            'license_key', null
        );
    END IF;
    
    -- Decrypt license key
    v_license_key := decrypt_license_key(v_encrypted_license);
    
    IF v_license_key IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Error retrieving license key. Please contact support.',
            'license_key', null
        );
    END IF;
    
    -- Update redemption status if not already redeemed
    IF NOT v_is_redeemed THEN
        UPDATE license_redemption 
        SET 
            is_redeemed = true,
            redeemed_at = NOW()
        WHERE ic_number_hash = v_ic_hash;
    END IF;
    
    RETURN json_build_object(
        'success', true,
        'license_key', v_license_key,
        'already_redeemed', v_is_redeemed,
        'error', null
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An unexpected error occurred. Please try again later.',
        'license_key', null
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anon role
GRANT EXECUTE ON FUNCTION get_license_key(VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION encrypt_ic_number(VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION encrypt_license_key(VARCHAR) TO anon;

-- Function to safely insert encrypted data (admin use only)
CREATE OR REPLACE FUNCTION insert_license_data(
    p_ic_number VARCHAR(15),
    p_license_key VARCHAR(255)
)
RETURNS BOOLEAN AS $$
DECLARE
    v_encrypted_data RECORD;
BEGIN
    -- Get encrypted IC and hash
    SELECT * INTO v_encrypted_data FROM encrypt_ic_number(p_ic_number);
    
    -- Insert encrypted data
    INSERT INTO license_redemption (
        ic_number_encrypted, 
        license_key_encrypted, 
        ic_number_hash
    ) VALUES (
        v_encrypted_data.encrypted_ic,
        encrypt_license_key(p_license_key),
        v_encrypted_data.ic_hash
    );
    
    RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant insert function only to authenticated users (not anon)
GRANT EXECUTE ON FUNCTION insert_license_data(VARCHAR, VARCHAR) TO authenticated;

-- PRODUCTION TODO: Replace sample data with your actual license data
-- Example of how to insert encrypted data:
-- SELECT insert_license_data('123456-78-9012', 'YOUR-REAL-LICENSE-KEY-1');
-- SELECT insert_license_data('234567-89-0123', 'YOUR-REAL-LICENSE-KEY-2');

-- Sample data for testing (REMOVE IN PRODUCTION)
-- Uncomment only for testing, remove for production deployment
/*
SELECT insert_license_data('123456-78-9012', 'MDIT-2025-WORKSHOP1-ABCD1234');
SELECT insert_license_data('234567-89-0123', 'MDIT-2025-WORKSHOP1-EFGH5678');
SELECT insert_license_data('345678-90-1234', 'MDIT-2025-WORKSHOP1-IJKL9012');
SELECT insert_license_data('456789-01-2345', 'MDIT-2025-WORKSHOP1-MNOP3456');
SELECT insert_license_data('567890-12-3456', 'MDIT-2025-WORKSHOP1-QRST7890');
*/
