import { EmailList } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/status-badge';
import { Users, Calendar, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface EmailListCardProps {
  list: EmailList;
  onClick?: () => void;
}

export function EmailListCard({ list, onClick }: EmailListCardProps) {
  const qualityColor = list.dataQualityScore >= 90 
    ? 'text-success' 
    : list.dataQualityScore >= 70 
      ? 'text-warning' 
      : 'text-destructive';

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-soft transition-all duration-200 hover:shadow-elevated hover:border-primary/20 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="font-semibold text-foreground truncate mb-1">
            {list.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {list.description}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Contacts</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <StatusBadge status={list.status} />
      </div>

      {/* Stats */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">Contacts</span>
          </div>
          <span className="text-sm font-semibold text-foreground">
            {list.contactCount.toLocaleString()}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Data Quality</span>
            <span className={cn('text-sm font-semibold', qualityColor)}>
              {list.dataQualityScore}%
            </span>
          </div>
          <Progress value={list.dataQualityScore} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {list.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
