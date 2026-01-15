import { PriorityBreakdown as PriorityBreakdownType } from "@/lib/data/types";

interface PriorityBreakdownProps {
  priorityBreakdown: PriorityBreakdownType;
}

export default function PriorityBreakdown({ priorityBreakdown }: PriorityBreakdownProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Priority Score Breakdown</h2>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-navy rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-900">Panic / Sentiment</h3>
          </div>
          <p className="text-sm text-slate-700 ml-4">{priorityBreakdown.panicSentimentExplanation}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-navy rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-900">AUM Level</h3>
          </div>
          <p className="text-sm text-slate-700 ml-4">{priorityBreakdown.aumLevel}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-navy rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-900">Portfolio Movement</h3>
          </div>
          <p className="text-sm text-slate-700 ml-4">{priorityBreakdown.portfolioMovement}</p>
        </div>
        {priorityBreakdown.overdueCheckIn && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <h3 className="text-sm font-semibold text-red-700">Overdue Check-In</h3>
            </div>
            <p className="text-sm text-slate-700 ml-4">
              {priorityBreakdown.overdueCheckInDays} day{priorityBreakdown.overdueCheckInDays !== 1 ? "s" : ""} overdue for quarterly review
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
