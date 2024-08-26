"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from '@/app/components/Layouts/DefaultLayout';
import AllTransactions from '@/app/components/Dashboard/AllTransactions';
import { getName } from '@/lib/interactions/multisigFactoryInteractions';
import { getOwners, getRequiredSignatures } from '@/lib/interactions/multisigInteractions';

interface MultisigData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

const TransactionPage: React.FC = () => {
  const params = useParams();
  const multisigAddress = params.multisig_id as string;

  const [multisigData, setMultisigData] = useState<MultisigData>({
    name: '',
    owners: [],
    requiredSignatures: 0,
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMultisigData = async () => {
      try {
        setLoading(true);
        const [name, owners, requiredSignatures] = await Promise.all([
          getName(multisigAddress),
          getOwners(multisigAddress),
          getRequiredSignatures(multisigAddress),
        ]);

        setMultisigData({
          name,
          owners,
          requiredSignatures: Number(requiredSignatures),
        });
      } catch (err) {
        console.error('Error fetching multisig data:', err);
        setError('Failed to fetch multisig data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (multisigAddress) {
      fetchMultisigData();
    }
  }, [multisigAddress]);

  return (
    <DefaultLayout multisigAddress={multisigAddress}>
      <div className="col-span-12">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <AllTransactions multisigData={multisigData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default TransactionPage;