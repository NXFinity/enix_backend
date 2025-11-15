# Meta EN|IX Backend

**Version:** 1.3.0  
**Framework:** NestJS v11.0.1  
**Database:** PostgreSQL with TypeORM  
**Status:** ✅ Production Ready

---

## Introduction

Meta EN|IX Backend is a production-ready NestJS application that powers the Meta EN|IX social platform. Built with enterprise-grade security practices, the backend provides comprehensive user management, authentication, content management, and real-time communication capabilities.

### What is Meta EN|IX?

Meta EN|IX is a modern social platform designed to connect users through posts, comments, follows, and real-time interactions. The backend serves as the foundation for all platform functionality, ensuring security, performance, and scalability.

---

## Key Features

### 🔐 Security First

- **Two-Factor Authentication (2FA)** - TOTP-based 2FA with backup codes for enhanced account security
- **Security Monitoring** - Real-time threat detection and alerting system
- **Role-Based Access Control** - Granular permissions using CASL
- **Input Sanitization** - Protection against XSS and injection attacks
- **Rate Limiting** - Protection against abuse and DDoS attacks

### ⚡ Performance Optimized

- **Performance Monitoring** - Automatic request tracking and bottleneck identification
- **Database Indexes** - Optimized queries for fast response times
- **Caching** - Redis-based caching for improved performance
- **Atomic Operations** - Race-condition-free count updates

### 🚀 Production Ready

- **Comprehensive Error Handling** - Graceful error handling with proper logging
- **Health Checks** - Database, Redis, memory, and disk monitoring
- **Structured Logging** - Winston logging with database audit trails
- **API Documentation** - Complete Swagger/OpenAPI documentation

---

## Technology Stack

- **NestJS** v11.0.1 - Modern Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **TypeORM** - Database ORM
- **Redis** - Caching and session storage
- **Socket.IO** - WebSocket support
- **Digital Ocean Spaces** - File storage (S3-compatible)

---

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run start:dev
```

API available at: `http://localhost:3021/v1`  
Swagger docs: `http://localhost:3021/v1`

---

## Documentation

- **[API Documentation](#)** - Complete API reference
- **[Changelogs](../docs/backend/changelogs/)** - Version history and changes
- **[Architecture Guide](#)** - System architecture and design
- **[Development Guide](#)** - Contributing and development guidelines
- **[Deployment Guide](#)** - Production deployment instructions

---

## Current Version: 1.3.0

### What's New

- ✅ **Two-Factor Authentication (2FA)** - Complete TOTP implementation
- ✅ **Performance Monitoring** - Request tracking and statistics
- ✅ **Security Monitoring** - Event tracking and alerting
- ✅ **Database Indexes** - Performance optimizations
- ✅ **Enhanced Validation** - Improved collection and report validation

See [CHANGELOG-151125-V1.3.0.md](../docs/backend/changelogs/CHANGELOG-151125-V1.3.0.md) for full details.

---

## Getting Help

- **Documentation:** See the [docs](../docs/backend/) directory
- **Issues:** Report issues via GitHub Issues
- **Support:** Contact the development team

---

**Last Updated:** 15/11/2025  
**Status:** ✅ Production Ready
