"use client"

import React, { useState } from 'react';

import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import Link from 'next/link';
import InputGroup from '@/app/components/FormElements/InputGroup';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';


type SignerInputProps = {
  index: number;
  totalSigners: number;
  onRemove: () => void;
};

const SignerInput = ({ index, totalSigners, onRemove }: SignerInputProps) => (
  <div className={`grid grid-cols-2 gap-4 mb-4 ${index === totalSigners - 1 ? 'pb-4' : ''}`}>
      <InputGroup
          label={`Signer Name ${index + 1}`}
          type="text"
          placeholder={`Enter signer name ${index + 1}`}
          customClasses="w-full"
      />
      <div className={`mx-2 flex items-end`}>
        <InputGroup
            label="Wallet Address"
            type="text"
            placeholder="Enter your wallet address"
            customClasses="w-full"
        />
        {index > 1 && (
            <div>
              <Button variant="ghost" className="ml-2 text-red-500" onClick={onRemove}>
                <X size={35} />
              </Button>
            </div>
        )}
      </div>
  </div>
);

const SignersPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [signers, setSigners] = useState([{}, {}]);  // Start with 2 signers

  const addSigner = () => {
    setSigners([...signers, {}]);
  };

  const removeSigner = (index: number) => {
    const newSigners = signers.filter((_, i) => i !== index);
    setSigners(newSigners);
  };

  return (
    <div className="bg-black text-white min-h-screen">    
      <main className="p-8">
        <h1 className="text-3xl mb-8">Add signers to your Biosig account</h1>
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
                {signers.map((_, index) => (
                  <SignerInput key={index} index={index} totalSigners={signers.length} onRemove={() => removeSigner(index)} />
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
              <Select>
                <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {signers.map((_, index) => (
                    <SelectItem key={index} value={`${index + 1}`}>{index + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className='text-white'>out of {signers.length} signers.</span>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="fixed bottom-0 w-full p-4 flex justify-between bg-gray-900">
        <Button asChild variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700">
          <Link href="/multisig">Previous</Link>
        </Button>
        <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700"><Link href="/multisig">Continue</Link></Button>
      </footer>
    </div>
  );
};

export default SignersPage;