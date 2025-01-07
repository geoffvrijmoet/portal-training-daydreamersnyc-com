import { useState, useEffect } from 'react'
import type { ReportCard } from '@/lib/mongodb'

export function useReportCards() {
  const [reportCards, setReportCards] = useState<ReportCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReportCards() {
      try {
        const response = await fetch('/api/report-cards')
        if (!response.ok) {
          throw new Error('Failed to fetch report cards')
        }
        const data = await response.json()
        setReportCards(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportCards()
  }, [])

  return { reportCards, isLoading, error }
} 