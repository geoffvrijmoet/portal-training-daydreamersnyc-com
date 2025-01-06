"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"

export function RecentReportCards() {
  // This will be replaced with actual data fetching
  const mockReportCards = [
    {
      id: 1,
      date: "2024-01-05",
      title: "Training Session #1",
    },
    {
      id: 2,
      date: "2024-01-03",
      title: "Training Session #2",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-fredoka font-light">Recent Report Cards</CardTitle>
        <Link href="/report-cards">
          <Button variant="ghost" size="sm" className="font-quicksand">View all</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockReportCards.map((report) => (
            <Link 
              key={report.id}
              href={`/report-cards/${report.id}`}
              className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <FileText className="h-6 w-6 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="font-fredoka font-light leading-none">{report.title}</p>
                <p className="text-sm text-muted-foreground font-quicksand">
                  {new Date(report.date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 