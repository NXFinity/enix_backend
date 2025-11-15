# Getting Started with Meta EN|IX API

Welcome! This guide will help you get started building applications with the Meta EN|IX API.

---

## Prerequisites

Before you can create an application, you need to meet the following requirements:

### Account Requirements

1. **Email Verification** - Your email must be verified
2. **Two-Factor Authentication** - 2FA must be enabled on your account
3. **Account Age** - Your account must be at least **30 days old**
4. **Account Standing** - Your account must be in good standing (no suspensions or violations)
5. **Recent Activity** - Your account must show recent activity (inactive accounts are flagged)

### Why These Requirements?

These requirements ensure that only trusted developers can access our API, protecting both our platform and your applications.

---

## Step 1: Register as a Developer

Once you meet all prerequisites, you can register as a developer:

### Check Your Status

```http
GET /developer/status
Authorization: Bearer {your_access_token}
```

**Response:**
```json
{
  "isDeveloper": false,
  "requirements": {
    "emailVerified": true,
    "twoFactorEnabled": true,
    "accountAgeDays": 45,
    "accountInGoodStanding": true,
    "recentActivity": true
  },
  "meetsRequirements": true,
  "canRegister": true
}
```

### Accept Developer Terms

If you meet all requirements, accept the Developer Terms:

```http
POST /developer/register
Authorization: Bearer {your_access_token}
Content-Type: application/json

{
  "acceptTerms": true
}
```

**Response:**
```json
{
  "message": "Successfully registered as developer",
  "isDeveloper": true,
  "developerTermsAcceptedAt": "2025-11-15T20:56:00Z"
}
```

---

## Step 2: Create Your First Application

As a developer, you can create up to **2 applications**:
- **1 Production App** - For live applications (requires approval)
- **1 Development App** - For testing (auto-approved)

### Create a Development App

Start with a Development app to test your integration:

```http
POST /developer/apps
Authorization: Bearer {your_access_token}
Content-Type: application/json

{
  "name": "My Awesome App",
  "description": "An app that does amazing things",
  "environment": "DEVELOPMENT",
  "redirectUris": [
    "http://localhost:3000/callback",
    "http://localhost:3000/auth/callback"
  ],
  "websiteUrl": "https://myapp.com",
  "privacyPolicyUrl": "https://myapp.com/privacy",
  "termsOfServiceUrl": "https://myapp.com/terms"
}
```

**Response:**
```json
{
  "id": "app-uuid-here",
  "name": "My Awesome App",
  "environment": "DEVELOPMENT",
  "clientId": "client_id_abc123",
  "clientSecret": "client_secret_xyz789",
  "status": "ACTIVE",
  "rateLimit": 1000,
  "dateCreated": "2025-11-15T20:56:00Z",
  "warning": "⚠️ Save your client secret now! It will not be shown again."
}
```

**⚠️ Important:** Save your `clientSecret` immediately! It's only shown once during creation.

### Create a Production App

Once your Development app is working, create a Production app:

```http
POST /developer/apps
Authorization: Bearer {your_access_token}
Content-Type: application/json

{
  "name": "My Awesome App - Production",
  "description": "Production version of my app",
  "environment": "PRODUCTION",
  "redirectUris": [
    "https://myapp.com/callback",
    "https://myapp.com/auth/callback"
  ],
  "websiteUrl": "https://myapp.com",
  "privacyPolicyUrl": "https://myapp.com/privacy",
  "termsOfServiceUrl": "https://myapp.com/terms"
}
```

**Response:**
```json
{
  "id": "app-uuid-here",
  "name": "My Awesome App - Production",
  "environment": "PRODUCTION",
  "clientId": "client_id_prod123",
  "clientSecret": "client_secret_prod789",
  "status": "PENDING",
  "rateLimit": 10000,
  "dateCreated": "2025-11-15T20:56:00Z",
  "message": "Your production app is pending approval. An admin will review it shortly."
}
```

**Note:** Production apps require admin approval before they become active. Development apps are auto-approved.

---

## Step 3: Get Your API Credentials

After creating your app, you'll receive:

- **Client ID** - Public identifier for your app
- **Client Secret** - Private key (keep this secure!)

### View Your Apps

