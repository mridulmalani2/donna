import { Assets } from "@/lib/data/types";
import { formatCurrency } from "@/lib/data/clients";
import CollapsibleSection from "./CollapsibleSection";

interface AssetsOverviewProps {
  assets: Assets;
}

// Generate asset signal summary
function generateAssetSignal(assets: Assets): string {
  const { recentChange, dominantExposure, allocation } = assets;

  // Check for concentration risk
  const maxAllocation = Math.max(
    allocation.equities,
    allocation.fixedIncome,
    allocation.alternatives,
    allocation.cash
  );

  if (maxAllocation >= 70) {
    return `Heavy concentration in ${dominantExposure} (${maxAllocation}%) — diversification risk`;
  }

  if (recentChange) {
    const direction = recentChange.direction === "increase" ? "up" : "down";
    const signal = recentChange.direction === "increase" ? "growth" : "withdrawal";
    return `Portfolio ${direction} ${formatCurrency(Math.abs(recentChange.amount))} over ${recentChange.timeframe} — ${signal} signal`;
  }

  return `Stable portfolio with ${dominantExposure} exposure`;
}

export default function AssetsOverview({ assets }: AssetsOverviewProps) {
  const assetSignal = generateAssetSignal(assets);

  // Determine if there's a concentration warning
  const maxAllocation = Math.max(
    assets.allocation.equities,
    assets.allocation.fixedIncome,
    assets.allocation.alternatives,
    assets.allocation.cash
  );
  const hasConcentrationRisk = maxAllocation >= 70;

  const summary = (
    <div className="space-y-3">
      {/* AUM - Always visible */}
      <div className="mb-4">
        <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Total AUM</p>
        <p className="font-heading text-2xl font-bold text-donna-cyan">{formatCurrency(assets.totalAUM)}</p>
      </div>

      {/* Signal Line */}
      <p className="font-body text-sm text-donna-text-secondary leading-relaxed">
        {assetSignal}
      </p>

      {/* Concentration Warning if applicable */}
      {hasConcentrationRisk && (
        <div className="flex items-start gap-2 mt-2 p-2 bg-donna-amber/10 border border-donna-amber/30 rounded">
          <svg className="w-4 h-4 text-donna-amber flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="font-body text-xs text-donna-amber">Concentration risk detected</span>
        </div>
      )}
    </div>
  );

  return (
    <CollapsibleSection
      title="Assets Overview"
      summary={summary}
      defaultExpanded={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div>
          <h3 className="font-heading text-sm font-medium text-donna-text-primary mb-4">Asset Allocation</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-body text-sm mb-1.5">
                <span className="text-donna-text-secondary">Equities</span>
                <span className="font-heading font-semibold text-donna-text-primary">{assets.allocation.equities}%</span>
              </div>
              <div className="w-full bg-donna-bg-secondary rounded-full h-1.5">
                <div
                  className="bg-donna-cyan h-1.5 rounded-full glow-cyan"
                  style={{ width: `${assets.allocation.equities}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body text-sm mb-1.5">
                <span className="text-donna-text-secondary">Fixed Income</span>
                <span className="font-heading font-semibold text-donna-text-primary">{assets.allocation.fixedIncome}%</span>
              </div>
              <div className="w-full bg-donna-bg-secondary rounded-full h-1.5">
                <div
                  className="bg-donna-blue h-1.5 rounded-full"
                  style={{ width: `${assets.allocation.fixedIncome}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body text-sm mb-1.5">
                <span className="text-donna-text-secondary">Alternatives</span>
                <span className="font-heading font-semibold text-donna-text-primary">{assets.allocation.alternatives}%</span>
              </div>
              <div className="w-full bg-donna-bg-secondary rounded-full h-1.5">
                <div
                  className="bg-donna-text-secondary h-1.5 rounded-full"
                  style={{ width: `${assets.allocation.alternatives}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-body text-sm mb-1.5">
                <span className="text-donna-text-secondary">Cash</span>
                <span className="font-heading font-semibold text-donna-text-primary">{assets.allocation.cash}%</span>
              </div>
              <div className="w-full bg-donna-bg-secondary rounded-full h-1.5">
                <div
                  className="bg-donna-text-tertiary h-1.5 rounded-full"
                  style={{ width: `${assets.allocation.cash}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-medium text-donna-text-primary mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Dominant Exposure</p>
              <p className="font-body text-sm text-donna-text-secondary">{assets.dominantExposure}</p>
            </div>
            {assets.recentChange && (
              <div>
                <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-1">Recent Change</p>
                <div className={`font-heading text-sm font-semibold ${
                  assets.recentChange.direction === "increase" ? "text-donna-cyan" : "text-donna-red"
                }`}>
                  {assets.recentChange.direction === "increase" ? "+" : ""}
                  {formatCurrency(Math.abs(assets.recentChange.amount))} ({assets.recentChange.percentage}%)
                  <span className="font-body text-xs text-donna-text-tertiary font-normal ml-1">
                    over {assets.recentChange.timeframe}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
