"use client"
import { usePathname } from "next/navigation"
import { useState } from "react";

interface MenuItem {
  id: string;
  icon: string;
  href: string;
}

interface SideBarProps {
  onAuthClick?: (mode: "login" | "signup") => void;
}

export default function SideBar({ onAuthClick }: SideBarProps) {
  const pathname = usePathname()
  const [showLabel, setShowLabel] = useState<number | null>(null)
  const menuItems: MenuItem[] = [
    { id: "Reports", icon: "fa fa-line-chart", href: "/" },
    { id: "History", icon: "fa fa-history", href: "/history" },
  ]

  const getActiveItem = () => {
    const activeMenuItem = menuItems.find((item) => item.href === pathname);
    return activeMenuItem ? activeMenuItem.id : "Reports";
  }

  const activeItem = getActiveItem()

  return (
    <>
      <div className="hidden lg:flex flex-col items-center w-64 h-screen rounded-3xl bg-white border-r border-gray-300">
        <h1 className="text-black text-3xl font-bold my-6">Yolo:Home</h1>
        <div className="mt-auto w-[80%] border-gray-400" />
        <nav className="flex-1 w-full flex flex-col items-center">
          <ul className="w-3/4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`mb-2 py-2 rounded-lg ${
                  item.id == activeItem
                    ? "bg-[#E0E7FF]"
                    : "text-black font-medium"
                }`}
              >
                <a
                  href={item.href}
                  className="flex flex-row items-center pl-6"
                >
                  <i className={`${item.icon} mr-2 ${item.id == activeItem ? "text-[#1B59F8]" : "text-black"}`} aria-hidden="true"></i>
                  <span className={`${item.id == activeItem ? "text-[#1B59F8]" : "text-black"} font-medium`}>{item.id}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-6 w-[80%] border-t border-[rgba(0,0,0,0.1)]">
          <div className="space-y-3 max-w-[200px] mx-auto">
            <button
              onClick={() => onAuthClick?.("login")}
              className="w-full bg-[#4E7EF9] hover:bg-[rgba(78,126,249,0.9)] text-[#FBFDFF] text-[24px] font-semibold py-3 px-6 rounded-[20px] shadow-md cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => onAuthClick?.("signup")}
              className="w-full bg-[rgba(249,249,249,0.1)] hover:bg-[rgba(249,249,249,0.8)] text-[#4D4D4D] text-[24px] font-semibold py-3 px-6 rounded-[20px] border-[0.2px] border-[rgba(0,0,0,0.1)] shadow-md cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-7 lg:hidden flex items-center justify-between">
        <h1 className="text-black text-2xl md:text-3xl font-bold my-6">Yolo:Home</h1>
        <div className="flex gap-x-[10px] md:gap-x-[20px] items-center">
          {/* <button
            onClick={() => onAuthClick?.("login")}
            className="bg-[#4E7EF9] hover:bg-[rgba(78,126,249,0.9)] text-[#FBFDFF] text-[15px] font-semibold py-3 px-6 rounded-[20px] shadow-md cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => onAuthClick?.("signup")}
            className="bg-[rgba(249,249,249,0.1)] hover:bg-[rgba(249,249,249,0.8)] text-[#4D4D4D] text-[15px] font-semibold py-3 px-6 rounded-[20px] border-[0.2px] border-[rgba(0,0,0,0.1)] shadow-md cursor-pointer"
          >
            Sign up
          </button> */}
          {
            menuItems.map((item, index) => (
              <div key={index} className="relative">
                <div 
                  key={item.id} className="size-[40px] md:size-[50px] flex items-center justify-center cursor-pointer bg-[rgba(226,229,233,0.5)] hover:bg-[rgba(226,229,233,0.8)] rounded-full relative"
                  onMouseEnter={() => setShowLabel(index)}
                  onMouseLeave={() => setShowLabel(null)}
                >
                  <a href={item.href} className="flex items-center justify-center">
                    <i className={`text-[18px] ${item.icon} ${item.id == activeItem ? "text-[#1B59F8]" : "text-black"}`} aria-hidden="true"></i>
                  </a>
                </div>
                {showLabel === index && (
                  <div className='absolute top-[45px] left-[-10px] md:left-[-5px] w-[65px] flex items-center justify-center text-[11px] font-semibold bg-[rgba(226,229,233,0.5)] text-[#4D4D4D] py-1.5 px-2 rounded-[25px] z-[11]'>
                    {item.id}
                  </div>
                )}
              </div>
            ))
          }
          <button
            onClick={() => onAuthClick?.("signup")}
            className="bg-[#EB6A63] hover:bg-[rgba(235,106,99,0.8)] text-[#FBFDFF] text-[15px] font-semibold py-3 px-6 rounded-[20px] border-[0.2px] border-[rgba(0,0,0,0.1)] shadow-md cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
