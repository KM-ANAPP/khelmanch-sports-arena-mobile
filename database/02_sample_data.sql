-- Sample Data Insertion for KhelManch App
-- Run this after creating tables

-- Insert sports
INSERT INTO sports (name, icon, description) VALUES
('Cricket', '🏏', 'The most popular sport in India'),
('Football', '⚽', 'The beautiful game loved worldwide'),
('Basketball', '🏀', 'Fast-paced indoor sport'),
('Badminton', '🏸', 'Racquet sport for all ages'),
('Tennis', '🎾', 'Classic racquet sport'),
('Table Tennis', '🏓', 'Indoor racquet sport'),
('Volleyball', '🏐', 'Team sport with net'),
('Hockey', '🏑', 'Field hockey sport'),
('Swimming', '🏊', 'Water sport and fitness activity'),
('Running', '🏃', 'Track and field sport');

-- Insert sample users
INSERT INTO users (id, email, phone, name, password_hash, is_verified) VALUES
('user_001', 'john.doe@email.com', '+919876543210', 'John Doe', '$2b$10$encrypted_password_hash', TRUE),
('user_002', 'jane.smith@email.com', '+919876543211', 'Jane Smith', '$2b$10$encrypted_password_hash', TRUE),
('user_003', 'mike.wilson@email.com', '+919876543212', 'Mike Wilson', '$2b$10$encrypted_password_hash', TRUE),
('user_004', 'sarah.davis@email.com', '+919876543213', 'Sarah Davis', '$2b$10$encrypted_password_hash', TRUE),
('user_005', 'alex.kumar@email.com', '+919876543214', 'Alex Kumar', '$2b$10$encrypted_password_hash', TRUE);

-- Insert user sports preferences
INSERT INTO user_sports (user_id, sport, skill_level) VALUES
('user_001', 'Cricket', 'Advanced'),
('user_001', 'Football', 'Intermediate'),
('user_002', 'Badminton', 'Professional'),
('user_002', 'Tennis', 'Advanced'),
('user_003', 'Basketball', 'Intermediate'),
('user_003', 'Football', 'Advanced'),
('user_004', 'Swimming', 'Advanced'),
('user_004', 'Running', 'Professional'),
('user_005', 'Cricket', 'Intermediate'),
('user_005', 'Hockey', 'Beginner');

-- Insert grounds/venues
INSERT INTO grounds (name, description, location, address, city, state, pincode, latitude, longitude, images, amenities, contact_phone, contact_email, price_per_hour, rating) VALUES
('Champions Sports Complex', 'Premium sports facility with multiple courts and grounds', 'Sector 18, Noida', 'Plot No. 15, Sector 18, Noida, Uttar Pradesh', 'Noida', 'Uttar Pradesh', '201301', 28.5704, 77.3269, '["ground1.jpg", "ground2.jpg"]', '["Parking", "Washrooms", "Cafeteria", "Changing Rooms", "First Aid"]', '+919876543220', 'info@championscomplex.com', 1500.00, 4.5),

('Green Field Sports Hub', 'Outdoor sports facility with natural grass fields', 'Whitefield, Bangalore', '123 ITPL Main Road, Whitefield, Bangalore, Karnataka', 'Bangalore', 'Karnataka', '560066', 12.9698, 77.7500, '["field1.jpg", "field2.jpg"]', '["Parking", "Washrooms", "Equipment Rental", "Flood Lights"]', '+919876543221', 'contact@greenfieldhub.com', 1200.00, 4.3),

('Metro Indoor Arena', 'Climate-controlled indoor sports facility', 'Connaught Place, Delhi', 'Building No. 5, Connaught Place, New Delhi', 'New Delhi', 'Delhi', '110001', 28.6315, 77.2167, '["arena1.jpg", "arena2.jpg"]', '["AC", "Parking", "Washrooms", "Cafeteria", "Equipment Storage"]', '+919876543222', 'bookings@metroarena.com', 2000.00, 4.7),

('Riverside Sports Club', 'Scenic sports facility by the river', 'Gomti Nagar, Lucknow', 'Riverside Road, Gomti Nagar, Lucknow, Uttar Pradesh', 'Lucknow', 'Uttar Pradesh', '226010', 26.8467, 80.9462, '["club1.jpg", "club2.jpg"]', '["Parking", "Washrooms", "Restaurant", "Swimming Pool", "Gym"]', '+919876543223', 'info@riversideclub.com', 1800.00, 4.4),

