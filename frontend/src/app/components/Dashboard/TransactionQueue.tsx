import React, { useEffect, useState } from "react";

import { getTransaction } from '@/lib/interactions/multisigInteractions';
import DashboardButton from "./DashboardButton";

interface Transaction {
  to: string;
  value: string;
  data: string;
  executed: boolean;
  numConfirmations: number;
}

const TransactionQueue: React.FC<{ multisigAddress: string }> = ({ multisigAddress }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedTransactions = [];
        
        // Attempt to fetch up to 5 transactions
        for (let i = 0; i < 5; i++) {
          try {
            const tx = await getTransaction(multisigAddress, i);
            if (tx) {
              fetchedTransactions.push(tx);
            } else {
              // If we get a null result, assume we've reached the end of the transactions
              break;
            }
          } catch (err) {
            // If an individual transaction fetch fails, log it but continue
            console.error(`Error fetching transaction ${i}:`, err);
          }
        }

        setTransactions(fetchedTransactions);
      } catch (err) {
        console.error('Error in transaction fetching process:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [multisigAddress]);

  if (loading) {
    return <div className="text-center py-4">Loading transactions...</div>;
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Transaction Queue
      </h4>

      <div className="flex flex-col">
        {error ? (
          <div className="text-red-500 mb-4">{error}</div>
        ) : transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <div>
                <p>To: {tx.to.slice(0, 6)}...{tx.to.slice(-4)}</p>
                <p>Value: {tx.value} ETH</p>
                <p>Confirmations: {tx.numConfirmations}</p>
              </div>
              <div>
                <DashboardButton text={tx.executed ? "Executed" : "Sign"} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-4">No pending transactions</p>
        )}
        <div className="mt-4 flex justify-end">
          <DashboardButton text="New Transaction" />
        </div>
      </div>
    </div>
  );
};

export default TransactionQueue;