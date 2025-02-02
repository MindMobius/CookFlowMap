export interface Element {
  id: string;
  position: Position;
  name: string;
  description: string;
  image?: string;
  quantity: number;
  unit: string;
  type: ElementType;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  description: string;
  seasonings: Element[];
  utensils: Element[];
}

export interface Product {
  position: Position;
  name: string;
  description: string;
  materials: Element[];
  seasonings: Element[];
  utensils: Element[];
}

export interface Position {
  x: number;
  y: number;
}

export enum ElementType {
  Material = 'material',
  Seasoning = 'seasoning',
  Utensil = 'utensil'
}