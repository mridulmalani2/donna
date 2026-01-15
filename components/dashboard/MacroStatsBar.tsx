"use client";

import { useTranslation } from "@/lib/context/LanguageContext";

interface MacroStatsBarProps {
  totalClients: number;
  totalAUM: number;
  panicClients: number;
  avgPriorityScore: number;
}

export default function MacroStatsBar({
  totalClients,
  totalAUM,
  panicClients,
  avgPriorityScore,
}: MacroStatsBarProps) {
  const { t } = useTranslation();

  // Format AUM for display
  const formatAUM = (amount: number): string => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    }
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="relative px-8 py-6 mb-12">
      {/* Floating container with subtle background */}
      <div className="flex items-center justify-between gap-8 max-w-screen-2xl mx-auto">
        {/* Stat 1: Total Clients */}
        <div className="stat-item flex-shrink-0">
          <div className="stat-value font-heading text-5xl font-bold text-donna-text-primary mb-1 glow-cyan">
            {totalClients}
          </div>
          <div className="stat-label font-heading text-xs uppercase tracking-wider text-donna-text-tertiary">
            {t.totalClients}
          </div>
        </div>

        {/* Stat 2: Total AUM */}
        <div className="stat-item flex-shrink-0 ml-8">
          <div className="stat-value font-heading text-5xl font-bold text-donna-text-primary mb-1 glow-cyan">
            {formatAUM(totalAUM)}
          </div>
          <div className="stat-label font-heading text-xs uppercase tracking-wider text-donna-text-tertiary">
            {t.totalAUM}
          </div>
        </div>

        {/* Stat 3: Panic Indicators */}
        <div className={`stat-item flex-shrink-0 ml-12 ${panicClients > 0 ? 'glow-red' : ''}`}>
          <div className={`stat-value font-heading text-5xl font-bold mb-1 ${panicClients > 0 ? 'text-donna-red' : 'text-donna-text-primary'}`}>
            {panicClients}
          </div>
          <div className="stat-label font-heading text-xs uppercase tracking-wider text-donna-text-tertiary flex items-center gap-2">
            {panicClients > 0 && (
              <span className="w-2 h-2 bg-donna-red rounded-full animate-pulse"></span>
            )}
            {t.panicIndicators}
          </div>
        </div>

        {/* Stat 4: Average Priority Score */}
        <div className="stat-item flex-shrink-0 ml-8">
          <div className="stat-value font-heading text-5xl font-bold text-donna-cyan mb-1">
            {avgPriorityScore}
          </div>
          <div className="stat-label font-heading text-xs uppercase tracking-wider text-donna-text-tertiary">
            {t.avgPriorityScore}
          </div>
        </div>

        {/* Spacer to push content left if needed */}
        <div className="flex-grow"></div>
      </div>
    </div>
  );
}
