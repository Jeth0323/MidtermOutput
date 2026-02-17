-- Emergency Hotline System Database
-- Creates the database and tables


CREATE DATABASE IF NOT EXISTS emergency_hotline_db;
USE emergency_hotline_db;

-- creates the cities table
CREATE TABLE IF NOT EXISTS cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city_code VARCHAR(50) UNIQUE NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    province VARCHAR(100) DEFAULT 'Pampanga',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create the barangays table
CREATE TABLE IF NOT EXISTS barangays (
id INT AUTO_INCREMENT PRIMARY KEY,
    city_id INT NOT NULL,
    barangay_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

-- create the emergency category table
CREATE TABLE IF NOT EXISTS categories (
id INT AUTO_INCREMENT PRIMARY KEY,
    category_code VARCHAR(50) UNIQUE NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    icon_class VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creates the emergency hotline table
CREATE TABLE IF NOT EXISTS hotlines (
id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category_id INT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    description TEXT,
    city_id INT,
    barangay_id INT,
    is_national BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
    FOREIGN KEY (barangay_id) REFERENCES barangays(id) ON DELETE SET NULL
);

-- create the favorites table
CREATE TABLE IF NOT EXISTS favorites (
id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL
    hotline_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotline_id) REFERENCES hotlines(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_identifier, hotline_id)
);

-- use to insert into categories
INSERT INTO categories (category_code, category_name, icon_class) VALUES
('police', 'Police & Security', 'fas fa-shield-alt'),
('medical', 'Medical & Health', 'fas fa-ambulance'),
('fire', 'Fire & Rescue', 'fas fa-fire-extinguisher'),
('disaster', 'Disaster & Safety', 'fas fa-exclamation-triangle');

-- use to insert to cities
INSERT INTO cities (city_code, city_name) VALUES
('national', 'National'),
('mabalacat', 'Mabalacat City'),
('angeles', 'Angeles City'),
('san_fernando', 'San Fernando'),
('mexico', 'Mexico');

-- use to insert into barangays for Mabalacat
INSERT INTO barangays (city_id, barangay_name) VALUES
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Atlu-Bola'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Bundagul'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Cacutud'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Dapdap'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Dau'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Dolores'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Duquit'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Lakandula'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Mabiga'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Marcos Village'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Paralaya'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'San Francisco'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Sapang Bato'),
((SELECT id FROM cities WHERE city_code = 'mabalacat'), 'Santo Rosario');

-- use to insert into barangays for Angeles
INSERT INTO barangays (city_id, barangay_name) VALUES
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Balibago'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Cutcut'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Pampang'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Pulung Maragul'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Santo Cristo'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Santo Rosario'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Sapang Bato'),
((SELECT id FROM cities WHERE city_code = 'angeles'), 'Salapungan');


-- use to insert into Police & Security
INSERT INTO hotlines (name, category_id, phone, description, city_id, is_national) VALUES
('PNP Emergency Hotline', (SELECT id FROM categories WHERE category_code = 'police'), '911', 'National Police Emergency Hotline', (SELECT id FROM cities WHERE city_code = 'national'), TRUE),
('Mabalacat Police Station', (SELECT id FROM categories WHERE category_code = 'police'), '09485524384', 'Mabalacat City Police Station', (SELECT id FROM cities WHERE city_code = 'mabalacat'), FALSE),
('Angeles City Police', (SELECT id FROM categories WHERE category_code = 'police'), '(045) 888-3333', 'Angeles City Police Station', (SELECT id FROM cities WHERE city_code = 'angeles'), FALSE);

INSERT INTO hotlines (name, category_id, phone, description, city_id, barangay_id) VALUES
('Barangay Tanod - Dau', (SELECT id FROM categories WHERE category_code = 'police'), '(045) 458-5678', 'Barangay Security Officers', 
    (SELECT id FROM cities WHERE city_code = 'mabalacat'), 
    (SELECT id FROM barangays WHERE barangay_name = 'Dau' AND city_id = (SELECT id FROM cities WHERE city_code = 'mabalacat')));

