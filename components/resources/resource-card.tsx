"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  link: string
  type: "link" | "download"
  icon?: React.ReactNode
}

export function ResourceCard({
  title,
  description,
  link,
  type,
  icon,
}: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-fredoka font-light">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 font-quicksand">{description}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full font-quicksand"
          onClick={() => window.open(link, "_blank")}
        >
          {type === "link" ? (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Link
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
} 