import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { ThirdwebProvider, ConnectEmbed, ConnectButton, } from "thirdweb/react";

import { cn } from "@/lib/utils"
import Header from "./components/Header/Header"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 


export const metadata: Metadata = {
  title: "BioSig WALLET",
  description: "A new way of ownership",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThirdwebProvider>
          <Header />
          {children}
        </ThirdwebProvider>
        </body>
    </html>
  );
}
