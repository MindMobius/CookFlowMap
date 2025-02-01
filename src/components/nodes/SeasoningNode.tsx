import { BaseNode } from './BaseNode';
import { seasonings } from '@/types/seasonings';

interface SeasoningNodeProps {
  id: string;
  amount?: string;
  className?: string;
}

export function SeasoningNode({ id, amount, className }: SeasoningNodeProps) {
  const seasoning = Object.values(seasonings).flat().find(s => s.id === id);
  if (!seasoning) return null;

  return (
    <BaseNode 
      id={id}
      label={seasoning.name}
      amount={amount}
      color="bg-marker-seasoning bg-opacity-10"
      className={className}
    />
  );
} 