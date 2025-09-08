import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { auth } from '@/auth'
import { ApiErrorResponse } from '@/types/twitter'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function DELETE(
  request: NextRequest,
  { params }: any
): Promise<NextResponse<{ success: boolean; message?: string } | ApiErrorResponse>> {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Account ID is required', code: 'INVALID_ID' },
        { status: 400 }
      )
    }

    // In a real application, this would be a database operation
    // For demo purposes, we'll just return success
    // const deleted = await deleteMonitoredAccount(id, session.user.id)

    return NextResponse.json({
      success: true,
      message: `Account removed from monitoring`
    })

  } catch (error) {
    const traceId = randomUUID()
    console.error('Error deleting account:', traceId, error)
    
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

export async function PUT(
  request: NextRequest,
  { params }: any
): Promise<NextResponse<{ success: boolean; message?: string } | ApiErrorResponse>> {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Account ID is required', code: 'INVALID_ID' },
        { status: 400 }
      )
    }

    // Validate update fields
    const allowedFields = ['is_active']
    const updates = Object.keys(body).filter(key => allowedFields.includes(key))
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid fields to update', code: 'INVALID_UPDATE' },
        { status: 400 }
      )
    }

    // In a real application, this would update the database
    // For demo purposes, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: `Account updated successfully`
    })

  } catch (error) {
    const traceId = randomUUID()
    console.error('Error updating account:', traceId, error)
    
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
