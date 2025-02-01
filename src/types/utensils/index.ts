import { BaseItem } from '../base';
import { cookware } from './cookware';
import { tool } from './tool';

export interface Utensil extends BaseItem {
  type: string;
}

export const UTENSIL_TYPES = {
  COOKWARE: '炊具',
  TOOL: '工具'
} as const;

export const utensils = [
  ...cookware,
  ...tool,
]; 