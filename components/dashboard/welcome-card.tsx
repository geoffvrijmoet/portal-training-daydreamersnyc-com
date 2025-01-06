"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"

export function WelcomeCard() {
  const { user } = useUser()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-fredoka font-light">Welcome back, {user?.firstName || 'Friend'}!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground font-quicksand">
          Access your training materials, report cards, and resources all in one place.
        </p>
      </CardContent>
    </Card>
  )
} 