import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import { getName } from "@/lib/interactions/multisigFactoryInteractions"; 

const SidebarAccount = ({ multisigAddress }: { multisigAddress: string }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contractName, setContractName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractName = async () => {
      if (multisigAddress) {
        try {
          const name = await getName(multisigAddress);
          setContractName(name);
        } catch (err) {
          console.error("Error fetching contract name:", err);
          setError("Failed to fetch contract name");
        }
      }
    };

    fetchContractName();
  }, [multisigAddress]);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src="/images/dummy-image.png"
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex flex-col gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">
            {error ? error : contractName || "Loading..."}
          </span>
          <span>{multisigAddress ? `${multisigAddress.slice(0, 6)}...${multisigAddress.slice(-4)}` : "No Address"}</span>
        </span>
      </Link>
    </ClickOutside>
  );
};

export default SidebarAccount;