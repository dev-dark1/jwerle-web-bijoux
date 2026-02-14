"use client"

import { useEffect } from "react"

export function AnalyticsTracker() {
  useEffect(() => {
    // Fire once on mount
    const track = async () => {
      try {
        await fetch('/api/track', { method: 'POST' })
      } catch (e) {
        // Silent fail
      }
    }
    track()
  }, [])

  return null
}
