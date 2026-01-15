'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Holding {
  symbol: string;
  name: string;
  value: number;
  change: number;
}

interface HoldingsListProps {
  holdings: Holding[];
  showCount?: number;
}

export default function HoldingsList({ holdings, showCount = 5 }: HoldingsListProps) {
  const [expanded, setExpanded] = useState(false);
  const displayHoldings = expanded ? holdings : holdings.slice(0, showCount);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] text-stone-500 tracking-[0.15em] uppercase font-sans-editorial font-medium">
          Top Holdings
        </span>
        {holdings.length > showCount && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-stone-600 hover:text-stone-900 font-sans-editorial font-medium transition-colors"
          >
            {expanded ? 'Show Less' : `View All ${holdings.length} →`}
          </button>
        )}
      </div>

      {/* Holdings List - Clean, No Borders */}
      <div className="space-y-0">
        <AnimatePresence initial={false}>
          {displayHoldings.map((holding, index) => (
            <motion.div
              key={holding.symbol}
              initial={expanded ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="group py-5 border-b border-stone-200 last:border-b-0"
            >
              <div className="flex items-center justify-between gap-6">
                {/* Symbol and Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-sans-editorial font-semibold text-stone-900">
                      {holding.symbol}
                    </span>
                    <span className="text-xs text-stone-500 font-sans-editorial truncate">
                      {holding.name}
                    </span>
                  </div>
                </div>

                {/* Value */}
                <div className="text-right">
                  <div className="text-sm font-sans-editorial font-medium text-stone-900">
                    ${holding.value.toLocaleString()}
                  </div>
                </div>

                {/* Change */}
                <div className="text-right w-16">
                  <span
                    className={`text-xs font-medium ${
                      holding.change >= 0 ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
