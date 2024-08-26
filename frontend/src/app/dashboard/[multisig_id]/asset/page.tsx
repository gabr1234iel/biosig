"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from '@/app/components/Layouts/DefaultLayout';
import Assets from '@/app/components/Dashboard/Assets';
import { getName } from '@/lib/interactions/multisigFactoryInteractions';
import { getOwners, getRequiredSignatures } from '@/lib/interactions/multisigInteractions';

interface MultisigData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

const AssetPage: React.FC = () => {
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
        let name, owners, requiredSignatures;

        try {
          name = await getName(multisigAddress);
          console.log("Name fetched successfully:", name);
        } catch (nameError) {
          console.error("Error fetching name:", nameError);
          throw new Error("Failed to fetch multisig name");
        }

        try {
          owners = await getOwners(multisigAddress);
          console.log("Owners fetched successfully:", owners);
        } catch (ownersError) {
          console.error("Error fetching owners:", ownersError);
          throw new Error("Failed to fetch multisig owners");
        }

        try {
          requiredSignatures = await getRequiredSignatures(multisigAddress);
          console.log("Required signatures fetched successfully:", requiredSignatures);
        } catch (signaturesError) {
          console.error("Error fetching required signatures:", signaturesError);
          throw new Error("Failed to fetch required signatures");
        }

        setMultisigData({
          name,
          owners,
          requiredSignatures: Number(requiredSignatures),
        });
      } catch (err) {
        console.error('Error fetching multisig data:', err);
        setError((err as Error).message || 'Failed to fetch multisig data. Please try again.');
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
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Assets multisigData={multisigData} />
      )}
    </DefaultLayout>
  );
};

export default AssetPage;