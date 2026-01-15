'use client';

interface AssetClass {
  name: string;
  percentage: number;
  value: number;
  color: string;
}

interface AssetAllocationProps {
  assets: AssetClass[];
}

export default function AssetAllocation({ assets }: AssetAllocationProps) {
  return (
    <div className="space-y-8">
      {/* Label */}
      <div>
        <span className="text-[11px] text-stone-500 tracking-[0.15em] uppercase font-sans-editorial font-medium">
          Asset Mix
        </span>
      </div>

      {/* Asset Breakdown - Clean List */}
      <div className="space-y-6">
        {assets.map((asset, index) => (
          <div key={index} className="space-y-2">
            {/* Asset Name and Percentage */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-stone-900 font-sans-editorial font-medium">
                {asset.name}
              </span>
              <span className="text-2xl font-serif text-stone-900 tracking-tight">
                {asset.percentage}%
              </span>
            </div>

            {/* Visual Bar - Minimal */}
            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${asset.percentage}%`,
                  backgroundColor: asset.color
                }}
              />
            </div>

            {/* Value - Subtle */}
            <div className="text-xs text-stone-500 font-sans-editorial">
              ${asset.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Change - Small Callout */}
      <div className="pt-6 border-t border-stone-200">
        <div className="space-y-1">
          <div className="text-xs text-stone-500 tracking-wide uppercase font-sans-editorial">
            This Month
          </div>
          <div className="text-2xl font-serif text-emerald-700">
            +$43,200
          </div>
        </div>
      </div>
    </div>
  );
}
