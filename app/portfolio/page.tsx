'use client';

import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PerformanceChart from '@/components/portfolio/PerformanceChart';
import AssetAllocation from '@/components/portfolio/AssetAllocation';
import HoldingsList from '@/components/portfolio/HoldingsList';
import InsightBanner from '@/components/portfolio/InsightBanner';

// Mock data for demonstration
const mockPerformanceData = [
  { date: 'Jan', value: 4100000 },
  { date: 'Feb', value: 4150000 },
  { date: 'Mar', value: 4080000 },
  { date: 'Apr', value: 4200000 },
  { date: 'May', value: 4180000 },
  { date: 'Jun', value: 4235000 },
];

const mockAssets = [
  { name: 'Equity', percentage: 52, value: 2198200, color: '#B8860B' },
  { name: 'Fixed Income', percentage: 31, value: 1312650, color: '#78716c' },
  { name: 'Alternative', percentage: 17, value: 719950, color: '#44403c' },
];

const mockHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', value: 234500, change: 1.2 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', value: 198200, change: 0.8 },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', value: 445000, change: 0.3 },
  { symbol: 'BND', name: 'Vanguard Total Bond Market ETF', value: 312000, change: -0.1 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 187300, change: 2.1 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', value: 156800, change: 1.5 },
  { symbol: 'TSLA', name: 'Tesla Inc.', value: 143200, change: -2.3 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', value: 198500, change: 0.4 },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* Minimal Header - Clean, Asymmetric Padding */}
      <header className="border-b border-stone-200 bg-soft-stone">
        <div className="pl-20 pr-12 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-sans-editorial font-semibold text-stone-900 tracking-wide">
              Portfolio
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-xs text-stone-600 hover:text-stone-900 font-sans-editorial font-medium transition-colors"
            >
              ← Back to Dashboard
            </a>
            <button className="text-xs text-stone-600 hover:text-stone-900 font-sans-editorial font-medium transition-colors">
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Asymmetric Editorial Layout */}
      <main>
        {/* Section 1: Hero + Side Elements - ASYMMETRIC */}
        <section className="grid grid-cols-12 gap-0 border-b border-stone-200">
          {/* Portfolio Hero - Dominant Left (65% width) */}
          <div className="col-span-7 border-r border-stone-200">
            <PortfolioHero
              totalValue={4230800}
              dailyChange={101472}
              dailyChangePercent={2.4}
            />
          </div>

          {/* Asset Allocation - Secondary Right (35% width) */}
          <div className="col-span-5 px-12 py-16 bg-soft-stone">
            <AssetAllocation assets={mockAssets} />
          </div>
        </section>

        {/* Section 2: Large Performance Chart - Full Width but Asymmetric Padding */}
        <section className="border-b border-stone-200 bg-white">
          <div className="pl-20 pr-32 py-16">
            <PerformanceChart data={mockPerformanceData} />
          </div>
        </section>

        {/* Section 3: Insight Banner - Full Width, Minimal Height */}
        <section>
          <InsightBanner
            title="Your portfolio is outperforming the S&P 500 by 340 basis points YTD."
            description="Consider rebalancing fixed income allocation to maintain target risk profile as equity positions have grown significantly."
            action={{
              label: 'See Analysis',
              onClick: () => console.log('View analysis'),
            }}
          />
        </section>

        {/* Section 4: Holdings List - Asymmetric with Generous Whitespace */}
        <section className="bg-warm-ivory">
          <div className="grid grid-cols-12 gap-0">
            {/* Empty Space - Intentional Negative Space (25%) */}
            <div className="col-span-3" />

            {/* Holdings List - Offset Right (75% but not full) */}
            <div className="col-span-7 py-20 pr-20">
              <HoldingsList holdings={mockHoldings} showCount={5} />
            </div>

            {/* Trailing Space */}
            <div className="col-span-2" />
          </div>
        </section>

        {/* Section 5: Footer Spacer - Editorial Breathing Room */}
        <section className="h-32 bg-warm-ivory" />
      </main>
    </div>
  );
}
