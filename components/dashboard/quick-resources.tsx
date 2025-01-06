"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, FolderOpen, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

export function QuickResources() {
  const resources = [
    {
      id: 1,
      title: "Training Materials",
      icon: FileText,
      href: "/resources/training",
    },
    {
      id: 2,
      title: "Google Drive Folder",
      icon: FolderOpen,
      href: "#", // This will be replaced with actual Google Drive link
    },
    {
      id: 3,
      title: "Product Recommendations",
      icon: LinkIcon,
      href: "/resources/products",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-fredoka font-light">Quick Access</CardTitle>
        <Link href="/resources">
          <Button variant="ghost" size="sm" className="font-quicksand">View all</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Link
                key={resource.id}
                href={resource.href}
                className="flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-colors hover:bg-muted"
              >
                <Icon className="mb-2 h-6 w-6 text-primary" />
                <span className="text-sm font-fredoka font-light">{resource.title}</span>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 