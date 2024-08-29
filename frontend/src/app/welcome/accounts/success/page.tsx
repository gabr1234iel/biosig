"use client"

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

const MultisigSetupSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deployedAddress = searchParams.get('address') || '';

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push(`/dashboard/${deployedAddress}`);
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(redirectTimer);
  }, [router, deployedAddress]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-8">
        <Card className="bg-gray-900 border-gray-800 max-w-md w-full">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-white">Success!</h1>
            <p className="text-xl mb-6 text-white">Your multisig account has been successfully created.</p>
            <p className="text-gray-400 mb-2">Deployed Address:</p>
            <p className="text-white mb-8 break-all">{deployedAddress}</p>
            <p className="text-gray-400 mb-8">You will be redirected to your dashboard in a few seconds...</p>
            <Button 
              onClick={() => router.push(`/dashboard/${deployedAddress}`)} 
              className="bg-gray-800 text-white hover:bg-gray-700 w-full"
            >
              Go to Dashboard Now
            </Button>
          </CardContent>
        </Card>
      </main>
      
      <footer className="p-4 text-center text-gray-500">
        <a href="#" className="hover:text-white">Terms of Use</a> | <a href="#" className="hover:text-white">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default MultisigSetupSuccessPage;