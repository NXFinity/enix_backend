# Meta EN|IX Backend

**Version:** Alpha 1.0.0  
**Framework:** NestJS v11.0.1  
**Database:** PostgreSQL with TypeORM  
**Status:** ✅ Production Ready

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Libraries & Modules](#libraries--modules)
- [Development](#development)
- [Production Deployment](#production-deployment)

---

## 🎯 Overview

Meta EN|IX Backend is a production-ready NestJS application providing comprehensive user management, authentication, authorization, and platform services. The backend implements enterprise-grade security practices, role-based access control (RBAC), WebSocket support, and comprehensive logging.

**Key Highlights:**
- ✅ All critical security issues resolved
- ✅ Production-ready with comprehensive error handling
- ✅ Full TypeScript type safety
- ✅ Comprehensive API documentation (Swagger)
- ✅ Health checks and monitoring
- ✅ Rate limiting and throttling
- ✅ Input sanitization and XSS protection
- ✅ Database transactions for data consistency
- ✅ Structured logging with Winston and database audit logs

---

## ✨ Features

### Authentication & Authorization
- User registration with email verification
- Session-based authentication with Redis
- Password reset and change functionality
- Role-based access control (RBAC) with CASL
- Permission-based authorization
- Admin guard for protected endpoints
- JWT support for stateless authentication

### User Management
- Complete user CRUD operations
- Pagination support for user listings
- User profile and privacy management
- WebSocket ID tracking for client identification
- User search and filtering

### Security
- Global rate limiting (100 req/min default)
- Input sanitization (XSS protection)
- Generic error messages (prevents information leakage)
- Password hashing with bcrypt
- CSRF protection ready
- Helmet security headers
- CORS configuration
- Session management with Redis

### Infrastructure
- WebSocket Gateway (`/account` namespace)
- Health checks (database, Redis, memory, disk)
- Comprehensive logging (Winston + database audit logs)
- Caching service (Redis-based)
- Email service (Nodemailer)
- Database transactions for multi-entity operations
- Environment variable validation (Joi)

### API Documentation
- Swagger/OpenAPI documentation
- Request/response examples
- Error response documentation
- Bearer token authentication support

---

## 🛠 Tech Stack

### Core
- **NestJS** v11.0.1 - Progressive Node.js framework
- **TypeScript** v5.7.3 - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **TypeORM** v0.3.27 - ORM for database operations

### Authentication & Security
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing
- **express-session** - Session management
- **CASL** - Authorization library
- **Helmet** - Security headers
- **class-validator** - Input validation

### Infrastructure
- **Redis** (ioredis) - Session store and caching
- **Socket.IO** - WebSocket support
- **Winston** - Structured logging
- **Nodemailer** - Email service
- **BullMQ** - Job queue management
- **KafkaJS** - Message broker support

### API & Documentation
- **Swagger/OpenAPI** - API documentation
- **class-transformer** - Object transformation
- **Joi** - Environment validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **TypeScript** - Type checking

---

## 🏗 Architecture

### Project Structure

```
backend/
├── src/
│   ├── common/              # Shared utilities and interfaces
│   │   ├── constants/      # Application constants
│   │   ├── dto/            # Shared DTOs
│   │   └── interfaces/      # TypeScript interfaces
│   ├── config/              # Configuration files
│   ├── filters/             # Exception filters
│   ├── functions/           # Utility functions
│   ├── rest/
│   │   ├── api/
│   │   │   └── users/      # User management module
│   │   ├── storage/         # File storage module
│   │   └── websocket/       # WebSocket gateway
│   ├── security/
│   │   ├── auth/           # Authentication module
│   │   └── roles/           # RBAC module
│   ├── services/
│   │   └── health/          # Health check service
│   └── utils/              # Utility functions
├── libs/                    # Shared libraries
│   ├── caching/            # Caching service
│   ├── database/           # Database utilities
│   ├── email/              # Email service
│   ├── kafka/              # Kafka integration
│   ├── logging/            # Logging service
│   ├── redis/              # Redis service
│   └── throttle/          # Rate limiting
└── test/                    # E2E tests
```

### Key Modules

1. **UsersModule** - User management and CRUD operations
2. **AuthModule** - Authentication and session management
3. **RolesModule** - Role and permission management (CASL)
4. **WebsocketModule** - WebSocket gateway for real-time communication
5. **HealthModule** - Health check endpoints
6. **CachingModule** - Redis-based caching service
7. **LoggingModule** - Structured logging and audit logs

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ 
- PostgreSQL 12+
- Redis 6+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Run database migrations**
```bash
# Database will auto-sync in development (synchronize: true)
# For production, ensure synchronize is false
```

5. **Start Redis**
```bash
# Ensure Redis is running on configured host/port
```

6. **Start the development server**
```bash
npm run start:dev
```

The API will be available at `http://localhost:3021/v1`  
Swagger documentation: `http://localhost:3021/v1` (development only)

---

## 🔐 Environment Variables

The application requires comprehensive environment variable configuration. All variables are validated using Joi on startup.

### Required Variables

#### Database
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name
- `DB_SCHEMA` - Database schema (default: `public`)

#### Redis
- `REDIS_HOST` - Redis host
- `REDIS_PORT` - Redis port
- `REDIS_PASSWORD` - Redis password (optional)

#### JWT
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRES_IN` - JWT expiration time
- `JWT_REFRESH_SECRET` - Refresh token secret
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration

#### SMTP
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_FROM` - Default sender email

#### Session
- `SESSION_SECRET` - Session secret key
- `SESSION_MAX_AGE_MS` - Session max age in milliseconds

#### Application
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3021)
- `API_URL` - API base URL
- `FRONTEND_URL` - Frontend URL for CORS

#### Rate Limiting
- `THROTTLE_DEFAULT_LIMIT` - Default rate limit (default: 100)
- `THROTTLE_DEFAULT_TTL` - Default TTL in seconds (default: 60)

See `src/app.module.ts` for complete validation schema.

---

## 📚 API Documentation

### Base URL
- **Development:** `http://localhost:3021/v1`
- **Production:** `https://api.metaenix.com/v1`

### Swagger Documentation
Access Swagger UI at `/v1` endpoint (development only).

### Main Endpoints

#### Authentication (`/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /verify-email` - Verify email address
- `POST /resend-verify-email` - Resend verification email
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /change-password` - Change password (authenticated)

#### Users (`/v1/users`)
- `GET /users` - List all users (admin only, paginated)
- `GET /users/me` - Get current user profile
- `GET /users/:id` - Get user by ID
- `GET /users/username/:username` - Get user by username
- `PATCH /users/me` - Update current user profile
- `PATCH /users/:id` - Update user (admin only)
- `DELETE /users/me` - Delete current user account
- `DELETE /users/:id` - Delete user (admin only)

#### Roles & Permissions (`/v1/roles`)
- `GET /roles` - Get all roles (admin only)
- `GET /roles/permissions` - Get all permissions
- `GET /roles/permissions/:role` - Get permissions for role

#### Health (`/v1/health`)
- `GET /health` - Comprehensive health check
- `GET /health/liveness` - Liveness probe
- `GET /health/readiness` - Readiness probe

### WebSocket

#### Namespace: `/account`
- **Purpose:** Master authentication gateway for WebSocket connections
- **Authentication:** Uses `websocketId` from session or query parameter
- **Events:**
  - `ping` - Connection heartbeat

---

## 🔒 Security Features

### Authentication & Authorization
- ✅ Session-based authentication with Redis
- ✅ JWT support for stateless authentication
- ✅ Role-based access control (RBAC) with CASL
- ✅ Permission-based authorization
- ✅ Admin guard for protected endpoints
- ✅ Public route decorator for unauthenticated endpoints

### Rate Limiting
- ✅ Global rate limiting (100 req/min default)
- ✅ Endpoint-specific rate limits
- ✅ Redis-based throttling
- ✅ Configurable limits per endpoint

### Input Validation & Sanitization
- ✅ Input validation with `class-validator`
- ✅ XSS protection with custom sanitization utilities
- ✅ HTML sanitization for user inputs
- ✅ SQL injection prevention (parameterized queries)

### Error Handling
- ✅ Generic error messages (prevents information leakage)
- ✅ Stack traces hidden in production
- ✅ Structured error responses
- ✅ Comprehensive logging

### Data Protection
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Password excluded from query results
- ✅ Database transactions for data consistency
- ✅ Session management with secure cookies

### Security Headers
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ CSRF protection ready
- ✅ Secure session cookies

---

## 📦 Libraries & Modules

### Shared Libraries (`libs/`)

#### `@caching/caching`
Redis-based caching service with user-specific caching and tag-based invalidation.

#### `@database/database`
Database utilities and base entity classes.

#### `@email/email`
Email service with template support (Nodemailer).

#### `@kafka/kafka`
Kafka integration for message brokering.

#### `@logging/logging`
Structured logging with Winston and database audit logs.

#### `@redis/redis`
Redis service for caching and session storage.

#### `@throttle/throttle`
Rate limiting and throttling service with Redis backend.

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run start:dev      # Start development server with watch mode
npm run start:debug    # Start with debug mode

# Production
npm run build          # Build for production
npm run start:prod     # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run E2E tests
```

### Code Style

- **ESLint** - Code linting with NestJS recommended rules
- **Prettier** - Code formatting
- **TypeScript** - Strict type checking

### Development Guidelines

1. **Type Safety** - Use `AuthenticatedRequest` and `AuthenticatedSocket` interfaces
2. **Error Handling** - Use `LoggingService` instead of `console.error()`
3. **Constants** - Use constants from `app.constants.ts` instead of magic numbers
4. **Validation** - Use DTOs with `class-validator` decorators
5. **Sanitization** - Apply sanitization decorators to DTO fields
6. **Transactions** - Wrap multi-entity operations in transactions
7. **Logging** - Use structured logging with context and categories

---

## 🚢 Production Deployment

### Pre-Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set `synchronize=false` in database config
- [ ] Configure all required environment variables
- [ ] Set up Redis connection
- [ ] Configure SMTP settings
- [ ] Set secure session secret
- [ ] Configure CORS origins
- [ ] Set up health check monitoring
- [ ] Configure logging output
- [ ] Review rate limiting settings

### Build & Deploy

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Health Checks

Monitor these endpoints:
- `/v1/health` - Comprehensive health check
- `/v1/health/liveness` - Kubernetes liveness probe
- `/v1/health/readiness` - Kubernetes readiness probe

### Monitoring

- **Logs:** Winston logs to files (`logs/combined.log`, `logs/error.log`)
- **Database Audit Logs:** Stored in `audit_log` table
- **Health Checks:** Monitor database, Redis, memory, and disk

---

## 📝 Additional Resources

- **API Documentation:** `/v1` (Swagger UI in development)
- **Audit Report:** `docs/backend/AUDIT_REPORT.md`
- **Project Website:** [https://metaenix.com](https://metaenix.com)
- **Support:** [https://metaenix.com/support](https://metaenix.com/support)

---

## 📄 License

UNLICENSED - Proprietary software

---

## 👥 Contributors

Meta EN|IX Development Team

---

**Last Updated:** 2025-01-14  
**Status:** ✅ Production Ready
