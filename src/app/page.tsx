import { parseCookv } from '@/lib/parser';
import { RecipeFlow } from '@/components/RecipeFlow';
import { promises as fs } from 'fs';
import path from 'path';

export default async function Home() {
  const content = await fs.readFile(path.join(process.cwd(), 'public/example.cookv'), 'utf8');
  const recipe = parseCookv(content);
  
  // 收集基础材料
  const ingredients = recipe.steps.flatMap(step => [...step.inputs, ...step.outputs]);
  const foods = [...new Set(ingredients.filter(i => i.type === 'food').map(i => i.name))];
  const seasonings = [...new Set(ingredients.filter(i => i.type === 'seasoning').map(i => i.name))];
  const utensils = [...new Set(ingredients.filter(i => i.type === 'utensil').map(i => i.name))];
  
  // 收集所有食材状态节点
  const foodStates = [...new Set(ingredients
    .filter(i => i.type === 'food' && i.note)
    .map(i => ({ name: i.name, state: i.note }))
    .map(item => JSON.stringify(item)))
  ].map(str => JSON.parse(str));
  
  return (
    <main className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">食材</h2>
          <div className="flex flex-wrap gap-2">
            {foods.map(food => (
              <span key={food} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                {food}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">调料</h2>
          <div className="flex flex-wrap gap-2">
            {seasonings.map(seasoning => (
              <span key={seasoning} className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
                {seasoning}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">厨具</h2>
          <div className="flex flex-wrap gap-2">
            {utensils.map(utensil => (
              <span key={utensil} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full">
                {utensil}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">食材状态节点</h2>
        <div className="grid grid-cols-4 gap-4">
          {foodStates.map(({ name, state }) => (
            <div 
              key={`${name}-${state}`}
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200"
            >
              <span className="font-medium text-blue-700">{name}</span>
              <span className="text-sm text-blue-500 mt-1">{state}</span>
            </div>
          ))}
        </div>
      </div>
      
      <RecipeFlow recipe={recipe} />
    </main>
  );
}
