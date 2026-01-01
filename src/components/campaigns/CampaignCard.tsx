import { Campaign } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/status-badge';
import { Users, Eye, MousePointer, Sparkles, FileText, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const isAI = campaign.type === 'ai_personalized';

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-soft transition-all duration-200 hover:shadow-elevated hover:border-primary/20 cursor-pointer"
    >
      {/* Type indicator */}
      {isAI && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-2 right-[-20px] w-[80px] rotate-45 gradient-primary py-0.5 text-center">
            <Sparkles className="h-3 w-3 text-primary-foreground mx-auto" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="font-semibold text-foreground truncate mb-1">
            {campaign.name}
          </h3>
          <div className="flex items-center gap-2">
            <StatusBadge status={campaign.status} />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {isAI ? <Sparkles className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
              {isAI ? 'AI Personalized' : 'Manual'}
            </span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Pause</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Users className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {campaign.recipientCount.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Recipients</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <Eye className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {campaign.openRate > 0 ? `${campaign.openRate}%` : '-'}
          </p>
          <p className="text-xs text-muted-foreground">Open Rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
            <MousePointer className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {campaign.clickRate > 0 ? `${campaign.clickRate}%` : '-'}
          </p>
          <p className="text-xs text-muted-foreground">Click Rate</p>
        </div>
      </div>
    </div>
  );
}
