"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText } from "lucide-react"
import Link from "next/link"

export function ReportCardList() {
  const [search, setSearch] = React.useState("")
  const [sortBy, setSortBy] = React.useState("newest")

  // This will be replaced with actual data fetching
  const mockReportCards = [
    {
      id: 1,
      date: "2024-01-05",
      title: "Training Session #1",
      description: "Basic obedience and leash training",
    },
    {
      id: 2,
      date: "2024-01-03",
      title: "Training Session #2",
      description: "Advanced commands and socialization",
    },
    // Add more mock data as needed
  ]

  const filteredReportCards = mockReportCards
    .filter((report) =>
      report.title.toLowerCase().includes(search.toLowerCase()) ||
      report.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-fredoka font-light">Report Cards</CardTitle>
        <div className="flex items-center space-x-4 pt-4">
          <Input
            placeholder="Search report cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm font-quicksand"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] font-quicksand">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest" className="font-quicksand">Newest First</SelectItem>
              <SelectItem value="oldest" className="font-quicksand">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredReportCards.map((report) => (
            <Link
              key={report.id}
              href={`/report-cards/${report.id}`}
              className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <FileText className="h-6 w-6 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="font-fredoka font-light leading-none">{report.title}</p>
                <p className="text-sm text-muted-foreground font-quicksand">
                  {report.description}
                </p>
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