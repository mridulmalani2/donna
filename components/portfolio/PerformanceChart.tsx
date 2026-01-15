'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceDataPoint {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="w-full">
      {/* Minimal Label */}
      <div className="mb-6">
        <span className="text-[11px] text-stone-500 tracking-[0.15em] uppercase font-sans-editorial font-medium">
          Performance
        </span>
      </div>

      {/* Chart - Clean, Minimal */}
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B8860B" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#B8860B" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Minimal Grid */}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#78716c', fontSize: 11 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#78716c', fontSize: 11 }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            dx={-10}
          />

          {/* Clean Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: 'none',
              borderRadius: '2px',
              padding: '8px 12px',
              fontSize: '13px'
            }}
            labelStyle={{ color: '#78716c', fontSize: '11px', marginBottom: '4px' }}
            itemStyle={{ color: '#FAFAF8', fontWeight: 500 }}
            formatter={(value: number | undefined) => value ? [`$${value.toLocaleString()}`, 'Value'] : ['', '']}
          />

          {/* Area with Subtle Gradient */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#B8860B"
            strokeWidth={1.5}
            fill="url(#colorValue)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
