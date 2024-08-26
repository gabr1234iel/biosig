"use client";
import React from "react";
import Balance from "./Balance";
import AssetBalance from "./AssetBalance";

interface MultisigData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

interface AssetsProps {
  multisigData: MultisigData;
}

const Assets: React.FC<AssetsProps> = ({ multisigData }) => {
    return (
        <>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
                <div className="col-span-12">
                    <Balance multisigData={multisigData} />
                </div>
                <div className="col-span-12">
                    <AssetBalance multisigData={multisigData} />
                </div>
            </div>
        </>
    );
};

export default Assets;