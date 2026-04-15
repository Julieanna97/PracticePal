// src/components/StatsCharts.tsx
"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Last7DaysData {
  day: string;
  dayName: string;
  minutes: number;
}

interface Last30DaysData {
  date: string;
  minutes: number;
}

interface TopPlan {
  planTitle: string;
  minutes: number;
  count: number;
}

interface StatsChartsProps {
  last7Days: Last7DaysData[];
  last30Days: Last30DaysData[];
  topPlans: TopPlan[];
  totalSessions: number;
}

const COLORS = ["#a855f7", "#c084fc", "#d8b4fe", "#e9d5ff", "#7c3aed"];

export default function StatsCharts({ last7Days, last30Days, topPlans, totalSessions }: StatsChartsProps) {
  if (totalSessions === 0) return null;

  const totalMinutes30Days = last30Days.reduce((sum, d) => sum + d.minutes, 0);
  const avgDaily = Math.round(totalMinutes30Days / 30);

  // Prepare pie chart data
  const pieData = topPlans.slice(0, 5).map(p => ({
    name: p.planTitle,
    value: p.minutes,
    count: p.count
  }));

  return (
    <>
      {/* Charts Grid */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 mb-8">
        {/* Weekly Bar Chart */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Last 7 Days</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis dataKey="dayName" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #f3e8ff', 
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#a855f7' }}
              />
              <Bar dataKey="minutes" fill="url(#colorBlue)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Line Chart */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Last 30 Days</h2>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50 rounded-2xl p-4 border-2 border-indigo-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total</p>
              <p className="text-2xl font-extrabold text-indigo-700">{totalMinutes30Days}</p>
              <p className="text-xs text-gray-500 mt-1">minutes</p>
            </div>
            <div className="bg-fuchsia-50 rounded-2xl p-4 border-2 border-fuchsia-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Daily Avg</p>
              <p className="text-2xl font-extrabold text-fuchsia-700">{avgDaily}</p>
              <p className="text-xs text-gray-500 mt-1">minutes</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={last30Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                style={{ fontSize: '10px' }}
                interval="preserveStartEnd"
                tickCount={3}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #f3e8ff', 
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#a855f7' }}
              />
              <Line 
                type="monotone" 
                dataKey="minutes" 
                stroke="#a855f7" 
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Practice Plans Distribution */}
      {topPlans.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Top Practice Plans</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Pie Chart */}
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #f3e8ff', 
                      borderRadius: '12px',
                      padding: '8px 12px'
                    }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value} min (${props.payload.count} sessions)`,
                      props.payload.name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {topPlans.slice(0, 5).map((p, i) => {
                const total = topPlans.reduce((sum, pl) => sum + pl.minutes, 0);
                const percentage = Math.round((p.minutes / total) * 100);
                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:border-purple-300 transition-all">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate text-sm">{p.planTitle}</p>
                      <p className="text-xs text-gray-600">{p.minutes} min • {p.count} sessions • {percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

