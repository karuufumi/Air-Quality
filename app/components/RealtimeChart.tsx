"use client";

import {
  LineChart,
  Line,
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
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        Waiting for realtime data…
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full rounded-xl border p-4">
      <h2 className="mb-2 font-semibold">Realtime Sensors</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Temperature (°C)"
          />

          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Humidity (%)"
          />

          <Line
            type="monotone"
            dataKey="lux"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Light (lux)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}