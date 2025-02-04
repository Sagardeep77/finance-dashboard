"use client";

import Portfolio from "@/componentrs/Portfolio";
import TradingDashboard from "@/componentrs/TradingDashboard";
import Image from "next/image";

export default function Home() {
  return <div className="flex justify-center items-center h-screen">
    <TradingDashboard />
    
  </div>;
}
