import React, { useState, useEffect } from 'react';
import { WEEKLY_SCHEDULE_DATA, Routine } from '../data/protocolData';
import { Check, Dumbbell, Coffee, Footprints, Play, RotateCcw } from 'lucide-react';

interface WeeklyScheduleTrackerProps {
  onStartRoutine: (routineId: string) => void;
  routines: Routine[];
}

export const WeeklyScheduleTracker: React.FC<WeeklyScheduleTrackerProps> = ({
  onStartRoutine,
}) => {
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('protocolo_bumbum_schedule');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('protocolo_bumbum_schedule', JSON.stringify(completedDays));
    } catch {
      // Storage error safely ignored
    }
  }, [completedDays]);

  const toggleDay = (day: string) => {
    setCompletedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const resetWeek = () => {
    setCompletedDays({});
  };

  const workoutDays = WEEKLY_SCHEDULE_DATA.filter((d) => d.type === 'workout');
  const completedWorkoutsCount = workoutDays.filter((d) => completedDays[d.day]).length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-stone-900">
            Cronograma Sugerido
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Três estímulos curtos na semana com intervalos estratégicos para recuperação muscular
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-500">
            <span className="font-semibold text-rose-600 tabular-nums">
              {completedWorkoutsCount}
            </span> de <span className="tabular-nums">3</span> treinos concluídos
          </div>
          {completedWorkoutsCount > 0 && (
            <button
              onClick={resetWeek}
              className="text-[11px] text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
              title="Reiniciar semana"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>

      {/* Week days grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5">
        {WEEKLY_SCHEDULE_DATA.map((item) => {
          const isDone = !!completedDays[item.day];
          const isWorkout = item.type === 'workout';
          const isRest = item.type === 'rest';
          const isActiveRest = item.type === 'active-rest';

          return (
            <div
              key={item.day}
              className={`rounded-xl border p-3.5 transition-all flex flex-col justify-between min-h-[110px] ${
                isDone
                  ? 'bg-rose-50/50 border-rose-200'
                  : isWorkout
                  ? 'bg-stone-50/80 border-stone-200 hover:border-stone-300'
                  : 'bg-white border-stone-150'
              }`}
            >
              {/* Day header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">
                  {item.day.split('-')[0]}
                </span>
                <button
                  onClick={() => toggleDay(item.day)}
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    isDone
                      ? 'bg-rose-600 text-white'
                      : 'border border-stone-300 text-transparent hover:border-stone-400'
                  }`}
                  aria-label={`Marcar ${item.day} como concluído`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

              {/* Day type info */}
              <div className="my-2">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-700">
                  {isWorkout && <Dumbbell className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                  {isRest && <Coffee className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
                  {isActiveRest && <Footprints className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  <span className="truncate">{item.plan}</span>
                </div>
              </div>

              {/* Action button if workout */}
              <div>
                {isWorkout && item.routineId && (
                  <button
                    onClick={() => onStartRoutine(item.routineId!)}
                    className="w-full py-1.5 px-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Iniciar</span>
                  </button>
                )}
                {!isWorkout && (
                  <span className="text-[10px] text-stone-400 block text-center py-1">
                    Recuperação ativa
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Schedule Advice Note */}
      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-xs text-stone-600 leading-relaxed space-y-2">
        <p>
          <strong className="text-stone-900 font-semibold">Orientações de adaptação: </strong>
          Este cronograma é uma sugestão inicial, não uma prescrição individual. Se sentir dor, fadiga fora do habitual ou dificuldade para se recuperar, reduza a intensidade ou faça uma pausa maior.
        </p>
        <p className="text-stone-500 text-[11px]">
          Para melhorar o condicionamento geral, considere acrescentar outras atividades aeróbicas prazerosas (como caminhadas) e, quando possível, fortalecer os demais grupos musculares em pelo menos dois dias na semana.
        </p>
      </div>
    </div>
  );
};
