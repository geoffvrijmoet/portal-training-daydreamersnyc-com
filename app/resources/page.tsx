"use client"

import { ResourceCard } from "@/components/resources/resource-card"
import { FileText, ShoppingBag, FolderOpen } from "lucide-react"

export default function ResourcesPage() {
  // This will be replaced with actual data fetching
  const trainingResources = [
    {
      title: "Basic Training Guide",
      description: "A comprehensive guide to basic dog training techniques",
      link: "#",
      type: "download" as const,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Leash Training Tips",
      description: "Essential tips for successful leash training",
      link: "#",
      type: "download" as const,
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  const productRecommendations = [
    {
      title: "Recommended Leash",
      description: "High-quality leash perfect for training",
      link: "#",
      type: "link" as const,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Training Treats",
      description: "Healthy treats ideal for positive reinforcement",
      link: "#",
      type: "link" as const,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-fredoka font-light tracking-tight">Resources</h2>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-fredoka font-light mb-4">Training Materials</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainingResources.map((resource) => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
            <ResourceCard
              title="Google Drive Folder"
              description="Access all your shared training materials"
              link="#"
              type="link"
              icon={<FolderOpen className="h-5 w-5" />}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-fredoka font-light mb-4">Product Recommendations</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productRecommendations.map((resource) => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 