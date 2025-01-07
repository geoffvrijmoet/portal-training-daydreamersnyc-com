import { useState, useEffect } from 'react'

interface ProductMapping {
  [key: string]: string  // product name -> product URL
}

export function useProductUrls() {
  const [productUrls, setProductUrls] = useState<ProductMapping | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProductUrls() {
      try {
        console.log('Fetching product URLs from settings...')
        const response = await fetch('/api/settings/product-urls')
        if (!response.ok) {
          throw new Error('Failed to fetch product URLs')
        }
        const data = await response.json()
        console.log('Received product URLs:', data)
        setProductUrls(data)
      } catch (err) {
        console.error('Error fetching product URLs:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductUrls()
  }, [])

  return { productUrls, isLoading, error }
} 