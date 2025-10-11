-- ============================================================================
-- VOTING SYSTEM OVERHAUL - HASHED IC AND NAMES LIKE REDEEM LICENSE
-- ============================================================================
-- Execute this in your Supabase SQL Editor

-- ============================================================================
-- VOTING SYSTEM TABLES WITH HASHING (PostgreSQL SYNTAX)
-- ============================================================================

-- Create teams table (no sensitive data, no hashing needed)
CREATE TABLE teams (
    team_id VARCHAR(10) PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    team_university_name VARCHAR(100),
    team_university_logo_url TEXT,
    team_group_photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create participants table with encrypted IC and name
CREATE TABLE participants (
    participant_id VARCHAR(10) PRIMARY KEY,
    ic_number_encrypted BYTEA NOT NULL,
    participant_name_encrypted BYTEA NOT NULL,
    ic_number_hash TEXT NOT NULL UNIQUE, -- For fast lookups
    participant_photo_url TEXT,
    team_id VARCHAR(10) NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    has_voted BOOLEAN DEFAULT FALSE,
    voted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create votes table with encrypted voter IC
CREATE TABLE votes (
    vote_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    voter_ic_hash TEXT NOT NULL, -- Hashed IC for lookup
    vote_category VARCHAR(50) NOT NULL CHECK (vote_category IN ('pitching_excellence', 'critical_thinking', 'ai_innovation')),
    nominee_id VARCHAR(10) NOT NULL, -- Can be participant_id or team_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guest votes table for non-registered users
CREATE TABLE guest_votes (
    vote_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    voter_email_hash TEXT NOT NULL, -- Hashed email for lookup
    voter_email_encrypted BYTEA NOT NULL, -- Encrypted email for privacy
    vote_category VARCHAR(50) NOT NULL CHECK (vote_category IN ('pitching_excellence', 'critical_thinking', 'ai_innovation')),
    nominee_id VARCHAR(10) NOT NULL, -- Can be participant_id or team_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create eligible presenters table (2 candidates per team for pitching excellence)
CREATE TABLE eligible_presenters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    participant_id VARCHAR(10) NOT NULL REFERENCES participants(participant_id) ON DELETE CASCADE,
    team_id VARCHAR(10) NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(participant_id) -- Each participant can only be eligible once
);

-- Create indexes for better performance
CREATE INDEX idx_participants_ic_hash ON participants(ic_number_hash);
CREATE INDEX idx_participants_team ON participants(team_id);
CREATE INDEX idx_participants_has_voted ON participants(has_voted);
CREATE INDEX idx_votes_voter_ic_hash ON votes(voter_ic_hash);
CREATE INDEX idx_votes_category ON votes(vote_category);
CREATE INDEX idx_votes_nominee ON votes(nominee_id);
CREATE INDEX idx_guest_votes_email_hash ON guest_votes(voter_email_hash);
CREATE INDEX idx_guest_votes_category ON guest_votes(vote_category);
CREATE INDEX idx_guest_votes_nominee ON guest_votes(nominee_id);
CREATE INDEX idx_eligible_presenters_participant ON eligible_presenters(participant_id);
CREATE INDEX idx_eligible_presenters_team ON eligible_presenters(team_id);

-- ============================================================================
-- HASHING HELPER FUNCTIONS
-- ============================================================================

-- Function to encrypt IC number and generate hash (reuse from user_credentials)
CREATE OR REPLACE FUNCTION encrypt_participant_ic(p_ic_number TEXT)
RETURNS TABLE(encrypted_ic BYTEA, ic_hash TEXT) AS $$
BEGIN
    RETURN QUERY SELECT 
        pgp_sym_encrypt(p_ic_number, get_encryption_key()) as encrypted_ic,
        encode(digest(p_ic_number || get_encryption_key(), 'sha256'), 'hex') as ic_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to encrypt participant name
CREATE OR REPLACE FUNCTION encrypt_participant_name(p_name TEXT)
RETURNS BYTEA AS $$
BEGIN
    RETURN pgp_sym_encrypt(p_name, get_encryption_key());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrypt participant name
CREATE OR REPLACE FUNCTION decrypt_participant_name(p_encrypted_name BYTEA)
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(p_encrypted_name, get_encryption_key());
EXCEPTION WHEN OTHERS THEN
    RETURN 'DECRYPTION_ERROR';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- VOTING SYSTEM FUNCTIONS
-- ============================================================================

-- Function to get voting data for a participant (similar to get_user_credentials)
CREATE OR REPLACE FUNCTION get_voting_credentials(p_ic_number TEXT)
RETURNS JSON AS $$
DECLARE
    v_ic_hash TEXT;
    v_participant participants;
    v_participant_name TEXT;
    v_team teams;
    v_eligible_participants JSON;
    v_eligible_teams JSON;
    v_origin TEXT;
BEGIN
    -- Get origin from request headers for domain validation
    BEGIN
        v_origin := current_setting('request.headers', true)::json->>'origin';
    EXCEPTION WHEN OTHERS THEN
        v_origin := NULL;
    END;
    
    -- Domain validation (same as redeem license)
    IF v_origin NOT IN (
        'https://mdit2025.my',
        'https://www.mdit2025.my',
        'https://staging.mdit2025.my',
        'https://dev.mdit2025.my'
    ) AND COALESCE(v_origin, '') NOT LIKE '%localhost%' THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Access denied: Invalid domain'
        );
    END IF;
    
    -- Generate hash for IC lookup
    v_ic_hash := encode(digest(p_ic_number || get_encryption_key(), 'sha256'), 'hex');
    
    -- Find participant by IC hash
    SELECT * INTO v_participant
    FROM participants 
    WHERE ic_number_hash = v_ic_hash;
    
    -- Check if participant exists
    IF v_participant IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Participant not found. Please verify your IC number.'
        );
    END IF;
    
    -- Check if participant has already voted
    IF v_participant.has_voted THEN
        RETURN json_build_object(
            'success', false,
            'error', 'You have already submitted your votes.',
            'has_voted', true
        );
    END IF;
    
    -- Decrypt participant name
    BEGIN
        v_participant_name := decrypt_participant_name(v_participant.participant_name_encrypted);
    EXCEPTION WHEN OTHERS THEN
        v_participant_name := 'Name Unavailable';
    END;
    
    -- Get participant's team
    SELECT * INTO v_team
    FROM teams 
    WHERE team_id = v_participant.team_id;
    
    -- Get eligible participants (only eligible presenters from other teams for individual voting)
    SELECT json_agg(
        json_build_object(
            'participant_id', p.participant_id,
            'participant_name', decrypt_participant_name(p.participant_name_encrypted),
            'participant_photo_url', p.participant_photo_url,
            'team_id', p.team_id,
            'teams', json_build_object(
                'team_id', t.team_id,
                'team_name', t.team_name,
                'team_university_name', t.team_university_name,
                'team_university_logo_url', t.team_university_logo_url,
                'team_group_photo_url', t.team_group_photo_url
            )
        )
    ) INTO v_eligible_participants
    FROM participants p
    JOIN teams t ON p.team_id = t.team_id
    JOIN eligible_presenters ep ON p.participant_id = ep.participant_id
    WHERE p.team_id != v_participant.team_id;
    
    -- Get eligible teams (exclude current participant's team)
    SELECT json_agg(
        json_build_object(
            'team_id', team_id,
            'team_name', team_name,
            'team_university_name', team_university_name,
            'team_university_logo_url', team_university_logo_url,
            'team_group_photo_url', team_group_photo_url
        )
    ) INTO v_eligible_teams
    FROM teams 
    WHERE team_id != v_participant.team_id;
    
    -- Return success with voting data
    RETURN json_build_object(
        'success', true,
        'data', json_build_object(
            'participants', COALESCE(v_eligible_participants, '[]'::json),
            'teams', COALESCE(v_eligible_teams, '[]'::json),
            'currentParticipant', json_build_object(
                'participant_id', v_participant.participant_id,
                'participant_name', v_participant_name,
                'participant_photo_url', v_participant.participant_photo_url,
                'team_id', v_participant.team_id,
                'has_voted', v_participant.has_voted
            )
        ),
        'participantTeam', row_to_json(v_team)
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while processing your request'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to submit votes
CREATE OR REPLACE FUNCTION submit_participant_vote(
    p_ic_number TEXT,
    p_pitching_excellence TEXT,
    p_critical_thinking TEXT,
    p_ai_innovation TEXT
)
RETURNS JSON AS $$
DECLARE
    v_ic_hash TEXT;
    v_participant participants;
    v_participant_name TEXT;
    v_selected_participant TEXT;
    v_critical_thinking_team TEXT;
    v_ai_innovation_team TEXT;
BEGIN
    -- Generate hash for IC lookup
    v_ic_hash := encode(digest(p_ic_number || get_encryption_key(), 'sha256'), 'hex');
    
    -- Find and validate participant
    SELECT * INTO v_participant
    FROM participants 
    WHERE ic_number_hash = v_ic_hash;
    
    IF v_participant IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Participant not found. Please verify your IC number.'
        );
    END IF;
    
    IF v_participant.has_voted THEN
        RETURN json_build_object(
            'success', false,
            'error', 'You have already submitted your votes.'
        );
    END IF;
    
    -- Validate selections (prevent self-voting, own team voting, and non-eligible presenter voting)
    IF p_pitching_excellence = v_participant.participant_id THEN
        RETURN json_build_object(
            'success', false,
            'error', 'You cannot vote for yourself in the Pitching Excellence Award.'
        );
    END IF;
    
    -- Check if the selected participant is an eligible presenter
    IF NOT EXISTS (SELECT 1 FROM eligible_presenters WHERE participant_id = p_pitching_excellence) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'The selected participant is not eligible for the Pitching Excellence Award.'
        );
    END IF;
    
    IF p_critical_thinking = v_participant.team_id OR p_ai_innovation = v_participant.team_id THEN
        RETURN json_build_object(
            'success', false,
            'error', 'You cannot vote for your own team.'
        );
    END IF;
    
    -- Get names for confirmation
    SELECT decrypt_participant_name(participant_name_encrypted) INTO v_selected_participant
    FROM participants WHERE participant_id = p_pitching_excellence;
    
    SELECT team_name INTO v_critical_thinking_team
    FROM teams WHERE team_id = p_critical_thinking;
    
    SELECT team_name INTO v_ai_innovation_team
    FROM teams WHERE team_id = p_ai_innovation;
    
    -- Validate nominees exist
    IF v_selected_participant IS NULL OR v_critical_thinking_team IS NULL OR v_ai_innovation_team IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'One or more selected nominees not found.'
        );
    END IF;
    
    -- Insert votes
    INSERT INTO votes (voter_ic_hash, vote_category, nominee_id) VALUES
    (v_ic_hash, 'pitching_excellence', p_pitching_excellence),
    (v_ic_hash, 'critical_thinking', p_critical_thinking),
    (v_ic_hash, 'ai_innovation', p_ai_innovation);
    
    -- Mark participant as voted
    UPDATE participants 
    SET has_voted = true, voted_at = NOW()
    WHERE participant_id = v_participant.participant_id;
    
    RETURN json_build_object(
        'success', true,
        'message', 'Your votes have been submitted successfully!',
        'vote', json_build_object(
            'pitchingExcellence', v_selected_participant,
            'criticalThinking', v_critical_thinking_team,
            'aiInnovation', v_ai_innovation_team
        )
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while submitting your votes'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get vote results (for admins)
CREATE OR REPLACE FUNCTION get_voting_results()
RETURNS JSON AS $$
DECLARE
    v_pitching_results JSON;
    v_critical_results JSON;
    v_ai_results JSON;
    v_stats JSON;
BEGIN
    -- Pitching Excellence Results
    SELECT json_agg(
        json_build_object(
            'nominee_id', p.participant_id,
            'nominee_name', decrypt_participant_name(p.participant_name_encrypted),
            'vote_count', COALESCE(v.vote_count, 0),
            'photo_url', p.participant_photo_url,
            'team_name', t.team_name,
            'university_logo', t.team_university_logo_url
        )
        ORDER BY COALESCE(v.vote_count, 0) DESC
    ) INTO v_pitching_results
    FROM eligible_presenters ep
    JOIN participants p ON ep.participant_id = p.participant_id
    JOIN teams t ON p.team_id = t.team_id
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM votes 
        WHERE vote_category = 'pitching_excellence'
        GROUP BY nominee_id
    ) v ON p.participant_id = v.nominee_id;
    
    -- Critical Thinking Results
    SELECT json_agg(
        json_build_object(
            'nominee_id', t.team_id,
            'nominee_name', t.team_name,
            'vote_count', COALESCE(v.vote_count, 0),
            'photo_url', t.team_group_photo_url,
            'university_logo', t.team_university_logo_url
        )
        ORDER BY COALESCE(v.vote_count, 0) DESC
    ) INTO v_critical_results
    FROM teams t
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM votes 
        WHERE vote_category = 'critical_thinking'
        GROUP BY nominee_id
    ) v ON t.team_id = v.nominee_id;
    
    -- AI Innovation Results
    SELECT json_agg(
        json_build_object(
            'nominee_id', t.team_id,
            'nominee_name', t.team_name,
            'vote_count', COALESCE(v.vote_count, 0),
            'photo_url', t.team_group_photo_url,
            'university_logo', t.team_university_logo_url
        )
        ORDER BY COALESCE(v.vote_count, 0) DESC
    ) INTO v_ai_results
    FROM teams t
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM votes 
        WHERE vote_category = 'ai_innovation'
        GROUP BY nominee_id
    ) v ON t.team_id = v.nominee_id;
    
    -- Statistics
    SELECT json_build_object(
        'total_participants', (SELECT COUNT(*) FROM participants),
        'total_votes', (SELECT COUNT(DISTINCT voter_ic_hash) FROM votes),
        'participants_not_voted', (SELECT COUNT(*) FROM participants WHERE has_voted = false),
        'voting_percentage', ROUND(
            (SELECT COUNT(DISTINCT voter_ic_hash)::NUMERIC FROM votes) / 
            (SELECT COUNT(*)::NUMERIC FROM participants) * 100, 2
        )
    ) INTO v_stats;
    
    RETURN json_build_object(
        'success', true,
        'results', json_build_object(
            'pitching_excellence', v_pitching_results,
            'critical_thinking', v_critical_results,
            'ai_innovation', v_ai_results
        ),
        'statistics', v_stats
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while fetching results'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GUEST VOTING FUNCTIONS
-- ============================================================================

-- Function to encrypt guest email and generate hash
CREATE OR REPLACE FUNCTION encrypt_guest_email(p_email TEXT)
RETURNS TABLE(encrypted_email BYTEA, email_hash TEXT) AS $$
BEGIN
    RETURN QUERY SELECT 
        pgp_sym_encrypt(p_email, get_encryption_key()) as encrypted_email,
        encode(digest(p_email || get_encryption_key(), 'sha256'), 'hex') as email_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get voting data for guest (no restrictions on team/self)
CREATE OR REPLACE FUNCTION get_guest_voting_data()
RETURNS JSON AS $$
DECLARE
    v_all_participants JSON;
    v_all_teams JSON;
    v_origin TEXT;
BEGIN
    -- Get origin from request headers for domain validation
    BEGIN
        v_origin := current_setting('request.headers', true)::json->>'origin';
    EXCEPTION WHEN OTHERS THEN
        v_origin := NULL;
    END;
    
    -- Domain validation (same as participant voting)
    IF v_origin NOT IN (
        'https://mdit2025.my',
        'https://www.mdit2025.my',
        'https://staging.mdit2025.my',
        'https://dev.mdit2025.my'
    ) AND COALESCE(v_origin, '') NOT LIKE '%localhost%' THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Access denied: Invalid domain'
        );
    END IF;
    
    -- Get all eligible participants (guests can vote for any eligible presenter)
    SELECT json_agg(
        json_build_object(
            'participant_id', p.participant_id,
            'participant_name', decrypt_participant_name(p.participant_name_encrypted),
            'participant_photo_url', p.participant_photo_url,
            'team_id', p.team_id,
            'teams', json_build_object(
                'team_id', t.team_id,
                'team_name', t.team_name,
                'team_university_name', t.team_university_name,
                'team_university_logo_url', t.team_university_logo_url,
                'team_group_photo_url', t.team_group_photo_url
            )
        )
    ) INTO v_all_participants
    FROM participants p
    JOIN teams t ON p.team_id = t.team_id
    JOIN eligible_presenters ep ON p.participant_id = ep.participant_id;
    
    -- Get all teams (guests can vote for any team)
    SELECT json_agg(
        json_build_object(
            'team_id', team_id,
            'team_name', team_name,
            'team_university_name', team_university_name,
            'team_university_logo_url', team_university_logo_url,
            'team_group_photo_url', team_group_photo_url
        )
    ) INTO v_all_teams
    FROM teams;
    
    -- Return success with all voting data
    RETURN json_build_object(
        'success', true,
        'data', json_build_object(
            'participants', COALESCE(v_all_participants, '[]'::json),
            'teams', COALESCE(v_all_teams, '[]'::json)
        )
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while processing your request'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to submit guest votes
CREATE OR REPLACE FUNCTION submit_guest_vote(
    p_email TEXT,
    p_pitching_excellence TEXT,
    p_critical_thinking TEXT,
    p_ai_innovation TEXT
)
RETURNS JSON AS $$
DECLARE
    v_email_hash TEXT;
    v_encrypted_email BYTEA;
    v_existing_votes INTEGER;
    v_selected_participant TEXT;
    v_critical_thinking_team TEXT;
    v_ai_innovation_team TEXT;
BEGIN
    -- Validate email format
    IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Please enter a valid email address.'
        );
    END IF;
    
    -- Check if the selected participant is an eligible presenter
    IF NOT EXISTS (SELECT 1 FROM eligible_presenters WHERE participant_id = p_pitching_excellence) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'The selected participant is not eligible for the Pitching Excellence Award.'
        );
    END IF;
    
    -- Generate hash and encrypt email
    SELECT encrypted_email, email_hash 
    INTO v_encrypted_email, v_email_hash
    FROM encrypt_guest_email(p_email);
    
    -- Check if this email has already voted
    SELECT COUNT(*) INTO v_existing_votes
    FROM guest_votes
    WHERE voter_email_hash = v_email_hash;
    
    IF v_existing_votes > 0 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'This email address has already been used to vote.'
        );
    END IF;
    
    -- Get names for confirmation
    SELECT decrypt_participant_name(participant_name_encrypted) INTO v_selected_participant
    FROM participants WHERE participant_id = p_pitching_excellence;
    
    SELECT team_name INTO v_critical_thinking_team
    FROM teams WHERE team_id = p_critical_thinking;
    
    SELECT team_name INTO v_ai_innovation_team
    FROM teams WHERE team_id = p_ai_innovation;
    
    -- Validate nominees exist
    IF v_selected_participant IS NULL OR v_critical_thinking_team IS NULL OR v_ai_innovation_team IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'One or more selected nominees not found.'
        );
    END IF;
    
    -- Insert guest votes
    INSERT INTO guest_votes (voter_email_hash, voter_email_encrypted, vote_category, nominee_id) VALUES
    (v_email_hash, v_encrypted_email, 'pitching_excellence', p_pitching_excellence),
    (v_email_hash, v_encrypted_email, 'critical_thinking', p_critical_thinking),
    (v_email_hash, v_encrypted_email, 'ai_innovation', p_ai_innovation);
    
    RETURN json_build_object(
        'success', true,
        'message', 'Your guest votes have been submitted successfully!',
        'vote', json_build_object(
            'pitchingExcellence', v_selected_participant,
            'criticalThinking', v_critical_thinking_team,
            'aiInnovation', v_ai_innovation_team
        )
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while submitting your votes'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the get_voting_results function to include guest votes
CREATE OR REPLACE FUNCTION get_voting_results()
RETURNS JSON AS $$
DECLARE
    v_pitching_results JSON;
    v_critical_results JSON;
    v_ai_results JSON;
    v_stats JSON;
    v_total_guest_votes INTEGER;
BEGIN
    -- Pitching Excellence Results (combined participant + guest votes)
    SELECT json_agg(
        json_build_object(
            'nominee_id', p.participant_id,
            'nominee_name', decrypt_participant_name(p.participant_name_encrypted),
            'vote_count', COALESCE(pv.vote_count, 0) + COALESCE(gv.vote_count, 0),
            'participant_votes', COALESCE(pv.vote_count, 0),
            'guest_votes', COALESCE(gv.vote_count, 0),
            'photo_url', p.participant_photo_url,
            'team_name', t.team_name,
            'university_logo', t.team_university_logo_url
        )
        ORDER BY (COALESCE(pv.vote_count, 0) + COALESCE(gv.vote_count, 0)) DESC
    ) INTO v_pitching_results
    FROM eligible_presenters ep
    JOIN participants p ON ep.participant_id = p.participant_id
    JOIN teams t ON p.team_id = t.team_id
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM votes 
        WHERE vote_category = 'pitching_excellence'
        GROUP BY nominee_id
    ) pv ON p.participant_id = pv.nominee_id
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM guest_votes 
        WHERE vote_category = 'pitching_excellence'
        GROUP BY nominee_id
    ) gv ON p.participant_id = gv.nominee_id;
    
    -- Critical Thinking Results (combined participant + guest votes)
    SELECT json_agg(
        json_build_object(
            'nominee_id', t.team_id,
            'nominee_name', t.team_name,
            'vote_count', COALESCE(pv.vote_count, 0) + COALESCE(gv.vote_count, 0),
            'participant_votes', COALESCE(pv.vote_count, 0),
            'guest_votes', COALESCE(gv.vote_count, 0),
            'photo_url', t.team_group_photo_url,
            'university_logo', t.team_university_logo_url
        )
        ORDER BY (COALESCE(pv.vote_count, 0) + COALESCE(gv.vote_count, 0)) DESC
    ) INTO v_critical_results
    FROM teams t
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM votes 
        WHERE vote_category = 'critical_thinking'
        GROUP BY nominee_id
    ) pv ON t.team_id = pv.nominee_id
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM guest_votes 
        WHERE vote_category = 'critical_thinking'
        GROUP BY nominee_id
    ) gv ON t.team_id = gv.nominee_id;
    
    -- AI Innovation Results (combined participant + guest votes)
    SELECT json_agg(
        json_build_object(
            'nominee_id', t.team_id,
            'nominee_name', t.team_name,
            'vote_count', COALESCE(pv.vote_count, 0) + COALESCE(gv.vote_count, 0),
            'participant_votes', COALESCE(pv.vote_count, 0),
            'guest_votes', COALESCE(gv.vote_count, 0),
            'photo_url', t.team_group_photo_url,
            'university_logo', t.team_university_logo_url
        )
        ORDER BY (COALESCE(pv.vote_count, 0) + COALESCE(gv.vote_count, 0)) DESC
    ) INTO v_ai_results
    FROM teams t
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM votes 
        WHERE vote_category = 'ai_innovation'
        GROUP BY nominee_id
    ) pv ON t.team_id = pv.nominee_id
    LEFT JOIN (
        SELECT nominee_id, COUNT(*) as vote_count
        FROM guest_votes 
        WHERE vote_category = 'ai_innovation'
        GROUP BY nominee_id
    ) gv ON t.team_id = gv.nominee_id;
    
    -- Get total guest votes count
    SELECT COUNT(DISTINCT voter_email_hash) INTO v_total_guest_votes
    FROM guest_votes;
    
    -- Statistics (including guest votes)
    SELECT json_build_object(
        'total_participants', (SELECT COUNT(*) FROM participants),
        'total_participant_votes', (SELECT COUNT(DISTINCT voter_ic_hash) FROM votes),
        'total_guest_votes', v_total_guest_votes,
        'total_votes', (SELECT COUNT(DISTINCT voter_ic_hash) FROM votes) + v_total_guest_votes,
        'participants_not_voted', (SELECT COUNT(*) FROM participants WHERE has_voted = false),
        'voting_percentage', ROUND(
            (SELECT COUNT(DISTINCT voter_ic_hash)::NUMERIC FROM votes) / 
            (SELECT COUNT(*)::NUMERIC FROM participants) * 100, 2
        )
    ) INTO v_stats;
    
    RETURN json_build_object(
        'success', true,
        'results', json_build_object(
            'pitching_excellence', v_pitching_results,
            'critical_thinking', v_critical_results,
            'ai_innovation', v_ai_results
        ),
        'statistics', v_stats
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while fetching results'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ELIGIBLE PRESENTERS MANAGEMENT FUNCTIONS (ADMIN ONLY)
-- ============================================================================

-- Function to add eligible presenter (admin only)
CREATE OR REPLACE FUNCTION add_eligible_presenter(
    p_participant_id TEXT,
    p_team_id TEXT
)
RETURNS JSON AS $$
DECLARE
    v_existing_count INTEGER;
    v_participant_exists BOOLEAN;
    v_team_match BOOLEAN;
BEGIN
    -- Check if participant exists
    SELECT EXISTS(SELECT 1 FROM participants WHERE participant_id = p_participant_id) INTO v_participant_exists;
    IF NOT v_participant_exists THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Participant not found.'
        );
    END IF;
    
    -- Check if participant belongs to the specified team
    SELECT EXISTS(SELECT 1 FROM participants WHERE participant_id = p_participant_id AND team_id = p_team_id) INTO v_team_match;
    IF NOT v_team_match THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Participant does not belong to the specified team.'
        );
    END IF;
    
    -- Check if team already has 2 eligible presenters
    SELECT COUNT(*) INTO v_existing_count FROM eligible_presenters WHERE team_id = p_team_id;
    IF v_existing_count >= 2 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Team already has the maximum of 2 eligible presenters.'
        );
    END IF;
    
    -- Check if participant is already eligible
    IF EXISTS(SELECT 1 FROM eligible_presenters WHERE participant_id = p_participant_id) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Participant is already an eligible presenter.'
        );
    END IF;
    
    -- Insert eligible presenter
    INSERT INTO eligible_presenters (participant_id, team_id) VALUES (p_participant_id, p_team_id);
    
    RETURN json_build_object(
        'success', true,
        'message', 'Participant added as eligible presenter successfully.'
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while adding eligible presenter.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove eligible presenter (admin only)
CREATE OR REPLACE FUNCTION remove_eligible_presenter(p_participant_id TEXT)

RETURNS JSON AS $$
BEGIN
    -- Check if participant is eligible
    IF NOT EXISTS(SELECT 1 FROM eligible_presenters WHERE participant_id = p_participant_id) THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Participant is not an eligible presenter.'
        );
    END IF;
    
    -- Remove eligible presenter
    DELETE FROM eligible_presenters WHERE participant_id = p_participant_id;
    
    RETURN json_build_object(
        'success', true,
        'message', 'Participant removed from eligible presenters successfully.'
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while removing eligible presenter.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get all eligible presenters (admin only)
CREATE OR REPLACE FUNCTION get_eligible_presenters()
RETURNS JSON AS $$
DECLARE
    v_eligible_presenters JSON;
BEGIN
    SELECT json_agg(
        json_build_object(
            'participant_id', p.participant_id,
            'participant_name', decrypt_participant_name(p.participant_name_encrypted),
            'participant_photo_url', p.participant_photo_url,
            'team_id', p.team_id,
            'team_name', t.team_name,
            'added_at', ep.created_at
        )
        ORDER BY t.team_name, p.participant_id
    ) INTO v_eligible_presenters
    FROM eligible_presenters ep
    JOIN participants p ON ep.participant_id = p.participant_id
    JOIN teams t ON ep.team_id = t.team_id;
    
    RETURN json_build_object(
        'success', true,
        'data', COALESCE(v_eligible_presenters, '[]'::json)
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', 'An error occurred while fetching eligible presenters.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_voting_credentials(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION submit_participant_vote(TEXT, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_guest_voting_data() TO anon;
GRANT EXECUTE ON FUNCTION submit_guest_vote(TEXT, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_voting_results() TO authenticated;
GRANT EXECUTE ON FUNCTION encrypt_participant_ic(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION encrypt_participant_name(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION encrypt_guest_email(TEXT) TO authenticated;
-- Admin functions for eligible presenters
GRANT EXECUTE ON FUNCTION add_eligible_presenter(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION remove_eligible_presenter(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_eligible_presenters() TO authenticated;