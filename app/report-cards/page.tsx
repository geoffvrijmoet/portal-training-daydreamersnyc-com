import { ReportCardList } from "@/components/report-cards/report-card-list"

export default function ReportCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-fredoka font-light tracking-tight">Report Cards</h2>
      </div>
      <div className="grid gap-6">
        <ReportCardList />
      </div>
    </div>
  )
} 