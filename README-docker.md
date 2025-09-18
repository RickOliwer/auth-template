# Docker Setup for PostgreSQL

Simple Docker Compose setup to run PostgreSQL locally for development.

## Quick Start

1. **Copy the environment file:**

   ```bash
   cp env.example .env
   ```

2. **Start the database:**

   ```bash
   docker-compose up -d
   ```

3. **Open Drizzle Studio:**

   ```bash
   npx drizzle-kit studio
   ```

4. **Stop the database:**
   ```bash
   docker-compose down
   ```

## Database Details

- **Port:** 5432
- **Database:** auth_template
- **Username:** postgres
- **Password:** postgres

## Environment Variables

The `.env` file should contain:

```bash
# Database Configuration
POSTGRES_DB=auth_template
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432

# Application Database URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_template
```

## Database Management

Use **Drizzle Studio** for database management:

- Run `npx drizzle-kit studio` to open the web interface
- View and edit your database schema
- Browse and modify data
- Run queries

## Connecting to the Database

### From your application:

```javascript
const connectionString = process.env.DATABASE_URL;
```

### From command line:

```bash
docker exec -it auth-template-postgres psql -U postgres -d auth_template
```

## Troubleshooting

- **Port conflicts:** Change `POSTGRES_PORT` in your `.env` file
- **Reset database:** Run `docker-compose down -v` to start fresh
