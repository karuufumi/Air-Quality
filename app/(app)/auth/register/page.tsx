"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 border rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-md px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}