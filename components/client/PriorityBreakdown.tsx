import { PriorityBreakdown as PriorityBreakdownType } from "@/lib/data/types";
import CollapsibleSection from "./CollapsibleSection";

interface PriorityBreakdownProps {
  priorityBreakdown: PriorityBreakdownType;
}

export default function PriorityBreakdown({ priorityBreakdown }: PriorityBreakdownProps) {
  const summary = "View detailed factors contributing to priority score";

  return (
    <CollapsibleSection
      title="Priority Score Breakdown"
      summary={summary}
      defaultExpanded={false}
      variant="muted"
    >
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
    </CollapsibleSection>
  );
}
