
import React from 'react';
import { Bitcoin, Gem } from 'lucide-react';

interface NetworkIconProps {
  network: 'Ethereum' | 'Solana';
  size?: number;
  className?: string;
}

const NetworkIcon: React.FC<NetworkIconProps> = ({ network, size = 24, className = '' }) => {
  if (network === 'Ethereum') {
    return <Gem size={size} className={`text-ethereum ${className}`} />;
  } else {
    // Solana
    return <Bitcoin size={size} className={`text-solana ${className}`} />;
  }
};

export default NetworkIcon;
