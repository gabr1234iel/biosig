"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from '@/app/components/Layouts/DefaultLayout';
import Home from '@/app/components/Dashboard/Home';
import { MultisigProvider } from '@/app/context/MultisigContext'

const DashboardPage: React.FC = () => {
  const params = useParams();
  const multisigAddress = params.multisig_id as string;

  return (
    <MultisigProvider multisigAddress={multisigAddress}>
      <DefaultLayout multisigAddress={multisigAddress}>
        <Home />
      </DefaultLayout>
    </MultisigProvider>
  );
};

export default DashboardPage;