('City Sports Center', 'Multi-purpose sports facility in city center', 'Camp Area, Pune', '456 FC Road, Camp Area, Pune, Maharashtra', 'Pune', 'Maharashtra', '411001', 18.5204, 73.8567, '["center1.jpg", "center2.jpg"]', '["Parking", "Washrooms", "Medical Room", "Equipment Rental"]', '+919876543224', 'bookings@citysports.com', 1000.00, 4.2);

-- Insert ground sports mapping
INSERT INTO ground_sports (ground_id, sport_id, price_per_hour) VALUES
(1, 1, 1500.00), -- Champions - Cricket
(1, 2, 1200.00), -- Champions - Football
(1, 3, 1000.00), -- Champions - Basketball
(1, 4, 800.00),  -- Champions - Badminton
(2, 1, 1200.00), -- Green Field - Cricket
(2, 2, 1000.00), -- Green Field - Football
(2, 7, 900.00),  -- Green Field - Volleyball
(3, 3, 1500.00), -- Metro Arena - Basketball
(3, 4, 1200.00), -- Metro Arena - Badminton
(3, 6, 800.00),  -- Metro Arena - Table Tennis
(4, 1, 1800.00), -- Riverside - Cricket
(4, 2, 1500.00), -- Riverside - Football
(4, 9, 1000.00), -- Riverside - Swimming
(5, 3, 800.00),  -- City Center - Basketball
(5, 4, 600.00),  -- City Center - Badminton
(5, 5, 1000.00); -- City Center - Tennis

-- Insert tournaments
INSERT INTO tournaments (title, description, sport_id, ground_id, start_date, end_date, start_time, end_time, location, entry_fee, prize_pool, max_teams, registered_teams, status, registration_deadline, is_trending) VALUES
('Summer Cricket Championship 2024', 'Annual cricket tournament with teams from across the city', 1, 1, '2024-06-15', '2024-06-17', '09:00:00', '18:00:00', 'Champions Sports Complex, Noida', 5000.00, 100000.00, 16, 12, 'upcoming', '2024-06-10', TRUE),

('Inter-Corporate Football League', 'Football tournament for corporate teams', 2, 2, '2024-05-20', '2024-05-22', '10:00:00', '17:00:00', 'Green Field Sports Hub, Bangalore', 3000.00, 75000.00, 12, 8, 'upcoming', '2024-05-15', TRUE),

('Basketball Slam Dunk Contest', 'Fast-paced basketball tournament', 3, 3, '2024-04-25', '2024-04-26', '11:00:00', '19:00:00', 'Metro Indoor Arena, Delhi', 2000.00, 50000.00, 8, 6, 'ongoing', '2024-04-20', FALSE),

('Badminton Singles Championship', 'Individual badminton tournament', 4, 4, '2024-03-10', '2024-03-12', '08:00:00', '20:00:00', 'Riverside Sports Club, Lucknow', 1500.00, 30000.00, 32, 28, 'completed', '2024-03-05', FALSE),

('Tennis Open Tournament', 'Open tennis tournament for all skill levels', 5, 5, '2024-07-01', '2024-07-03', '07:00:00', '19:00:00', 'City Sports Center, Pune', 2500.00, 60000.00, 16, 4, 'upcoming', '2024-06-25', TRUE);

-- Insert tournament tickets
INSERT INTO tournament_tickets (tournament_id, type, price, description, max_quantity) VALUES
(1, 'General Admission', 200.00, 'Access to general seating areas', 4),
(1, 'Premium Seating', 500.00, 'Premium seating with better view', 2),
(1, 'VIP Package', 1000.00, 'VIP seating with complimentary refreshments', 2),
(2, 'Day Pass', 150.00, 'Single day access', 4),
(2, 'Weekend Pass', 250.00, 'Full weekend access', 3),
(3, 'General Entry', 100.00, 'Standard entry ticket', 5),
(3, 'Premium Entry', 300.00, 'Premium seating and refreshments', 2),
(4, 'Single Match', 75.00, 'Access to single match', 6),
(4, 'Tournament Pass', 200.00, 'Access to all matches', 3),
(5, 'Standard Ticket', 180.00, 'Standard tournament access', 4),
(5, 'Premium Experience', 400.00, 'Premium experience package', 2);

