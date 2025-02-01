import { BaseItem } from '../base';
import { eggs } from './eggs';

export interface Ingredient extends BaseItem {
  category: string;
  color?: string;
}

export const INGREDIENT_CATEGORIES = {
  EGGS: '禽蛋类',
  VEGETABLES: '蔬菜类',
  MEAT: '肉类',
  SEAFOOD: '海鲜类',
  STAPLE: '主食类'
} as const;

// 导出所有原料
export const ingredients = [
  ...eggs,
  // ... 其他原料
]; 