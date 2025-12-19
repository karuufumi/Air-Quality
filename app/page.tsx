"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "./store/useUserStore";

export default function RootPage() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && user) {
      router.replace("/home");
    }
  }, [user, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="max-w-xl w-full p-8 rounded-2xl border border-gray-700 shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          🚀 IoT Monitoring Platform
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Real-time sensor monitoring, historical analytics, and secure access.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/auth/login"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="w-full text-center bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-lg font-semibold"
          >
            Create an Account
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-400 text-center">
          Backend powered by FastAPI · MongoDB · WebSockets
        </div>
      </div>
    </main>
  );
}