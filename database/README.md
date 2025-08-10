# KhelManch Database Setup

This directory contains the MySQL database schema and sample data for the KhelManch sports booking application.

## Files Overview

1. **01_create_tables.sql** - Main database schema with all table definitions
2. **02_sample_data.sql** - Sample data insertion for testing and development
3. **03_procedures_functions.sql** - Stored procedures, functions, and views
4. **README.md** - This documentation file

## Database Setup Instructions

### Prerequisites
- MySQL 8.0 or higher
- Database user with CREATE, INSERT, UPDATE, DELETE privileges

### Step 1: Create Database
```sql
CREATE DATABASE khelmanch;
USE khelmanch;
```

### Step 2: Run the SQL Files in Order
```bash
# Create tables
mysql -u your_username -p khelmanch < 01_create_tables.sql

# Insert sample data
mysql -u your_username -p khelmanch < 02_sample_data.sql

# Create procedures and functions
mysql -u your_username -p khelmanch < 03_procedures_functions.sql
```

## Database Schema Overview

### Core Tables

#### Users & Authentication
- **users** - User accounts with authentication details
- **user_sports** - User sport preferences and skill levels

#### Sports & Venues
- **sports** - Master list of available sports
- **grounds** - Sports venues/facilities
- **ground_sports** - Mapping of sports available at each ground

#### Booking System
- **bookings** - Ground/facility bookings
- **tickets** - Booking confirmation tickets

#### Tournament System
- **tournaments** - Tournament events
- **tournament_tickets** - Tournament entry tickets
- **tournament_teams** - Registered teams
- **matches** - Tournament matches and results

#### Reviews & Social
- **reviews** - User reviews for grounds and tournaments
- **chat_messages** - User messaging system
- **chats** - Chat room management
- **connection_requests** - User connection system

#### Content Management
- **featured_athletes** - Showcase athletes
- **app_settings** - Application configuration

### Key Features

#### Booking Management
- Time slot validation to prevent double bookings
- Automatic amount calculation based on duration and rates
- Support for both ground bookings and tournament registrations

#### Tournament System
- Multi-round tournament bracket management
- Team registration with validation
- Match scheduling and result tracking
- Ticket sales for tournaments

#### User Management
- Secure password storage (use proper hashing in production)
- Sport preferences and skill level tracking
- Review and rating system
- Social features (chat, connections)

#### Pricing & Payments
- Flexible pricing per ground and sport
- Duration-based booking costs
- Tournament entry fees and ticket sales
- Payment status tracking

### Sample Data Included

The sample data includes:
- 5 sample users with different sport preferences
- 10 sports (Cricket, Football, Basketball, etc.)
- 5 grounds across different cities
- 5 tournaments in various stages
- Sample bookings, tickets, and reviews
- Featured athletes showcase
- Chat messages and user connections

### Stored Procedures & Functions

#### Key Procedures
- `CreateBooking()` - Validates and creates new bookings
- `RegisterTeamForTournament()` - Handles tournament team registration
- `UpdateGroundRating()` - Recalculates ground ratings after reviews
- `GetUserBookingHistory()` - Paginated booking history
- `GetPopularGrounds()` - Returns popular venues by booking volume

#### Utility Functions
- `CalculateBookingAmount()` - Computes booking costs
- `CheckBookingAvailability()` - Validates time slot availability
- `GetUserFavoriteSport()` - Determines user's most played sport
- `GenerateTicketQRContent()` - Creates QR code data for tickets

#### Views
- `active_bookings` - Complete booking details with user/ground info
- `tournament_standings` - Team rankings and statistics
- `ground_utilization` - Venue usage and revenue analytics

### Important Notes

1. **Security**: The sample password hashes are placeholders. Use proper bcrypt hashing in production.

2. **Indexes**: Performance indexes are included for common query patterns.

3. **Constraints**: Foreign key constraints ensure data integrity.

4. **JSON Columns**: Some columns use JSON for flexible data storage (images, amenities, etc.).

5. **Time Zones**: Consider time zone handling for booking times in production.

6. **File Storage**: Image URLs in sample data are placeholders. Implement proper file storage.

### Production Considerations

1. **Backup Strategy**: Implement regular database backups
2. **Performance Monitoring**: Monitor slow queries and optimize indexes
3. **Security**: Use environment variables for sensitive configuration
4. **Scaling**: Consider read replicas for high-traffic scenarios
5. **Logging**: Implement audit logging for critical operations

### API Integration

The database schema is designed to support the React frontend with:
- RESTful API endpoints for CRUD operations
- Real-time features (chat, booking updates)
- User authentication and authorization
- File upload handling for images
- Payment gateway integration

### Testing

Sample data allows for immediate testing of:
- User registration and login flows
- Booking creation and management
- Tournament registration
- Review and rating systems
- Chat and social features

For development, you can reset the database by dropping and recreating it, then running all SQL files again.