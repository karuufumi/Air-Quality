const API_BASE = "https://iot-stuff-production.up.railway.app";

export type RealtimeMetric = "rt" | "rh" | "lux";

export interface RealtimeResponse {
  metric: RealtimeMetric;
  value: number;
  timestamp: string;
}

export async function fetchRealtimeMetric(
  metric: RealtimeMetric,
  token: string
): Promise<RealtimeResponse> {
  const res = await fetch(`${API_BASE}/realtime/${metric}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${metric}`);
  }

  return res.json();
}