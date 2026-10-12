import React from 'react';
import { X, ZoomIn, CheckCircle2 } from 'lucide-react';
import { Exercise } from '../data/protocolData';

interface ImageModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/70">
          <div>
            <h3 className="font-display font-semibold text-stone-900 text-lg leading-tight">
              {exercise.name}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Guia visual detalhado de execução
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body scrollable */}
        <div className="overflow-y-auto p-5 space-y-4">
          {/* Main high resolution image preview */}
          <div className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60 flex items-center justify-center min-h-[300px]">
            <img
              src={exercise.image}
              alt={`Ilustração do movimento: ${exercise.name}`}
              referrerPolicy="no-referrer"
              className="w-full max-h-[58vh] object-contain object-center"
              loading="eager"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== exercise.remoteUrl) {
                  target.src = exercise.remoteUrl;
                }
              }}
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-stone-700 shadow-xs border border-stone-200/60 flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-stone-500" />
              <span>Alta resolução</span>
            </div>
          </div>

          {/* Quick instructions in modal */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-stone-500">
              Passo a passo do movimento
            </h4>
            <ul className="space-y-2">
              {exercise.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center font-semibold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-950">Atenção na execução: </span>
                {exercise.attention}
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-5 py-3 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            {exercise.duration}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
