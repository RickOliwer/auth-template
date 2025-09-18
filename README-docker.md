# Docker Setup for PostgreSQL

This project includes a Docker Compose configuration to run PostgreSQL locally with Docker Desktop.

## Quick Start

1. **Copy the environment file:**

   ```bash
   cp env.example .env
   ```

2. **Start the database:**

   ```bash
   docker-compose up -d
   ```

3. **Stop the database:**
   ```bash
   docker-compose down
   ```

## Services

### PostgreSQL Database

- **Image:** postgres:16-alpine (latest stable version)
- **Port:** 5432 (configurable via POSTGRES_PORT)
- **Database:** auth_template (configurable via POSTGRES_DB)
- **Username:** postgres (configurable via POSTGRES_USER)
- **Password:** postgres (configurable via POSTGRES_PASSWORD)

### pgAdmin (Optional)

- **Port:** 8080 (configurable via PGADMIN_PORT)
- **Email:** admin@example.com (configurable via PGADMIN_EMAIL)
- **Password:** admin (configurable via PGADMIN_PASSWORD)

## Environment Variables

Create a `.env` file based on `env.example` to customize your setup:

```bash
# Database Configuration
POSTGRES_DB=auth_template
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_PORT=5432

# pgAdmin Configuration
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=your_admin_password
PGADMIN_PORT=8080

# Application Database URL
DATABASE_URL=postgresql://postgres:your_secure_password@localhost:5432/auth_template
```

## Database Initialization

The `init-scripts/01-init.sql` file contains initial database setup including:

- UUID extension for generating unique IDs
- pgcrypto extension for password hashing
- Basic users table structure
- Automatic timestamp updates

## Health Checks

The PostgreSQL service includes health checks to ensure the database is ready before dependent services start.

## Data Persistence

Database data is persisted in Docker volumes:

- `postgres_data`: PostgreSQL data files
- `pgadmin_data`: pgAdmin configuration and data

## Connecting to the Database

### From your application:

```javascript
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/auth_template";
```

### From command line:

```bash
docker exec -it auth-template-postgres psql -U postgres -d auth_template
```

### From pgAdmin:

1. Open http://localhost:8080
2. Login with your pgAdmin credentials
3. Add a new server with:
   - Host: postgres
   - Port: 5432
   - Database: auth_template
   - Username: postgres
   - Password: (your POSTGRES_PASSWORD)

## Troubleshooting

- **Port conflicts:** Change the POSTGRES_PORT in your `.env` file if port 5432 is already in use
- **Permission issues:** Ensure Docker Desktop has proper permissions on your system
- **Data persistence:** Data is stored in Docker volumes, so it persists between container restarts
- **Reset database:** Run `docker-compose down -v` to remove volumes and start fresh
