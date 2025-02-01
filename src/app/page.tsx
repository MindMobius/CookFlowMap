import { recipes } from '@/types/recipes';
import { IngredientNode } from '@/components/nodes/IngredientNode';
import { SeasoningNode } from '@/components/nodes/SeasoningNode';
import { UtensilNode } from '@/components/nodes/UtensilNode';

export default function Home() {
  const recipe = recipes.tomatoEgg;

  return (
    <main className="min-h-screen p-8 bg-bg-primary">
      <h1 className="text-2xl font-medium mb-6 text-center text-text-primary">
        {recipe.name}
        <span className="text-sm text-text-tertiary ml-2">
          {recipe.time}分钟 · {recipe.difficulty}
        </span>
      </h1>

      {/* 备料区 */}
      <section className="mb-8 p-6 rounded-xl bg-bg-secondary shadow-sm border border-bg-tertiary">
        <h2 className="text-lg font-medium mb-6 text-text-primary text-center">备料区</h2>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="mb-4 font-medium text-text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-marker-ingredient"></span>
              食材
            </h3>
            <div className="flex flex-wrap gap-4">
              {recipe.ingredients.map(ing => (
                <IngredientNode 
                  key={`${ing.id}-${ing.state}`}
                  {...ing}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 font-medium text-text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-marker-seasoning"></span>
              调味料
            </h3>
            <div className="flex flex-wrap gap-4">
              {recipe.seasonings.map(seasoning => (
                <SeasoningNode 
                  key={seasoning.id}
                  {...seasoning}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-marker-utensil"></span>
              厨具
            </h3>
            <div className="flex flex-wrap gap-4">
              {recipe.utensils.map(utensil => (
                <UtensilNode 
                  key={utensil}
                  id={utensil}
                  className="shadow-sm hover:shadow-md transition-shadow duration-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 展示区 */}
      <section className="rounded-xl bg-bg-secondary p-6 shadow-sm border border-bg-tertiary">
        <h2 className="text-lg font-medium mb-6 text-text-primary text-center">烹饪步骤</h2>
        <div className="flex flex-col gap-8">
          {recipe.steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-secondary border border-bg-tertiary flex items-center justify-center text-text-secondary">
                {index + 1}
              </div>
              {step.ingredients.map(ing => (
                <IngredientNode 
                  key={`${ing.id}-${ing.state}`}
                  {...ing}
                  className="shadow-sm"
                />
              ))}
              <div className="flex-1 border-t-2 border-dashed border-bg-tertiary relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bg-secondary px-4 py-1 text-sm text-text-secondary rounded-full border border-bg-tertiary">
                  {step.description}
                </span>
              </div>
              {step.nextState.map(next => (
                <IngredientNode 
                  key={`${next.id}-${next.state}`}
                  {...next}
                  className="shadow-sm"
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
