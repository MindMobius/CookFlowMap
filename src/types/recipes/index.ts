import { Recipe } from './types';
import { tomatoEgg } from './tomato-egg';
// ... 其他菜谱导入

export const recipes: Record<string, Recipe> = {
  tomatoEgg,
  // ... 其他菜谱
}; 