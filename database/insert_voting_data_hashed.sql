-- ============================================================================
-- VOTING SYSTEM DATA INSERTION WITH HASHING
-- ============================================================================
-- Execute this AFTER the schema is created

-- Insert teams
INSERT INTO teams (team_id, team_name, team_university_name, team_university_logo_url, team_group_photo_url) VALUES
('TEAM001', 'HanyCodes', 'Universiti Teknologi MARA (UiTM), Kampus Jasin', '/uitm_Light.svg', '/assets/participant/group/1.png'),
('TEAM002', 'Kopi O (1)', 'Universiti Malaya', '/assets/participant/uni_logo/UM.png', '/assets/participant/group/2.png'),
('TEAM003', 'Mathecs', 'Universiti Malaysia Sarawak', '/assets/participant/uni_logo/UNIMAS.png', '/assets/participant/group/3.png'),
('TEAM004', 'TechnologyKu', 'Universiti Malaysia Pahang Sultan Abdullah', '/assets/participant/uni_logo/UMPSA.png', '/assets/participant/group/4.png'),
('TEAM005', '123', 'Universiti Putra Malaysia', '/assets/participant/uni_logo/UPM.jpg', '/assets/participant/group/5.png'),
('TEAM006', 'Ctrl Alt Win', 'Universiti Malaya', '/assets/participant/uni_logo/UM.png', '/assets/participant/group/6.png'),
('TEAM007', 'CrashOut', 'University of Nottingham Malaysia', '/assets/participant/uni_logo/UNM.png', '/assets/participant/group/7.png'),
('TEAM008', 'DANG WANGI', 'Universiti Teknologi Petronas', '/assets/participant/uni_logo/UTP.png', '/assets/participant/group/8.png'),
('TEAM009', 'Oversized Minions', 'Universiti Malaysia Pahang Sultan Abdullah', '/assets/participant/uni_logo/UMPSA.png', '/assets/participant/group/9.png'),
('TEAM010', 'OptiVida', 'Universiti Sains Islam Malaysia', '/assets/participant/uni_logo/USIM.png', '/assets/participant/group/10.png');

-- Insert participants with encrypted IC and names
-- Note: This uses the encrypt_participant_ic function to properly hash and encrypt data

-- Team 1 participants
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART001',
    (encrypt_participant_ic('030807-01-0216')).encrypted_ic,
    encrypt_participant_name('HUDA LIYANA BINTI MOHD RAPINI'),
    (encrypt_participant_ic('030807-01-0216')).ic_hash,
    '/assets/participant/individual/team1/1.png',
    'TEAM001';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART002',
    (encrypt_participant_ic('030827-04-0244')).encrypted_ic,
    encrypt_participant_name('ANIS SURAYA BINTI LATIP'),
    (encrypt_participant_ic('030827-04-0244')).ic_hash,
    '/assets/participant/individual/team1/2.png',
    'TEAM001';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART003',
    (encrypt_participant_ic('030409-10-2000')).encrypted_ic,
    encrypt_participant_name('NURUL NABILA BINTI MOHD RAJIL'),
    (encrypt_participant_ic('030409-10-2000')).ic_hash,
    '/assets/participant/individual/team1/3.png',
    'TEAM001';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART004',
    (encrypt_participant_ic('030613-10-0176')).encrypted_ic,
    encrypt_participant_name('YUSSYAFIKA BINTI SHAHROL'),
    (encrypt_participant_ic('030613-10-0176')).ic_hash,
    '/assets/participant/individual/team1/4.png',
    'TEAM001';

-- Team 2 participants  
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART005',
    (encrypt_participant_ic('030210-10-1692')).encrypted_ic,
    encrypt_participant_name('TANG YUEN YIN'),
    (encrypt_participant_ic('030210-10-1692')).ic_hash,
    '/assets/participant/individual/team2/1.png',
    'TEAM002';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART006',
    (encrypt_participant_ic('030815-14-1064')).encrypted_ic,
    encrypt_participant_name('WAN NUR SYARINA BINTI WAN JAAFAR'),
    (encrypt_participant_ic('030815-14-1064')).ic_hash,
    '/assets/participant/individual/team2/2.png',
    'TEAM002';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART007',
    (encrypt_participant_ic('030507-07-0620')).encrypted_ic,
    encrypt_participant_name('AIREEN ELZAHRAA BINTI AHMAD ALJAFRI'),
    (encrypt_participant_ic('030507-07-0620')).ic_hash,
    '/assets/participant/individual/team2/3.png',
    'TEAM002';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART008',
    (encrypt_participant_ic('030922-04-0306')).encrypted_ic,
    encrypt_participant_name('CARMEN LAM KAH MAN'),
    (encrypt_participant_ic('030922-04-0306')).ic_hash,
    '/assets/participant/individual/team2/4.png',
    'TEAM002';

