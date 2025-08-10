-- KhelManch Database Schema
-- MySQL Database Setup

-- Users table for authentication and profiles
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User sports preferences
CREATE TABLE user_sports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    sport VARCHAR(100) NOT NULL,
    skill_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Professional') DEFAULT 'Beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_sport (user_id, sport)
);

-- Sports master table
CREATE TABLE sports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grounds/Venues table
CREATE TABLE grounds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(500) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    images JSON,
    amenities JSON,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    price_per_hour DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Ground sports mapping
CREATE TABLE ground_sports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ground_id INT NOT NULL,
    sport_id INT NOT NULL,
    price_per_hour DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (ground_id) REFERENCES grounds(id) ON DELETE CASCADE,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE,
    UNIQUE KEY unique_ground_sport (ground_id, sport_id)
);

-- Tournaments table
CREATE TABLE tournaments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sport_id INT NOT NULL,
    ground_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(500) NOT NULL,
    image TEXT,
    entry_fee DECIMAL(10, 2) DEFAULT 0.00,
    prize_pool DECIMAL(10, 2) DEFAULT 0.00,
    max_teams INT DEFAULT 16,
    registered_teams INT DEFAULT 0,
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    registration_deadline DATE,
    rules TEXT,
    contact_info JSON,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sport_id) REFERENCES sports(id),
    FOREIGN KEY (ground_id) REFERENCES grounds(id)
);

-- Tournament ticket types
CREATE TABLE tournament_tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    max_quantity INT DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE
);

-- Tournament teams/registrations
CREATE TABLE tournament_teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    captain_user_id VARCHAR(36) NOT NULL,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    players_count INT DEFAULT 1,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('registered', 'confirmed', 'disqualified') DEFAULT 'registered',
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
    FOREIGN KEY (captain_user_id) REFERENCES users(id),
    UNIQUE KEY unique_team_tournament (tournament_id, team_name)
);

-- Matches table
CREATE TABLE matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT NOT NULL,
    round_number INT NOT NULL,
    match_number INT NOT NULL,
    team1_id INT,
    team2_id INT,
    team1_score INT DEFAULT 0,
    team2_score INT DEFAULT 0,
    winner_team_id INT,
    match_date DATE,
    match_time TIME,
    venue VARCHAR(255),
    status ENUM('scheduled', 'ongoing', 'completed', 'postponed', 'cancelled') DEFAULT 'scheduled',
    referee VARCHAR(255),
    linesmen JSON,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
    FOREIGN KEY (team1_id) REFERENCES tournament_teams(id),
    FOREIGN KEY (team2_id) REFERENCES tournament_teams(id),
    FOREIGN KEY (winner_team_id) REFERENCES tournament_teams(id)
);

-- Bookings table
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    ground_id INT,
    tournament_id INT,
    sport_id INT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    duration_hours INT,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    team_name VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ground_id) REFERENCES grounds(id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    FOREIGN KEY (sport_id) REFERENCES sports(id)
);

-- Tickets table
CREATE TABLE tickets (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    booking_id VARCHAR(36),
    tournament_id INT,
    ticket_type VARCHAR(100),
    quantity INT DEFAULT 1,
    amount DECIMAL(10, 2) NOT NULL,
    payment_id VARCHAR(255),
    order_id VARCHAR(255),
    status ENUM('active', 'used', 'cancelled', 'expired') DEFAULT 'active',
    qr_code TEXT,
    valid_from DATETIME,
    valid_until DATETIME,
    venue_details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id)
);

-- Reviews/Testimonials table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    ground_id INT,
    tournament_id INT,
    booking_id VARCHAR(36),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    images JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ground_id) REFERENCES grounds(id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Chat messages table
CREATE TABLE chat_messages (
    id VARCHAR(36) PRIMARY KEY,
    chat_id VARCHAR(36) NOT NULL,
    sender_id VARCHAR(36) NOT NULL,
    message_text TEXT NOT NULL,
    message_type ENUM('text', 'image', 'file') DEFAULT 'text',
    file_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    INDEX idx_chat_created (chat_id, created_at)
);

-- Chat rooms table
CREATE TABLE chats (
    id VARCHAR(36) PRIMARY KEY,
    participants JSON NOT NULL,
    last_message_id VARCHAR(36),
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (last_message_id) REFERENCES chat_messages(id)
);

-- Connection requests table
CREATE TABLE connection_requests (
    id VARCHAR(36) PRIMARY KEY,
    sender_id VARCHAR(36) NOT NULL,
    receiver_id VARCHAR(36) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    UNIQUE KEY unique_connection (sender_id, receiver_id)
);

-- App settings and configurations
CREATE TABLE app_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Featured athletes table
CREATE TABLE featured_athletes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sport VARCHAR(100) NOT NULL,
    image TEXT,
    achievements TEXT,
    description TEXT,
    social_links JSON,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_bookings_user_date ON bookings(user_id, booking_date);
CREATE INDEX idx_bookings_ground_date ON bookings(ground_id, booking_date);
CREATE INDEX idx_tournaments_sport_status ON tournaments(sport_id, status);
CREATE INDEX idx_tournaments_date ON tournaments(start_date, end_date);
CREATE INDEX idx_matches_tournament_round ON matches(tournament_id, round_number);
CREATE INDEX idx_tickets_user_status ON tickets(user_id, status);
CREATE INDEX idx_reviews_ground_approved ON reviews(ground_id, is_approved);
CREATE INDEX idx_grounds_city_active ON grounds(city, is_active);