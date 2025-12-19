"use client";

import { useEffect, useRef, useState } from "react";

type Metric = "rt" | "rh" | "lux";

type MetricPayload = {
  metric: Metric;
  value: number;
  timestamp: string;
};

const WS_URL = "wss://iot-stuff-production.up.railway.app/ws/metrics";

export function useRealtimeMetrics() {
  const wsRef = useRef<WebSocket | null>(null);
  const pingRef = useRef<NodeJS.Timeout | null>(null);

  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [lux, setLux] = useState<number | null>(null);

  useEffect(() => {
    let ws: WebSocket;

    const connect = () => {
      ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WS connected");

        // 🔑 SEND IMMEDIATELY
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

          if (data.metric === "rt") setTemperature(data.value);
          if (data.metric === "rh") setHumidity(data.value);
          if (data.metric === "lux") setLux(data.value);
        } catch {
          // ignore malformed keepalive echoes
        }
      };

      ws.onerror = () => {
        console.warn("⚠️ WS error (will retry)");
      };

      ws.onclose = (e) => {
        console.warn("🔌 WS closed", e.code, e.reason);

        if (pingRef.current) clearInterval(pingRef.current);

        // 🔁 auto-reconnect
        setTimeout(connect, 2000);
      };
    };

    connect();

    return () => {
      if (pingRef.current) clearInterval(pingRef.current);
      ws?.close();
    };
  }, []);

  return { temperature, humidity, lux };
}