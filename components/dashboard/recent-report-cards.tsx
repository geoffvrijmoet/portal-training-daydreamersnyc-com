"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useReportCards } from "@/hooks/use-report-cards"
import { useState } from "react"
import { cn, formatHtmlContent, getLastName } from "@/lib/utils"
import { type ReportCard } from "@/lib/mongodb"
import { format } from "date-fns"
import Image from "next/image"

interface FormattedDescriptionProps {
  html: string
}

function FormattedDescription({ html }: FormattedDescriptionProps) {
  const { text, links } = formatHtmlContent(html)
  
  if (links.length === 0) return <span>{text}</span>

  return (
    <span>
      {text.split('').map((char, i) => {
        const link = links.find(l => 
          l.text.includes(char) && 
          text.indexOf(l.text) <= i && 
          text.indexOf(l.text) + l.text.length > i
        )
        
        if (link) {
          return (
            <a 
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {char}
            </a>
          )
        }
        return char
      })}
    </span>
  )
}

export function RecentReportCards() {
  const { reportCards, isLoading } = useReportCards()
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null)

  // Get the 3 most recent report cards
  const recentReportCards = reportCards?.slice(0, 3)

  const toggleExpand = (reportId: string) => {
    setExpandedReportId(expandedReportId === reportId ? null : reportId)
  }

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
          {isLoading ? (
            <p className="text-muted-foreground font-quicksand">Loading report cards...</p>
          ) : recentReportCards?.length === 0 ? (
            <p className="text-muted-foreground font-quicksand">No report cards found.</p>
          ) : (
            recentReportCards?.map((report) => (
              <div
                key={report._id}
                className={cn(
                  "rounded-lg border transition-all duration-200",
                  expandedReportId === report._id ? "bg-muted" : ""
                )}
              >
                <div
                  onClick={() => toggleExpand(report._id)}
                  className="flex items-center space-x-4 p-4 cursor-pointer hover:bg-muted"
                >
                  <FileText className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="font-fredoka font-light leading-none">
                      Training Session - {format(new Date(report.date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground font-quicksand">
                      <FormattedDescription html={report.description} />
                    </p>
                  </div>
                  {expandedReportId === report._id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                
                {expandedReportId === report._id && (
                  <div className="px-4 pb-4 space-y-6 font-fredoka font-light border-t pt-4 mx-4">
                    <div className="flex justify-center mb-6">
                      <div className="relative h-[100px] w-[400px]">
                        <Image
                          src="/images/report-card-training-transp-bg.png"
                          alt="Daydreamers Dog Training"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Dog&apos;s Name:</span> {report.dogName} {getLastName(report.clientName)}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span> {format(new Date(report.date), 'MMMM d, yyyy')}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">Summary:</p>
                      <p className="whitespace-pre-wrap">
                        <FormattedDescription html={report.content} />
                      </p>
                    </div>

                    {report.selectedItems?.map(group => (
                      <div key={group.category} className="space-y-2">
                        <p className="font-medium">{group.category}:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {group.items?.map((item, index) => (
                            <li key={index}>
                              <span className="font-medium">{item.title}</span>:&nbsp;
                              <FormattedDescription html={item.description} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {report.productRecommendations?.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">Product Recommendations:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {report.productRecommendations.map((product, index) => (
                            <li key={index}>{product}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 