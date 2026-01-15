import { Assets } from "@/lib/data/types";
import { formatCurrency } from "@/lib/data/clients";

interface AssetsOverviewProps {
  assets: Assets;
}

export default function AssetsOverview({ assets }: AssetsOverviewProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Assets Overview</h2>

      <div className="mb-6">
        <p className="text-xs text-slate-500 mb-1">Total Assets Under Management</p>
        <p className="text-3xl font-bold text-navy">{formatCurrency(assets.totalAUM)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Asset Allocation</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">Equities</span>
                <span className="font-semibold text-slate-900">{assets.allocation.equities}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-navy h-2 rounded-full"
                  style={{ width: `${assets.allocation.equities}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">Fixed Income</span>
                <span className="font-semibold text-slate-900">{assets.allocation.fixedIncome}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-slate-600 h-2 rounded-full"
                  style={{ width: `${assets.allocation.fixedIncome}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">Alternatives</span>
                <span className="font-semibold text-slate-900">{assets.allocation.alternatives}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-slate-400 h-2 rounded-full"
                  style={{ width: `${assets.allocation.alternatives}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">Cash</span>
                <span className="font-semibold text-slate-900">{assets.allocation.cash}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-slate-300 h-2 rounded-full"
                  style={{ width: `${assets.allocation.cash}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Key Metrics</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Dominant Exposure</p>
              <p className="text-sm text-slate-700">{assets.dominantExposure}</p>
            </div>
            {assets.recentChange && (
              <div>
                <p className="text-xs text-slate-500 mb-1">Recent Change</p>
                <div className={`text-sm font-semibold ${
                  assets.recentChange.direction === "increase" ? "text-green-600" : "text-red-600"
                }`}>
                  {assets.recentChange.direction === "increase" ? "+" : ""}
                  {formatCurrency(Math.abs(assets.recentChange.amount))} ({assets.recentChange.percentage}%)
                  <span className="text-xs text-slate-500 font-normal ml-1">
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