-- Insert tournament teams
INSERT INTO tournament_teams (tournament_id, team_name, captain_user_id, contact_phone, contact_email, players_count, status) VALUES
(1, 'Delhi Dynamos', 'user_001', '+919876543230', 'dynamos@email.com', 11, 'confirmed'),
(1, 'Mumbai Warriors', 'user_002', '+919876543231', 'warriors@email.com', 11, 'confirmed'),
(1, 'Bangalore Blasters', 'user_003', '+919876543232', 'blasters@email.com', 11, 'registered'),
(2, 'Tech Titans', 'user_004', '+919876543233', 'titans@email.com', 7, 'confirmed'),
(2, 'Code Crushers', 'user_005', '+919876543234', 'crushers@email.com', 7, 'confirmed'),
(3, 'Hoops Heroes', 'user_001', '+919876543235', 'heroes@email.com', 5, 'confirmed'),
(4, 'Shuttle Stars', 'user_002', '+919876543236', 'stars@email.com', 1, 'confirmed'),
(5, 'Ace Players', 'user_003', '+919876543237', 'ace@email.com', 1, 'registered');

-- Insert sample matches
INSERT INTO matches (tournament_id, round_number, match_number, team1_id, team2_id, team1_score, team2_score, winner_team_id, match_date, match_time, venue, status, referee) VALUES
(1, 1, 1, 1, 2, 185, 178, 1, '2024-06-15', '10:00:00', 'Ground A', 'completed', 'Rajesh Kumar'),
(1, 1, 2, 3, NULL, 0, 0, NULL, '2024-06-15', '14:00:00', 'Ground B', 'scheduled', 'Suresh Patel'),
(2, 1, 1, 4, 5, 2, 1, 4, '2024-05-20', '11:00:00', 'Field 1', 'completed', 'Amit Singh'),
(3, 1, 1, 6, NULL, 85, 0, 6, '2024-04-25', '12:00:00', 'Court A', 'completed', 'Deepak Sharma'),
(4, 1, 1, 7, NULL, 21, 18, 7, '2024-03-10', '09:00:00', 'Court 1', 'completed', 'Priya Mehta');

-- Insert sample bookings
INSERT INTO bookings (id, user_id, ground_id, sport_id, booking_date, start_time, end_time, duration_hours, amount, status, payment_status, team_name) VALUES
('booking_001', 'user_001', 1, 1, '2024-04-20', '10:00:00', '12:00:00', 2, 3000.00, 'confirmed', 'paid', 'Weekend Warriors'),
('booking_002', 'user_002', 2, 2, '2024-04-21', '14:00:00', '16:00:00', 2, 2400.00, 'confirmed', 'paid', 'Sunday Strikers'),
('booking_003', 'user_003', 3, 3, '2024-04-22', '18:00:00', '20:00:00', 2, 3000.00, 'pending', 'pending', 'Hoop Dreams'),
('booking_004', 'user_004', 4, 4, '2024-04-23', '08:00:00', '10:00:00', 2, 2400.00, 'confirmed', 'paid', NULL),
('booking_005', 'user_005', 5, 5, '2024-04-24', '16:00:00', '18:00:00', 2, 2000.00, 'cancelled', 'refunded', 'Tennis Club');

-- Insert sample tickets
INSERT INTO tickets (id, user_id, booking_id, tournament_id, ticket_type, quantity, amount, payment_id, order_id, status, qr_code, valid_from, valid_until) VALUES
('ticket_001', 'user_001', 'booking_001', NULL, 'Ground Booking', 1, 3000.00, 'pay_001', 'order_001', 'active', 'QR_001_ENCODED', '2024-04-20 10:00:00', '2024-04-20 12:00:00'),
('ticket_002', 'user_002', NULL, 1, 'General Admission', 2, 400.00, 'pay_002', 'order_002', 'active', 'QR_002_ENCODED', '2024-06-15 09:00:00', '2024-06-17 18:00:00'),
('ticket_003', 'user_003', NULL, 2, 'Weekend Pass', 1, 250.00, 'pay_003', 'order_003', 'active', 'QR_003_ENCODED', '2024-05-20 10:00:00', '2024-05-22 17:00:00'),
('ticket_004', 'user_004', 'booking_004', NULL, 'Ground Booking', 1, 2400.00, 'pay_004', 'order_004', 'active', 'QR_004_ENCODED', '2024-04-23 08:00:00', '2024-04-23 10:00:00'),
('ticket_005', 'user_005', NULL, 3, 'Premium Entry', 1, 300.00, 'pay_005', 'order_005', 'used', 'QR_005_ENCODED', '2024-04-25 11:00:00', '2024-04-26 19:00:00');

