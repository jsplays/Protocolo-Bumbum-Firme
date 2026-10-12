import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, SkipForward, SkipBack, RotateCcw, 
  Volume2, VolumeX, Sparkles, AlertCircle, Trophy, Eye 
} from 'lucide-react';
import { Routine, Exercise } from '../data/protocolData';
import { 
  playCountdownBeep, 
  playSwitchSideBeep, 
  playRestBeep, 
  playCompleteFanfare 
} from '../utils/audio';

interface WorkoutTimerModalProps {
  routine: Routine;
  onClose: () => void;
  onOpenZoom?: (exercise: Exercise) => void;
  onFinishWorkout?: (routineId: string) => void;
}

type WorkoutPhase = 'prep' | 'work' | 'rest' | 'finished';

export const WorkoutTimerModal: React.FC<WorkoutTimerModalProps> = ({
  routine,
  onClose,
  onOpenZoom,
  onFinishWorkout,
}) => {
  // Routine has 3 exercises, repeated for 2 rounds = 6 intervals total
  const [currentRound, setCurrentRound] = useState<1 | 2>(1);
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [phase, setPhase] = useState<WorkoutPhase>('prep');
  const [timeLeft, setTimeLeft] = useState<number>(5); // 5s prep
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showSideSwitchAlert, setShowSideSwitchAlert] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  const currentExercise = routine.exercises[exerciseIndex];
  const nextExercise = exerciseIndex < routine.exercises.length - 1 
    ? routine.exercises[exerciseIndex + 1] 
    : (currentRound === 1 ? routine.exercises[0] : null);

  // Overall workout progress (6 intervals of 60 seconds each = 360 seconds)
  const totalWorkoutSeconds = 6 * 60;
  const completedRoundsSeconds = (currentRound - 1) * 3 * 60;
  const completedExercisesSeconds = exerciseIndex * 60;
  const currentIntervalElapsed = phase === 'work' 
    ? (40 - timeLeft) 
    : phase === 'rest' 
    ? (40 + (20 - timeLeft)) 
    : 0;
  const totalElapsed = phase === 'prep' ? 0 : completedRoundsSeconds + completedExercisesSeconds + currentIntervalElapsed;
  const totalProgressPercent = Math.min(100, Math.max(0, (totalElapsed / totalWorkoutSeconds) * 100));

  // Audio helper with sound preference check
  const sound = {
    countdown: (final?: boolean) => soundEnabled && playCountdownBeep(final),
    switchSide: () => soundEnabled && playSwitchSideBeep(),
    rest: () => soundEnabled && playRestBeep(),
    complete: () => soundEnabled && playCompleteFanfare(),
  };

  // Main countdown tick loop
  useEffect(() => {
    if (!isRunning || phase === 'finished') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        // Countdown sound during final 3 seconds of prep or rest
        if ((phase === 'prep' || phase === 'rest') && prev <= 4 && prev > 1) {
          sound.countdown(false);
        } else if ((phase === 'prep' || phase === 'rest') && prev === 1) {
          sound.countdown(true);
        }

        // Unilateral exercise 20s halfway side-switch alert
        if (phase === 'work' && currentExercise.isUnilateral && prev === 21) {
          setShowSideSwitchAlert(true);
          sound.switchSide();
          setTimeout(() => setShowSideSwitchAlert(false), 3500);
        }

        // Transition logic when current phase timer reaches zero
        if (prev <= 1) {
          handlePhaseTransition();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phase, exerciseIndex, currentRound, soundEnabled, currentExercise]);

  const handlePhaseTransition = () => {
    if (phase === 'prep') {
      setPhase('work');
      setTimeLeft(40);
      sound.countdown(true);
    } else if (phase === 'work') {
      // Check if this was the final exercise of Round 2
      if (currentRound === 2 && exerciseIndex === routine.exercises.length - 1) {
        setPhase('finished');
        sound.complete();
        if (onFinishWorkout) onFinishWorkout(routine.id);
      } else {
        setPhase('rest');
        setTimeLeft(20);
        sound.rest();
      }
    } else if (phase === 'rest') {
      // Move to next exercise or next round
      if (exerciseIndex < routine.exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
        setPhase('work');
        setTimeLeft(40);
        sound.countdown(true);
      } else {
        // End of round 1 -> Start round 2
        setCurrentRound(2);
        setExerciseIndex(0);
        setPhase('work');
        setTimeLeft(40);
        sound.countdown(true);
      }
    }
  };

  // Manual skips
  const skipNext = () => {
    setShowSideSwitchAlert(false);
    if (phase === 'prep') {
      setPhase('work');
      setTimeLeft(40);
      return;
    }
    if (phase === 'work') {
      setPhase('rest');
      setTimeLeft(20);
      return;
    }
    if (phase === 'rest') {
      if (exerciseIndex < routine.exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
        setPhase('work');
        setTimeLeft(40);
      } else if (currentRound === 1) {
        setCurrentRound(2);
        setExerciseIndex(0);
        setPhase('work');
        setTimeLeft(40);
      } else {
        setPhase('finished');
        sound.complete();
      }
    }
  };

  const skipPrevious = () => {
    setShowSideSwitchAlert(false);
    if (phase === 'rest') {
      setPhase('work');
      setTimeLeft(40);
      return;
    }
    if (phase === 'work') {
      if (exerciseIndex > 0) {
        setExerciseIndex(exerciseIndex - 1);
        setTimeLeft(40);
      } else if (currentRound === 2) {
        setCurrentRound(1);
        setExerciseIndex(routine.exercises.length - 1);
        setTimeLeft(40);
      } else {
        setPhase('prep');
        setTimeLeft(5);
      }
    }
  };

  const restartWorkout = () => {
    setCurrentRound(1);
    setExerciseIndex(0);
    setPhase('prep');
    setTimeLeft(5);
    setIsRunning(true);
    setShowSideSwitchAlert(false);
  };

  // Phase metadata
  const isWork = phase === 'work';
  const isRest = phase === 'rest';
  const isPrep = phase === 'prep';
  const isFinished = phase === 'finished';

  // Circular timer calculation
  const maxPhaseSeconds = isPrep ? 5 : isWork ? 40 : isRest ? 20 : 1;
  const circleProgress = Math.max(0, Math.min(100, ((maxPhaseSeconds - timeLeft) / maxPhaseSeconds) * 100));
  const strokeOffset = 283 - (283 * circleProgress) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] border border-stone-200">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-rose-600">
              {routine.badge} · Volta {currentRound} de 2
            </span>
            <h3 className="text-base sm:text-lg font-display font-semibold text-stone-900 leading-none mt-0.5">
              {routine.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              aria-label={soundEnabled ? 'Silenciar áudio' : 'Ativar áudio'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-rose-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-stone-400" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              aria-label="Fechar cronômetro"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Total Workout Progress Bar */}
        <div className="w-full bg-stone-100 h-1.5 overflow-hidden">
          <div 
            className="h-full bg-rose-600 transition-all duration-500" 
            style={{ width: `${totalProgressPercent}%` }}
          />
        </div>

        {/* Modal Main Content */}
        {!isFinished ? (
          <div className="overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
            
            {/* Status Phase Pill */}
            <div className="mb-3">
              {isPrep && (
                <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-900 rounded-full animate-pulse">
                  Prepare-se para começar
                </span>
              )}
              {isWork && (
                <span className="text-xs font-semibold px-3 py-1 bg-rose-100 text-rose-900 rounded-full">
                  Em movimento (40s) · Ritmo controlado
                </span>
              )}
              {isRest && (
                <span className="text-xs font-semibold px-3 py-1 bg-stone-100 text-stone-800 rounded-full">
                  Descanso & Troca de posição (20s)
                </span>
              )}
            </div>

            {/* Unilateral Switch Banner Alert */}
            {showSideSwitchAlert && (
              <div className="w-full mb-3 p-3 bg-amber-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold text-sm tracking-wide animate-bounce">
                <AlertCircle className="w-5 h-5" />
                <span>TROQUE DE LADO AGORA! (20s)</span>
              </div>
            )}

            {/* Circular Timer & Exercise Name */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-1">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-stone-100"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className={`transition-all duration-300 ${
                    isPrep 
                      ? 'stroke-amber-400' 
                      : isWork 
                      ? 'stroke-rose-600' 
                      : 'stroke-stone-400'
                  }`}
                  strokeWidth="6"
                  strokeDasharray="283"
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                <span className="text-5xl sm:text-6xl font-display font-extrabold tracking-tight tabular-nums text-stone-900">
                  {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
                <span className="text-xs font-medium text-stone-500 mt-1 uppercase tracking-wider">
                  {isPrep ? 'Iniciando' : isWork ? 'Segundos restantes' : 'Descanse'}
                </span>
              </div>
            </div>

            {/* Current Exercise Title & Unilateral Note */}
            <div className="text-center mt-3 mb-4 max-w-md">
              <h4 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                {currentExercise.name}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Exercício {exerciseIndex + 1} de {routine.exercises.length}
                {currentExercise.isUnilateral && ' · Alternar pernas aos 20s'}
              </p>
            </div>

            {/* Exercise Image Preview Card */}
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-50 relative group">
              <img
                src={currentExercise.image}
                alt={currentExercise.name}
                referrerPolicy="no-referrer"
                className="w-full h-44 sm:h-52 object-contain p-2"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== currentExercise.remoteUrl) {
                    target.src = currentExercise.remoteUrl;
                  }
                }}
              />
              {onOpenZoom && (
                <button
                  onClick={() => onOpenZoom(currentExercise)}
                  className="absolute bottom-2 right-2 px-2.5 py-1 bg-stone-900/80 text-white rounded-md text-[11px] font-medium flex items-center gap-1 backdrop-blur-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ampliar</span>
                </button>
              )}
            </div>

            {/* Next Exercise Preview during Rest Phase */}
            {isRest && nextExercise && (
              <div className="w-full max-w-sm mt-3 p-3 bg-stone-100 rounded-xl text-left border border-stone-200/60">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block">
                  A seguir:
                </span>
                <span className="text-xs font-semibold text-stone-900">
                  {nextExercise.name}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Finished Workout Celebration Screen */
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
              <Trophy className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                Parabéns!
              </span>
              <h4 className="text-2xl font-display font-bold text-stone-900 mt-1">
                6 Minutos Concluídos com Sucesso
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                Você completou as 2 voltas da {routine.title}. Lembre-se de respirar, hidratar-se e manter a consistência sustentável ao longo da semana!
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200/70 rounded-2xl text-xs text-stone-700 max-w-md w-full text-left space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Tempo total:</span>
                <span className="font-semibold text-stone-900">6 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Voltas:</span>
                <span className="font-semibold text-stone-900">2 voltas completas</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Exercícios realizados:</span>
                <span className="font-semibold text-stone-900">6 séries (40s ação / 20s descanso)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 w-full max-w-xs">
              <button
                onClick={restartWorkout}
                className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Refazer</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md shadow-rose-900/10"
              >
                Concluir
              </button>
            </div>
          </div>
        )}

        {/* Bottom Control Bar */}
        {!isFinished && (
          <div className="px-5 py-4 border-t border-stone-100 bg-stone-50/90 flex items-center justify-between gap-3">
            <button
              onClick={skipPrevious}
              className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors"
              title="Exercício anterior"
              aria-label="Anterior"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm shadow-md shadow-rose-900/15 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Continuar</span>
                </>
              )}
            </button>

            <button
              onClick={skipNext}
              className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors"
              title="Próximo exercício"
              aria-label="Próximo"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
