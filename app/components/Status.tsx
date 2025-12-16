"use client";

import Image from "next/image";
import { Activity, Lightbulb } from "lucide-react";

type LevelType = "normal" | "warning" | "critical" | "null";

function determineLevel(
  type: "temp" | "hum" | "light",
  value: string | number
): LevelType {
  if (value === "-" || value === undefined || value === null) {
    return "null";
  }
  const numericString = String(value).replace(/[^\d.-]/g, "");
  const val = parseFloat(numericString);

  if (isNaN(val)) return "null";
  console.log("here", val);

  if (type === "temp") {
    if (val > 35 || val < 10) return "critical";
    if (val > 30 || val < 15) return "warning";
    return "normal";
  }

  if (type === "hum") {
    if (val > 60 || val < 20) return "critical";
    if (val > 70 || val < 30) return "warning";
    return "normal";
  }

  if (type === "light") {
    if (val < 50) return "critical";
    if (val < 150) return "warning";
    return "normal";
  }

  return "normal";
}

function GetStatus(sensorTime: Date | undefined) {
  const maxOffset = 5 * 60 * 1000; // 5 minutes
  const currTime = new Date().getTime();
  // const currTime = new Date("2025-12-12T01:45:00.000+00:00").getTime();
  const dataTime = sensorTime?.getTime();

  if (dataTime && currTime) {
    return currTime - dataTime < maxOffset;
  }
  return false;
}

function LevelBar({ level }: { level: LevelType }) {
  let gradient = "";

  switch (level) {
    case "normal":
      gradient = "from-[#2FEA9B] to-[#7FDD53]";
      break;
    case "warning":
      gradient = "from-yellow-400 to-orange-500";
      break;
    case "critical":
      gradient = "from-[#FF383C] to-red-700";
      break;
    case "null":
      gradient = "bg-gray-300 animate-pulse";
      break;
  }

  return (
    <div
      className={`w-[95%] h-4 rounded-full transition-all bg-gradient-to-r ${gradient}`}
    ></div>
  );
}

function StatusText({ isOnline }: { isOnline: boolean }) {
  return (
    <span
      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ml-2 ${
        isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {isOnline ? "Online" : "Offline"}
    </span>
  );
}

type StatusProps = {
  sensorvalues: {
    temperatureC: string | number;
    temperatureF: string | number;
    temperatureTime: Date | undefined;
    humidity: string | number;
    humidityTime: Date | undefined;
    lightIntensity: string | number;
    lightTime: Date | undefined;
  };
};

export default function Status({ sensorvalues }: StatusProps) {
  const levels = {
    temperature: determineLevel("temp", sensorvalues.temperatureC),
    humidity: determineLevel("hum", sensorvalues.humidity),
    light: determineLevel("light", sensorvalues.lightIntensity),
  };

  const isOnline = {
    temperature: GetStatus(sensorvalues.temperatureTime),
    humidity: GetStatus(sensorvalues.humidityTime),
    light: GetStatus(sensorvalues.lightTime),
  };

  return (
    <div className="lg:mt-[30px] w-full flex flex-col gap-y-[30px]">
      <div className="w-full p-2 bg-white rounded-[19px] shadow-md border lg:space-y-6 lg:py-4">
        <h2 className="mx-4 my-1 font-bold text-gray-700">Current Status</h2>

        {/* --- Temperature Section --- */}
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/temp-three-quarters.svg"}
            alt="Temperature Icon"
            width={24}
            height={24}
            className="m-2 select-none"
          />
          <div className="w-full">
            <div className="flex items-center mb-1">
              <span>Temperature</span>
              <StatusText isOnline={isOnline.temperature} />
            </div>
            <LevelBar level={levels.temperature} />
          </div>
        </div>

        {/* --- Humidity Section --- */}
        <div className="flex flex-row w-full font-semibold p-2">
          <Image
            src={"./icons/humidity.svg"}
            alt="Humidity Icon"
            width={24}
            height={24}
            className="m-2 select-none"
          />
          <div className="w-full">
            <div className="flex items-center mb-1">
              <span>Humidity</span>
              <StatusText isOnline={isOnline.humidity} />
            </div>
            <LevelBar level={levels.humidity} />
          </div>
        </div>

        {/* --- Light Section --- */}
        <div className="flex flex-row w-full font-semibold p-2">
          <Lightbulb className="m-2" size={24} />
          <div className="w-full">
            <div className="flex items-center mb-1">
              <span>Light Intensity</span>
              <StatusText isOnline={isOnline.light} />
            </div>
            <LevelBar level={levels.light} />
          </div>
        </div>
      </div>
    </div>
  );
}
