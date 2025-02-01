import { BaseNode } from './BaseNode';
import { ingredients } from '@/types/ingredients';
import { IngredientState } from '@/types/recipes/types';

interface IngredientNodeProps extends Partial<IngredientState> {
  className?: string;
}

export function IngredientNode({ id, state, amount, className }: IngredientNodeProps) {
  const ingredient = Object.values(ingredients).flat().find(i => i.id === id);
  if (!ingredient) return null;

  return (
    <BaseNode 
      id={id}
      label={ingredient.name}
      state={state}
      amount={amount}
      color={`bg-[${ingredient.color}] bg-opacity-50`}
      className={className}
    />
  );
} 