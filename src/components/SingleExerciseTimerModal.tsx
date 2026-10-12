import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle, Eye } from 'lucide-react';
import { Exercise } from '../data/protocolData';
import { playCountdownBeep, playSwitchSideBeep, playCompleteFanfare } from '../utils/audio';

interface SingleExerciseTimerModalProps {
  exercise: Exercise;
  onClose: () => void;
  onOpenZoom?: (exercise: Exercise) => void;
}

export const SingleExerciseTimerModal: React.FC<SingleExerciseTimerModalProps> = ({
  exercise,
  onClose,
  onOpenZoom,
}) => {
  const [phase, setPhase] = useState<'prep' | 'work' | 'done'>('prep');
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSwitchPrompt, setShowSwitchPrompt] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning || phase === 'done') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (phase === 'prep' && prev <= 4 && prev > 1 && soundEnabled) {
          playCountdownBeep(false);
        } else if (phase === 'prep' && prev === 1 && soundEnabled) {
          playCountdownBeep(true);
        }

        if (phase === 'work' && exercise.isUnilateral && prev === 21) {
          setShowSwitchPrompt(true);
          if (soundEnabled) playSwitchSideBeep();
          setTimeout(() => setShowSwitchPrompt(false), 3000);
        }

        if (prev <= 1) {
          if (phase === 'prep') {
            setPhase('work');
            return 40;
          } else if (phase === 'work') {
            setPhase('done');
            if (soundEnabled) playCompleteFanfare();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phase, soundEnabled, exercise.isUnilateral]);

  const restart = () => {
    setPhase('prep');
    setTimeLeft(5);
    setIsRunning(true);
    setShowSwitchPrompt(false);
  };

  const maxSec = phase === 'prep' ? 5 : 40;
  const progress = phase === 'done' ? 100 : ((maxSec - timeLeft) / maxSec) * 100;
  const strokeOffset = 283 - (283 * progress) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-stone-200">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
              Prática de Movimento
            </span>
            <h3 className="font-display font-semibold text-stone-900 text-base">
              {exercise.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          {showSwitchPrompt && (
            <div className="w-full mb-3 p-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold text-center animate-bounce flex items-center justify-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>TROQUE DE LADO AGORA! (20s)</span>
            </div>
          )}

          {/* Circle */}
          <div className="relative w-40 h-40 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="stroke-stone-100" strokeWidth="6" fill="none" />
              <circle
                cx="50" cy="50" r="45"
                className={`transition-all duration-300 ${phase === 'prep' ? 'stroke-amber-400' : 'stroke-rose-600'}`}
                strokeWidth="6"
                strokeDasharray="283"
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-display font-extrabold text-stone-900 tabular-nums">
                {phase === 'done' ? 'Fim!' : timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">
                {phase === 'prep' ? 'Prepare-se' : phase === 'work' ? 'Movimento' : 'Concluído'}
              </span>
            </div>
          </div>

          {/* Exercise image preview */}
          <div className="w-full mt-2 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden relative">
            <img
              src={exercise.image}
              alt={exercise.name}
              referrerPolicy="no-referrer"
              className="w-full h-32 object-contain p-2"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== exercise.remoteUrl) {
                  target.src = exercise.remoteUrl;
                }
              }}
            />
            {onOpenZoom && (
              <button
                onClick={() => onOpenZoom(exercise)}
                className="absolute bottom-2 right-2 px-2 py-0.5 bg-stone-900/80 text-white rounded text-[10px] font-medium flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                <span>Ampliar</span>
              </button>
            )}
          </div>

          <p className="text-xs text-stone-600 text-center mt-3 leading-relaxed">
            {exercise.attention}
          </p>
        </div>

        {/* Footer controls */}
        <div className="px-5 py-3 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={restart}
            className="p-2.5 text-stone-600 hover:bg-stone-200 rounded-xl"
            title="Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {phase !== 'done' ? (
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
            >
              {isRunning ? <><Pause className="w-3.5 h-3.5 fill-current" /><span>Pausar</span></> : <><Play className="w-3.5 h-3.5 fill-current" /><span>Continuar</span></>}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs"
            >
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
