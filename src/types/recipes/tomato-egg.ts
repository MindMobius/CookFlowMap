import { Recipe } from './types';

export const tomatoEgg: Recipe = {
  id: 'tomato-egg',
  name: '西红柿炒鸡蛋',
  description: '经典家常菜',
  ingredients: [
    { id: 'chicken_egg', amount: '3个', state: '完整' },
    { id: 'tomato', amount: '2个', state: '完整' }
  ],
  seasonings: [
    { id: 'salt', amount: '适量' },
    { id: 'cooking_oil', amount: '适量' }
  ],
  utensils: ['wok', 'spatula', 'bowl', 'chopsticks', 'knife', 'cutting_board'],
  steps: [
    {
      id: 'prep_egg',
      description: '将鸡蛋打散，加入适量盐调味',
      ingredients: [
        { id: 'chicken_egg', amount: '3个', state: '完整' }
      ],
      seasonings: [
        { id: 'salt', amount: '适量' }
      ],
      utensils: ['bowl', 'chopsticks'],
      nextState: [
        { id: 'chicken_egg', amount: '3个', state: '打散调味' }
      ],
      group: 1  // 准备工作组
    },
    {
      id: 'prep_tomato',
      description: '将西红柿洗净切块',
      ingredients: [
        { id: 'tomato', amount: '2个', state: '完整' }
      ],
      utensils: ['knife', 'cutting_board'],
      nextState: [
        { id: 'tomato', amount: '2个', state: '切块' }
      ],
      group: 1  // 准备工作组
    },
    {
      id: 'cook_egg',
      description: '炒锅中倒入适量油烧热，倒入打散的鸡蛋快速翻炒至金黄，盛出',
      ingredients: [
        { id: 'chicken_egg', amount: '3个', state: '打散调味' }
      ],
      seasonings: [
        { id: 'cooking_oil', amount: '适量' }
      ],
      utensils: ['wok', 'spatula'],
      temperature: '大火',
      nextState: [
        { id: 'chicken_egg', amount: '3个', state: '金黄' }
      ],
      dependencies: ['prep_egg']  // 依赖打蛋步骤
    },
    {
      id: 'cook_tomato',
      description: '同一锅中加油烧热，放入西红柿翻炒出汤',
      ingredients: [
        { id: 'tomato', amount: '2个', state: '切块' }
      ],
      seasonings: [
        { id: 'cooking_oil', amount: '适量' }
      ],
      utensils: ['wok', 'spatula'],
      temperature: '中火',
      nextState: [
        { id: 'tomato', amount: '2个', state: '出汤' }
      ],
      dependencies: ['cook_egg', 'prep_tomato']  // 依赖炒蛋和切西红柿步骤
    },
    {
      id: 'combine',
      description: '放入炒好的鸡蛋，翻炒均匀即可',
      ingredients: [
        { id: 'chicken_egg', amount: '3个', state: '金黄' },
        { id: 'tomato', amount: '2个', state: '出汤' }
      ],
      utensils: ['wok', 'spatula'],
      temperature: '中火',
      nextState: [
        { id: 'chicken_egg', amount: '3个', state: '完成' },
        { id: 'tomato', amount: '2个', state: '完成' }
      ],
      dependencies: ['cook_tomato']  // 依赖炒西红柿步骤
    }
  ],
  difficulty: '简单',
  time: 15,
  tags: ['家常菜', '快手菜']
}; 