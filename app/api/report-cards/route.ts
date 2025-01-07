import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import clientPromise from '@/lib/mongodb'
import type { ReportCard, Client } from '@/lib/mongodb'

export async function GET() {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('User details:', {
      userId,
      name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : undefined,
      emailAddresses: user.emailAddresses.map(email => email.emailAddress)
    })

    console.log('Attempting to connect to MongoDB...')
    const client = await clientPromise
    console.log('MongoDB connection successful')
    
    const db = client.db()
    console.log('Using database:', db.databaseName)
    
    // Find the client using multi-tiered authentication
    const clientsCollection = db.collection<Client>('clients')
    
    // Try to find client by Clerk ID first
    let dbClient = await clientsCollection.findOne({ clerkId: userId })
    console.log('Clerk ID search result:', dbClient ? 'Found' : 'Not found')
    
    // If not found, try to find by email
    if (!dbClient && user.emailAddresses.length > 0) {
      const userEmails = user.emailAddresses.map(email => email.emailAddress)
      console.log('Searching by emails:', userEmails)
      
      dbClient = await clientsCollection.findOne({
        email: { $in: userEmails }
      })
      console.log('Email search result:', dbClient ? 'Found' : 'Not found')
    }
    
    // If still not found, try to find by full name
    if (!dbClient && user.firstName && user.lastName) {
      const fullName = `${user.firstName} ${user.lastName}`
      console.log('Searching by full name:', fullName)
      
      dbClient = await clientsCollection.findOne({
        name: fullName
      })
      console.log('Name search result:', dbClient ? 'Found' : 'Not found')

      // If exact match fails, try case-insensitive match
      if (!dbClient) {
        console.log('Trying case-insensitive name search')
        dbClient = await clientsCollection.findOne({
          name: { $regex: new RegExp(`^${fullName}$`, 'i') }
        })
        console.log('Case-insensitive name search result:', dbClient ? 'Found' : 'Not found')
      }
    }
    
    if (!dbClient) {
      console.log('No client found for user:', userId)
      return new NextResponse('Client not found', { status: 404 })
    }
    
    // Get all report cards for this client
    console.log('Querying report_cards collection for clientId:', dbClient._id)
    const reportCards = await db
      .collection<ReportCard>('report_cards')
      .find({ clientId: dbClient._id.toString() })
      .sort({ date: -1 })
      .toArray()

    console.log('Report Cards found:', reportCards.length)
    
    return NextResponse.json(reportCards)
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    })
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 