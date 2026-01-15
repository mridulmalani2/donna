'use client';

interface InsightBannerProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function InsightBanner({ title, description, action }: InsightBannerProps) {
  return (
    <div className="bg-stone-900 text-warm-ivory px-12 py-8">
      <div className="flex items-start justify-between gap-8">
        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Icon/Indicator - Minimal */}
          <div className="inline-flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span className="text-[10px] tracking-[0.15em] uppercase font-sans-editorial text-stone-400">
              Insight
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif text-warm-ivory leading-snug max-w-2xl">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm font-sans-editorial text-stone-400 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Action - Minimal Link */}
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-sans-editorial font-medium text-bronze hover:text-bronze-dark transition-colors whitespace-nowrap"
          >
            {action.label} →
          </button>
        )}
      </div>
    </div>
  );
}
