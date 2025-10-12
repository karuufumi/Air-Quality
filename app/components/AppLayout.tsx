"use client";
import { useState } from "react";
import SideBar from "./SideBar";
import AuthOverlay from "./AuthOverlay";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
  };
  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <SideBar onAuthClick={openAuth} />
        <main>{children}</main>
      </div>
      {showAuth && <AuthOverlay initialMode={authMode} onClose={closeAuth} />}
    </>
  );
}
