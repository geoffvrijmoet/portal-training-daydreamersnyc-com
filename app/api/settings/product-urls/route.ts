import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()
    
    // Get product recommendations from settings
    const settings = await db.collection('settings').findOne(
      { type: 'training_options' },
      { projection: { productRecommendations: 1 } }
    )

    if (!settings?.productRecommendations) {
      console.log('No product recommendations found in settings')
      return NextResponse.json({})
    }

    console.log('Found product recommendations in settings:', settings.productRecommendations.map(
      (product: any) => ({
        title: product.title,
        url: product.url
      })
    ))

    // Convert array of products to a name -> url mapping
    const productMapping = settings.productRecommendations.reduce((acc: Record<string, string>, product: any) => {
      if (product.title && product.url) {
        console.log(`Mapping product "${product.title}" to URL: ${product.url}`)
        acc[product.title] = product.url
      }
      return acc
    }, {})

    return NextResponse.json(productMapping)
  } catch (error) {
    console.error('Error fetching product URLs:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 