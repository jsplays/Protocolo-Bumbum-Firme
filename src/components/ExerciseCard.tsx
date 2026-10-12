import React, { useState } from 'react';
import { Exercise } from '../data/protocolData';
import { ZoomIn, Play, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  routineTitle: string;
  index: number;
  onOpenZoom: (exercise: Exercise) => void;
  onStartSingleTimer?: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  onOpenZoom,
  onStartSingleTimer,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(exercise.image);

  const handleImageError = () => {
    // If local fails, switch to remoteUrl
    if (currentSrc !== exercise.remoteUrl) {
      setCurrentSrc(exercise.remoteUrl);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden transition-all hover:border-stone-300 flex flex-col justify-between">
      <div>
        {/* Top Card Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-rose-600">Exercício {index + 1}</span>
              <span aria-hidden="true">·</span>
              <span>{exercise.duration}</span>
              {exercise.isUnilateral && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 font-medium">Troca aos 20s</span>
                </>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-display font-semibold text-stone-900 leading-snug">
              {exercise.name}
            </h3>
          </div>

          {onStartSingleTimer && (
            <button
              onClick={() => onStartSingleTimer(exercise)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors shrink-0"
              title="Praticar 40s deste exercício"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Treinar</span>
            </button>
          )}
        </div>

        {/* Clear, Visible Visual Illustration Section */}
        <div className="relative bg-stone-100/60 border-b border-stone-100 group">
          <div 
            onClick={() => onOpenZoom(exercise)}
            className="cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[340px] max-h-[440px] p-2"
          >
            <img
              src={currentSrc}
              alt={`Como fazer: ${exercise.name}`}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[380px] object-contain object-center rounded-lg transition-transform duration-300 group-hover:scale-[1.015]"
              onError={handleImageError}
            />

            {/* Quick zoom badge */}
            <div className="absolute bottom-3 right-3 bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium shadow-md transition-transform flex items-center gap-1.5 z-10">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Ver ampliado</span>
            </div>

            {exercise.isUnilateral && (
              <div className="absolute top-3 left-3 bg-amber-500/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs z-10">
                Unilateral: 20s cada lado
              </div>
            )}
          </div>
        </div>

        {/* Card Content & Instructions */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <p className="text-sm text-stone-700 leading-relaxed">
            {exercise.description}
          </p>

          {/* Attention Box */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-900">Atenção: </strong>
              {exercise.attention}
            </div>
          </div>

          {/* Easier option if available */}
          {exercise.easierOption && (
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-emerald-900">Opção mais fácil: </strong>
                {exercise.easierOption}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Step-by-Step Execution Guide in Footer of Card */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
        <div className="pt-2 border-t border-stone-100">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-xs font-semibold text-stone-600 hover:text-stone-900 py-1.5 transition-colors"
          >
            <span>Instruções detalhadas de postura</span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-stone-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {showDetails && (
            <div className="pt-2 pb-1 space-y-2 animate-in fade-in duration-150">
              <ol className="space-y-1.5">
                {exercise.steps.map((step, idx) => (
                  <li key={idx} className="text-xs text-stone-600 flex items-start gap-2">
                    <span className="font-semibold text-rose-600 text-[11px] shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              {/* Muscles involved */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-stone-500 flex-wrap">
                <span className="font-medium text-stone-700">Músculos solicitados:</span>
                {exercise.focusMuscles.map((muscle, idx) => (
                  <span key={idx}>
                    {muscle}
                    {idx < exercise.focusMuscles.length - 1 && ' ·'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
