import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/ui/status-badge';
import { emailAccounts as initialAccounts } from '@/data/mockData';
import { 
  Plus, 
  Mail,
  MoreVertical,
  Settings,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConnectAccountDialog } from '@/components/email-accounts/ConnectAccountDialog';

const providerIcons: Record<string, string> = {
  gmail: '📧',
  outlook: '📬',
  smtp: '⚙️',
};

const providerNames: Record<string, string> = {
  gmail: 'Gmail',
  outlook: 'Outlook',
  smtp: 'Custom SMTP',
};

export default function EmailAccounts() {
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [emailAccounts, setEmailAccounts] = useState(initialAccounts);

  const handleAccountConnected = (account: { email: string; provider: string }) => {
    const newAccount = {
      id: `acc-${Date.now()}`,
      email: account.email,
      provider: account.provider as 'gmail' | 'outlook' | 'smtp',
      status: 'connected' as const,
      dailyLimit: 500,
      sentToday: 0,
    };
    setEmailAccounts(prev => [...prev, newAccount]);
  };

  return (
    <AppLayout
      title="Email Accounts"
      description="Manage your connected email accounts"
      action={
        <Button className="gap-2" onClick={() => setIsConnectDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Connect Account
        </Button>
      }
    >
      <div className="space-y-4">
        {emailAccounts.map((account) => {
          const usagePercent = (account.sentToday / account.dailyLimit) * 100;
          
          return (
            <div
              key={account.id}
              className="flex items-center gap-6 p-5 rounded-xl border border-border bg-card shadow-soft hover:shadow-elevated transition-shadow"
            >
              {/* Provider Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                {providerIcons[account.provider]}
              </div>

              {/* Account Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {account.email}
                  </h3>
                  <StatusBadge status={account.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {providerNames[account.provider]}
                </p>
              </div>

              {/* Usage */}
              <div className="w-48 space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Daily Usage</span>
                  <span className="font-medium text-foreground">
                    {account.sentToday} / {account.dailyLimit}
                  </span>
                </div>
                <Progress value={usagePercent} className="h-1.5" />
              </div>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reconnect
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}

        {/* Empty State */}
        {emailAccounts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No email accounts connected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect an email account to start sending campaigns
            </p>
            <Button className="gap-2" onClick={() => setIsConnectDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Connect Account
            </Button>
          </div>
        )}
      </div>

      <ConnectAccountDialog 
        open={isConnectDialogOpen} 
        onOpenChange={setIsConnectDialogOpen}
        onAccountConnected={handleAccountConnected}
      />
    </AppLayout>
  );
}