// 食材状态
export interface IngredientState {
    id: string;        // 原料ID
    amount: string;    // 用量，如："3个"
    state?: string;    // 状态，如："打散的"
  }

// 步骤节点
export interface Step {
  id: string;
  description: string;
  ingredients: IngredientState[];
  seasonings?: Array<{
    id: string;
    amount: string;
  }>;
  utensils: string[];
  temperature?: string;
  nextState: IngredientState[];
  dependencies?: string[];    // 依赖的步骤ID
  group?: number;            // 可并行步骤组，相同组号的步骤可以并行
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: IngredientState[];
  seasonings: Array<{
    id: string;
    amount: string;
  }>;
  utensils: string[];
  steps: Step[];
  difficulty?: '简单' | '普通' | '困难';
  time?: number;
  tags?: string[];
} 