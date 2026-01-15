import { Assets } from "@/lib/data/types";
import { formatCurrency } from "@/lib/data/clients";

interface AssetsOverviewProps {
  assets: Assets;
}

export default function AssetsOverview({ assets }: AssetsOverviewProps) {
  return (
    <div>
      <h2 className="font-heading text-base uppercase tracking-wider text-donna-text-tertiary mb-4 pb-2 border-b border-donna-text-tertiary/20">
        Assets Overview
      </h2>

      <div className="mb-6">
        <p className="font-heading text-xs uppercase tracking-wider text-donna-text-tertiary mb-2">Total Assets Under Management</p>
        <p className="font-heading text-4xl font-bold text-donna-cyan glow-cyan">{formatCurrency(assets.totalAUM)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    </div>
  );
}
