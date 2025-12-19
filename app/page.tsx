"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-4">
          IoT Monitoring Platform
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Monitor sensors, analyze history, and manage devices securely.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/auth/login"
            className="w-full text-center bg-[#4E7EF9] hover:opacity-90 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="w-full text-center border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-semibold"
          >
            Create Account
          </Link>
        </div>

        <p className="mt-6 text-xs text-center text-gray-400">
          FastAPI · MongoDB · WebSocket · Next.js
        </p>
      </div>
    </main>
  );
}