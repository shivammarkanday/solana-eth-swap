
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  recipient: string;
  timestamp: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  currentNetwork: 'Ethereum' | 'Solana';
  isConnected: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  currentNetwork,
  isConnected
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Success':
        return 'status-success';
      case 'Pending':
        return 'status-pending';
      case 'Failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="wallet-card animate-fade-in">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={getStatusClass(tx.status)}>{tx.status}</span>
                      <span className="text-sm text-muted-foreground">{tx.timestamp}</span>
                    </div>
                    <div className="text-sm mt-1">
                      To: <span className="font-mono">{formatAddress(tx.recipient)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {tx.amount.toFixed(4)} {currentNetwork === 'Ethereum' ? 'ETH' : 'SOL'}
                    </div>
                    <a
                      href="#"
                      className="text-xs text-blue-500 hover:underline flex items-center gap-1 justify-end mt-1"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No transaction history available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