-- Insert sample reviews
INSERT INTO reviews (user_id, ground_id, booking_id, rating, review_text, is_featured, is_approved) VALUES
('user_001', 1, 'booking_001', 5, 'Excellent facility with great maintenance. The cricket ground was in perfect condition and the staff was very helpful.', TRUE, TRUE),
('user_002', 2, 'booking_002', 4, 'Good football field with proper markings. Could use better lighting but overall a great experience.', FALSE, TRUE),
('user_004', 4, 'booking_004', 5, 'Amazing badminton courts with excellent flooring. Will definitely book again!', TRUE, TRUE),
('user_003', 3, NULL, 4, 'Nice indoor arena with good air conditioning. Basketball courts are well maintained.', FALSE, TRUE),
('user_005', 5, NULL, 3, 'Average facility. Tennis courts need some maintenance but playable.', FALSE, TRUE);

-- Insert featured athletes
INSERT INTO featured_athletes (name, sport, image, achievements, description, display_order) VALUES
('Virat Kohli', 'Cricket', 'virat_kohli.jpg', 'Former Indian Cricket Captain, ICC Player of the Year', 'One of the greatest batsmen in cricket history', 1),
('Sunil Chhetri', 'Football', 'sunil_chhetri.jpg', 'Indian Football Captain, Arjuna Award Winner', 'Top goal scorer for Indian national football team', 2),
('PV Sindhu', 'Badminton', 'pv_sindhu.jpg', 'Olympic Silver Medalist, World Champion', 'World-class badminton player from India', 3),
('Sania Mirza', 'Tennis', 'sania_mirza.jpg', 'Former World No. 1 in Doubles, Padma Shri', 'India\'s most successful female tennis player', 4);

-- Insert app settings
INSERT INTO app_settings (setting_key, setting_value, description) VALUES
('app_name', 'KhelManch', 'Application name'),
('support_email', 'support@khelmanch.com', 'Support contact email'),
('support_phone', '+911234567890', 'Support contact phone'),
('booking_advance_days', '30', 'Maximum days in advance for booking'),
('cancellation_window_hours', '24', 'Hours before booking for free cancellation'),
('default_currency', 'INR', 'Default currency for payments'),
('max_booking_duration', '8', 'Maximum booking duration in hours'),
('featured_athletes_count', '4', 'Number of featured athletes to show'),
('tournament_registration_fee', '100', 'Base registration fee for tournaments'),
('ground_rating_threshold', '4.0', 'Minimum rating to be featured');

-- Insert sample chat data
INSERT INTO chats (id, participants, last_message_at) VALUES
('chat_001', '["user_001", "user_002"]', '2024-04-15 14:30:00'),
('chat_002', '["user_003", "user_004"]', '2024-04-15 16:45:00'),
('chat_003', '["user_001", "user_005"]', '2024-04-15 18:20:00');

INSERT INTO chat_messages (id, chat_id, sender_id, message_text, created_at) VALUES
('msg_001', 'chat_001', 'user_001', 'Hey! Ready for the cricket match tomorrow?', '2024-04-15 14:30:00'),
('msg_002', 'chat_001', 'user_002', 'Absolutely! Looking forward to it.', '2024-04-15 14:32:00'),
('msg_003', 'chat_002', 'user_003', 'Good game today! Great teamwork.', '2024-04-15 16:45:00'),
('msg_004', 'chat_002', 'user_004', 'Thanks! We should play together more often.', '2024-04-15 16:47:00'),
('msg_005', 'chat_003', 'user_001', 'Are you interested in joining our tennis tournament?', '2024-04-15 18:20:00');

-- Insert connection requests
INSERT INTO connection_requests (id, sender_id, receiver_id, status, message) VALUES
('conn_001', 'user_001', 'user_003', 'accepted', 'Would like to connect for future games'),
('conn_002', 'user_002', 'user_004', 'pending', 'Great player! Let\'s stay connected'),
('conn_003', 'user_005', 'user_001', 'accepted', 'Looking forward to playing together');