'use client';

interface PortfolioHeroProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
}

export default function PortfolioHero({ totalValue, dailyChange, dailyChangePercent }: PortfolioHeroProps) {
  const isPositive = dailyChange >= 0;

  // Format large numbers with M/B suffix
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return {
        main: (value / 1000000).toFixed(2),
        suffix: 'M'
      };
    }
    return {
      main: value.toLocaleString(),
      suffix: ''
    };
  };

  const { main, suffix } = formatValue(totalValue);

  return (
    <div className="pl-20 pt-16 pb-12">
      {/* Hero Number - Large Serif Typography */}
      <div className="mb-3">
        <span className="font-serif text-[5.5rem] leading-none tracking-tight text-stone-900">
          ${main}
          {suffix && <span className="text-6xl text-stone-700">{suffix}</span>}
        </span>
      </div>

      {/* Label - Small Caps */}
      <div className="mb-6">
        <span className="text-[11px] text-stone-500 tracking-[0.15em] uppercase font-sans-editorial font-medium">
          Portfolio Value
        </span>
      </div>

      {/* Daily Change - Minimal, Editorial */}
      <div className="inline-flex items-baseline gap-3">
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-700' : 'text-red-700'}`}>
          {isPositive ? '+' : ''}{dailyChangePercent.toFixed(2)}%
        </span>
        <span className="text-sm text-stone-500 font-sans-editorial">
          {isPositive ? '+' : ''}{dailyChange.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} today
        </span>
      </div>
    </div>
  );
}
