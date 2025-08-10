-- KhelManch Coins System Tables
-- Run this after the main database setup

-- User coins wallet
CREATE TABLE user_coins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    balance INT DEFAULT 0,
    total_earned INT DEFAULT 0,
    total_spent INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_wallet (user_id)
);

-- Coin transaction types and packages
CREATE TABLE coin_packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    coins_amount INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    bonus_coins INT DEFAULT 0,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coin transactions log
CREATE TABLE coin_transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    transaction_type ENUM('earn', 'spend', 'purchase', 'bonus', 'refund') NOT NULL,
    amount INT NOT NULL,
    balance_after INT NOT NULL,
    source_type ENUM('booking', 'tournament', 'review', 'referral', 'purchase', 'admin', 'daily_bonus', 'achievement') NOT NULL,
    source_id VARCHAR(255), -- booking_id, tournament_id, etc.
    description TEXT,
    reference_id VARCHAR(255), -- payment_id, order_id, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_transactions (user_id, created_at),
    INDEX idx_transaction_type (transaction_type, created_at)
);

-- Coin earning rules
CREATE TABLE coin_earning_rules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    action_type VARCHAR(100) NOT NULL, -- 'booking', 'review', 'referral', 'tournament_win', etc.
    coins_awarded INT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    max_per_day INT DEFAULT NULL, -- daily limit if any
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_action_type (action_type)
);

-- Additional indexes for coins system
CREATE INDEX idx_user_coins_balance ON user_coins(user_id, balance);
CREATE INDEX idx_coin_transactions_user_date ON coin_transactions(user_id, created_at);
CREATE INDEX idx_coin_packages_active ON coin_packages(is_active, display_order);

-- Sample Data for Coins System

-- Insert coin packages
INSERT INTO coin_packages (name, coins_amount, price, bonus_coins, description, display_order) VALUES
('Starter Pack', 100, 99.00, 10, 'Perfect for beginners - 100 coins + 10 bonus', 1);

-- Insert coin earning rules
INSERT INTO coin_earning_rules (action_type, coins_awarded, description, max_per_day) VALUES
('booking_complete', 50, 'Earn coins for completing a booking', 3);

-- Insert sample user coins wallet (replace 'user_001' with actual user ID)
INSERT INTO user_coins (user_id, balance, total_earned, total_spent) VALUES
('user_001', 150, 200, 50);

-- Insert sample coin transaction (replace 'user_001' with actual user ID)
INSERT INTO coin_transactions (id, user_id, transaction_type, amount, balance_after, source_type, source_id, description) VALUES
('tx_sample_001', 'user_001', 'earn', 50, 150, 'booking', 'booking_001', 'Earned coins for completing ground booking');