```http
GET /developer/apps
Authorization: Bearer {your_access_token}
```

**Response:**
```json
{
  "apps": [
    {
      "id": "app-uuid-here",
      "name": "My Awesome App",
      "environment": "DEVELOPMENT",
      "clientId": "client_id_abc123",
      "status": "ACTIVE",
      "rateLimit": 1000,
      "dateCreated": "2025-11-15T20:56:00Z"
    }
  ],
  "total": 1,
  "limit": 2
}
```

**Note:** The `clientSecret` is not returned in this list for security reasons. If you lose it, you'll need to regenerate it.

### Regenerate Client Secret

If you've lost your client secret:

```http
POST /developer/apps/{app_id}/regenerate-secret
Authorization: Bearer {your_access_token}
```

**⚠️ Warning:** This invalidates your old secret immediately!

---

## Step 4: Authenticate with OAuth 2.0

Your app uses OAuth 2.0 to authenticate users and access the API.

### Authorization Code Flow

1. **Redirect user to authorization endpoint:**

```
GET /oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scopes}&state={random_state}
```

2. **User authorizes your app** - They'll be redirected back with an authorization code

3. **Exchange code for access token:**

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={authorization_code}
&redirect_uri={redirect_uri}
&client_id={client_id}
&client_secret={client_secret}
```

**Response:**
```json
{
  "access_token": "access_token_here",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "refresh_token_here",
  "scope": "read:profile read:posts"
}
```

### Client Credentials Flow (Server-to-Server)

For server-to-server applications without user interaction:

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={client_id}
&client_secret={client_secret}
&scope={scopes}
```

---

## Step 5: Make Your First API Call

Now you can make authenticated requests to the API:

```http
GET /v1/users/me
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "id": "user-uuid",
  "username": "developer123",
  "email": "developer@example.com",
  "profile": {
    "displayName": "Developer Name",
    "bio": "Building awesome apps!"
  }
}
```

---

## Rate Limits

Different environments have different rate limits:

- **Development Apps:** 1,000 requests/hour
- **Production Apps:** 10,000 requests/hour

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1637000000
```

---

## Available Scopes

When requesting access, you can request these scopes:

### Read Scopes
- `read:profile` - Read user profile information
- `read:posts` - Read posts
- `read:comments` - Read comments
- `read:follows` - Read follow relationships
- `read:notifications` - Read notifications

### Write Scopes
- `write:profile` - Update user profile
- `write:posts` - Create/update/delete posts
- `write:comments` - Create/update/delete comments
- `write:follows` - Follow/unfollow users

Request only the scopes your app needs!

---

## Production App Approval

Production apps require admin approval before they become active:

1. **Create your Production app** - Status will be `PENDING`
2. **Admin reviews your app** - They may test it
3. **Admin approves or rejects** - You'll be notified
4. **If approved** - Status changes to `ACTIVE` and you can use it

You can check your app status:

```http
GET /developer/apps/{app_id}
Authorization: Bearer {your_access_token}
```

---

## Best Practices

### Security

- ✅ **Never expose your client secret** - Keep it server-side only
- ✅ **Use HTTPS** - Always use secure connections
- ✅ **Validate redirect URIs** - Only use registered URIs
- ✅ **Store tokens securely** - Encrypt tokens in your database
- ✅ **Handle token expiration** - Implement refresh token logic

### Rate Limits

- ✅ **Respect rate limits** - Monitor your usage
- ✅ **Implement exponential backoff** - Retry failed requests properly
- ✅ **Cache responses** - Reduce unnecessary API calls

### Error Handling

- ✅ **Handle errors gracefully** - Check status codes
- ✅ **Log errors** - Help debug issues
- ✅ **Retry appropriately** - Don't spam the API

---

## Next Steps

- [API Reference](#) - Explore all available endpoints
- [OAuth 2.0 Guide](#) - Deep dive into authentication
- [Webhooks](#) - Set up event notifications (coming soon)
- [SDKs](#) - Use our official SDKs (coming soon)

---

## Getting Help

- **Documentation:** See the full API docs
- **Issues:** Report bugs via GitHub Issues
- **Support:** Contact our developer support team

---

**Last Updated:** 15/11/2025

