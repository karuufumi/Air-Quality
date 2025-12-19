"use client";

import { useEffect, useRef, useState } from "react";

/* =======================
   Types
======================= */

type Metric = "rt" | "rh" | "lux";

type MetricPayload = {
  metric: Metric;
  value: number;
  timestamp: string;
};

type HistoryPoint = {
  time: string;
  temperature?: number;
  humidity?: number;
  lux?: number;
};

/* =======================
   Config
======================= */

const WS_URL = "wss://iot-stuff-production.up.railway.app/ws/metrics";
const HISTORY_LIMIT = 30; // points kept for charts

/* =======================
   Hook
======================= */

export default function useRealtimeMetrics() {
  const wsRef = useRef<WebSocket | null>(null);
  const pingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---- realtime values ---- */
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [lux, setLux] = useState<number | null>(null);

  /* ---- history for charts ---- */
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WebSocket connected");

        // FastAPI websocket requires client to send something
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
            const next: HistoryPoint = { time };

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

            return [...prev, next].slice(-HISTORY_LIMIT);
          });
        } catch {
          // ignore non-JSON keepalive echoes
        }
      };

      ws.onerror = () => {
        console.warn("⚠️ WebSocket error");
      };

      ws.onclose = () => {
        console.warn("🔌 WebSocket disconnected, retrying…");

        if (pingRef.current) clearInterval(pingRef.current);

        reconnectTimeout = setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      if (pingRef.current) clearInterval(pingRef.current);
      if (wsRef.current) wsRef.current.close();
      clearTimeout(reconnectTimeout);
    };
  }, []);

  return {
    temperature,
    humidity,
    lux,
    history,
  };
}