import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Yolo:Home app",
  description: "Real-time IoT dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#020617]">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}