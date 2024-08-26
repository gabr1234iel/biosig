import React from "react";
import { Orbitron } from "next/font/google";
import { cn } from "@/lib/utils";

const orbitron = Orbitron({ subsets: ["latin"] });

const IntroduceSection = () => {
  return (
    <div className="min-h-screen flex items-center bg-black">
      <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center text-center md:text-left">
          <h2
            className={cn(
              orbitron.className,
              "text-4xl font-bold mb-4 text-white"
            )}
          >
            BioSig Wallet
          </h2>
          <p className="text-sm md:text-base text-gray-300 text-justify">
            BioSig Wallet is a multisig wallet designed for secure digital asset storage. Built on the Scroll Sepolia, Sepolia, and Aptos testnet protocols, it ensures your assets are protected. BioSig supports multichain operations, offers gasless transactions, and enables seamless sending and receiving of digital assets.
          </p>
        </div>

        <div className="md:w-1/2 md:px-16 flex justify-center items-center">
          <div className="relative h-64 md:h-96 w-full">
            <img
              src="/biosig_logo.png"
              alt="BioSig Wallet"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroduceSection;
