// app/types/metrics.ts

export type Metric = "rt" | "rh" | "lux";

export type MetricKey = "temperature" | "humidity" | "lux";

export type HistoryAPIItem = {
  id: string;
  metric: Metric;
  value: number;
  timestamp: string;
};

export type HistoryPoint = {
  time: string;
  temperature?: number;
  humidity?: number;
  lux?: number;
};