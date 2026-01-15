"use client";

import { useState, ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  summary: string | ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  variant?: "default" | "muted";
}

export default function CollapsibleSection({
  title,
  summary,
  children,
  defaultExpanded = false,
  variant = "default",
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const headerClasses = variant === "muted"
    ? "font-heading text-sm uppercase tracking-wider text-donna-text-tertiary/60"
    : "font-heading text-base uppercase tracking-wider text-donna-text-tertiary";

  const containerClasses = isExpanded
    ? "bg-donna-bg-secondary/30 border-donna-text-tertiary/20"
    : "bg-transparent border-transparent hover:border-donna-text-tertiary/10";

  return (
    <div className={`rounded-lg border transition-smooth ${containerClasses}`}>
      {/* Header - Always Visible */}
      <button
        onClick={toggleExpanded}
        className="w-full text-left p-4 flex items-start justify-between gap-4 group"
      >
        <div className="flex-1 min-w-0">
          <h2 className={`mb-2 pb-1 ${headerClasses} ${isExpanded ? '' : 'border-b border-donna-text-tertiary/10'}`}>
            {title}
          </h2>

          {/* Summary - Only visible when collapsed */}
          {!isExpanded && (
            <div className="font-body text-sm text-donna-text-secondary leading-relaxed">
              {summary}
            </div>
          )}
        </div>

        {/* Expand/Collapse Icon */}
        <div className="flex-shrink-0 pt-1">
          <svg
            className={`w-5 h-5 text-donna-text-tertiary transition-transform group-hover:text-donna-cyan ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Content - Only visible when expanded */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}

      {/* View Details Hint - Only visible when collapsed */}
      {!isExpanded && (
        <div className="px-4 pb-3">
          <span className="font-body text-xs text-donna-cyan/60 hover:text-donna-cyan transition-smooth">
            Click to expand details
          </span>
        </div>
      )}
    </div>
  );
}
