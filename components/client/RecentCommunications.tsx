"use client";

import { useState } from "react";
import { Communication } from "@/lib/data/types";
import { formatDate } from "@/lib/data/clients";

interface RecentCommunicationsProps {
  communications: Communication[];
}

export default function RecentCommunications({ communications }: RecentCommunicationsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return "✉";
      case "phone":
        return "☎";
      case "in-person":
        return "👤";
      case "video-call":
        return "📹";
      default:
        return "💬";
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      case "neutral":
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Show last 5 communications
  const recentComms = communications.slice(0, 5);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Communications</h2>
      <div className="space-y-4">
        {recentComms.map((comm, index) => (
          <div
            key={index}
            className="border-l-4 border-navy pl-4 py-2"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getChannelIcon(comm.channel)}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {comm.channel.replace("-", " ")}
                </span>
                {comm.sentiment && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSentimentColor(comm.sentiment)}`}>
                    {comm.sentiment}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500">{formatDate(comm.date)}</span>
            </div>
            <p className="text-sm text-slate-700 mb-2">{comm.summary}</p>
            {comm.fullContent && (
              <>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-xs text-navy hover:underline font-medium"
                >
                  {expandedIndex === index ? "Hide details" : "View full content"}
                </button>
                {expandedIndex === index && (
                  <div className="mt-3 p-3 bg-slate-50 rounded text-xs text-slate-700 leading-relaxed border border-slate-200">
                    {comm.fullContent}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
