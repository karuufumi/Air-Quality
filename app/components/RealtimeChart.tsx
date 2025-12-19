"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import useRealtimeMetrics from "@/app/hooks/useRealtimeMetrics";

export default function RealtimeChart() {
  const { history } = useRealtimeMetrics();

  if (history.length < 2) {
    return (
      <div className="h-[320px] flex items-center justify-center text-gray-400 border rounded-xl">
        Waiting for realtime data…
      </div>
    );
  }

  return (
    <div className="h-[360px] w-full rounded-xl border p-4">
      <h2 className="mb-2 font-semibold">Realtime Sensors</h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={history}>
          {/* Gradients */}
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="luxGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Axes */}
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            minTickGap={20}
          />

          <YAxis
            yAxisId="left"
            label={{ value: "Temp / Hum", angle: -90, position: "insideLeft" }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Lux", angle: 90, position: "insideRight" }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              borderColor: "#e5e7eb",
              fontSize: 12,
            }}
          />

          <Legend verticalAlign="top" height={24} />

          {/* Temperature */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            fill="url(#tempGrad)"
            strokeWidth={2}
            name="Temperature (°C)"
            dot={false}
          />

          {/* Humidity */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            fill="url(#humGrad)"
            strokeWidth={2}
            name="Humidity (%)"
            dot={false}
          />

          {/* Light */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="lux"
            stroke="#22c55e"
            fill="url(#luxGrad)"
            strokeWidth={2}
            name="Light (lux)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}