"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useReportCards } from "@/hooks/use-report-cards"
import { useProductUrls } from "@/hooks/use-product-urls"
import { useEffect, useMemo, useState } from "react"

interface ProductRecommendation {
  title: string
  url: string
  imageUrl?: string
  price?: string
}

// Client-side cache
const recommendationsCache = new Map<string, { data: ProductRecommendation[], timestamp: number }>()
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

function getCachedRecommendations(key: string): ProductRecommendation[] | null {
  const cached = recommendationsCache.get(key)
  if (!cached) return null

  const isExpired = Date.now() - cached.timestamp > CACHE_TTL
  if (isExpired) {
    recommendationsCache.delete(key)
    return null
  }

  return cached.data
}

export function QuickResources() {
  const { reportCards, isLoading: isLoadingReportCards } = useReportCards()
  const { productUrls, isLoading: isLoadingProductUrls } = useProductUrls()
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  // Extract unique product recommendations from report cards
  const recommendedProducts = useMemo(() => {
    if (!reportCards || !productUrls) return []
    
    console.log('Processing report cards for recommendations:', reportCards.map(card => ({
      id: card._id,
      productRecommendations: card.productRecommendations
    })))
    console.log('Available product URLs:', productUrls)
    
    const products = new Set<string>()
    reportCards.forEach(card => {
      console.log('Processing report card productRecommendations:', card.productRecommendations)
      card.productRecommendations?.forEach(productName => {
        console.log('Checking product name:', productName)
        if (productUrls[productName]) {
          console.log('Found matching product URL for:', productName, productUrls[productName])
          products.add(productName)
        } else {
          console.log('No URL found for product:', productName)
        }
      })
    })
    
    const result = Array.from(products)
    console.log('Final recommended products:', result)
    return result
  }, [reportCards, productUrls])

  // Generate cache key from product names
  const cacheKey = useMemo(() => {
    return recommendedProducts.sort().join(',')
  }, [recommendedProducts])

  // Fetch product images when URLs are available
  useEffect(() => {
    async function fetchProductImages() {
      if (recommendedProducts.length === 0 || !productUrls) return

      // Check cache first
      const cached = getCachedRecommendations(cacheKey)
      if (cached) {
        console.log('Using cached recommendations:', cached)
        setRecommendations(cached)
        return
      }
      
      console.log('Fetching images for products:', recommendedProducts)
      setIsLoadingImages(true)
      const newRecommendations: ProductRecommendation[] = []

      for (const productName of recommendedProducts) {
        const url = productUrls[productName]
        try {
          // Fetch product image and price in parallel
          const [imageResponse, priceResponse] = await Promise.all([
            fetch(`/api/product-image?url=${encodeURIComponent(url)}`),
            fetch(`/api/product-price?url=${encodeURIComponent(url)}`)
          ])
          const [imageData, priceData] = await Promise.all([
            imageResponse.json(),
            priceResponse.json()
          ])

          newRecommendations.push({
            title: productName,
            url,
            imageUrl: imageData.imageUrl,
            price: priceData.price ? `$${priceData.price}` : undefined
          })
        } catch (error) {
          console.error('Error fetching product data:', error)
          // Add the product even without an image/price
          newRecommendations.push({
            title: productName,
            url,
            imageUrl: '/images/daydreamers-dog-training-logo.webp'
          })
        }
      }

      // Cache the recommendations
      recommendationsCache.set(cacheKey, {
        data: newRecommendations,
        timestamp: Date.now()
      })

      setRecommendations(newRecommendations)
      setIsLoadingImages(false)
    }

    fetchProductImages()
  }, [recommendedProducts, productUrls, cacheKey])

  const isLoadingAll = isLoadingReportCards || isLoadingProductUrls || isLoadingImages

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-fredoka font-light">Product Recommendations</CardTitle>
        <Link href="/resources">
          <Button variant="ghost" size="sm" className="font-quicksand">View all</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoadingAll ? (
          <div className="text-center text-muted-foreground font-quicksand">
            Loading recommendations...
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center text-muted-foreground font-quicksand">
            No product recommendations yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((product) => (
              <Link
                key={product.url}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors hover:bg-muted"
              >
                <div className="relative w-full aspect-square mb-2">
                  <Image
                    src={product.imageUrl || '/images/daydreamers-dog-training-logo.webp'}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-fredoka font-light line-clamp-2">
                  {product.title}
                </span>
                {product.price && (
                  <span className="text-sm text-muted-foreground font-quicksand mt-1">
                    {product.price}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 