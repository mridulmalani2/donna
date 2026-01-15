"use client";

import { useState } from "react";
import { Communication } from "@/lib/data/types";
import { formatDate } from "@/lib/data/clients";
import CollapsibleSection from "./CollapsibleSection";

interface RecentCommunicationsProps {
  communications: Communication[];
}

// Generate communications summary
function generateCommsSummary(communications: Communication[]): string {
  const recent = communications.slice(0, 5);
  const negativeCount = recent.filter(c => c.sentiment === "negative").length;
  const positiveCount = recent.filter(c => c.sentiment === "positive").length;

  if (negativeCount >= 2) {
    return `${recent.length} communications in last 30 days, ${negativeCount} showing negative sentiment`;
  }

  if (positiveCount >= 3) {
    return `${recent.length} communications in last 30 days, sentiment trending positive`;
  }

  return `${recent.length} communications in last 30 days, mixed sentiment`;
}

export default function RecentCommunications({ communications }: RecentCommunicationsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getSentimentStyles = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-donna-cyan/10 text-donna-cyan border-donna-cyan/30";
      case "negative":
        return "bg-donna-red/10 text-donna-red border-donna-red/30";
      case "neutral":
      default:
        return "bg-donna-bg-tertiary text-donna-text-secondary border-donna-text-tertiary/20";
    }
  };

  // Show last 5 communications
  const recentComms = communications.slice(0, 5);
  const summary = generateCommsSummary(communications);

  return (
    <CollapsibleSection
      title="Recent Communications"
      summary={summary}
      defaultExpanded={false}
    >
      <div className="space-y-4">
        {recentComms.map((comm, index) => (
          <div
            key={index}
            className="relative pl-4 py-2 border-l border-donna-cyan/50"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-4 -translate-x-1/2 w-2 h-2 bg-donna-cyan rounded-full"></div>

            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading text-xs uppercase tracking-wide text-donna-text-tertiary">
                  {comm.channel.replace("-", " ")}
                </span>
                {comm.sentiment && (
                  <span className={`font-heading text-xs px-2 py-0.5 rounded border ${getSentimentStyles(comm.sentiment)}`}>
                    {comm.sentiment}
                  </span>
                )}
              </div>
              <span className="font-body text-xs text-donna-text-tertiary">{formatDate(comm.date)}</span>
            </div>
            <p className="font-body text-sm text-donna-text-secondary mb-2">{comm.summary}</p>
            {comm.fullContent && (
              <>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="font-body text-xs text-donna-cyan hover:text-donna-text-primary transition-smooth font-medium"
                >
                  {expandedIndex === index ? "Hide details" : "View full content"}
                </button>
                {expandedIndex === index && (
                  <div className="mt-3 p-3 bg-donna-bg-tertiary rounded font-body text-xs text-donna-text-secondary leading-relaxed border border-donna-text-tertiary/20">
                    {comm.fullContent}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
