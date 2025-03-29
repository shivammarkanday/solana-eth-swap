
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NetworkIcon from './NetworkIcon';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface WalletInfoProps {
  currentNetwork: 'Ethereum' | 'Solana';
  walletAddress: string;
  balance: number | null;
  isConnected: boolean;
}

const WalletInfo: React.FC<WalletInfoProps> = ({
  currentNetwork,
  walletAddress,
  balance,
  isConnected
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success('Address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isConnected) {
    return (
      <Card className="wallet-card animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">Wallet Not Connected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Connect your wallet to view your balance and address
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="wallet-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Wallet Info</CardTitle>
          <div className={`network-pill ${currentNetwork === 'Ethereum' ? 'ethereum-pill' : 'solana-pill'}`}>
            <div className="flex items-center gap-1">
              <NetworkIcon network={currentNetwork} size={14} />
              <span>{currentNetwork}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Your Address</div>
          <div className="flex items-center justify-between bg-muted p-2 rounded">
            <span className="font-mono text-sm">{formatAddress(walletAddress)}</span>
            <button 
              onClick={copyToClipboard} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Balance</div>
          <div className="text-2xl font-bold">
            {balance !== null ? balance.toFixed(4) : '—'} {currentNetwork === 'Ethereum' ? 'ETH' : 'SOL'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletInfo;
