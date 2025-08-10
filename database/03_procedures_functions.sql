-- Stored Procedures and Functions for KhelManch Database

DELIMITER //

-- Function to calculate booking amount based on duration and ground rates
CREATE FUNCTION CalculateBookingAmount(
    p_ground_id INT,
    p_sport_id INT,
    p_duration_hours INT
) RETURNS DECIMAL(10,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE booking_amount DECIMAL(10,2) DEFAULT 0;
    
    SELECT COALESCE(gs.price_per_hour, g.price_per_hour) * p_duration_hours
    INTO booking_amount
    FROM grounds g
    LEFT JOIN ground_sports gs ON g.id = gs.ground_id AND gs.sport_id = p_sport_id
    WHERE g.id = p_ground_id;
    
    RETURN COALESCE(booking_amount, 0);
END //

-- Procedure to create a new booking with validation
CREATE PROCEDURE CreateBooking(
    IN p_booking_id VARCHAR(36),
    IN p_user_id VARCHAR(36),
    IN p_ground_id INT,
    IN p_sport_id INT,
    IN p_booking_date DATE,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_team_name VARCHAR(255),
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(500)
)
BEGIN
    DECLARE booking_count INT DEFAULT 0;
    DECLARE duration_hours INT;
    DECLARE calculated_amount DECIMAL(10,2);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Database error occurred while creating booking';
    END;
    
    START TRANSACTION;
    
    -- Check if the time slot is already booked
    SELECT COUNT(*)
    INTO booking_count
    FROM bookings
    WHERE ground_id = p_ground_id
    AND booking_date = p_booking_date
    AND status IN ('confirmed', 'pending')
    AND (
        (p_start_time BETWEEN start_time AND end_time) OR
        (p_end_time BETWEEN start_time AND end_time) OR
        (start_time BETWEEN p_start_time AND p_end_time)
    );
    
    IF booking_count > 0 THEN
        SET p_success = FALSE;
        SET p_message = 'Time slot is already booked';
        ROLLBACK;
    ELSE
        -- Calculate duration and amount
        SET duration_hours = TIMESTAMPDIFF(HOUR, 
            CONCAT(p_booking_date, ' ', p_start_time), 
            CONCAT(p_booking_date, ' ', p_end_time)
        );
        
        SET calculated_amount = CalculateBookingAmount(p_ground_id, p_sport_id, duration_hours);
        
        -- Insert the booking
        INSERT INTO bookings (
            id, user_id, ground_id, sport_id, booking_date, 
            start_time, end_time, duration_hours, amount, 
            status, payment_status, team_name
        ) VALUES (
            p_booking_id, p_user_id, p_ground_id, p_sport_id, p_booking_date,
            p_start_time, p_end_time, duration_hours, calculated_amount,
            'pending', 'pending', p_team_name
        );
        
        SET p_success = TRUE;
        SET p_message = CONCAT('Booking created successfully. Amount: ₹', calculated_amount);
        COMMIT;
    END IF;
END //

-- Procedure to update ground ratings after a review
CREATE PROCEDURE UpdateGroundRating(
    IN p_ground_id INT
)
BEGIN
    DECLARE new_rating DECIMAL(3,2);
    DECLARE review_count INT;
    
    SELECT AVG(rating), COUNT(*)
    INTO new_rating, review_count
    FROM reviews
    WHERE ground_id = p_ground_id AND is_approved = TRUE;
    
    UPDATE grounds
    SET rating = COALESCE(new_rating, 0),
        total_reviews = review_count
    WHERE id = p_ground_id;
END //

-- Function to get user's favorite sport
CREATE FUNCTION GetUserFavoriteSport(p_user_id VARCHAR(36))
RETURNS VARCHAR(100)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE fav_sport VARCHAR(100) DEFAULT NULL;
    
    SELECT us.sport
    INTO fav_sport
    FROM user_sports us
    JOIN bookings b ON b.user_id = us.user_id
    JOIN sports s ON s.name = us.sport
    WHERE us.user_id = p_user_id
    GROUP BY us.sport
    ORDER BY COUNT(b.id) DESC, 
             CASE us.skill_level 
                WHEN 'Professional' THEN 4
                WHEN 'Advanced' THEN 3
                WHEN 'Intermediate' THEN 2
                WHEN 'Beginner' THEN 1
                ELSE 0
             END DESC
    LIMIT 1;
    
    RETURN fav_sport;
END //

-- Procedure to register a team for tournament
CREATE PROCEDURE RegisterTeamForTournament(
    IN p_tournament_id INT,
    IN p_team_name VARCHAR(255),
    IN p_captain_user_id VARCHAR(36),
    IN p_contact_phone VARCHAR(20),
    IN p_contact_email VARCHAR(255),
    IN p_players_count INT,
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(500)
)
BEGIN
    DECLARE tournament_status VARCHAR(20);
    DECLARE current_teams INT;
    DECLARE max_teams_allowed INT;
    DECLARE registration_deadline DATE;
    DECLARE team_exists INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Database error occurred during team registration';
    END;
    
    START TRANSACTION;
    
    -- Get tournament details
    SELECT status, registered_teams, max_teams, registration_deadline
    INTO tournament_status, current_teams, max_teams_allowed, registration_deadline
    FROM tournaments
    WHERE id = p_tournament_id;
    
    -- Check if team name already exists for this tournament
    SELECT COUNT(*)
    INTO team_exists
    FROM tournament_teams
    WHERE tournament_id = p_tournament_id AND team_name = p_team_name;
    
    -- Validate registration
    IF tournament_status != 'upcoming' THEN
        SET p_success = FALSE;
        SET p_message = 'Tournament registration is closed';
        ROLLBACK;
    ELSEIF CURDATE() > registration_deadline THEN
        SET p_success = FALSE;
        SET p_message = 'Registration deadline has passed';
        ROLLBACK;
    ELSEIF current_teams >= max_teams_allowed THEN
        SET p_success = FALSE;
        SET p_message = 'Tournament is full';
        ROLLBACK;
    ELSEIF team_exists > 0 THEN
        SET p_success = FALSE;
        SET p_message = 'Team name already exists for this tournament';
        ROLLBACK;
    ELSE
        -- Register the team
        INSERT INTO tournament_teams (
            tournament_id, team_name, captain_user_id, 
            contact_phone, contact_email, players_count, status
        ) VALUES (
            p_tournament_id, p_team_name, p_captain_user_id,
            p_contact_phone, p_contact_email, p_players_count, 'registered'
        );
        
        -- Update tournament registered teams count
        UPDATE tournaments
        SET registered_teams = registered_teams + 1
        WHERE id = p_tournament_id;
        
        SET p_success = TRUE;
        SET p_message = 'Team registered successfully';
        COMMIT;
    END IF;
END //

-- Function to check booking availability
CREATE FUNCTION CheckBookingAvailability(
    p_ground_id INT,
    p_booking_date DATE,
    p_start_time TIME,
    p_end_time TIME
) RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE booking_count INT DEFAULT 0;
    
    SELECT COUNT(*)
    INTO booking_count
    FROM bookings
    WHERE ground_id = p_ground_id
    AND booking_date = p_booking_date
    AND status IN ('confirmed', 'pending')
    AND (
        (p_start_time BETWEEN start_time AND end_time) OR
        (p_end_time BETWEEN start_time AND end_time) OR
        (start_time BETWEEN p_start_time AND p_end_time)
    );
    
    RETURN booking_count = 0;
END //

-- Procedure to get user booking history with pagination
CREATE PROCEDURE GetUserBookingHistory(
    IN p_user_id VARCHAR(36),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        b.*,
        g.name AS ground_name,
        g.location AS ground_location,
        s.name AS sport_name,
        t.title AS tournament_name
    FROM bookings b
    LEFT JOIN grounds g ON b.ground_id = g.id
    LEFT JOIN sports s ON b.sport_id = s.id
    LEFT JOIN tournaments t ON b.tournament_id = t.id
    WHERE b.user_id = p_user_id
    ORDER BY b.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END //

-- Procedure to get popular grounds based on bookings
CREATE PROCEDURE GetPopularGrounds(
    IN p_city VARCHAR(100),
    IN p_limit INT
)
BEGIN
    SELECT 
        g.*,
        COUNT(b.id) AS booking_count,
        AVG(r.rating) AS avg_rating,
        COUNT(r.id) AS review_count
    FROM grounds g
    LEFT JOIN bookings b ON g.id = b.ground_id 
        AND b.status = 'confirmed'
        AND b.booking_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    LEFT JOIN reviews r ON g.id = r.ground_id 
        AND r.is_approved = TRUE
    WHERE g.is_active = TRUE
    AND (p_city IS NULL OR g.city = p_city)
    GROUP BY g.id
    ORDER BY booking_count DESC, avg_rating DESC
    LIMIT p_limit;
END //

-- Function to generate QR code content for tickets
CREATE FUNCTION GenerateTicketQRContent(
    p_ticket_id VARCHAR(36),
    p_user_id VARCHAR(36),
    p_venue_info TEXT
) RETURNS TEXT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE qr_content TEXT;
    
    SET qr_content = JSON_OBJECT(
        'ticket_id', p_ticket_id,
        'user_id', p_user_id,
        'venue', p_venue_info,
        'generated_at', NOW(),
        'verification_code', MD5(CONCAT(p_ticket_id, p_user_id, NOW()))
    );
    
    RETURN qr_content;
END //

DELIMITER ;

-- Create views for common queries

-- View for active bookings with ground and sport details
CREATE VIEW active_bookings AS
SELECT 
    b.id,
    b.user_id,
    u.name AS user_name,
    u.email AS user_email,
    u.phone AS user_phone,
    b.booking_date,
    b.start_time,
    b.end_time,
    b.duration_hours,
    b.amount,
    b.status,
    b.payment_status,
    b.team_name,
    g.name AS ground_name,
    g.location AS ground_location,
    g.address AS ground_address,
    s.name AS sport_name,
    t.title AS tournament_name
FROM bookings b
JOIN users u ON b.user_id = u.id
LEFT JOIN grounds g ON b.ground_id = g.id
LEFT JOIN sports s ON b.sport_id = s.id
LEFT JOIN tournaments t ON b.tournament_id = t.id
WHERE b.status IN ('confirmed', 'pending');

-- View for tournament standings
CREATE VIEW tournament_standings AS
SELECT 
    tt.tournament_id,
    tt.id AS team_id,
    tt.team_name,
    t.title AS tournament_title,
    COUNT(m.id) AS matches_played,
    SUM(CASE WHEN m.winner_team_id = tt.id THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN m.status = 'completed' AND m.winner_team_id != tt.id AND (m.team1_id = tt.id OR m.team2_id = tt.id) THEN 1 ELSE 0 END) AS losses,
    SUM(CASE 
        WHEN m.team1_id = tt.id THEN m.team1_score 
        WHEN m.team2_id = tt.id THEN m.team2_score 
        ELSE 0 
    END) AS total_score
FROM tournament_teams tt
JOIN tournaments t ON tt.tournament_id = t.id
LEFT JOIN matches m ON (m.team1_id = tt.id OR m.team2_id = tt.id) AND m.status = 'completed'
GROUP BY tt.id, tt.tournament_id, tt.team_name, t.title;

-- View for ground utilization report
CREATE VIEW ground_utilization AS
SELECT 
    g.id,
    g.name,
    g.city,
    COUNT(b.id) AS total_bookings,
    SUM(CASE WHEN b.status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_bookings,
    SUM(CASE WHEN b.status = 'confirmed' THEN b.duration_hours ELSE 0 END) AS total_hours_booked,
    SUM(CASE WHEN b.status = 'confirmed' THEN b.amount ELSE 0 END) AS total_revenue,
    AVG(r.rating) AS average_rating,
    COUNT(r.id) AS total_reviews
FROM grounds g
LEFT JOIN bookings b ON g.id = b.ground_id
LEFT JOIN reviews r ON g.id = r.ground_id AND r.is_approved = TRUE
WHERE g.is_active = TRUE
GROUP BY g.id, g.name, g.city;

-- Indexes for better performance on common queries
CREATE INDEX idx_bookings_date_status ON bookings(booking_date, status);
CREATE INDEX idx_matches_tournament_status ON matches(tournament_id, status);
CREATE INDEX idx_tournament_teams_tournament ON tournament_teams(tournament_id);
CREATE INDEX idx_reviews_ground_approved_rating ON reviews(ground_id, is_approved, rating);
CREATE INDEX idx_tickets_user_tournament ON tickets(user_id, tournament_id);
CREATE INDEX idx_user_sports_user_sport ON user_sports(user_id, sport);