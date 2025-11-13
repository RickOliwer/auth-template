# Auth Template

A modern, production-ready authentication template built with Next.js 15, featuring email/password authentication with email verification via OTP codes.

## Features

- 🔐 **Email & Password Authentication** - Secure signup and signin
- ✉️ **Email Verification** - OTP-based email verification using SendGrid
- 🎨 **Modern UI** - Built with Radix UI and Tailwind CSS
- 📝 **Form Management** - Powered by TanStack Form with Zod validation
- 🗄️ **Database** - PostgreSQL with Drizzle ORM
- 🐳 **Docker Support** - Easy local development with Docker Compose
- 🔒 **Session Management** - Secure session handling with Better Auth
- 📱 **Responsive Design** - Mobile-friendly interface

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Forms:** TanStack Form + Zod
- **Email Service:** SendGrid
- **Language:** TypeScript

## Prerequisites

- Node.js 18+ (or Bun)
- pnpm (or npm/yarn)
- Docker & Docker Compose (for local database)
- SendGrid account (for email functionality)

## Getting Started

### 1. Clone and Install

```bash
# Install dependencies
pnpm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp env.example .env
```

Update `.env` with your configuration:

```env
# PostgreSQL Database Configuration
POSTGRES_DB="auth_template"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_PORT="5432"

# pgAdmin Configuration
PGADMIN_EMAIL="admin@example.com"
PGADMIN_PASSWORD="admin"
PGADMIN_PORT="8080"

# Database Connection URL (for your application)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth_template"

# BetterAuth
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"

# Sendgrid
SENDGRID_API_KEY=""
SENDGRID_FROM_EMAIL=""
```

### 3. Database Setup

Start PostgreSQL using Docker:

```bash
docker-compose up -d
```

Run database migrations:

```bash
# Generate migrations (if needed)
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit push
```

**Optional:** Open Drizzle Studio to view your database:

```bash
npx drizzle-kit studio
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (users)/
│   │   └── dashboard/        # Protected dashboard route
│   ├── api/
│   │   └── auth/             # Better Auth API routes
│   ├── auth/
│   │   └── verify-email/     # Email verification page
│   └── signup/               # Signup page
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── otp/              # OTP verification forms
│   │   ├── signin/           # Signin form
│   │   └── signup/           # Signup form
│   ├── form/                 # Reusable form components
│   └── ui/                   # UI components (Radix UI)
├── db/
│   └── schema/               # Drizzle database schema
└── lib/
    ├── actions/              # Server actions
    ├── auth.ts               # Better Auth configuration
    └── schemas/              # Zod validation schemas
```

## Key Features Explained

### Authentication Flow

1. **Signup:** User creates an account with email and password
2. **Email Verification:** OTP code is sent to user's email via SendGrid
3. **OTP Verification:** User enters the code to verify their email
4. **Session:** Upon verification, user is logged in and session is created

### Database Schema

The project includes the following tables:

- `user` - User accounts with email verification status
- `session` - Active user sessions
- `account` - Authentication accounts (email/password)
- `verification` - OTP verification codes

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v
```

## Email Configuration

This project uses SendGrid for sending verification emails. To set up:

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key in your SendGrid dashboard
3. Verify a sender email address
4. Add your API key and sender email to `.env`

## Development Tips

- Use Drizzle Studio (`npx drizzle-kit studio`) to inspect and manage your database
- Check the browser console and terminal for helpful error messages
- Email verification codes expire after 5 minutes (configurable in `src/lib/auth.ts`)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [TanStack Form Documentation](https://tanstack.com/form/latest)

## License

This project is open source and available under the MIT License.
