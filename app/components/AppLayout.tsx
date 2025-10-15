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
      <div className="flex flex-col lg:flex-row min-h-screen bg-[##f9f9f9]">
        <SideBar onAuthClick={openAuth} />
        <main className="flex-1">{children}</main>
      </div>
      {showAuth && <AuthOverlay initialMode={authMode} onClose={closeAuth} />}
    </>
  );
}
