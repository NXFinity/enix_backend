# Meta EN|IX Backend

**Version:** 1.3.0  
**Framework:** NestJS v11.0.1  
**Database:** PostgreSQL with TypeORM  
**Status:** ✅ Production Ready

---

## 🎯 Overview

Meta EN|IX Backend is a production-ready NestJS application providing comprehensive user management, authentication, authorization, and platform services with enterprise-grade security practices.

**Key Features:**
- ✅ Two-Factor Authentication (2FA) with TOTP
- ✅ Performance and security monitoring
- ✅ Role-based access control (RBAC)
- ✅ WebSocket support for real-time communication
- ✅ File storage with Digital Ocean Spaces
- ✅ Comprehensive API documentation (Swagger)

---

## ✨ Features

### Authentication & Authorization
- User registration with email verification
- Session-based authentication with Redis
- **Two-Factor Authentication (2FA)** with TOTP support
- Password reset and change functionality
- Role-based access control (RBAC) with CASL
- Permission-based authorization

### User Management
- Complete user CRUD operations
- User profiles and privacy management
- Pagination support

### Posts & Content
- Create posts with text, images, videos, and documents
- Comments and replies
- Likes, shares, and bookmarks
- Collections for organizing posts
- Content reporting and moderation

### Security
- **Two-Factor Authentication (2FA)** with TOTP and backup codes
- **Security monitoring** with event tracking and alerting
- Global rate limiting
- Input sanitization (XSS protection)
- Password hashing with bcrypt
- Secret encryption (AES-256-GCM for 2FA)

### Infrastructure
- **Performance monitoring** with request tracking and statistics
- **Security monitoring** with event tracking and alerting
- WebSocket Gateway (`/account` namespace)
- Health checks (database, Redis, memory, disk)
- Comprehensive logging (Winston + database audit logs)
- Caching service (Redis-based)
- Email service (Nodemailer)
- File storage service (Digital Ocean Spaces)

---

## 🛠 Tech Stack

- **NestJS** v11.0.1 - Progressive Node.js framework
- **TypeScript** v5.7.3 - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **TypeORM** v0.3.27 - ORM for database operations
- **Redis** (ioredis) - Session store and caching
- **Socket.IO** - WebSocket support
- **speakeasy** - TOTP for 2FA
- **qrcode** - QR code generation
- **bcrypt** - Password hashing
- **Winston** - Structured logging

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 12+
- Redis 6+
- Digital Ocean Spaces account (or S3-compatible storage)

### Installation

1. **Clone and install**
```bash
git clone <repository-url>
cd backend
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start services**
```bash
# Ensure PostgreSQL and Redis are running
```

4. **Start development server**
```bash
npm run start:dev
```

The API will be available at `http://localhost:3021/v1`  
Swagger documentation: `http://localhost:3021/v1` (development only)

---

## 📚 API Documentation

### Base URL
- **Development:** `http://localhost:3021/v1`
- **Production:** `https://api.metaenix.com/v1`

### Main Endpoints

#### Authentication (`/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login (with 2FA support)
- `POST /login/verify-2fa` - Verify 2FA code during login
- `POST /logout` - User logout
- `POST /verify-email` - Verify email address
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /change-password` - Change password (authenticated)

#### Two-Factor Authentication (`/v1/twofa`)
- `GET /twofa/status` - Get 2FA status
- `POST /twofa/setup` - Initiate 2FA setup
- `POST /twofa/enable` - Enable 2FA
- `POST /twofa/disable` - Disable 2FA
- `POST /twofa/backup-codes` - Get backup codes
- `POST /twofa/regenerate-backup-codes` - Regenerate backup codes

#### Users (`/v1/users`)
- `GET /users/me` - Get current user profile
- `GET /users/:id` - Get user by ID
- `PATCH /users/me` - Update current user profile
- `DELETE /users/me` - Delete current user account

#### Posts (`/v1/posts`)
- `POST /posts` - Create post
- `GET /posts/:id` - Get post by ID
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like/unlike post
- `POST /posts/:id/comment` - Comment on post
- `POST /posts/:id/share` - Share post
- `POST /posts/:id/bookmark` - Bookmark post

#### Storage (`/v1/storage`)
- `POST /storage/upload` - Upload file
- `DELETE /storage/:fileKey` - Delete file

#### Health (`/v1/health`)
- `GET /health` - Comprehensive health check
- `GET /health/liveness` - Liveness probe
- `GET /health/readiness` - Readiness probe

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

## 💻 Development

### Available Scripts

```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run start:prod     # Start production server
npm run lint           # Run ESLint
npm run test           # Run tests
```

---

## 🐳 Docker

### Docker Hub

**Image:** [oneorg/balpha](https://hub.docker.com/r/oneorg/balpha)

### Pull and Run

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
- **Security Monitoring:** Event tracking (failed logins, unauthorized access, 2FA failures), threshold-based alerting

---

## 📝 Additional Resources

- **API Documentation:** `/v1` (Swagger UI in development)
- **Project Website:** [https://metaenix.com](https://metaenix.com)

---

## 📄 License

UNLICENSED - Proprietary software

---

**Last Updated:** 15/11/2025  
**Version:** 1.3.0  
**Status:** ✅ Production Ready
