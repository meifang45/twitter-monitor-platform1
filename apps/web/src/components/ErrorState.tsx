'use client'

import { useState, useEffect, useMemo } from 'react'
import { AlertTriangle, RefreshCw, WifiOff, Copy as CopyIcon, Hash } from 'lucide-react'

interface ErrorStateProps {
  error: string
  onRetry?: () => void
  type?: 'network' | 'api' | 'general'
  isLoading?: boolean
  showRetry?: boolean
}

export default function ErrorState({ 
  error, 
  onRetry, 
  type = 'general', 
  isLoading = false,
  showRetry = true 
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [copied, setCopied] = useState(false)

  // Parse retry-after seconds and traceId from error string if present
  const parsed = useMemo(() => {
    const retryMatch = /retry in\s+(\d+)s/i.exec(error)
    const traceMatch = /traceId:\s*([a-z0-9\-]+)/i.exec(error)
    const retryAfterSeconds = retryMatch ? parseInt(retryMatch[1], 10) : undefined
    const traceId = traceMatch ? traceMatch[1] : undefined
    return { retryAfterSeconds, traceId }
  }, [error])

  const [retryLeft, setRetryLeft] = useState<number | undefined>(parsed.retryAfterSeconds)

  // Countdown for Retry-After
  useEffect(() => {
    setRetryLeft(parsed.retryAfterSeconds)
  }, [parsed.retryAfterSeconds])

  useEffect(() => {
    if (!retryLeft || retryLeft <= 0) return
    const timer = setInterval(() => {
      setRetryLeft((s) => (s && s > 0 ? s - 1 : s))
    }, 1000)
    return () => clearInterval(timer)
  }, [retryLeft])

  const handleRetry = async () => {
    if (!onRetry || isRetrying) return
    if (retryLeft && retryLeft > 0) return
    
    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  const copyTraceId = async () => {
    if (!parsed.traceId) return
    await navigator.clipboard.writeText(parsed.traceId)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const copyDetails = async () => {
    await navigator.clipboard.writeText(error)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="h-8 w-8 text-destructive" />
      case 'api':
        return <AlertTriangle className="h-8 w-8 text-destructive" />
      default:
        return <AlertTriangle className="h-8 w-8 text-destructive" />
    }
  }

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Problem'
      case 'api':
        return 'Service Unavailable'
      default:
        return 'Something went wrong'
    }
  }

  const getErrorMessage = () => {
    switch (type) {
      case 'network':
        return 'Please check your internet connection and try again.'
      case 'api':
        return 'Our servers are experiencing issues. Please try again later.'
      default:
        return error || 'An unexpected error occurred.'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4">
        {getErrorIcon()}
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {getErrorTitle()}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {getErrorMessage()}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={handleRetry}
          disabled={isRetrying || isLoading || (retryLeft !== undefined && retryLeft > 0)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isRetrying || isLoading ? 'animate-spin' : ''}`} />
          <span>
            {isRetrying ? 'Retrying...' : (retryLeft && retryLeft > 0 ? `Retry in ${retryLeft}s` : 'Try Again')}
          </span>
        </button>
      )}

      {/* Trace ID and copy actions */}
      {(parsed.traceId || error) && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          {parsed.traceId && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border">
              <Hash className="h-3 w-3" />
              <span className="font-mono">{parsed.traceId}</span>
            </div>
          )}
          <button
            onClick={parsed.traceId ? copyTraceId : copyDetails}
            className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border hover:bg-muted transition-colors"
            title={parsed.traceId ? 'Copy traceId' : 'Copy error details'}
          >
            <CopyIcon className="h-3 w-3" />
            <span>{copied ? 'Copied' : parsed.traceId ? 'Copy traceId' : 'Copy details'}</span>
          </button>
        </div>
      )}
    </div>
  )
}

// Connection status indicator
export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)

  // Monitor connection status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">No internet connection</span>
      </div>
    </div>
  )
}
