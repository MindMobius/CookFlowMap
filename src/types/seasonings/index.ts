import { BaseItem } from '../base';
import { salts } from './salt';
import { oils } from './oil';

export interface Seasoning extends BaseItem {
  type: string;
}

export const SEASONING_TYPES = {
  SALT: '盐类',
  SAUCE: '酱料',
  SPICE: '香料',
  OIL: '油类'
} as const;

export const seasonings = [
  ...salts,
  ...oils,
  // ... 其他调味料
]; 