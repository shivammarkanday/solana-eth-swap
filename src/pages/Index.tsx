
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import WalletInfo from '@/components/WalletInfo';
import TransactionHistory from '@/components/TransactionHistory';
import SendTransaction from '@/components/SendTransaction';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// Mock data and functions - would be replaced with actual blockchain SDK integrations
const mockTransactions = [
  {
    id: '0x123',
    amount: 0.5,
    status: 'Success' as const,
    recipient: '0xabcdef1234567890',
    timestamp: '10 min ago',
  },
  {
    id: '0x456',
    amount: 1.2,
    status: 'Pending' as const,
    recipient: '0x0987654321fedcba',
    timestamp: '1 hr ago',
  },
  {
    id: '0x789',
    amount: 0.1,
    status: 'Failed' as const,
    recipient: '0x123456789abcdef0',
    timestamp: '2 hrs ago',
  },
];

const mockWalletData = {
  ethereum: {
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    balance: 4.5623,
  },
  solana: {
    address: '8YmMHxADRNqgeyd7TLa5i6SXJkTE11JKY4t8sCRK2hZ',
    balance: 123.4567,
  },
};

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<'Ethereum' | 'Solana'>('Ethereum');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching wallet data when network changes or wallet connects
  useEffect(() => {
    if (isConnected) {
      fetchWalletData();
    } else {
      setWalletAddress('');
      setBalance(null);
    }
  }, [isConnected, currentNetwork]);

  const fetchWalletData = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (currentNetwork === 'Ethereum') {
        setWalletAddress(mockWalletData.ethereum.address);
        setBalance(mockWalletData.ethereum.balance);
      } else {
        setWalletAddress(mockWalletData.solana.address);
        setBalance(mockWalletData.solana.balance);
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
      toast.error('Failed to load wallet data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    setIsLoading(true);
    
    // Simulate connecting to wallet
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsConnected(true);
    toast.success(`${currentNetwork} wallet connected successfully`);
    setIsLoading(false);
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance(null);
    toast.info('Wallet disconnected');
  };

  const handleSwitchNetwork = (network: 'Ethereum' | 'Solana') => {
    setCurrentNetwork(network);
    toast.success(`Switched to ${network} network`);
  };

  const handleSendTransaction = async (recipient: string, amount: number) => {
    // Simulate sending transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add transaction to history
    const newTx = {
      id: `0x${Math.random().toString(16).slice(2)}`,
      amount,
      status: 'Pending' as const,
      recipient,
      timestamp: 'Just now',
    };
    
    setTransactions([newTx, ...transactions]);
    
    // Simulate transaction confirmation
    setTimeout(() => {
      setTransactions(prev => 
        prev.map(tx => 
          tx.id === newTx.id 
            ? { ...tx, status: 'Success' as const }
            : tx
        )
      );
      
      // Update balance
      setBalance(prev => prev !== null ? prev - amount : null);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Header
        isConnected={isConnected}
        currentNetwork={currentNetwork}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />
      
      <main className="flex-1 container max-w-4xl py-8 px-4 md:px-0 md:py-12 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <WalletInfo
              currentNetwork={currentNetwork}
              walletAddress={walletAddress}
              balance={balance}
              isConnected={isConnected}
            />
            
            <SendTransaction
              currentNetwork={currentNetwork}
              isConnected={isConnected}
              onSendTransaction={handleSendTransaction}
            />
          </div>
          
          <TransactionHistory
            transactions={transactions}
            currentNetwork={currentNetwork}
            isConnected={isConnected}
          />
        </div>
      </main>
      
      <Footer
        currentNetwork={currentNetwork}
        onSwitchNetwork={handleSwitchNetwork}
        isConnected={isConnected}
      />
    </div>
  );
};

export default Index;
