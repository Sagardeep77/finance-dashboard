"use client";

import Portfolio from "@/components/Portfolio";
import { TestComponent1, TestComponent2 } from "@/components/TestComponents";
import TradingDashboard from "@/components/TradingDashboard";
import { WebsocketContextProvider } from "@/hooks/useWebsocketConnection";
import Image from "next/image";

export default function Home() {
  return <div className="flex justify-center items-center h-screen">
    <WebsocketContextProvider>
    {/* <TradingDashboard /> */}
    <TestComponent1 />
    <TestComponent2 />
    </WebsocketContextProvider>
    
  </div>;
}
