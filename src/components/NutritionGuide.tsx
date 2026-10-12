import React, { useState } from 'react';
import { NUTRITION_IDEAS } from '../data/protocolData';
import { Utensils, Apple, Info, Sparkles } from 'lucide-react';

export const NutritionGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = ['todos', 'Almoço ou Jantar', 'Lanche Rápido', 'Café da Manhã', 'Café ou Lanche', 'Refeição Rápida'];

  const filteredMeals = selectedCategory === 'todos'
    ? NUTRITION_IDEAS
    : NUTRITION_IDEAS.filter(m => m.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="alimentacao" className="space-y-6 scroll-mt-20">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wider uppercase">
          <Utensils className="w-4 h-4" />
          <span>Alimentação Sustentável</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
          Nutrição Depois do Treino
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
          Você não precisa comer imediatamente ao terminar seis minutos de exercício. O mais importante é manter uma alimentação regular e adequada às suas necessidades ao longo do dia.
        </p>
      </div>

      {/* Scientific nutrition insight */}
      <div className="bg-stone-100/80 rounded-2xl p-5 border border-stone-200/80 space-y-3">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
            <p>
              A ingestão de proteína junto a um programa de treinamento de força pode contribuir para a manutenção ou o aumento de massa magra, mas <strong>nenhum alimento isolado “firma” os glúteos</strong>.
            </p>
            <p className="text-stone-500 text-xs">
              As necessidades variam conforme cada pessoa, e não é necessário comprar suplementos caros para seguir este guia. O foco está na comida de verdade, acessível e consistente.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Functional Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedCategory('todos')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            selectedCategory === 'todos'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
          }`}
        >
          Todas as ideias
        </button>
        <button
          onClick={() => setSelectedCategory('Almoço')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            selectedCategory === 'Almoço'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
          }`}
        >
          Almoço e Jantar
        </button>
        <button
          onClick={() => setSelectedCategory('Lanche')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            selectedCategory === 'Lanche'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
          }`}
        >
          Lanches Rápidos
        </button>
        <button
          onClick={() => setSelectedCategory('Café')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
            selectedCategory === 'Café'
              ? 'bg-stone-900 text-white'
              : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
          }`}
        >
          Café da Manhã
        </button>
      </div>

      {/* Meal Suggestions Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredMeals.map((meal, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                <span>{meal.category}</span>
                <span className="text-rose-600 font-medium text-[11px]">{meal.badge}</span>
              </div>
              <h3 className="font-display font-semibold text-stone-900 text-base leading-snug">
                {meal.title}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {meal.desc}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400">
              <Apple className="w-3.5 h-3.5 text-stone-400" />
              <span>Simples, acessível e econômico</span>
            </div>
          </div>
        ))}
      </div>

      {/* Professional diet advice note */}
      <div className="p-4 bg-stone-50 border border-stone-200/60 rounded-xl text-xs text-stone-500 leading-relaxed">
        Escolha opções que façam sentido para seu orçamento, preferências e rotina. Se você tem alergias, restrições alimentares, uma condição de saúde ou precisa de um plano individualizado, procure orientação de um nutricionista habilitado.
      </div>
    </section>
  );
};
