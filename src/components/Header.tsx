
import React from 'react';
import { Button } from '@/components/ui/button';
import NetworkIcon from './NetworkIcon';

interface HeaderProps {
  isConnected: boolean;
  currentNetwork: 'Ethereum' | 'Solana';
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isConnected,
  currentNetwork,
  onConnectWallet,
  onDisconnectWallet
}) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b">
      <div className="flex items-center space-x-2">
        <NetworkIcon network="Ethereum" className="animate-pulse" />
        <NetworkIcon network="Solana" className="animate-pulse" />
        <h1 className="text-xl md:text-2xl font-bold gradient-text">
          Blockchain Wallet
        </h1>
      </div>

      <Button
        onClick={isConnected ? onDisconnectWallet : onConnectWallet}
        className={`${
          isConnected
            ? 'bg-destructive hover:bg-destructive/90'
            : 'bg-gradient-wallet hover:opacity-90'
        } transition-all`}
      >
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </Button>
    </header>
  );
};

export default Header;
