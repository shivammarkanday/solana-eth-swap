
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

interface SendTransactionProps {
  currentNetwork: 'Ethereum' | 'Solana';
  isConnected: boolean;
  onSendTransaction: (recipient: string, amount: number) => Promise<void>;
}

const SendTransaction: React.FC<SendTransactionProps> = ({
  currentNetwork,
  isConnected,
  onSendTransaction
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!recipient) {
      toast.error('Please enter a recipient address');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setIsSending(true);
    
    try {
      await onSendTransaction(recipient, parseFloat(amount));
      setRecipient('');
      setAmount('');
      toast.success(`Transaction sent successfully!`);
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error('Failed to send transaction. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="wallet-card animate-fade-in">
      <CardHeader>
        <CardTitle>Send {currentNetwork === 'Ethereum' ? 'ETH' : 'SOL'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="recipient" className="text-sm font-medium">
              Recipient Address
            </label>
            <Input
              id="recipient"
              placeholder={`Enter ${currentNetwork} address`}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.0001"
                min="0"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                {currentNetwork === 'Ethereum' ? 'ETH' : 'SOL'}
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-wallet hover:opacity-90"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : (
              <span className="flex items-center justify-center gap-2">
                Send Transaction <ArrowRight size={16} />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SendTransaction;
