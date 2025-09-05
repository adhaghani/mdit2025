-- MDIT 2025 License Redemption System - Simple Schema
-- Execute this in your Supabase SQL Editor

-- Create license_redemption table
CREATE TABLE IF NOT EXISTS license_redemption (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ic_number VARCHAR(15) NOT NULL UNIQUE,
    license_key VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    redeemed_at TIMESTAMP WITH TIME ZONE,
    is_redeemed BOOLEAN DEFAULT FALSE
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_license_redemption_ic_number ON license_redemption(ic_number);

-- Enable RLS (Row Level Security)
ALTER TABLE license_redemption ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for domain restriction (mdit2025.my and all subdomains)
CREATE POLICY "Domain restricted access" ON license_redemption
    FOR ALL 
    TO anon
    USING (
        CASE 
            WHEN current_setting('request.headers', true)::json->>'origin' IS NOT NULL THEN
                current_setting('request.headers', true)::json->>'origin' ~ '^https://(www\.)?([a-zA-Z0-9-]+\.)?mdit2025\.my$'
            WHEN current_setting('request.headers', true)::json->>'referer' IS NOT NULL THEN
                current_setting('request.headers', true)::json->>'referer' ~ '^https://(www\.)?([a-zA-Z0-9-]+\.)?mdit2025\.my'
            ELSE false
        END
    );

-- Create stored function for license redemption with domain checking
CREATE OR REPLACE FUNCTION get_license_key(
    p_ic_number VARCHAR(15)
)
RETURNS JSON AS $$
DECLARE
    v_license_key VARCHAR(255);
    v_is_redeemed BOOLEAN;
    v_result JSON;
    v_origin TEXT;
    v_referer TEXT;
BEGIN
    -- Get origin and referer from request headers
    BEGIN
        v_origin := current_setting('request.headers', true)::json->>'origin';
        v_referer := current_setting('request.headers', true)::json->>'referer';
    EXCEPTION WHEN OTHERS THEN
        v_origin := NULL;
        v_referer := NULL;
    END;
    
    -- Domain validation
    IF NOT (
        (v_origin IS NOT NULL AND v_origin ~ '^https://(www\.)?([a-zA-Z0-9-]+\.)?mdit2025\.my$') OR
        (v_referer IS NOT NULL AND v_referer ~ '^https://(www\.)?([a-zA-Z0-9-]+\.)?mdit2025\.my')
    ) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Access denied: Invalid domain',
            'license_key', null
        );
    END IF;
    
    -- Check if IC number exists
    SELECT license_key, is_redeemed 
    INTO v_license_key, v_is_redeemed
    FROM license_redemption 
    WHERE ic_number = p_ic_number;
    
    IF v_license_key IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'IC number not found. Please verify your IC number or contact support.',
            'license_key', null
        );
    END IF;
    
    -- Update redemption status if not already redeemed
    IF NOT v_is_redeemed THEN
        UPDATE license_redemption 
        SET 
            is_redeemed = true,
            redeemed_at = NOW()
        WHERE ic_number = p_ic_number;
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

-- Sample data for testing (replace with real data)
INSERT INTO license_redemption (ic_number, license_key) VALUES
('123456-78-9012', 'MDIT-2025-WORKSHOP1-ABCD1234'),
('234567-89-0123', 'MDIT-2025-WORKSHOP1-EFGH5678'),
('345678-90-1234', 'MDIT-2025-WORKSHOP1-IJKL9012'),
('456789-01-2345', 'MDIT-2025-WORKSHOP1-MNOP3456'),
('567890-12-3456', 'MDIT-2025-WORKSHOP1-QRST7890')
ON CONFLICT (ic_number) DO NOTHING;
