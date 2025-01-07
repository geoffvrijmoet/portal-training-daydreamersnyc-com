import { MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// Ensure the URI uses the srv protocol
const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  retryWrites: true
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Types for our Client
export interface Client {
  _id: string
  clerkId?: string
  name: string
  email: string[]
  dogName: string
  createdAt: Date
  updatedAt: Date
}

// Types for our Report Card
export interface ReportCard {
  _id: string
  clientId: string
  dogName: string
  date: Date
  title: string
  description: string
  content: string
  trainingGoals: string[]
  progress: {
    [key: string]: number
  }
  productRecommendations: string[]
  nextSteps: string[]
  attachments?: {
    type: 'video' | 'image' | 'document'
    url: string
    title: string
  }[]
  createdAt: Date
  updatedAt: Date
} 