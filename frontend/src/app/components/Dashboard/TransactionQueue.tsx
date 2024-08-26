import React, { useEffect, useState } from "react";
import DashboardButton from "./DashboardButton";
import { getTransaction } from '@/lib/interactions/multisigInteractions';

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
        // For this example, we'll fetch the first 5 transactions
        // In a real implementation, you'd need to keep track of the total number of transactions
        const fetchedTransactions = await Promise.all(
          Array.from({ length: 5 }, (_, i) => getTransaction(multisigAddress, i))
        );
        setTransactions(fetchedTransactions.filter(Boolean)); // Filter out any null results
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [multisigAddress]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Transaction Queue
      </h4>

      <div className="flex flex-col">
        {transactions.length > 0 ? (
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
          <p>No pending transactions</p>
        )}
        <div className="mt-4 flex justify-end">
          <DashboardButton text="New Transaction" />
        </div>
      </div>
    </div>
  );
};

export default TransactionQueue;