-- use to insert into Medical & Health
INSERT INTO hotlines (name, category_id, phone, description, city_id, is_national) VALUES
('Emergency Medical Services', (SELECT id FROM categories WHERE category_code = 'medical'), '911', 'National Emergency Medical Services', (SELECT id FROM cities WHERE city_code = 'national'), TRUE),
('Mabalacat City Health Office', (SELECT id FROM categories WHERE category_code = 'medical'), '(045) 458-2222', 'City Health Office Emergency', (SELECT id FROM cities WHERE city_code = 'mabalacat'), FALSE),
('Angeles University Foundation Medical Center', (SELECT id FROM categories WHERE category_code = 'medical'), '(045) 888-4444', 'Hospital Emergency Room', (SELECT id FROM cities WHERE city_code = 'angeles'), FALSE),
('Red Cross Pampanga', (SELECT id FROM categories WHERE category_code = 'medical'), '(045) 961-2294', 'Emergency Medical Response', (SELECT id FROM cities WHERE city_code = 'san_fernando'), FALSE);

INSERT INTO hotlines (name, category_id, phone, description, city_id, barangay_id) VALUES
('Barangay Health Center - Dau', (SELECT id FROM categories WHERE category_code = 'medical'), '(045) 458-3456', 'Barangay Health Services', 
    (SELECT id FROM cities WHERE city_code = 'mabalacat'), 
    (SELECT id FROM barangays WHERE barangay_name = 'Dau' AND city_id = (SELECT id FROM cities WHERE city_code = 'mabalacat')));

-- use to insert into Fire & Rescue
INSERT INTO hotlines (name, category_id, phone, description, city_id, is_national) VALUES
('Bureau of Fire Protection', (SELECT id FROM categories WHERE category_code = 'fire'), '911', 'National Fire Emergency', (SELECT id FROM cities WHERE city_code = 'national'), TRUE),
('Mabalacat Fire Station', (SELECT id FROM categories WHERE category_code = 'fire'), '(045) 458-3333', 'City Fire Department', (SELECT id FROM cities WHERE city_code = 'mabalacat'), FALSE),
('Angeles City Fire Department', (SELECT id FROM categories WHERE category_code = 'fire'), '(045) 888-2222', 'Fire and Rescue Services', (SELECT id FROM cities WHERE city_code = 'angeles'), FALSE),
('BFP San Fernando', (SELECT id FROM categories WHERE category_code = 'fire'), '(045) 961-2345', 'Fire Protection Bureau', (SELECT id FROM cities WHERE city_code = 'san_fernando'), FALSE);

-- use to insert into Disaster & Safety
INSERT INTO hotlines (name, category_id, phone, description, city_id, is_national) VALUES
('NDRRMC Hotline', (SELECT id FROM categories WHERE category_code = 'disaster'), '911-1406', 'National Disaster Risk Reduction', (SELECT id FROM cities WHERE city_code = 'national'), TRUE),
('PAGASA Weather Updates', (SELECT id FROM categories WHERE category_code = 'disaster'), '(02) 8284-0800', 'Weather Information and Warnings', (SELECT id FROM cities WHERE city_code = 'national'), TRUE),
('Mabalacat DRRMO', (SELECT id FROM categories WHERE category_code = 'disaster'), '(045) 458-4444', 'Disaster Risk Reduction Management', (SELECT id FROM cities WHERE city_code = 'mabalacat'), FALSE),
('Angeles City DRRM', (SELECT id FROM categories WHERE category_code = 'disaster'), '(045) 888-5555', 'Disaster Response Management', (SELECT id FROM cities WHERE city_code = 'angeles'), FALSE);

INSERT INTO hotlines (name, category_id, phone, description, city_id, barangay_id) VALUES
('Barangay Emergency Response - Dau', (SELECT id FROM categories WHERE category_code = 'disaster'), '(045) 458-6789', 'Local Disaster Response Team', 
    (SELECT id FROM cities WHERE city_code = 'mabalacat'), 
    (SELECT id FROM barangays WHERE barangay_name = 'Dau' AND city_id = (SELECT id FROM cities WHERE city_code = 'mabalacat')));
