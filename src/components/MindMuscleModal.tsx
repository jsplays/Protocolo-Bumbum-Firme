import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Check, AlertCircle } from 'lucide-react';
import { playCountdownBeep, playCompleteFanfare } from '../utils/audio';

export const MindMuscleInteractive: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'get-ready' | 'contract' | 'relax' | 'done'>('idle');
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<number | null>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startExercise = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('get-ready');
    setSecondsLeft(3);

    let prepCount = 3;
    timerRef.current = window.setInterval(() => {
      prepCount -= 1;
      if (prepCount > 0) {
        setSecondsLeft(prepCount);
        if (soundEnabled) playCountdownBeep(false);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        beginContraction();
      }
    }, 1000);
  };

  const beginContraction = () => {
    setPhase('contract');
    setSecondsLeft(10);
    if (soundEnabled) playCountdownBeep(true);

    let contractCount = 10;
    timerRef.current = window.setInterval(() => {
      contractCount -= 1;
      setSecondsLeft(contractCount);

      if (contractCount <= 3 && contractCount > 0) {
        if (soundEnabled) playCountdownBeep(false);
      }

      if (contractCount <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase('relax');
        setSecondsLeft(5);
        if (soundEnabled) playCompleteFanfare();

        let relaxCount = 5;
        timerRef.current = window.setInterval(() => {
          relaxCount -= 1;
          setSecondsLeft(relaxCount);
          if (relaxCount <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            setPhase('done');
          }
        }, 1000);
      }
    }, 1000);
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('idle');
    setSecondsLeft(10);
  };

  // Progress ring math
  const maxSeconds = phase === 'get-ready' ? 3 : phase === 'contract' ? 10 : phase === 'relax' ? 5 : 10;
  const progressPercent = phase === 'idle' ? 0 : ((maxSeconds - secondsLeft) / maxSeconds) * 100;
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-7 shadow-lg relative overflow-hidden border border-stone-800">
      {/* Decorative ambient gradient */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side explanation */}
        <div className="space-y-3 max-w-md">
          <div className="flex items-center gap-2 text-xs text-rose-400 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Ferramenta Guiada de Ativação</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
            10 Segundos de Foco Neuromuscular
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Fique em pé, pés afastados na largura do quadril. Ao iniciar, aperte e contraia os glúteos suavemente por 10 segundos, respirando com tranquilidade.
          </p>

          <div className="flex items-center gap-4 text-xs text-stone-400 pt-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-rose-400" />
                  <span>Áudio ativado</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-stone-500" />
                  <span>Áudio mudo</span>
                </>
              )}
            </button>
            <span aria-hidden="true">·</span>
            <span>Sem dor ou desconforto</span>
          </div>
        </div>

        {/* Right side interactive circular timer */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-stone-800"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className={`transition-all duration-300 ${
                  phase === 'contract' 
                    ? 'stroke-rose-500' 
                    : phase === 'relax' 
                    ? 'stroke-emerald-400' 
                    : 'stroke-amber-400'
                }`}
                strokeWidth="6"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Content Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
              {phase === 'idle' && (
                <>
                  <span className="text-3xl font-display font-bold text-white tabular-nums">10s</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">Pronto para ativar</span>
                </>
              )}

              {phase === 'get-ready' && (
                <>
                  <span className="text-4xl font-display font-bold text-amber-400 tabular-nums animate-pulse">
                    {secondsLeft}
                  </span>
                  <span className="text-[11px] text-stone-300 mt-0.5 font-medium">Prepare a postura</span>
                </>
              )}

              {phase === 'contract' && (
                <>
                  <span className="text-4xl font-display font-bold text-rose-400 tabular-nums">
                    {secondsLeft}s
                  </span>
                  <span className="text-[11px] font-semibold text-rose-200 mt-0.5 uppercase tracking-wide">
                    Contraia suavemente!
                  </span>
                </>
              )}

              {phase === 'relax' && (
                <>
                  <span className="text-4xl font-display font-bold text-emerald-400 tabular-nums">
                    {secondsLeft}s
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-200 mt-0.5">
                    Relaxe e respire
                  </span>
                </>
              )}

              {phase === 'done' && (
                <>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white">Conexão Ativada!</span>
                </>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center gap-2">
            {phase === 'idle' || phase === 'done' ? (
              <button
                onClick={startExercise}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-semibold text-xs tracking-wide shadow-md shadow-rose-950/20 transition-transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{phase === 'done' ? 'Repetir Ativação' : 'Iniciar 10 Segundos'}</span>
              </button>
            ) : (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warning note */}
      <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-start gap-2 text-stone-400 text-xs leading-relaxed">
        <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <p>
          Se essa contração causar dor ou desconforto, não force. Você pode pular esta etapa e começar direto com movimentos leves.
        </p>
      </div>
    </div>
  );
};
