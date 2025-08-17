# Twitter Monitor API Documentation

## Overview

The Twitter Monitor API provides endpoints for fetching Twitter data and managing monitored accounts. All endpoints require authentication via NextAuth.

## Authentication

All API endpoints require a valid session. Users must be logged in to access any endpoint.

**Response for unauthenticated requests:**
```json
{
  \"success\": false,
  \"error\": \"Unauthorized\",
  \"message\": \"You must be logged in to access this endpoint\"
}
```

## Base Response Format

All API responses follow this format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Endpoints

### Tweets

#### GET `/api/tweets/[username]`

Fetch tweets from a specific Twitter account.

**Parameters:**
- `username` (path): Twitter username (with or without @)
- `maxResults` (query, optional): Number of tweets to fetch (1-100, default: 10)
- `sinceId` (query, optional): Only return tweets newer than this ID
- `untilId` (query, optional): Only return tweets older than this ID
- `exclude` (query, optional): Comma-separated list of tweet types to exclude

**Example Request:**
```
GET /api/tweets/elonmusk?maxResults=20&exclude=retweets
```

**Success Response (200):**
```json
{
  \"success\": true,
  \"data\": {
    \"tweets\": [
      {
        \"id\": \"1234567890\",
        \"text\": \"Tweet content here\",
        \"created_at\": \"2024-01-15T10:30:00.000Z\",
        \"author_id\": \"12345\",
        \"author\": {
          \"id\": \"12345\",
          \"username\": \"elonmusk\",
          \"name\": \"Elon Musk\",
          \"profile_image_url\": \"https://...\",
          \"verified\": true,
          \"public_metrics\": {
            \"followers_count\": 1000000,
            \"following_count\": 500,
            \"tweet_count\": 15000
          }
        },
        \"public_metrics\": {
          \"retweet_count\": 100,
          \"like_count\": 1500,
          \"reply_count\": 25,
          \"quote_count\": 10
        }
      }
    ],
    \"nextToken\": \"next_page_token\",
    \"meta\": {
      \"newest_id\": \"1234567890\",
      \"oldest_id\": \"1234567880\",
      \"result_count\": 20
    }
  },
  \"message\": \"Successfully fetched 20 tweets for @elonmusk\"
}
```

**Error Responses:**
- `400`: Bad Request (invalid parameters)
- `404`: User not found or private account
- `429`: Rate limit exceeded
- `503`: Twitter API unavailable

### Monitored Accounts

#### GET `/api/accounts`

Get all monitored Twitter accounts.

**Query Parameters:**
- `active` (optional): Filter by active status (true/false)
- `limit` (optional): Maximum number of results (default: 50)
- `offset` (optional): Number of results to skip (default: 0)

**Example Request:**
```
GET /api/accounts?active=true&limit=10
```

**Success Response (200):**
```json
{
  \"success\": true,
  \"data\": {
    \"accounts\": [
      {
        \"id\": \"1_elonmusk\",
        \"username\": \"elonmusk\",
        \"displayName\": \"Elon Musk\",
        \"profileImage\": \"https://...\",
        \"isActive\": true,
        \"lastFetched\": \"2024-01-15T10:25:00.000Z\",
        \"addedAt\": \"2024-01-01T00:00:00.000Z\"
      }
    ],
    \"total\": 5
  },
  \"message\": \"Successfully fetched 1 monitored accounts\"
}
```

#### POST `/api/accounts`

Add a new monitored Twitter account.

**Request Body:**
```json
{
  \"username\": \"elonmusk\",
  \"displayName\": \"Elon Musk\" // optional
}
```

**Success Response (201):**
```json
{
  \"success\": true,
  \"data\": {
    \"id\": \"1673123456_elonmusk\",
    \"username\": \"elonmusk\",
    \"displayName\": \"Elon Musk\",
    \"profileImage\": \"https://...\",
    \"isActive\": true,
    \"addedAt\": \"2024-01-15T10:30:00.000Z\"
  },
  \"message\": \"Successfully added @elonmusk to monitored accounts\"
}
```

**Error Responses:**
- `400`: Bad Request (missing username)
- `404`: Twitter user not found
- `409`: Account already monitored
- `503`: Twitter API unavailable

#### GET `/api/accounts/[id]`

Get a specific monitored account by ID.

**Success Response (200):**
```json
{
  \"success\": true,
  \"data\": {
    \"id\": \"1_elonmusk\",
    \"username\": \"elonmusk\",
    \"displayName\": \"Elon Musk\",
    \"profileImage\": \"https://...\",
    \"isActive\": true,
    \"lastFetched\": \"2024-01-15T10:25:00.000Z\",
    \"addedAt\": \"2024-01-01T00:00:00.000Z\"
  },
  \"message\": \"Successfully fetched account @elonmusk\"
}
```

#### PUT `/api/accounts/[id]`

Update a monitored account.

**Request Body:**
```json
{
  \"displayName\": \"New Display Name\", // optional
  \"isActive\": false // optional
}
```

**Success Response (200):**
```json
{
  \"success\": true,
  \"data\": {
    \"id\": \"1_elonmusk\",
    \"username\": \"elonmusk\",
    \"displayName\": \"New Display Name\",
    \"profileImage\": \"https://...\",
    \"isActive\": false,
    \"lastFetched\": \"2024-01-15T10:25:00.000Z\",
    \"addedAt\": \"2024-01-01T00:00:00.000Z\"
  },
  \"message\": \"Successfully updated account @elonmusk\"
}
```

#### DELETE `/api/accounts/[id]`

Remove a monitored account.

**Success Response (200):**
```json
{
  \"success\": true,
  \"data\": {
    \"id\": \"1_elonmusk\",
    \"username\": \"elonmusk\",
    \"displayName\": \"Elon Musk\",
    \"profileImage\": \"https://...\",
    \"isActive\": true,
    \"lastFetched\": \"2024-01-15T10:25:00.000Z\",
    \"addedAt\": \"2024-01-01T00:00:00.000Z\"
  },
  \"message\": \"Successfully removed @elonmusk from monitored accounts\"
}
```

## Error Handling

All endpoints return consistent error responses:

**Common Error Codes:**
- `400`: Bad Request - Invalid input parameters
- `401`: Unauthorized - Authentication required
- `404`: Not Found - Resource doesn't exist
- `405`: Method Not Allowed - HTTP method not supported
- `409`: Conflict - Resource already exists
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Unexpected server error
- `503`: Service Unavailable - External service unavailable

**Error Response Format:**
```json
{
  \"success\": false,
  \"error\": \"Error Type\",
  \"message\": \"Human-readable error description\"
}
```

## Rate Limiting

- Twitter API: 100 requests per 15 minutes
- Automatic fallback to mock data when limits exceeded
- Built-in caching reduces API calls
- Cache TTL: 5 minutes for user data, 2 minutes for tweets

## Mock Data Mode

When `MOCK_DATA_ENABLED=true` or Twitter API is unavailable:
- All endpoints return realistic mock data
- Simulated API delays for testing
- No actual Twitter API calls made
- Useful for development and testing