-- Team 3 participants
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART009',
    (encrypt_participant_ic('980318-12-5150')).encrypted_ic,
    encrypt_participant_name('MADZNA'),
    (encrypt_participant_ic('980318-12-5150')).ic_hash,
    '/assets/participant/individual/team3/1.png',
    'TEAM003';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART010',
    (encrypt_participant_ic('020331-10-1307')).encrypted_ic,
    encrypt_participant_name('THISANT A/L RAGU'),
    (encrypt_participant_ic('020331-10-1307')).ic_hash,
    '/assets/participant/individual/team3/2.png',
    'TEAM003';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 
    'PART011',
    (encrypt_participant_ic('010708-05-0329')).encrypted_ic,
    encrypt_participant_name('JONATHAN LAU LEE BIN'),
    (encrypt_participant_ic('010708-05-0329')).ic_hash,
    '/assets/participant/individual/team3/3.png',
    'TEAM003';

-- Continue with remaining teams (Teams 4-10, 4 participants each)
-- Team 4
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART012', (encrypt_participant_ic('021213-08-0108')).encrypted_ic, encrypt_participant_name('AQILAH MAISARAH BINTI AZIZI'), (encrypt_participant_ic('021213-08-0108')).ic_hash, '/assets/participant/individual/team4/1.png', 'TEAM004';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART013', (encrypt_participant_ic('030822-06-0174')).encrypted_ic, encrypt_participant_name('ALMIRA DAMIA BINTI SYAHNIZAM'), (encrypt_participant_ic('030822-06-0174')).ic_hash, '/assets/participant/individual/team4/2.png', 'TEAM004';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART014', (encrypt_participant_ic('020408-01-0332')).encrypted_ic, encrypt_participant_name('NURUL NAJWA BINTI NORHISHAM'), (encrypt_participant_ic('020408-01-0332')).ic_hash, '/assets/participant/individual/team4/3.png', 'TEAM004';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART015', (encrypt_participant_ic('030808-06-0397')).encrypted_ic, encrypt_participant_name('MUHAMMAD DANISH AIMAN HARISS BIN ROSLI'), (encrypt_participant_ic('030808-06-0397')).ic_hash, '/assets/participant/individual/team4/4.png', 'TEAM004';

-- Team 5
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART016', (encrypt_participant_ic('020330-13-1467')).encrypted_ic, encrypt_participant_name('VOON SZE KAI'), (encrypt_participant_ic('020330-13-1467')).ic_hash, '/assets/participant/individual/team5/1.png', 'TEAM005';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART017', (encrypt_participant_ic('010301-14-0410')).encrypted_ic, encrypt_participant_name('LEE THONG'), (encrypt_participant_ic('010301-14-0410')).ic_hash, '/assets/participant/individual/team5/2.png', 'TEAM005';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART018', (encrypt_participant_ic('030930-14-0956')).encrypted_ic, encrypt_participant_name('CHAN CI EN'), (encrypt_participant_ic('030930-14-0956')).ic_hash, '/assets/participant/individual/team5/3.png', 'TEAM005';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART019', (encrypt_participant_ic('031002-08-0465')).encrypted_ic, encrypt_participant_name('YONG JUN WEI'), (encrypt_participant_ic('031002-08-0465')).ic_hash, '/assets/participant/individual/team5/4.png', 'TEAM005';

-- Team 6
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART020', (encrypt_participant_ic('031223-02-1143')).encrypted_ic, encrypt_participant_name('IKMAL HAKIM BIN RADZALI'), (encrypt_participant_ic('031223-02-1143')).ic_hash, '/assets/participant/individual/team6/1.png', 'TEAM006';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART021', (encrypt_participant_ic('030427-10-0228')).encrypted_ic, encrypt_participant_name('ZAHRA AZALEA BINTI FAIZI'), (encrypt_participant_ic('030427-10-0228')).ic_hash, '/assets/participant/individual/team6/2.png', 'TEAM006';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART022', (encrypt_participant_ic('020424-87-0068')).encrypted_ic, encrypt_participant_name('AQILAH SALIHAH BINTI ISMAIL YUSOFF'), (encrypt_participant_ic('020424-87-0068')).ic_hash, '/assets/participant/individual/team6/3.png', 'TEAM006';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART023', (encrypt_participant_ic('030923-09-0110')).encrypted_ic, encrypt_participant_name('ANIS MUNIRAH BINTI MOHD ASRI'), (encrypt_participant_ic('030923-09-0110')).ic_hash, '/assets/participant/individual/team6/4.png', 'TEAM006';

