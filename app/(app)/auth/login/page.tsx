"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authAPI } from "@/lib/api";
import { useUserStore } from "@/app/store/useUserStore";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const res = await authAPI.login({ email, password });

    if (res.success) {
      localStorage.setItem("token", res.token);
      setUser(res.user);

      toast.success("Login successful");
      router.push("/home"); // 🔥 clean redirect
    } else {
      toast.error(res.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}