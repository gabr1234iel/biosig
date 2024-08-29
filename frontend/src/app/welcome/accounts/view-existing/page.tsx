"use client"
import React, { useState, useEffect } from 'react';
import { getAllDeployedContracts, getName } from '@/lib/interactions/multisigFactoryInteractions';
import { interactWithMultisig } from '@/lib/interactions/multisigInteractions';
import { useActiveAccount } from 'thirdweb/react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';


export default function MultisigExistingAccountPage() {
  const [deployedContracts, setDeployedContracts] = useState<string[]>([]);
  const [contractOwners, setContractOwners] = useState<{ [key: string]: string[] }>({});
  const [contractNames, setContractNames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const account = useActiveAccount();

  useEffect(() => {
    async function fetchContractsAndOwners() {
      if (!account?.address) {
        setIsLoading(false);
        return;
      }

      try {
        const contracts = await getAllDeployedContracts();
        const ownersData: { [key: string]: string[] } = {};
        const namesData: { [key: string]: string } = {};
        const filteredContracts = [];

        for (const contractAddress of contracts) {
          const { owners } = await interactWithMultisig(contractAddress);
          if (owners.includes(account.address)) {
            ownersData[contractAddress] = owners;
            filteredContracts.push(contractAddress);
            const name = await getName(contractAddress);
            namesData[contractAddress] = name;
          }
        }

        setDeployedContracts(filteredContracts);
        setContractOwners(ownersData);
        setContractNames(namesData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }

    fetchContractsAndOwners();
  }, [account?.address]);


  if (isLoading) return <div>Loading...</div>;

return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Deployed Multisig Contracts:</h1>
        {deployedContracts.length === 0 ? (
          <div className='flex flex-col my-2 items-center border-rounded border-2 border-gray-6 p-8 gap-4'>
            <h2 className='text-2xl text-gray-6'>No contracts deployed yet.</h2>
            <Button asChild className='px-24 text-2xl'>
              <Link href='/multisig'>Deploy Now</Link>
            </Button>
          </div>
            
        ) : (
            <ul className="space-y-4">
                {deployedContracts.map((contract, index) => (
                  <li key={index} className="border p-4 rounded-lg hover:bg-slate-600">
                  <Link href={`/dashboard/${contract}`} className="block">
                    <span className=' items-center flex py-2'><h2 className="text-xl font-semibold mb-2">Wallet: {contract}</h2> <span className='ml-4 px-8 items-center bg-gray-500 rounded-lg text-white'>{contractNames[contract]}</span></span>
                    <h3 className="text-lg font-medium mb-1">Signers:</h3>
                    <ul className="list-disc list-inside">
                      {contractOwners[contract]?.map((owner, ownerIndex) => (
                        <li key={ownerIndex}>{owner} {owner === account?.address && "(you)"}</li>
                      ))}
                    </ul>
                  </Link>
                </li>
                ))}
            </ul>
        )}
    </div>
);
}