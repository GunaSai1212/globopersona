import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

interface ConnectAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountConnected?: (account: { email: string; provider: string }) => void;
}

type Provider = 'gmail' | 'outlook' | 'smtp';
type Step = 'select' | 'connect' | 'success';

const providers = [
  {
    id: 'gmail' as Provider,
    name: 'Gmail',
    icon: '📧',
    description: 'Connect your Gmail account via OAuth',
  },
  {
    id: 'outlook' as Provider,
    name: 'Outlook',
    icon: '📬',
    description: 'Connect your Microsoft Outlook account',
  },
  {
    id: 'smtp' as Provider,
    name: 'Custom SMTP',
    icon: '⚙️',
    description: 'Connect using SMTP credentials',
  },
];

export function ConnectAccountDialog({ 
  open, 
  onOpenChange,
  onAccountConnected 
}: ConnectAccountDialogProps) {
  const [step, setStep] = useState<Step>('select');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [smtpConfig, setSmtpConfig] = useState({
    email: '',
    host: '',
    port: '587',
    username: '',
    password: '',
  });

  const resetDialog = () => {
    setStep('select');
    setSelectedProvider(null);
    setIsConnecting(false);
    setSmtpConfig({
      email: '',
      host: '',
      port: '587',
      username: '',
      password: '',
    });
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetDialog();
    }
    onOpenChange(open);
  };

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider);
    setStep('connect');
  };

  const handleOAuthConnect = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnecting(false);
    setStep('success');
    
    if (onAccountConnected && selectedProvider) {
      onAccountConnected({
        email: `user@${selectedProvider === 'gmail' ? 'gmail.com' : 'outlook.com'}`,
        provider: selectedProvider,
      });
    }
  };

  const handleSmtpConnect = async () => {
    if (!smtpConfig.email || !smtpConfig.host || !smtpConfig.username || !smtpConfig.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsConnecting(true);
    
    // Simulate SMTP connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnecting(false);
    setStep('success');
    
    if (onAccountConnected) {
      onAccountConnected({
        email: smtpConfig.email,
        provider: 'smtp',
      });
    }
  };

  const handleDone = () => {
    toast.success('Email account connected successfully!');
    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        {step === 'select' && (
          <>
            <DialogHeader>
              <DialogTitle>Connect Email Account</DialogTitle>
              <DialogDescription>
                Choose your email provider to get started
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/30 transition-all text-left group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl group-hover:bg-primary/10 transition-colors">
                    {provider.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {provider.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'connect' && selectedProvider && (
          <>
            <DialogHeader>
              <DialogTitle>
                Connect {providers.find(p => p.id === selectedProvider)?.name}
              </DialogTitle>
              <DialogDescription>
                {selectedProvider === 'smtp' 
                  ? 'Enter your SMTP server credentials'
                  : 'Click below to authenticate with your account'
                }
              </DialogDescription>
            </DialogHeader>
            
            {selectedProvider === 'smtp' ? (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={smtpConfig.email}
                    onChange={(e) => setSmtpConfig(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="host">SMTP Host *</Label>
                    <Input
                      id="host"
                      placeholder="smtp.example.com"
                      value={smtpConfig.host}
                      onChange={(e) => setSmtpConfig(prev => ({ ...prev, host: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      placeholder="587"
                      value={smtpConfig.port}
                      onChange={(e) => setSmtpConfig(prev => ({ ...prev, port: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    placeholder="Username or email"
                    value={smtpConfig.username}
                    onChange={(e) => setSmtpConfig(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={smtpConfig.password}
                    onChange={(e) => setSmtpConfig(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('select')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleSmtpConnect}
                    disabled={isConnecting}
                    className="flex-1"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      'Connect'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-3xl">
                    {providers.find(p => p.id === selectedProvider)?.icon}
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    You'll be redirected to {providers.find(p => p.id === selectedProvider)?.name} to authorize access to your account.
                  </p>
                </div>
                <div className="flex gap-3 pt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('select')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleOAuthConnect}
                    disabled={isConnecting}
                    className="flex-1"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Authorize Access
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {step === 'success' && (
          <div className="py-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  Account Connected!
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your email account has been successfully connected and is ready to use.
                </p>
              </div>
              <Button onClick={handleDone} className="mt-4">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