-- Team 7
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART024', (encrypt_participant_ic('060609-10-0023')).encrypted_ic, encrypt_participant_name('MOHAMED FAHD HARIS BIN SHAIFUL NIZAM'), (encrypt_participant_ic('060609-10-0023')).ic_hash, '/assets/participant/individual/team7/1.png', 'TEAM007';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART025', (encrypt_participant_ic('020729-14-1579')).encrypted_ic, encrypt_participant_name('CHENG HSIU FUNG'), (encrypt_participant_ic('020729-14-1579')).ic_hash, '/assets/participant/individual/team7/2.png', 'TEAM007';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART026', (encrypt_participant_ic('050414-07-0291')).encrypted_ic, encrypt_participant_name('LIM ZI XIANG'), (encrypt_participant_ic('050414-07-0291')).ic_hash, '/assets/participant/individual/team7/3.png', 'TEAM007';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART027', (encrypt_participant_ic('050814-14-0412')).encrypted_ic, encrypt_participant_name('ARIANNA BINTI AINURIZAM'), (encrypt_participant_ic('050814-14-0412')).ic_hash, '/assets/participant/individual/team7/4.png', 'TEAM007';

-- Team 8
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART028', (encrypt_participant_ic('040428-14-0423')).encrypted_ic, encrypt_participant_name('ABDUL HAFIZ BIN MOHD NOOR AZMAN'), (encrypt_participant_ic('040428-14-0423')).ic_hash, '/assets/participant/individual/team8/1.png', 'TEAM008';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART029', (encrypt_participant_ic('040315-02-0644')).encrypted_ic, encrypt_participant_name('NUR FARAH BINTI AHMAD NAZRI'), (encrypt_participant_ic('040315-02-0644')).ic_hash, '/assets/participant/individual/team8/2.png', 'TEAM008';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART030', (encrypt_participant_ic('041203-07-0318')).encrypted_ic, encrypt_participant_name('NURLISA NABIHA BINTI ROSLAN'), (encrypt_participant_ic('041203-07-0318')).ic_hash, '/assets/participant/individual/team8/3.png', 'TEAM008';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART031', (encrypt_participant_ic('040322-11-0015')).encrypted_ic, encrypt_participant_name('MUHAMMAD KHAIDHIR BIN MOHD RAZIN'), (encrypt_participant_ic('040322-11-0015')).ic_hash, '/assets/participant/individual/team8/4.png', 'TEAM008';

-- Team 9
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART032', (encrypt_participant_ic('030912-07-0472')).encrypted_ic, encrypt_participant_name('LEONG SIN YAN'), (encrypt_participant_ic('030912-07-0472')).ic_hash, '/assets/participant/individual/team9/1.png', 'TEAM009';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART033', (encrypt_participant_ic('020314-01-1393')).encrypted_ic, encrypt_participant_name('THAM REN SHENG'), (encrypt_participant_ic('020314-01-1393')).ic_hash, '/assets/participant/individual/team9/2.png', 'TEAM009';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART034', (encrypt_participant_ic('030703-08-1095')).encrypted_ic, encrypt_participant_name('YAP KAH JUN'), (encrypt_participant_ic('030703-08-1095')).ic_hash, '/assets/participant/individual/team9/3.png', 'TEAM009';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART035', (encrypt_participant_ic('040303-03-0087')).encrypted_ic, encrypt_participant_name('OOI MIN JIE'), (encrypt_participant_ic('040303-03-0087')).ic_hash, '/assets/participant/individual/team9/4.png', 'TEAM009';

-- Team 10
INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART036', (encrypt_participant_ic('030525-16-0013')).encrypted_ic, encrypt_participant_name('FIEZAL IRFAN BIN KAMALROL HADI'), (encrypt_participant_ic('030525-16-0013')).ic_hash, '/assets/participant/individual/team10/1.png', 'TEAM010';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART037', (encrypt_participant_ic('031102-08-0294')).encrypted_ic, encrypt_participant_name('NURADILA BT MUHAMAD ZAIMI'), (encrypt_participant_ic('031102-08-0294')).ic_hash, '/assets/participant/individual/team10/2.png', 'TEAM010';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART038', (encrypt_participant_ic('030128-10-0578')).encrypted_ic, encrypt_participant_name('ANIS NURAISHAH BINTI AHMAD SHAHMINAN'), (encrypt_participant_ic('030128-10-0578')).ic_hash, '/assets/participant/individual/team10/3.png', 'TEAM010';

