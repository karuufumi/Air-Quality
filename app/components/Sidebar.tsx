"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 font-bold text-xl">
        YOLO:<span className="text-blue-600">HOME</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-2">
        <Link
          href="/dashboard"
          className={`block px-4 py-2 rounded-lg ${
            pathname === "/dashboard"
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          href="/history"
          className={`block px-4 py-2 rounded-lg ${
            pathname === "/history"
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          🕒 History
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full py-2 rounded-lg bg-red-500 text-white hover:opacity-90"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}