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
import { useReportCards } from "@/hooks/use-report-cards"

export function ReportCardList() {
  const [search, setSearch] = React.useState("")
  const [sortBy, setSortBy] = React.useState("newest")
  const { reportCards, isLoading, error } = useReportCards()

  const filteredReportCards = React.useMemo(() => {
    return (reportCards || [])
      .filter((report) =>
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.description?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortBy === "newest" ? dateB - dateA : dateA - dateB
      })
  }, [reportCards, search, sortBy])

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-red-500 font-quicksand">Error loading report cards: {error}</p>
        </CardContent>
      </Card>
    )
  }

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
          {isLoading ? (
            <p className="text-muted-foreground font-quicksand">Loading report cards...</p>
          ) : filteredReportCards.length === 0 ? (
            <p className="text-muted-foreground font-quicksand">No report cards found.</p>
          ) : (
            filteredReportCards.map((report) => (
              <Link
                key={report._id}
                href={`/report-cards/${report._id}`}
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 