# Twitter Monitoring Platform

A clean, focused dashboard for monitoring specific Twitter accounts without the noise and distractions of the native Twitter platform.

## 🏗️ Architecture

- **Monorepo**: npm workspaces for organized code structure
- **Frontend**: Next.js 15.4.6 with App Router, TypeScript, and Tailwind CSS
- **Platform**: Vercel for hosting and deployment
- **Architecture**: Jamstack application with static frontend and serverless API routes

## 🚀 Quick Start

### Prerequisites

- Node.js ≥18.0.0
- npm ≥8.0.0

### Installation

```bash
# Clone the repository (when available)
# cd twitter-monitoring-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts and cache
- `npm run clean:all` - Clean everything including node_modules
- `npm run reinstall` - Clean and reinstall all dependencies

## 🏗️ Project Structure

```
twitter-monitor/
├── package.json              # Root monorepo configuration
├── README.md                 # This file
├── apps/                     # Applications workspace
│   └── web/                  # Next.js web application
│       ├── src/
│       │   └── app/          # Next.js App Router
│       ├── public/           # Static assets
│       ├── package.json      # Web app dependencies
│       ├── next.config.ts    # Next.js configuration
│       ├── tsconfig.json     # TypeScript configuration
│       └── eslint.config.mjs # ESLint configuration
└── packages/                 # Shared packages workspace (future use)
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js v5
- **API Integration**: Twitter API v2 with fallback mock data
- **Linting**: ESLint with Next.js configuration
- **Package Management**: npm workspaces
- **Deployment**: Vercel

## ⚡ Features

### Story 1.4: Serverless API Implementation
- **Twitter API Integration**: Real-time tweet fetching from Twitter API v2
- **Mock Data Fallback**: Comprehensive mock service for development and testing
- **Rate Limiting**: Built-in protection against API rate limits (100 requests/15min)
- **Caching Strategy**: In-memory caching with TTL to optimize API usage
- **Error Handling**: Graceful error handling with user-friendly messages
- **Account Management**: Full CRUD operations for monitored Twitter accounts
- **Real-time Dashboard**: Live tweet feeds with auto-refresh functionality
- **Responsive Design**: Optimized for mobile and desktop viewing

### API Endpoints
- `GET /api/tweets/[username]` - Fetch tweets from specific accounts
- `GET /api/accounts` - List all monitored accounts
- `POST /api/accounts` - Add new monitored account
- `PUT /api/accounts/[id]` - Update account settings
- `DELETE /api/accounts/[id]` - Remove monitored account

### Data Features
- Automatic fallback to mock data when Twitter API is unavailable
- Configurable via `MOCK_DATA_ENABLED` environment variable
- Built-in rate limiting and request throttling
- Persistent caching to minimize API calls
- User profile information and tweet metrics

## 🎯 Goals

- Dramatically reduce time spent monitoring Twitter accounts by 80%
- Provide a clean, distraction-free viewing experience
- Focus on essential information without ads or algorithmic content
- Maintain zero operational costs through free tier services

## 📋 Development Status

- ✅ **Story 1.1**: Initial Project & Monorepo Setup - Complete
- ✅ **Story 1.2**: Basic UI Shell & Dashboard Layout - Complete
- ✅ **Story 1.3**: User Authentication - Complete & QA Approved
- ✅ **Story 1.4**: Serverless API for Fetching Tweets - Complete & Ready for QA
- ✅ **Story 1.5**: Display Read-Only Dashboard - Complete

## 🔒 Security Features

- Security headers configured (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- No powered-by header exposure
- Type-safe development with TypeScript
- ESLint for code quality enforcement

## 📄 License

MIT License