import { BaseNode } from './BaseNode';
import { utensils } from '@/types/utensils';

interface UtensilNodeProps {
  id: string;
  className?: string;
}

export function UtensilNode({ id, className }: UtensilNodeProps) {
  const utensil = Object.values(utensils).flat().find(u => u.id === id);
  if (!utensil) return null;

  return (
    <BaseNode 
      id={id}
      label={utensil.name}
      color="bg-marker-utensil bg-opacity-10"
      className={className}
    />
  );
} 