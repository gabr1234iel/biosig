"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";

export default function DefaultLayout({
  multisigAddress,
  children,
}: {
  children: React.ReactNode;
  multisigAddress: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} multisigAddress={multisigAddress}/>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}