"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useActiveAccount } from 'thirdweb/react';
import { Abi, encodeFunctionData } from 'viem';
import { Card, CardContent } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { ethers } from 'ethers';
import { MultisigFactoryABI, contractAddress, scrollSepoliaRpcUrl } from '@/lib/interactions/multisigFactoryInteractions';
import { MultisigABI } from '@/lib/interactions/multisigInteractions';
import { useRouter } from 'next/navigation';

const SignerInput: React.FC<{ index: number; walletAddress: string; onWalletAddressChange: (index: number, value: string) => void; onRemove: () => void }> = ({ index, walletAddress, onWalletAddressChange, onRemove }) => (
  <div className="flex items-center space-x-2 mb-4">
    <Input
      type="text"
      placeholder="Enter wallet address"
      className="flex-grow"
      value={walletAddress}
      onChange={(e) => onWalletAddressChange(index, e.target.value)}
    />
    {index > 0 && (
      <Button variant="ghost" className="text-red-500" onClick={onRemove}>
        <X size={20} />
      </Button>
    )}
  </div>
);

const MultisigSetupPage: React.FC = () => {

  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);
  const account = useActiveAccount();

  const [multisigName, setMultisigName] = useState('');
  const [walletAddresses, setWalletAddresses] = useState(['']);
  const [threshold, setThreshold] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (account?.address) {
      setIsConnected(true);
      setWalletAddresses([account.address]);
    } else {
      setIsConnected(false);
      setWalletAddresses(['']);
    }
  }, [account?.address]);

  const addSigner = () => {
    setWalletAddresses([...walletAddresses, '']);
  };

  const removeSigner = (index: number) => {
    const newWalletAddresses = walletAddresses.filter((_, i) => i !== index);
    setWalletAddresses(newWalletAddresses);
  };

  const onWalletAddressChange = (index: number, value: string) => {
    const newWalletAddresses = [...walletAddresses];
    newWalletAddresses[index] = value;
    setWalletAddresses(newWalletAddresses);
  };

  const handleSubmit = async () => {
    try {
      const owners = walletAddresses.filter(address => address.trim() !== '');
  
      const encodedData = encodeFunctionData({
        abi: MultisigABI,
        functionName: "initialize",
        args: [owners, BigInt(threshold)],
      });
  
      console.log("Encoded data:", encodedData);
  
      const provider = new ethers.JsonRpcProvider(process.env.SCROLL_SEPOLIA_RPC_URL);
      console.log("Provider:", provider);
      const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY!, provider);
  
      const factoryContract = new ethers.Contract(contractAddress, MultisigFactoryABI, wallet);
  
      const tx = await factoryContract.deployContract(multisigName, encodedData);
  
      await tx.wait();
  
      console.log("Multisig deployed successfully!");
      const deployedAddress = await getDeployedMultisigAddress(multisigName);
      console.log("Deployed Multisig address:", deployedAddress);
      router.push(`/welcome/accounts/success?address=${deployedAddress}`);
    } catch (error) {
      console.error("Error deploying Multisig:", error);
      alert("Failed to deploy Multisig. See console for details.");
    }
  };

  const getDeployedMultisigAddress = async (name: string) => {
    try {
      const provider = new ethers.JsonRpcProvider(scrollSepoliaRpcUrl);
      const factoryContract = new ethers.Contract(contractAddress, MultisigFactoryABI, provider);
      return await factoryContract.getDeployedAddress(name);
    } catch (error) {
      console.error("Error getting deployed Multisig address:", error);
      throw error;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="p-8">
        <h1 className="text-3xl mb-8">Welcome to BioSig Wallet</h1>
        <ol className="space-y-6">
          <li className="flex items-center space-x-4">
            <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">1</div>
            <div className="flex-grow">
              <h2 className="text-xl mb-2">Connect Wallet</h2>
              {isConnected ? (
                <div>{account?.address}</div>
              ) : (
                <p>Connect Wallet First</p>
              )}
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">2</div>
            <div className="flex-grow">
              <h2 className="text-xl mb-2">Name your Multisig account</h2>
              <Input
                placeholder="Enter..."
                className="bg-gray-800 border-gray-700"
                value={multisigName}
                onChange={(e) => setMultisigName(e.target.value)}
              />
            </div>
          </li>
          <li className="flex items-center space-x-4">
            <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">3</div>
            <div className="flex-grow">
              <h2 className="text-xl mb-2">Signers and Confirmations</h2>
              <Card className="bg-gray-900 border-gray-800 mb-8">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-white">Signers and Confirmations</h2>
                    <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
                      {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </Button>
                  </div>
                  {isExpanded && (
                    <div className="space-y-4">
                      {walletAddresses.map((address, index) => (
                        <SignerInput
                          key={index}
                          index={index}
                          walletAddress={address}
                          onWalletAddressChange={onWalletAddressChange}
                          onRemove={() => removeSigner(index)}
                        />
                      ))}
                      <div className="mt-6">
                        <Button variant="secondary" onClick={addSigner} className="w-full bg-gray-800 text-white hover:bg-gray-700">
                          <Plus size={20} className="mr-2" /> Add more signer
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 mb-16">
                <CardContent className="p-6">
                  <h2 className="text-2xl mb-4 text-white">Thresholds</h2>
                  <p className="mb-4 text-gray-400">Specify the threshold of signatures needed to approve transactions.</p>
                  <div className="flex items-center space-x-2">
                    <Select value={threshold.toString()} onValueChange={(value) => setThreshold(parseInt(value))}>
                      <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        {walletAddresses.map((_, index) => (
                          <SelectItem key={index} value={`${index + 1}`}>{index + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className='text-white'>out of {walletAddresses.length} signers.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </li>
        </ol>
        <button onClick={handleSubmit} className='text-black bg-white p-4 rounded-md hover:text-white hover:bg-black'>Submit</button>
      </main>

      <footer className="absolute bottom-0 w-full p-4 justify-between text-center text-gray-500">
        <a href="#" className="hover:text-white">Terms of Use</a> | <a href="#" className="hover:text-white">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default MultisigSetupPage;