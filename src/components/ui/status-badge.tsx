import { cn } from '@/lib/utils';

type BadgeStatus = 'active' | 'running' | 'completed' | 'draft' | 'paused' | 'poor' | 'processing' | 'connected' | 'disconnected' | 'error';

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

const statusConfig: Record<BadgeStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-success/10 text-success border-success/20',
  },
  running: {
    label: 'Running',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/10 text-success border-success/20',
  },
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground border-border',
  },
  paused: {
    label: 'Paused',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  poor: {
    label: 'Poor Quality',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  processing: {
    label: 'Processing',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  connected: {
    label: 'Connected',
    className: 'bg-success/10 text-success border-success/20',
  },
  disconnected: {
    label: 'Disconnected',
    className: 'bg-muted text-muted-foreground border-border',
  },
  error: {
    label: 'Error',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
