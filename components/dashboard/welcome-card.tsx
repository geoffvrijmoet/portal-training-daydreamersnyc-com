"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"

export function WelcomeCard() {
  const { user, isLoaded } = useUser()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-fredoka font-light">
          Welcome back, {" "}
          <span 
            className={`inline-block transition-all duration-500 delay-[50ms] transform
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {isLoaded ? user?.firstName || 'Friend' : 'Friend'}!
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground font-quicksand">
          Below you'll find report cards from past training sessions and other resources.
        </p>
      </CardContent>
    </Card>
  )
} 