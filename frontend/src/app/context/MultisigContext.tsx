import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getName } from '@/lib/interactions/multisigFactoryInteractions';
import { getOwners, getRequiredSignatures } from '@/lib/interactions/multisigInteractions';

interface MultisigData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

interface MultisigContextType {
  multisigData: MultisigData;
  error: string;
  loading: boolean;
  multisigAddress: string;
}

const MultisigContext = createContext<MultisigContextType | null>(null);

export const useMultisigContext = () => {
  const context = useContext(MultisigContext);
  if (!context) {
    throw new Error('useMultisigContext must be used within a MultisigProvider');
  }
  return context;
};

interface MultisigProviderProps {
  children: ReactNode;
  multisigAddress: string;
}

export const MultisigProvider: React.FC<MultisigProviderProps> = ({ children, multisigAddress }) => {
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
    <MultisigContext.Provider value={{ multisigData, error, loading, multisigAddress }}>
      {children}
    </MultisigContext.Provider>
  );
};