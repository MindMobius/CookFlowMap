interface Ingredient {
  type: 'food' | 'seasoning' | 'utensil';
  name: string;
  amount?: string;
  unit?: string;
  note?: string;
}

interface Step {
  level: number;
  index: number;
  inputs: Ingredient[];
  process: string;
  outputs: Ingredient[];
}

export interface Recipe {
  title: string;
  steps: Step[];
}

export function parseCookv(content: string): Recipe {
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines[0].replace('#', '').trim();
  
  const steps: Step[] = [];
  
  // 解析每一行步骤
  lines.slice(1).forEach(line => {
    if (!line.match(/^\d+\./)) return;
    
    const level = parseInt(line.match(/<(\d+)>/)?.[1] || '0');
    const index = parseInt(line.match(/^\d+/)?.[0] || '0');
    
    // 分割输入和输出
    const [inputPart, outputPart] = line.split('=').map(p => p.trim());
    
    // 解析食材、调料、厨具
    const inputs = parseIngredients(inputPart);
    const outputs = parseIngredients(outputPart);
    
    // 提取处理步骤
    const process = inputPart.split('+').slice(-1)[0].trim();
    
    steps.push({ level, index, inputs, process, outputs });
  });
  
  return { title, steps };
}

function parseIngredients(text: string): Ingredient[] {
  const ingredients: Ingredient[] = [];
  
  // 匹配全角和半角符号
  const regex = /[@&#＠＆＃]([^{｛]+)(?:[{｛]([^}｝]*)[}｝])?(?:[(（]([^)）]*)[)）])?/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const [_, name, amount, note] = match;
    const [qty, unit] = (amount || '').split(/[%％]/);
    
    ingredients.push({
      type: match[0].match(/[@＠]/) ? 'food' : 
            match[0].match(/[&＆]/) ? 'seasoning' : 'utensil',
      name: name.trim(),
      amount: qty?.trim(),
      unit: unit?.trim(),
      note: note?.trim()
    });
  }
  
  return ingredients;
} 