"use client";

import React from "react";
import { BadgeCheck } from 'lucide-react';
import Link from "next/link";

const TransactionSuccessPage = () => {
  return (
      <main>
        <div className="overflow-hidden mt-14 mx-auto max-w-4xl rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="mt-4 flex flex-col items-center">
              <p className="mb-6">
                <BadgeCheck size={100} />
              </p>
              <h3 className="mb-10 text-heading-6 font-bold text-dark dark:text-white">
                Transaction Successful
              </h3>
              <p className="font-medium">Your transaction has been processed successfully</p>
              <Link href="/" className="mt-12 flex w-1/4 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 dark:bg-gray-7">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
};

export default TransactionSuccessPage;
