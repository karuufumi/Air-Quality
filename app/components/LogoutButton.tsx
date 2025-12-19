"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.replace("/auth/login");
  };

  return (
    <button
      onClick={logout}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}