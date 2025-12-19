"use client";

import { useEffect, useRef, useState } from "react";

type Metric = "rt" | "rh" | "lux";

type MetricPayload = {
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

const WS_URL = "wss://iot-stuff-production.up.railway.app/ws/metrics";
const MAX_POINTS = 60;

export default function useRealtimeMetrics() {
  const wsRef = useRef<WebSocket | null>(null);
  const pingRef = useRef<NodeJS.Timeout | null>(null);

  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [lux, setLux] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send("ping");
        pingRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
          }
        }, 3000);
      };

      ws.onmessage = (event) => {
        try {
          const data: MetricPayload = JSON.parse(event.data);
          const time = new Date(data.timestamp).toLocaleTimeString();

          setHistory((prev) => {
            const last = prev[prev.length - 1];

            const base: HistoryPoint = last
              ? { ...last }
              : { time };

            const next: HistoryPoint = { ...base, time };

            if (data.metric === "rt") {
              setTemperature(data.value);
              next.temperature = data.value;
            }

            if (data.metric === "rh") {
              setHumidity(data.value);
              next.humidity = data.value;
            }

            if (data.metric === "lux") {
              setLux(data.value);
              next.lux = data.value;
            }

            return [...prev, next].slice(-MAX_POINTS);
          });
        } catch {
          // ignore keepalive / malformed messages
        }
      };

      ws.onclose = () => {
        if (pingRef.current) clearInterval(pingRef.current);
        setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      if (pingRef.current) clearInterval(pingRef.current);
      wsRef.current?.close();
    };
  }, []);

  return { temperature, humidity, lux, history };
}