INSERT INTO participants (participant_id, ic_number_encrypted, participant_name_encrypted, ic_number_hash, participant_photo_url, team_id)
SELECT 'PART039', (encrypt_participant_ic('030801-01-0186')).encrypted_ic, encrypt_participant_name('NURLIESA SYAFINAZ BINTI SAIFULRAZI'), (encrypt_participant_ic('030801-01-0186')).ic_hash, '/assets/participant/individual/team10/4.png', 'TEAM010';

-- ============================================================================
-- INSERT ELIGIBLE PRESENTERS DATA (2 representatives per team for pitching excellence)
-- ============================================================================

-- Team 1: HanyCodes - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART003', 'TEAM001'), -- NURUL NABILA BINTI MOHD RAJIL
('PART002', 'TEAM001'); -- ANIS SURAYA BINTI LATIP

-- Team 2: Kopi O (1) - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART005', 'TEAM002'), -- TANG YUEN YIN
('PART006', 'TEAM002'); -- WAN NUR SYARINA BINTI WAN JAAFAR

-- Team 3: Mathecs - Select first 2 participants (only has 3 total)
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART009', 'TEAM003'), -- MADZNA
('PART010', 'TEAM003'); -- THISANT A/L RAGU

-- Team 4: TechnologyKu - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART012', 'TEAM004'), -- AQILAH MAISARAH BINTI AZIZI
('PART015', 'TEAM004'); -- MUHAMMAD DANISH AIMAN HARISS BIN ROSLI

-- Team 5: 123 - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART018', 'TEAM005'), -- CHA CI EN
('PART016', 'TEAM005'); -- VOON SZE KAI

-- Team 6: Ctrl Alt Win - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART020', 'TEAM006'), -- IKMAL HAKIM BIN RADZALI
('PART021', 'TEAM006'); -- ZAHRA AZALEA BINTI FAIZI

-- Team 7: CrashOut - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART027', 'TEAM007'), -- ARIANNA BINTI AINURIZAM
('PART025', 'TEAM007'); -- CHENG HSIU FUNG

-- Team 8: DANG WANGI - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART028', 'TEAM008'), -- ABDUL HAFIZ BIN MOHD NOOR AZMAN
('PART030', 'TEAM008'); -- NURLISA NABHIA BINTI ROSLAN

-- Team 9: Oversized Minions - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART032', 'TEAM009'), -- LEONG SIN YAN
('PART033', 'TEAM009'); -- THAM REN SHENG

-- Team 10: OptiVida - Select first 2 participants
INSERT INTO eligible_presenters (participant_id, team_id) VALUES
('PART036', 'TEAM010'); -- FIEZAL IRFAN BIN KAMALROL HADI

-- ============================================================================
-- VERIFICATION QUERIES FOR ELIGIBLE PRESENTERS
-- ============================================================================

-- Verify eligible presenters insertion (should show 2 per team, 20 total)
SELECT 
    t.team_name,
    COUNT(ep.participant_id) as eligible_count,
    STRING_AGG(
        decrypt_participant_name(p.participant_name_encrypted), 
        ', '
    ) as eligible_presenters
FROM teams t
LEFT JOIN eligible_presenters ep ON t.team_id = ep.team_id
LEFT JOIN participants p ON ep.participant_id = p.participant_id
GROUP BY t.team_id, t.team_name
ORDER BY t.team_id;

-- Check total count (should be 20)
SELECT COUNT(*) as total_eligible_presenters FROM eligible_presenters;

-- Verify no team has more than 2 eligible presenters
SELECT 
    team_id, 
    COUNT(*) as count
FROM eligible_presenters 
GROUP BY team_id 
HAVING COUNT(*) > 2;

INSERT INTO all_participants (ic_number_encrypted, participant_name_encrypted, ic_number_hash, has_claimed_certificate)
SELECT 
    (SELECT encrypted_ic FROM encrypt_participant_ic('040201-10-1075')),
    encrypt_participant_name('AHMAD ADHA BIN MOHD GHANI'),
    (SELECT ic_hash FROM encrypt_participant_ic('040201-10-1075')),
    false;

WITH participant_data AS (
    SELECT participant_id, ic_number_hash
    FROM all_participants
    ORDER BY created_at
)
INSERT INTO certificates (certificate_id, certificate_url, issued_at, claimed_at)
SELECT 
    participant_id,
    'https://tbykawedwakotdtiuarl.storage.supabase.co/storage/v1/s3/object/public/certificates/certificate_001.pdf',
    NOW(),
    NULL
FROM participant_data
WHERE ic_number_hash = (SELECT ic_hash FROM encrypt_participant_ic('040201-10-1075'))
LIMIT 1;