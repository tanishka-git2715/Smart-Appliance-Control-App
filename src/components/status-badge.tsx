import React from 'react';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'error';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, label, showIcon = true }: StatusBadgeProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      defaultLabel: 'Healthy'
    },
    warning: {
      icon: AlertTriangle,
      className: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      defaultLabel: 'Warning'
    },
    error: {
      icon: XCircle,
      className: 'bg-red-500/20 text-red-400 border-red-500/40',
      defaultLabel: 'Error'
    }
  };

  const { icon: Icon, className, defaultLabel } = config[status];

  return (
    <Badge variant="outline" className={`${className} flex items-center gap-1`}>
      {showIcon && <Icon className="w-3 h-3" />}
      <span>{label || defaultLabel}</span>
    </Badge>
  );
}
