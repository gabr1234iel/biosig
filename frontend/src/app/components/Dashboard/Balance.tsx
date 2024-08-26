import React from "react";
import DashboardButton from "./DashboardButton";

interface MultisigData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

interface BalanceProps {
  multisigData: MultisigData;
}

const Balance: React.FC<BalanceProps> = ({ multisigData }) => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Total Balance
      </h4>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-3.5 px-2 py-4">
            <div className="flex flex-col">
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                $0.00
              </p>
              <p className="text-sm">
                Multisig: {multisigData.name} (Required Signatures: {multisigData.requiredSignatures})
              </p>
            </div>
          </div>
          <div className="mx-4 flex justify-between">
            <DashboardButton text="Add Coin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;