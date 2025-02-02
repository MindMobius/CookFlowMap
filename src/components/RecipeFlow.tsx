'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Recipe, Step } from '@/lib/parser';

interface Props {
  recipe: Recipe;
}

export function RecipeFlow({ recipe }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    // 追踪每种食材的状态变化
    const foodStates = new Map<string, { level: number; state: string; x: number; y: number }[]>();
    let currentTrack = 0;
    
    // 收集每种食材的所有状态
    recipe.steps.forEach((step) => {
      const x = 200 + step.level * 300;
      
      // 处理输入状态
      step.inputs.filter(i => i.type === 'food').forEach(input => {
        if (!foodStates.has(input.name)) {
          foodStates.set(input.name, []);
          currentTrack++;
        }
        
        const states = foodStates.get(input.name)!;
        const y = 150 + (currentTrack - 1) * 120;
        
        // 只有当状态不存在时才添加
        if (!states.find(s => s.state === input.note)) {
          states.push({ level: step.level, state: input.note || '', x, y });
        }
      });
      
      // 处理输出状态
      step.outputs.filter(o => o.type === 'food').forEach(output => {
        if (!foodStates.has(output.name)) {
          foodStates.set(output.name, []);
          currentTrack++;
        }
        
        const states = foodStates.get(output.name)!;
        const y = 150 + (currentTrack - 1) * 120;
        
        // 只有当状态不存在时才添加
        if (!states.find(s => s.state === output.note)) {
          states.push({ level: step.level, state: output.note || '', x: x + 150, y });
        }
      });
    });
    
    // 绘制节点和连线
    foodStates.forEach((states, foodName) => {
      // 按level排序状态
      states.sort((a, b) => a.level - b.level);
      
      // 绘制节点
      states.forEach((state, index) => {
        // 节点背景
        svg.append('circle')
           .attr('cx', state.x)
           .attr('cy', state.y)
           .attr('r', 30)
           .attr('fill', '#f0f0f0')
           .attr('stroke', '#666')
           .attr('stroke-width', 2);
           
        // 食材名称
        svg.append('text')
           .attr('x', state.x)
           .attr('y', state.y)
           .attr('text-anchor', 'middle')
           .attr('dominant-baseline', 'middle')
           .attr('font-size', '14px')
           .attr('font-weight', 'bold')
           .text(foodName);
           
        // 状态文本
        if (state.state) {
          svg.append('text')
             .attr('x', state.x)
             .attr('y', state.y + 45)
             .attr('text-anchor', 'middle')
             .attr('font-size', '12px')
             .attr('fill', '#666')
             .text(state.state);
        }
        
        // 连接到下一个状态
        if (index < states.length - 1) {
          const nextState = states[index + 1];
          svg.append('line')
             .attr('x1', state.x)
             .attr('y1', state.y)
             .attr('x2', nextState.x)
             .attr('y2', nextState.y)
             .attr('stroke', '#666')
             .attr('stroke-width', 2);
             
          // 查找对应的处理步骤
          const step = recipe.steps.find(s => s.level === nextState.level);
          if (step) {
            svg.append('text')
               .attr('x', (state.x + nextState.x) / 2)
               .attr('y', state.y - 15)
               .attr('text-anchor', 'middle')
               .attr('font-size', '12px')
               .attr('fill', '#666')
               .text(step.process);
          }
        }
      });
    });
    
  }, [recipe]);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
      <svg ref={svgRef} width="1500" height="800" />
    </div>
  );
} 