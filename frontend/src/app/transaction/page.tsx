"use client"

import React from 'react';
import InputGroup from '../components/FormElements/InputGroup';


const TransactionAmountPage = () => {
  return (
    <div className="text-white min-h-screen">
      
      <main className="mt-8 p-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-9">
          <div className="rounded-[10px] bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="mt-4 px-6.5 py-4 dark:border-dark-3">
                  <h3 className="text-xl font-semibold text-dark dark:text-white">
                      Transaction Amount
                  </h3>
              </div>
              <form action="#">
                  <div className="p-6.5">

                      <InputGroup
                          label="From"
                          type="text"
                          placeholder="Enter Source"
                          customClasses="mb-4.5"
                      />

                      <InputGroup
                          label="To"
                          type="text"
                          placeholder="Enter Destination"
                          customClasses="mb-4.5"
                      />

                      <InputGroup
                          label="Asset"
                          type="text"
                          placeholder="Enter Asset"
                          customClasses="mb-4.5"
                      />

                      <InputGroup
                          label="Amount"
                          type="text"
                          placeholder="Enter Transaction Amount"
                          customClasses="mb-4.5"
                      />

                      <button className="mt-12 flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 dark:bg-gray-7">
                          Sign
                      </button>
                  </div>
              </form>
          </div>
      </div>
      </main>
    </div>
  );
};

export default TransactionAmountPage;