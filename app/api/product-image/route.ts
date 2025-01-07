import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return new NextResponse('Missing URL parameter', { status: 400 })
  }

  // Ensure URL uses HTTPS
  const secureUrl = url.replace(/^http:/, 'https:')

  try {
    const response = await fetch(secureUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch product page')
    }

    const html = await response.text()

    // Try to find og:image meta tag
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/)
    if (ogImageMatch) {
      const imageUrl = ogImageMatch[1]
      // Ensure image URL also uses HTTPS
      const secureImageUrl = imageUrl.replace(/^http:/, 'https:')
      return NextResponse.json({ imageUrl: secureImageUrl })
    }

    // Try to find JSON-LD data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">[^]*?<\/script>/)
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1])
        if (jsonLd.image) {
          const imageUrl = Array.isArray(jsonLd.image) ? jsonLd.image[0] : jsonLd.image
          // Ensure image URL also uses HTTPS
          const secureImageUrl = imageUrl.replace(/^http:/, 'https:')
          return NextResponse.json({ imageUrl: secureImageUrl })
        }
      } catch (error) {
        console.error('Error parsing JSON-LD:', error)
      }
    }

    return NextResponse.json({ imageUrl: null })
  } catch (error) {
    console.error('Error fetching product image:', error)
    return new NextResponse('Failed to fetch product image', { status: 500 })
  }
} 