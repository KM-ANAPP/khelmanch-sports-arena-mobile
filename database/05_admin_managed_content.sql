-- Admin Managed Content Tables
-- Additional tables for content managed through admin portal

-- Enhanced user table for login details (add these columns if not exists)
ALTER TABLE users 
ADD COLUMN phone_number VARCHAR(20) UNIQUE,
ADD COLUMN google_id VARCHAR(255) UNIQUE,
ADD COLUMN login_type ENUM('phone', 'google', 'email') DEFAULT 'email',
ADD COLUMN phone_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN last_login TIMESTAMP NULL,
ADD COLUMN profile_image_url TEXT;

-- Sports data with enhanced details for admin management
CREATE TABLE admin_sports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon_url TEXT,
    description TEXT,
    total_players INT DEFAULT 0,
    total_venues INT DEFAULT 0,
    total_events INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    banner_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_sport_name (name)
);

-- Enhanced tournaments for admin management
CREATE TABLE admin_tournaments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    banner_image_url TEXT,
    venue VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cash_prize DECIMAL(12, 2) NOT NULL,
    registration_fee DECIMAL(10, 2) DEFAULT 0,
    sport_id INT,
    amenities JSON, -- Store amenities as JSON array
    registration_open BOOLEAN DEFAULT TRUE,
    max_teams INT DEFAULT 16,
    current_teams INT DEFAULT 0,
    description TEXT,
    rules TEXT,
    contact_info JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sport_id) REFERENCES admin_sports(id) ON DELETE SET NULL,
    INDEX idx_tournament_status (status, start_date),
    INDEX idx_tournament_sport (sport_id, status)
);

-- Celebrating journey section content
CREATE TABLE journey_milestones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    milestone_number VARCHAR(50), -- e.g., "1000+", "50+", "24/7"
    icon_name VARCHAR(100), -- lucide icon name
    background_color VARCHAR(50) DEFAULT '#f3f4f6',
    text_color VARCHAR(50) DEFAULT '#1f2937',
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Partners section
CREATE TABLE partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    description TEXT,
    logo_width INT DEFAULT 120, -- recommended width in pixels
    logo_height INT DEFAULT 60, -- recommended height in pixels
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    partnership_type ENUM('sponsor', 'venue', 'technology', 'media', 'other') DEFAULT 'sponsor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hamburger sidebar menu items
CREATE TABLE sidebar_menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100), -- lucide icon name
    route_path VARCHAR(255), -- React router path
    external_url TEXT, -- if it's an external link
    parent_id INT, -- for sub-menu items
    is_active BOOLEAN DEFAULT TRUE,
    requires_auth BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    badge_text VARCHAR(50), -- e.g., "New", "Beta"
    badge_color VARCHAR(50) DEFAULT '#3b82f6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES sidebar_menu_items(id) ON DELETE CASCADE
);

-- App configuration settings
CREATE TABLE app_configurations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT,
    config_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- whether this config is accessible by frontend
    category VARCHAR(100) DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_admin_sports_active ON admin_sports(is_active, display_order);
CREATE INDEX idx_journey_milestones_active ON journey_milestones(is_active, display_order);
CREATE INDEX idx_partners_active ON partners(is_active, display_order);
CREATE INDEX idx_sidebar_menu_active ON sidebar_menu_items(is_active, display_order, parent_id);
CREATE INDEX idx_app_config_public ON app_configurations(is_public, category);

-- Sample Data

-- Insert sample sports data
INSERT INTO admin_sports (name, icon_url, description, total_players, total_venues, total_events, display_order, banner_image_url) VALUES
('Cricket', '/icons/cricket.svg', 'The most popular sport in India', 1500, 25, 150, 1, '/banners/cricket-banner.jpg');

-- Insert sample tournament
INSERT INTO admin_tournaments (title, banner_image_url, venue, start_date, end_date, cash_prize, sport_id, amenities, registration_open, description) VALUES
('Delhi Cricket Premier League', '/tournaments/delhi-cricket-banner.jpg', 'Khelmanch Stadium, Delhi', '2025-05-15', '2025-05-20', 50000.00, 1, '["Parking", "Cafeteria", "First Aid", "Live Streaming"]', TRUE, 'Premier cricket tournament in Delhi');

-- Insert journey milestones
INSERT INTO journey_milestones (title, description, milestone_number, icon_name, display_order) VALUES
('Happy Users', 'Sports enthusiasts trust our platform', '1000+', 'Users', 1);

-- Insert sample partners
INSERT INTO partners (name, logo_url, website_url, partnership_type, display_order) VALUES
('SportsTech Pro', '/partners/sportstech-logo.png', 'https://sportstechpro.com', 'technology', 1);

-- Insert sidebar menu items
INSERT INTO sidebar_menu_items (title, icon_name, route_path, display_order, requires_auth) VALUES
('Home', 'Home', '/home', 1, FALSE);

-- Insert app configurations
INSERT INTO app_configurations (config_key, config_value, config_type, description, is_public, category) VALUES
('app_name', 'KhelManch', 'string', 'Application name', TRUE, 'branding');