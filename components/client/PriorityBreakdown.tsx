import { PriorityBreakdown as PriorityBreakdownType } from "@/lib/data/types";

interface PriorityBreakdownProps {
  priorityBreakdown: PriorityBreakdownType;
}

export default function PriorityBreakdown({ priorityBreakdown }: PriorityBreakdownProps) {
  return (
    <div>
      <h2 className="font-heading text-base uppercase tracking-wider text-donna-text-tertiary mb-4 pb-2 border-b border-donna-text-tertiary/20">
        Priority Score Breakdown
      </h2>
      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-donna-cyan rounded-full"></div>
            <h3 className="font-heading text-sm font-medium text-donna-text-primary">Panic / Sentiment</h3>
          </div>
          <p className="font-body text-sm text-donna-text-secondary ml-4">{priorityBreakdown.panicSentimentExplanation}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-donna-cyan rounded-full"></div>
            <h3 className="font-heading text-sm font-medium text-donna-text-primary">AUM Level</h3>
          </div>
          <p className="font-body text-sm text-donna-text-secondary ml-4">{priorityBreakdown.aumLevel}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-donna-cyan rounded-full"></div>
            <h3 className="font-heading text-sm font-medium text-donna-text-primary">Portfolio Movement</h3>
          </div>
          <p className="font-body text-sm text-donna-text-secondary ml-4">{priorityBreakdown.portfolioMovement}</p>
        </div>
        {priorityBreakdown.overdueCheckIn && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-donna-red rounded-full animate-pulse"></div>
              <h3 className="font-heading text-sm font-medium text-donna-red">Overdue Check-In</h3>
            </div>
            <p className="font-body text-sm text-donna-text-secondary ml-4">
              {priorityBreakdown.overdueCheckInDays} day{priorityBreakdown.overdueCheckInDays !== 1 ? "s" : ""} overdue for quarterly review
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
