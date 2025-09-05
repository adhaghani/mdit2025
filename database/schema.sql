-- MDIT 2025 License Redemption System - Production Ready Encrypted Schema
-- Execute this in your Supabase SQL Editor

-- PRODUCTION SETUP INSTRUCTIONS:
-- 1. Create a secret in Supabase Vault:
--    INSERT INTO vault.secrets (name, secret) VALUES ('encryption_key', 'your-secure-32-character-key');
-- 2. Replace test data with your actual IC numbers and license keys
-- 3. Remove localhost domains for production deployment

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS supabase_vault;

-- Create license_redemption table with encrypted fields
CREATE TABLE IF NOT EXISTS license_redemption (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ic_number_encrypted BYTEA NOT NULL,
    license_key_encrypted BYTEA NOT NULL,
    ic_number_hash TEXT NOT NULL UNIQUE, -- For fast lookups (changed from VARCHAR to TEXT)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE,
    is_redeemed BOOLEAN DEFAULT FALSE
);

-- Create index for better performance on hash
CREATE INDEX IF NOT EXISTS idx_license_redemption_ic_hash ON license_redemption(ic_number_hash);

-- Enable RLS (Row Level Security)
ALTER TABLE license_redemption ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for domain restriction
CREATE POLICY "Domain restricted access" ON license_redemption
    FOR ALL 
    TO anon
    USING (
        current_setting('request.headers', true)::json->>'origin' IN (
            'https://mdit2025.my',
            'https://www.mdit2025.my',
            'https://staging.mdit2025.my'
        )
    );

-- Helper function to get encryption key from Supabase Vault
CREATE OR REPLACE FUNCTION get_encryption_key()
RETURNS TEXT AS $$
DECLARE
    encryption_key TEXT;
BEGIN
    -- Get encryption key from Supabase Vault
    SELECT decrypted_secret INTO encryption_key 
    FROM vault.decrypted_secrets 
    WHERE name = 'encryption_key';
    
    IF encryption_key IS NULL THEN
        RAISE EXCEPTION 'Encryption key not found in vault. Please add it using: INSERT INTO vault.secrets (name, secret) VALUES (''encryption_key'', ''your-key'');';
    END IF;
    
    RETURN encryption_key;
END;

$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to encrypt IC number and generate hash
CREATE OR REPLACE FUNCTION encrypt_ic_number(p_ic_number VARCHAR(15))
RETURNS TABLE(encrypted_ic BYTEA, ic_hash TEXT) AS $$
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
    v_ic_hash TEXT;
    v_origin TEXT;
BEGIN
    -- Get origin from request headers
    BEGIN
        v_origin := current_setting('request.headers', true)::json->>'origin';
    EXCEPTION WHEN OTHERS THEN
        v_origin := NULL;
    END;
    
    -- Domain validation
    IF v_origin NOT IN (
        'https://mdit2025.my',
        'https://www.mdit2025.my',
        'https://staging.mdit2025.my'
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

-- Function to safely insert encrypted data with debugging (admin use only)
CREATE OR REPLACE FUNCTION insert_license_data(
    p_ic_number VARCHAR(15),
    p_license_key VARCHAR(255)
)
RETURNS JSON AS $$
DECLARE
    v_encrypted_data RECORD;
    v_error_message TEXT;
BEGIN
    -- Validate inputs
    IF p_ic_number IS NULL OR p_ic_number = '' THEN
        RETURN json_build_object(
            'success', false,
            'error', 'IC number cannot be empty',
            'step', 'input_validation'
        );
    END IF;
    
    IF p_license_key IS NULL OR p_license_key = '' THEN
        RETURN json_build_object(
            'success', false,
            'error', 'License key cannot be empty',
            'step', 'input_validation'
        );
    END IF;
    
    -- Test encryption key access
    BEGIN
        PERFORM get_encryption_key();
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_error_message = MESSAGE_TEXT;
        RETURN json_build_object(
            'success', false,
            'error', 'Encryption key error: ' || v_error_message,
            'step', 'encryption_key_access'
        );
    END;
    
    -- Test IC encryption
    BEGIN
        SELECT * INTO v_encrypted_data FROM encrypt_ic_number(p_ic_number);
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_error_message = MESSAGE_TEXT;
        RETURN json_build_object(
            'success', false,
            'error', 'IC encryption error: ' || v_error_message,
            'step', 'ic_encryption'
        );
    END;
    
    -- Test license key encryption
    BEGIN
        PERFORM encrypt_license_key(p_license_key);
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_error_message = MESSAGE_TEXT;
        RETURN json_build_object(
            'success', false,
            'error', 'License key encryption error: ' || v_error_message,
            'step', 'license_encryption'
        );
    END;
    
    -- Test database insertion
    BEGIN
        INSERT INTO license_redemption (
            ic_number_encrypted, 
            license_key_encrypted, 
            ic_number_hash
        ) VALUES (
            v_encrypted_data.encrypted_ic,
            encrypt_license_key(p_license_key),
            v_encrypted_data.ic_hash
        );
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS v_error_message = MESSAGE_TEXT;
        RETURN json_build_object(
            'success', false,
            'error', 'Database insertion error: ' || v_error_message,
            'step', 'database_insertion'
        );
    END;
    
    RETURN json_build_object(
        'success', true,
        'message', 'License data inserted successfully',
        'ic_hash', v_encrypted_data.ic_hash
    );
    
EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_error_message = MESSAGE_TEXT;
    RETURN json_build_object(
        'success', false,
        'error', 'Unexpected error: ' || v_error_message,
        'step', 'general_exception'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant insert function only to authenticated users (not anon)
GRANT EXECUTE ON FUNCTION insert_license_data(VARCHAR, VARCHAR) TO authenticated;

-- ============================================================================
-- SETUP COMMANDS (Run these after executing the schema above)
-- ============================================================================

-- 1. Add your encryption key to Supabase Vault
-- INSERT INTO vault.secrets (name, secret) VALUES ('encryption_key', '+kBx8WEYVnw76bdNYNhDSaadUgh67OBKp4RboCS9RtU=');

-- 2. Test the system with sample data
-- SELECT insert_license_data('123456-78-9012', 'MDIT-2025-WORKSHOP-LICENSE-001');
-- SELECT insert_license_data('234567-89-0123', 'MDIT-2025-WORKSHOP-LICENSE-002');
-- SELECT insert_license_data('345678-90-1234', 'MDIT-2025-WORKSHOP-LICENSE-003');

-- 3. Test license retrieval
-- SELECT get_license_key('123456-78-9012');

-- 4. Check inserted data
-- SELECT id, ic_number_hash, is_redeemed, created_at FROM license_redemption;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if vault extension is available
-- SELECT extname FROM pg_extension WHERE extname = 'supabase_vault';

-- Check if encryption key is stored
-- SELECT name, created_at FROM vault.secrets WHERE name = 'encryption_key';

-- Test encryption key retrieval
-- SELECT get_encryption_key();

-- Check table structure
-- \d license_redemption
    );
    
    RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant insert function only to authenticated users (not anon)
GRANT EXECUTE ON FUNCTION insert_license_data(VARCHAR, VARCHAR) TO authenticated;