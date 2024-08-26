"use client";

import React from "react";
import { useMultisigContext } from '@/app/context/MultisigContext';
import Overview from "./Overview";
import TransactionQueue from "./TransactionQueue";

const Home: React.FC = () => {
  const { multisigData, error, loading, multisigAddress } = useMultisigContext();

  if (loading) {
    return <div>Loading multisig data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12">
          <Overview multisigData={multisigData} multisigAddress={multisigAddress} />
        </div>
        <div className="col-span-12">
          <TransactionQueue multisigAddress={multisigAddress} />
        </div>
        {/*<div className="col-span-12">*/}
        {/*  <TransactionReviewConfirm />*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Home;