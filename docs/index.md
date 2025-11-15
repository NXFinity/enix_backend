# Meta EN|IX Backend Documentation

**Version:** 1.3.0  
**Status:** ✅ Production Ready

Welcome to the Meta EN|IX Backend documentation. This documentation provides comprehensive information about the backend architecture, features, API, and development guidelines.

---

## 📚 Documentation Index

### Getting Started
- [Quick Start Guide](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)

### Core Features
- [Authentication & Authorization](#authentication--authorization)
- [User Management](#user-management)
- [Posts & Content](#posts--content)
- [Two-Factor Authentication (2FA)](#two-factor-authentication)
- [Monitoring Systems](#monitoring-systems)

### API Documentation
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [WebSocket API](#websocket-api)

### Development
- [Architecture](#architecture)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Contributing](#contributing)

### Deployment
- [Production Deployment](#production-deployment)
- [Docker](#docker)
- [Environment Variables](#environment-variables)

### Reference
- [Changelogs](../docs/backend/changelogs/)
- [Version Updates](../docs/backend/updates/)
- [Discussion Documents](../docs/backend/discuss/)
- [Audit Reports](../docs/backend/)

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- PostgreSQL 12+
- Redis 6+
- Digital Ocean Spaces account (or S3-compatible storage)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3021/v1`  
Swagger documentation: `http://localhost:3021/v1` (development only)

---

## 🎯 Overview

Meta EN|IX Backend is a production-ready NestJS application providing comprehensive user management, authentication, authorization, and platform services with enterprise-grade security practices.

### Key Features

- ✅ **Two-Factor Authentication (2FA)** with TOTP support
- ✅ **Performance Monitoring** with request tracking and statistics
- ✅ **Security Monitoring** with event tracking and alerting
- ✅ Role-based access control (RBAC) with CASL
- ✅ WebSocket support for real-time communication
- ✅ File storage with Digital Ocean Spaces
- ✅ Comprehensive API documentation (Swagger)
- ✅ Optimized database indexes for improved performance

---

## ✨ Core Features

### Authentication & Authorization

- User registration with email verification
- Session-based authentication with Redis
- **Two-Factor Authentication (2FA)** with TOTP support
- Password reset and change functionality
- Role-based access control (RBAC) with CASL
- Permission-based authorization
- Admin guard for protected endpoints

**API Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (with 2FA support)
- `POST /auth/login/verify-2fa` - Verify 2FA code during login
- `POST /auth/logout` - User logout
- `POST /auth/verify-email` - Verify email address
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/change-password` - Change password (authenticated)

### User Management

- Complete user CRUD operations
- User profiles and privacy management
- Pagination support for user listings
- WebSocket ID tracking for client identification
- User search and filtering

**API Endpoints:**
- `GET /users/me` - Get current user profile
- `GET /users/:id` - Get user by ID
- `PATCH /users/me` - Update current user profile
- `DELETE /users/me` - Delete current user account

### Posts & Content

- Create posts with text, images, videos, and documents
- Comments and nested replies
- Likes, shares, and bookmarks
- Collections for organizing posts
- Content reporting and moderation
- Post scheduling and archiving

**API Endpoints:**
- `POST /posts` - Create post
- `GET /posts/:id` - Get post by ID
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like/unlike post
- `POST /posts/:id/comment` - Comment on post
- `POST /posts/:id/share` - Share post
- `POST /posts/:id/bookmark` - Bookmark post

### Two-Factor Authentication

Complete 2FA implementation using TOTP (Time-based One-Time Password) with:
- QR code generation for easy setup
- Backup codes for account recovery
- Secret encryption (AES-256-GCM)
- Rate limiting for 2FA attempts
- Session timeout for pending logins (5 minutes)

**API Endpoints:**
- `GET /twofa/status` - Get 2FA status
- `POST /twofa/setup` - Initiate 2FA setup (requires password)
- `POST /twofa/enable` - Enable 2FA (requires verification code)
- `POST /twofa/disable` - Disable 2FA (requires password)
- `POST /twofa/backup-codes` - Get backup codes
- `POST /twofa/regenerate-backup-codes` - Regenerate backup codes

**Documentation:** See [TWO_FACTOR_AUTHENTICATION.md](../docs/backend/discuss/TWO_FACTOR_AUTHENTICATION.md)

### Monitoring Systems

#### Performance Monitoring
- Automatic request duration tracking
- Statistics calculation (avg, min, max, p50, p95, p99)
- Slow request detection (>1 second threshold)
- Error rate tracking and alerting
- Non-blocking metric recording

#### Security Monitoring
- Security event recording (failed logins, unauthorized access, 2FA failures)
- Threshold-based alerting (configurable per event type)
- Alert aggregation and severity levels (low, medium, high, critical)
- Integration with audit logging

---

## 🏗 Architecture

### Project Structure

```
backend/
├── src/
│   ├── common/              # Shared utilities and interfaces
│   │   ├── constants/      # Application constants
│   │   ├── dto/            # Shared DTOs
│   │   ├── interfaces/     # TypeScript interfaces
│   │   └── monitoring/     # Performance and security monitoring
│   ├── rest/
│   │   ├── api/users/      # User management module
│   │   │   └── security/twofa/  # Two-Factor Authentication
│   │   ├── storage/        # File storage module
│   │   └── websocket/      # WebSocket gateway
│   ├── security/
│   │   ├── auth/          # Authentication module
│   │   └── roles/         # RBAC module
│   └── services/
│       └── health/        # Health check service
├── libs/                   # Shared libraries
│   ├── caching/          # Caching service
│   ├── database/         # Database utilities
│   ├── email/            # Email service
│   ├── logging/          # Logging service
│   ├── redis/            # Redis service
│   └── throttle/         # Rate limiting
└── docs/                  # Documentation
```

### Key Modules

1. **UsersModule** - User management and CRUD operations
2. **AuthModule** - Authentication and session management with 2FA support
3. **TwofaModule** - Two-Factor Authentication (TOTP) implementation
4. **RolesModule** - Role and permission management (CASL)
5. **WebsocketModule** - WebSocket gateway for real-time communication
6. **StorageModule** - File storage with Digital Ocean Spaces
7. **HealthModule** - Health check endpoints
8. **MonitoringModule** - Performance and security monitoring
9. **CachingModule** - Redis-based caching service
10. **LoggingModule** - Structured logging and audit logs

---

## 🔒 Security Features

- ✅ **Two-Factor Authentication (2FA)** with TOTP support
- ✅ Session-based authentication with Redis
- ✅ Role-based access control (RBAC) with CASL
- ✅ Global rate limiting (100 req/min default)
- ✅ Input sanitization (XSS protection)
- ✅ Password hashing with bcrypt
- ✅ 2FA secret encryption (AES-256-GCM)
- ✅ Security monitoring with event tracking
- ✅ Performance monitoring for request tracking
- ✅ Database transactions for data consistency

---

## 📚 API Documentation

### Base URL
- **Development:** `http://localhost:3021/v1`
- **Production:** `https://api.metaenix.com/v1`

### Swagger Documentation
Access Swagger UI at `/v1` endpoint (development only).

### WebSocket
- **Namespace:** `/account`
- **Purpose:** Master authentication gateway for WebSocket connections
- **Authentication:** Uses `websocketId` from session or query parameter

---

## 💻 Development

### Available Scripts

```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run start:prod     # Start production server
npm run lint           # Run ESLint
npm run test           # Run tests
```

### Development Guidelines

1. **Type Safety** - Use `AuthenticatedRequest` and `AuthenticatedSocket` interfaces
2. **Error Handling** - Use `LoggingService` instead of `console.error()`
3. **Validation** - Use DTOs with `class-validator` decorators
4. **Sanitization** - Apply sanitization to all user inputs
5. **Transactions** - Wrap multi-entity operations in transactions
6. **Logging** - Use structured logging with context and categories

---

## 🐳 Docker

### Docker Hub

**Image:** [oneorg/balpha](https://hub.docker.com/r/oneorg/balpha)

### Quick Start

```bash
docker pull oneorg/balpha
docker run -p 3021:3021 --env-file .env.production oneorg/balpha
```

---

## 🚢 Production Deployment

### Pre-Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set `synchronize=false` in database config
- [ ] Configure all required environment variables
- [ ] Set up Redis connection
- [ ] Configure SMTP settings
- [ ] Configure Digital Ocean Spaces credentials
- [ ] Set secure session secret
- [ ] Configure CORS origins
- [ ] Set up health check monitoring

### Build & Deploy

```bash
npm run build
npm run start:prod
```

### Monitoring

- **Logs:** Winston logs to files (`logs/combined.log`, `logs/error.log`)
- **Database Audit Logs:** Stored in `audit_log` table
- **Health Checks:** Monitor database, Redis, memory, and disk
- **Performance Monitoring:** Request duration tracking, statistics, slow request detection
- **Security Monitoring:** Event tracking, threshold-based alerting

---

## 📖 Additional Documentation

### Changelogs
- [CHANGELOG-151125.md](../docs/backend/changelogs/CHANGELOG-151125.md) - Version 1.2.0 changes
- [CHANGELOG-151125-V1.3.0.md](../docs/backend/changelogs/CHANGELOG-151125-V1.3.0.md) - Version 1.3.0 changes

### Version Updates
- [VERSION_1.2.0.md](../docs/backend/updates/VERSION_1.2.0.md) - Technical update (v1.2.0)
- [VERSION_1.2.0_USER.md](../docs/backend/updates/VERSION_1.2.0_USER.md) - User-friendly update (v1.2.0)
- [VERSION_1.3.0_USER.md](../docs/backend/updates/VERSION_1.3.0_USER.md) - User-friendly update (v1.3.0)

### Discussion Documents
- [DEVELOPER_SYSTEM.md](../docs/backend/discuss/DEVELOPER_SYSTEM.md) - Developer system design
- [TWO_FACTOR_AUTHENTICATION.md](../docs/backend/discuss/TWO_FACTOR_AUTHENTICATION.md) - 2FA implementation discussion

### Audit Reports
- [AUDIT_REPORT.md](../docs/backend/AUDIT_REPORT.md) - Comprehensive backend audit

---

## 🔗 Quick Links

- **Main README:** [../README.md](../README.md)
- **API Documentation:** `/v1` (Swagger UI in development)
- **Project Website:** [https://metaenix.com](https://metaenix.com)

---

## 📄 License

UNLICENSED - Proprietary software

---

**Last Updated:** 15/11/2025  
**Version:** 1.3.0  
**Status:** ✅ Production Ready

