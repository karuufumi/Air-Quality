"use client";

import useRealtimeMetrics from "@/app/hooks/useRealtimeMetrics";
import RealtimeChart from "@/app/components/RealtimeChart";

export default function DashboardPage() {
  const { temperature, humidity, lux } = useRealtimeMetrics();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6">
          <p className="text-gray-500">Temperature</p>
          <p className="text-3xl font-bold">
            {temperature !== null ? `${temperature} °C` : "--"}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">Humidity</p>
          <p className="text-3xl font-bold">
            {humidity !== null ? `${humidity} %` : "--"}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">Light</p>
          <p className="text-3xl font-bold">
            {lux !== null ? `${lux} lux` : "--"}
          </p>
        </div>
      </div>

      {/* Realtime chart */}
      <RealtimeChart />
    </div>
  );
}