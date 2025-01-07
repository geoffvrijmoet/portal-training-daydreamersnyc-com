import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return new NextResponse('Missing URL parameter', { status: 400 })
  }

  // Ensure URL uses HTTPS
  const secureUrl = url.replace(/^http:/, 'https:')
  console.log('Fetching price for URL:', secureUrl)

  try {
    const response = await fetch(secureUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch product page')
    }

    const html = await response.text()
    console.log('Successfully fetched HTML content')

    // Try to find price from Shopify's product JSON data (most reliable)
    console.log('Attempting to find price from Shopify product data...')
    const productDataMatch = html.match(/window\.ShopifyAnalytics\.meta\.product = ({[^]*?});/);
    if (productDataMatch) {
      console.log('Found Shopify product data, attempting to parse JSON...')
      try {
        const productData = JSON.parse(productDataMatch[1]);
        console.log('Full Shopify product data:', productData);
        
        if (productData.variants && productData.variants[0]?.price) {
          const price = (parseFloat(productData.variants[0].price)).toFixed(2);
          console.log('Successfully extracted price from Shopify data:', price)
          return NextResponse.json({ price });
        } else {
          console.log('No price found in Shopify product data')
        }
      } catch (error) {
        console.error('Error parsing Shopify product JSON:', error)
      }
    } else {
      console.log('No Shopify product data found in HTML')
    }

    // Try to find price from product.json endpoint
    console.log('Attempting to find price from product.json endpoint...')
    try {
      const productJsonUrl = secureUrl.replace(/\?.*$/, '') + '.json'
      const productResponse = await fetch(productJsonUrl)
      if (productResponse.ok) {
        const productJson = await productResponse.json()
        console.log('Product JSON response:', productJson)
        if (productJson.product?.variants?.[0]?.price) {
          const price = parseFloat(productJson.product.variants[0].price).toFixed(2)
          console.log('Successfully extracted price from product.json:', price)
          return NextResponse.json({ price })
        }
      }
    } catch (error) {
      console.error('Error fetching product.json:', error)
    }

    // Fallback: Try to find price from Shopify's money spans
    console.log('Attempting to find price from money spans...')
    const priceRegex = /<span class="money">\$?([\d,]+\.?\d*)<\/span>/;
    const moneyMatch = html.match(priceRegex);
    if (moneyMatch) {
      console.log('Found price in money span:', moneyMatch[1])
      return NextResponse.json({ price: moneyMatch[1] });
    } else {
      console.log('No money spans found')
    }

    // Last resort: Try to find any price-looking element
    console.log('Attempting to find price from data attributes...')
    const anyPriceRegex = /data-product-price="([\d,]+\.?\d*)"/;
    const anyPriceMatch = html.match(anyPriceRegex);
    if (anyPriceMatch) {
      console.log('Found price in data attribute:', anyPriceMatch[1])
      return NextResponse.json({ price: anyPriceMatch[1] });
    } else {
      console.log('No price found in data attributes')
    }

    console.log('No price found using any method')
    return NextResponse.json({ price: null })
  } catch (error) {
    console.error('Error fetching product price:', error)
    return new NextResponse('Failed to fetch product price', { status: 500 })
  }
} 