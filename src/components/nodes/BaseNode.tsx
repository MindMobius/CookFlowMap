interface BaseNodeProps {
  id: string;
  label: string;
  state?: string;
  amount?: string;
  color?: string;
  className?: string;
}

export function BaseNode({ 
  id, 
  label, 
  state, 
  amount,
  color = 'bg-bg-secondary',
  className = '' 
}: BaseNodeProps) {
  return (
    <div 
      className={`rounded-lg border border-bg-tertiary p-3 min-w-[120px] text-center hover:bg-state-hover transition-colors duration-200 ${color} ${className}`}
    >
      <div className="font-medium text-text-primary">{label}</div>
      {amount && <div className="text-xs text-text-tertiary mt-1">{amount}</div>}
      {state && <div className="text-sm text-text-secondary mt-1">({state})</div>}
    </div>
  );
} 