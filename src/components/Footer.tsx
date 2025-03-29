
import React from 'react';
import { Button } from '@/components/ui/button';
import NetworkIcon from './NetworkIcon';
import { HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FooterProps {
  currentNetwork: 'Ethereum' | 'Solana';
  onSwitchNetwork: (network: 'Ethereum' | 'Solana') => void;
  isConnected: boolean;
}

const Footer: React.FC<FooterProps> = ({
  currentNetwork,
  onSwitchNetwork,
  isConnected
}) => {
  const showHelp = () => {
    toast.info(
      "Help Center",
      {
        description: "Contact support@blockchainwallet.com for assistance.",
        duration: 5000,
      }
    );
  };

  return (
    <footer className="flex items-center justify-between py-4 px-6 border-t mt-auto">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className={`px-3 ${
            currentNetwork === 'Ethereum' ? 'bg-ethereum-light border-ethereum' : ''
          }`}
          onClick={() => onSwitchNetwork('Ethereum')}
          disabled={!isConnected || currentNetwork === 'Ethereum'}
        >
          <div className="flex items-center gap-1">
            <NetworkIcon network="Ethereum" size={16} />
            <span>Ethereum</span>
          </div>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className={`px-3 ${
            currentNetwork === 'Solana' ? 'bg-solana-light border-solana' : ''
          }`}
          onClick={() => onSwitchNetwork('Solana')}
          disabled={!isConnected || currentNetwork === 'Solana'}
        >
          <div className="flex items-center gap-1">
            <NetworkIcon network="Solana" size={16} />
            <span>Solana</span>
          </div>
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={showHelp}
        aria-label="Help"
      >
        <HelpCircle size={18} />
        <span className="ml-1 hidden sm:inline">Help</span>
      </Button>
    </footer>
  );
};

export default Footer;
