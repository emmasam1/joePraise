import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

const barData = [
  { name: 'Mon', revenue: 12000 },
  { name: 'Tue', revenue: 32000 },
  { name: 'Wed', revenue: 36000 }, // Peak / Selected Day
  { name: 'Thu', revenue: 20000 },
  { name: 'Fri', revenue: 9000 },
];

const WeeklyRevenueCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="mb-8">
        <p className="text-gray-400 text-sm mb-1">Statistics</p>
        <h2 className="text-xl font-bold text-[#060853]">Weekly revenue</h2>
      </div>

      <div className="h-62.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} barGap={-24} margin={{ left: -30 }}>
            <CartesianGrid vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
            
            <Tooltip
              cursor={{ stroke: '#4f46e5', strokeDasharray: '5 5', strokeWidth: 1.5 }} // Custom cursor line
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="relative">
                      {/* Selection Dot on Bar */}
                      <div className="absolute top-4.5 left-[50%] -translate-x-[50%] w-3 h-3 rounded-full bg-white border-2 border-[#4f46e5] shadow-lg z-20" />
                      {/* Tooltip Bubble */}
                      <div className="bg-white px-4 py-2 rounded-xl shadow-2xl border border-gray-100 font-bold text-[#060853] text-sm animate-in fade-in duration-200">
                        ${payload[0].value.toLocaleString()}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Background Bars (Subtle Grey) */}
            <Bar
              dataKey="max"
              fill="#F8FAFC"
              radius={[10, 10, 10, 10]}
              isAnimationActive={false}
              barSize={24}
              defaultValue={40000} // Hardcoded background height
            />
            {/* Active Bars (Dark Navy) */}
            <Bar
              dataKey="revenue"
              fill="#060853"
              radius={[10, 10, 10, 10]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyRevenueCard;