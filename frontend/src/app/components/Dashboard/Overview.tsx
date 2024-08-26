import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface OverviewProps {
  multisigData: {
    name: string;
    owners: string[];
    requiredSignatures: number;
  };
  multisigAddress: string;
}

const Overview: React.FC<OverviewProps> = ({ multisigData, multisigAddress }) => {
  const { name, owners, requiredSignatures } = multisigData;

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Overview
      </h4>
      <div className="sm:mb-5 mb-2">
        <h2 className="sm:text-2xl text-base">
          <span
            className="flex items-center"
            onClick={() => {
              navigator.clipboard.writeText(multisigAddress);
            }}
          >
            {multisigAddress} 
            <span className="ml-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
            </span>
          </span>
        </h2>
      </div>
      <div className="flex flex-col">
        <div className="border-b-2 dark:border-gray-300 border-gray-7 py-2">
          <h3>Signers: ({requiredSignatures} of {owners.length} required)</h3>
        </div>
        {owners.map((owner, index) => (
          <div key={owner} className="flex items-center justify-between">
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                <p>{index + 1}</p>
              </div>
              <div className="flex flex-col">
                <p>{owner.slice(0, 6)}...{owner.slice(-4)}</p>
              </div>
            </div>
            <div className="mx-4 flex justify-between">
              <Button variant="outline" asChild><Link href={`https://debank.com/profile/${owner}`}>view account</Link></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;