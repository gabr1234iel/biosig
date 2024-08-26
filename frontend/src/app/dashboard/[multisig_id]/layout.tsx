"use client";

import React, { useEffect, useState } from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div suppressHydrationWarning={true}>{children}</div>
  )
}

export default layout
