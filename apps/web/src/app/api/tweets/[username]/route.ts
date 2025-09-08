import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { auth } from '@/auth'
import TwitterService from '@/services/twitterService'
import { GetTweetsResponse, ApiErrorResponse } from '@/types/twitter'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(
  request: NextRequest,
  { params }: any
): Promise<NextResponse<GetTweetsResponse | ApiErrorResponse>> {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { username } = params
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const limit = parseInt(searchParams.get('limit') || '10')
    const since_id = searchParams.get('since_id') || undefined

    // Validate username
    if (!username || username.length < 1) {
      return NextResponse.json(
        { success: false, error: 'Username is required', code: 'INVALID_USERNAME' },
        { status: 400 }
      )
    }

    // Validate limit
    if (limit < 1 || limit > 25) {
      return NextResponse.json(
        { success: false, error: 'Limit must be between 1 and 25', code: 'INVALID_LIMIT' },
        { status: 400 }
      )
    }

    // Get Twitter service instance
    const twitterService = TwitterService.getInstance()

    // Fetch tweets
    const response = await twitterService.getTweetsByUsername(username, {
      limit,
      since_id
    })

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error fetching tweets:', error)
    const traceId = randomUUID()
    
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { 
            success: false, 
            error: `User @${params.username} not found`, 
            code: 'USER_NOT_FOUND',
            details: process.env.NODE_ENV === 'development' ? error?.toString() : undefined,
            traceId
          },
          { status: 404 }
        )
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Rate limit exceeded. Please try again later.', 
            code: 'RATE_LIMIT_EXCEEDED',
            traceId
          },
          { status: 429, headers: { 'Retry-After': '60' } }
        )
      }

      if (error.message.includes('authentication')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Twitter API authentication failed', 
            code: 'TWITTER_AUTH_FAILED',
            traceId
          },
          { status: 503 }
        )
      }
    }

    // Generic error
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error', 
        details: process.env.NODE_ENV === 'development' ? error?.toString() : undefined,
        code: 'INTERNAL_ERROR',
        traceId
      },
      { status: 500 }
    )
  }
}
