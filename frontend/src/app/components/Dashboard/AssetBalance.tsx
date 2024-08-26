import React from "react";

interface MultisigData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

interface AssetBalanceProps {
  multisigData: MultisigData;
}

type AssetBal = {
  name: string;
  balance: string;
};

const brandData: AssetBal[] = [
  {
    name: "Asset Name",
    balance: "0.00",
  },
  {
    name: "Asset Name",
    balance: "0.00",
  },
  {
    name: "Asset Name",
    balance: "0.00",
  },
  {
    name: "Asset Name",
    balance: "0.00",
  },
  {
    name: "Asset Name",
    balance: "0.00",
  },
];

const AssetBalance: React.FC<AssetBalanceProps> = ({ multisigData }) => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col">
        <div className="grid grid-cols-2">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Assets for {multisigData.name}
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Balance
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-2 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-8">
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">${brand.balance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetBalance;