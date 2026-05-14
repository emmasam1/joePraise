import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const donutData = [
  { name: 'Accepted', value: 11, color: '#4f46e5' }, // Purple
  { name: 'In Progress', value: 24, color: '#060853' }, // Navy
  { name: 'Completed', value: 65, color: '#10B981' }, // Emerald
];

const MonthlyRevenueCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-1">Statistics</p>
        <h2 className="text-xl font-bold text-[#060853]">Monthly Revenue</h2>
      </div>

      <div className="flex items-center gap-10">
        <div className="h-62.5 w-full max-w-62.5 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                labelLine={false} // We are rendering custom labels on segments
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <Text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
                      {`${(percent * 100).toFixed(0)}%`}
                    </Text>
                  );
                }}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Central Stats Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-extrabold text-[#060853]">1.05</p>
            <p className="text-xs text-gray-400 mt-1">Average Range</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-6">
          {donutData.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <p className="text-base font-semibold text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenueCard;