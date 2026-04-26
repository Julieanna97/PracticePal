// src/components/StatsCharts.tsx
"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const COLORS = ["#0d3b3a", "#f4a261", "#c9d8c5", "#1a2e2c", "#8b4c16"];

const tooltipStyle = {
  backgroundColor: "#faf6f0",
  border: "1px solid rgba(13, 59, 58, 0.14)",
  borderRadius: "16px",
  padding: "10px 12px",
  color: "#1a2e2c",
  boxShadow: "0 18px 45px rgba(13, 59, 58, 0.12)",
};

function EmptyChartMessage({ text }: { text: string }) {
  return (
    <div className="flex h-[260px] items-center justify-center rounded-2xl border border-dashed border-[#0d3b3a]/18 bg-[#faf6f0]/45 p-6 text-center">
      <div>
        <p className="font-display text-2xl font-medium text-[#0d3b3a]">
          No data yet
        </p>
        <p className="mx-auto mt-2 max-w-xs font-body text-sm leading-relaxed text-[#1a2e2c]/60">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function StatsCharts({
  last7Days,
  last30Days,
  topPlans,
  totalSessions,
}: StatsChartsProps) {
  const totalMinutes30Days = last30Days.reduce((sum, d) => sum + d.minutes, 0);
  const avgDaily = Math.round(totalMinutes30Days / 30);

  const hasAnySession = totalSessions > 0;
  const hasWeeklyData = last7Days.some((d) => d.minutes > 0);
  const hasMonthlyData = last30Days.some((d) => d.minutes > 0);
  const hasPlanData = topPlans.length > 0;

  const pieData = topPlans.slice(0, 5).map((p) => ({
    name: p.planTitle,
    value: p.minutes,
    count: p.count,
  }));

  return (
    <>
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Weekly Bar Chart */}
        <section className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:border-[#0d3b3a]/18 md:p-7">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/45">
                Weekly rhythm
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                Last 7 days
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d3b3a]/8 text-[#0d3b3a]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>

          {hasWeeklyData ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7Days}>
                  <defs>
                    <linearGradient id="practiceBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f4a261" />
                      <stop offset="100%" stopColor="#0d3b3a" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,59,58,0.08)" />
                  <XAxis
                    dataKey="dayName"
                    stroke="rgba(26,46,44,0.45)"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }}
                  />
                  <YAxis
                    stroke="rgba(26,46,44,0.45)"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{
                      fontWeight: 700,
                      color: "#0d3b3a",
                      fontFamily: "Inter, sans-serif",
                    }}
                    itemStyle={{
                      color: "#0d3b3a",
                      fontFamily: "Inter, sans-serif",
                    }}
                    formatter={(value) => [`${value} min`, "Practice"]}
                  />
                  <Bar
                    dataKey="minutes"
                    fill="url(#practiceBarGradient)"
                    radius={[12, 12, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChartMessage text="Log a session this week and your daily bars will show up here." />
          )}
        </section>

        {/* Monthly Line Chart */}
        <section className="rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:border-[#0d3b3a]/18 md:p-7">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/45">
                Monthly trend
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
                Last 30 days
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4a261]/20 text-[#0d3b3a]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0]/70 p-4">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                Total
              </p>
              <p className="mt-2 font-display text-4xl font-medium leading-none tracking-tight text-[#0d3b3a]">
                {totalMinutes30Days}
              </p>
              <p className="mt-2 font-body text-xs text-[#1a2e2c]/50">minutes</p>
            </div>

            <div className="rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0]/70 p-4">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[#0d3b3a]/45">
                Daily avg
              </p>
              <p className="mt-2 font-display text-4xl font-medium leading-none tracking-tight text-[#0d3b3a]">
                {avgDaily}
              </p>
              <p className="mt-2 font-body text-xs text-[#1a2e2c]/50">minutes</p>
            </div>
          </div>

          {hasMonthlyData ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last30Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(13,59,58,0.08)" />
                  <XAxis
                    dataKey="date"
                    stroke="rgba(26,46,44,0.45)"
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                    tickCount={3}
                    style={{ fontSize: "11px", fontFamily: "Inter, sans-serif" }}
                  />
                  <YAxis
                    stroke="rgba(26,46,44,0.45)"
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{
                      fontWeight: 700,
                      color: "#0d3b3a",
                      fontFamily: "Inter, sans-serif",
                    }}
                    itemStyle={{
                      color: "#0d3b3a",
                      fontFamily: "Inter, sans-serif",
                    }}
                    formatter={(value) => [`${value} min`, "Practice"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#0d3b3a"
                    strokeWidth={3}
                    dot={{ fill: "#f4a261", stroke: "#0d3b3a", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 7,
                      fill: "#f4a261",
                      stroke: "#0d3b3a",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChartMessage text="Log practice sessions and your 30-day trend will appear here." />
          )}
        </section>
      </div>

      {/* Practice Plans Distribution */}
      <section className="mb-8 rounded-3xl border border-[#0d3b3a]/8 bg-white/60 p-5 transition hover:border-[#0d3b3a]/18 md:p-7">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#0d3b3a]/45">
              Plan distribution
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-[#0d3b3a]">
              Top practice plans
            </h2>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d3b3a]/8 text-[#0d3b3a]">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {hasPlanData ? (
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="flex justify-center">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={104}
                      innerRadius={64}
                      fill="#0d3b3a"
                      dataKey="value"
                      strokeWidth={4}
                      stroke="#faf6f0"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        fontWeight: 700,
                        color: "#0d3b3a",
                        fontFamily: "Inter, sans-serif",
                      }}
                      formatter={(value: any, name: any, props: any) => [
                        `${value} min (${props.payload.count} sessions)`,
                        props.payload.name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              {topPlans.slice(0, 5).map((p, i) => {
                const total = topPlans.reduce((sum, pl) => sum + pl.minutes, 0);
                const percentage = total > 0 ? Math.round((p.minutes / total) * 100) : 0;

                return (
                  <div
                    key={`${p.planTitle}-${i}`}
                    className="rounded-2xl border border-[#0d3b3a]/8 bg-[#faf6f0]/60 p-4 transition hover:bg-[#faf6f0]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3.5 w-3.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-xl font-medium tracking-tight text-[#0d3b3a]">
                          {p.planTitle}
                        </p>
                        <p className="mt-1 font-body text-xs text-[#1a2e2c]/55">
                          {p.minutes} min · {p.count} sessions · {percentage}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#0d3b3a]/8">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[i % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyChartMessage text="Once you log sessions connected to plans, your plan distribution will appear here." />
        )}
      </section>
    </>
  );
}