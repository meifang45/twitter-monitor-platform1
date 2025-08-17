# Deployment Configuration for Twitter Monitoring Platform

## Environment Variables

### Required for Production

```bash
# NextAuth Configuration
AUTH_SECRET=your-production-auth-secret-here
NEXTAUTH_URL=https://your-domain.com

# Twitter API Configuration
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
TWITTER_API_KEY=your-twitter-api-key  
TWITTER_API_SECRET=your-twitter-api-secret

# App Configuration
MOCK_DATA_ENABLED=false
```

### Development Environment

```bash
# NextAuth Configuration
AUTH_SECRET=your-development-secret
NEXTAUTH_URL=http://localhost:3000

# Twitter API Configuration (optional for development)
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret

# App Configuration - Enable mock data for development
MOCK_DATA_ENABLED=true
```

## Vercel Deployment

1. **Environment Variables Setup**:
   - Add all required environment variables in Vercel dashboard
   - Ensure `MOCK_DATA_ENABLED=false` for production
   - Generate a secure `AUTH_SECRET` for production

2. **Build Configuration**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Domain Configuration**:
   - Update `NEXTAUTH_URL` to match your production domain
   - Configure custom domain if needed

## Twitter API Setup

1. **Create Twitter Developer Account**:
   - Visit https://developer.twitter.com/
   - Apply for developer access
   - Create a new app

2. **Get API Keys**:
   - Generate Bearer Token for API v2 access
   - Copy API Key and API Secret
   - Set appropriate permissions

3. **Rate Limiting**:
   - Current implementation: 100 requests per 15 minutes
   - Automatic fallback to mock data on rate limit
   - Built-in caching to minimize API calls

## Security Considerations

- Never commit real API keys to version control
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Regularly rotate API keys
- Monitor API usage and costs

## Monitoring and Logging

- API errors are logged to console
- Rate limiting is automatically handled
- Failed requests fall back to mock data
- User-friendly error messages in UI