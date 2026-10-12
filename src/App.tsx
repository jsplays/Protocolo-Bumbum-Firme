/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ROUTINES_DATA, 
  Exercise, 
  Routine 
} from './data/protocolData';
import { Navigation } from './components/Navigation';
import { ExerciseCard } from './components/ExerciseCard';
import { MindMuscleInteractive } from './components/MindMuscleModal';
import { WorkoutTimerModal } from './components/WorkoutTimerModal';
import { SingleExerciseTimerModal } from './components/SingleExerciseTimerModal';
import { ImageModal } from './components/ImageModal';
import { WeeklyScheduleTracker } from './components/WeeklyScheduleTracker';
import { NutritionGuide } from './components/NutritionGuide';
import { DisclaimerSection } from './components/DisclaimerSection';
import { 
  Play, 
  Flame, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Info,
  HeartHandshake
} from 'lucide-react';

export default function App() {
  const [selectedRoutineForTimer, setSelectedRoutineForTimer] = useState<Routine | null>(null);
  const [selectedExerciseForPractice, setSelectedExerciseForPractice] = useState<Exercise | null>(null);
  const [zoomedExercise, setZoomedExercise] = useState<Exercise | null>(null);
  const [activeRoutineTab, setActiveRoutineTab] = useState<string>('todas');

  const startRoutineTimer = (routineId: string) => {
    const routine = ROUTINES_DATA.find((r) => r.id === routineId) || ROUTINES_DATA[0];
    setSelectedRoutineForTimer(routine);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24 lg:pb-16 selection:bg-rose-100 selection:text-rose-900">
      {/* Top Bar Navigation */}
      <Navigation 
        onStartRoutine={startRoutineTimer}
        routinesCount={ROUTINES_DATA.length}
      />

      {/* Main Single Continuous Scroll Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-16 sm:space-y-24">
        
        {/* HERO SECTION */}
        <section className="space-y-6 pt-2 sm:pt-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-stone-500 font-medium">
            <span className="text-rose-600 font-semibold uppercase tracking-wider">
              Guia Prático & Treino
            </span>
            <span aria-hidden="true">·</span>
            <span>Sem Equipamentos</span>
            <span aria-hidden="true">·</span>
            <span>6 Minutos em Casa</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              Protocolo Bumbum Firme
            </h1>

            <p className="text-lg sm:text-xl font-medium text-stone-700 leading-snug">
              Como apoiar a perda de gordura sem deixar o treino de glúteos de lado
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Um guia educativo com três rotinas de exercícios sem equipamentos, cada uma com seis minutos, e orientações simples para começar em casa.
            </p>
          </div>

          {/* Primary CTA and Secondary Shortcuts */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => startRoutineTimer('rotina-1')}
              className="w-full sm:w-auto py-3.5 px-8 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-950/15 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>COMEÇAR O PROTOCOLO</span>
            </button>

            <button
              onClick={() => scrollTo('rotinas')}
              className="w-full sm:w-auto py-3.5 px-6 bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm rounded-xl border border-stone-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver Rotinas & Imagens</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Educational Disclaimer Callout */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-stone-200/80 shadow-xs text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p>
              Este guia não promete barriga seca, glúteos firmes ou mudanças em um prazo específico. A proposta é ajudar você a criar o hábito de se movimentar e incluir exercícios de fortalecimento para os glúteos na sua rotina com segurança e técnica correta.
            </p>
          </div>

          {/* Sub-menu bar */}
          <div className="pt-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs text-stone-600">
              <span className="font-semibold text-stone-900 shrink-0">Menu rápido:</span>
              <button onClick={() => scrollTo('o-que-saber')} className="hover:text-rose-600 underline underline-offset-4 decoration-stone-300 shrink-0">O que saber</button>
              <span className="text-stone-300">·</span>
              <button onClick={() => scrollTo('ativacao')} className="hover:text-rose-600 underline underline-offset-4 decoration-stone-300 shrink-0">Ativação</button>
              <span className="text-stone-300">·</span>
              <button onClick={() => scrollTo('rotinas')} className="hover:text-rose-600 underline underline-offset-4 decoration-stone-300 shrink-0">Rotinas</button>
              <span className="text-stone-300">·</span>
              <button onClick={() => scrollTo('alimentacao')} className="hover:text-rose-600 underline underline-offset-4 decoration-stone-300 shrink-0">Alimentação</button>
              <span className="text-stone-300">·</span>
              <button onClick={() => scrollTo('cronograma')} className="hover:text-rose-600 underline underline-offset-4 decoration-stone-300 shrink-0">Cronograma</button>
              <span className="text-stone-300">·</span>
              <button onClick={() => scrollTo('aviso-importante')} className="hover:text-rose-600 underline underline-offset-4 decoration-stone-300 shrink-0">Aviso importante</button>
            </div>
          </div>
        </section>

        {/* SECTION 1: ANTES DE COMEÇAR — O QUE VOCÊ PRECISA SABER */}
        <section id="o-que-saber" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wider uppercase">
              <Info className="w-4 h-4" />
              <span>Conhecimento Essencial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Antes de Começar: O Que Você Precisa Saber
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-3.5">
              <h3 className="font-display font-semibold text-stone-900 text-lg">
                O mito da perda de gordura localizada
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Dietas muito restritivas ou mudanças rápidas na alimentação não garantem que a gordura seja perdida de uma região específica. Também não dá para escolher, por meio de um exercício, exatamente de onde o corpo vai retirar gordura.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Exercitar uma região pode fortalecer os músculos daquela área, mas não assegura que a gordura da barriga diminua enquanto a dos glúteos permanece igual. A pesquisa sobre redução localizada de gordura ainda é limitada; por isso, não trate exercícios abdominais ou de glúteos como uma forma garantida de “secar” uma região específica.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-3.5">
              <h3 className="font-display font-semibold text-stone-900 text-lg">
                Uma abordagem realista e sustentável
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Uma abordagem mais realista é combinar hábitos sustentáveis, alimentação adequada às suas necessidades e exercícios de fortalecimento. O treino pode estimular e fortalecer os músculos dos glúteos, mas o resultado varia de pessoa para pessoa.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Uma rotina de seis minutos pode ser um começo acessível; sozinha, ela não substitui um programa mais abrangente de atividade física. Recomendações gerais para adultos também incluem atividade aeróbica semanal e fortalecimento dos principais grupos musculares em pelo menos dois dias da semana.
              </p>
            </div>
          </div>

          {/* Main Key Takeaway Box */}
          <div className="p-5 bg-rose-50/70 border border-rose-200/70 rounded-2xl flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-rose-950 leading-relaxed">
              <strong className="font-bold text-rose-900">A ideia principal: </strong>
              comece de forma gradual, escolha movimentos que consiga executar com controle e aumente o desafio aos poucos — por exemplo, fazendo o movimento mais devagar ou acrescentando uma pausa isométrica.
            </div>
          </div>
        </section>

        {/* SECTION 2: A CONEXÃO MENTE-MÚSCULO */}
        <section id="ativacao" className="space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Consciência Corporal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              A Conexão Mente-Músculo: 10 Segundos Para Focar
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              A chamada “conexão mente-músculo” é uma maneira de prestar atenção ao músculo que está trabalhando. Não é um botão que ativa os glúteos nem uma garantia de resultado; é apenas uma dica para ajudar você a executar o movimento com mais consciência.
            </p>
          </div>

          {/* Interactive Guided Component */}
          <MindMuscleInteractive />

          {/* Preparation Checklist */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-display font-semibold text-stone-900">
              Como praticar antes de qualquer rotina:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                <span>Fique em pé, com os pés afastados na largura do quadril.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                <span>Contraia os glúteos suavemente por 10 segundos, sem prender a respiração.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                <span>Relaxe e faça algumas respirações tranquilas.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                <span>Durante os exercícios, observe se consegue sentir o esforço nos glúteos sem compensar com a lombar.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COMO FUNCIONAM AS ROTINAS DE 6 MINUTOS */}
        <section className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wider uppercase">
              <Clock className="w-4 h-4" />
              <span>Estrutura do Treino</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              Como Funcionam as Rotinas de 6 Minutos
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Cada rotina tem três exercícios. Faça <strong>40 segundos de movimento e 20 segundos para descansar ou trocar de posição</strong>. Ao terminar os três exercícios, repita a sequência mais uma vez.
            </p>

            {/* Time breakdown cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-center">
                <span className="text-xs text-stone-500 font-medium">1ª Volta</span>
                <span className="text-2xl font-display font-bold text-stone-900 block mt-0.5">3 Minutos</span>
                <span className="text-[11px] text-stone-500 mt-1 block">3 exercícios (40s/20s)</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-center">
                <span className="text-xs text-stone-500 font-medium">2ª Volta</span>
                <span className="text-2xl font-display font-bold text-stone-900 block mt-0.5">3 Minutos</span>
                <span className="text-[11px] text-stone-500 mt-1 block">Repete a mesma sequência</span>
              </div>
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/70 text-center">
                <span className="text-xs text-rose-700 font-medium">Total da Sessão</span>
                <span className="text-2xl font-display font-bold text-rose-900 block mt-0.5">6 Minutos</span>
                <span className="text-[11px] text-rose-700 mt-1 block">Rápido, viável e sem aparelhos</span>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
              <p>
                <strong>Exercícios unilaterais:</strong> nos movimentos feitos de um lado por vez, alterne os lados no meio do intervalo: cerca de 20 segundos para cada perna. O cronômetro guiado do app avisará você automaticamente com um som de troca.
              </p>
              <p>
                <strong>Ritmo controlado:</strong> se estiver começando agora, faça menos repetições durante os 40 segundos ou pare antes de perder o controle do movimento. O objetivo não é correr, e segurança vem antes de completar o tempo.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: ROTINAS DE EXERCÍCIOS COM TODAS AS ILUSTRAÇÕES DETALHADAS */}
        <section id="rotinas" className="space-y-8 scroll-mt-20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wider uppercase">
              <Flame className="w-4 h-4" />
              <span>Rotinas Práticas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              As Três Rotinas do Protocolo
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Confira abaixo as ilustrações completas de cada movimento para orientar sua postura. Você pode tocar em qualquer imagem para vê-la ampliada ou acionar o cronômetro guiado.
            </p>
          </div>

          {/* Routine Tabs / Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-xl max-w-md overflow-x-auto">
            <button
              onClick={() => setActiveRoutineTab('todas')}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeRoutineTab === 'todas'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todas (9 Exercícios)
            </button>
            {ROUTINES_DATA.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRoutineTab(r.id)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                  activeRoutineTab === r.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {r.badge}
              </button>
            ))}
          </div>

          {/* Render Active Routine or All Routines and their exercises */}
          {ROUTINES_DATA
            .filter((r) => activeRoutineTab === 'todas' || r.id === activeRoutineTab)
            .map((routine) => (
            <div key={routine.id} id={routine.id} className="space-y-6 pt-2 scroll-mt-24">
              
              {/* Routine Header banner */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                    <span className="font-semibold text-rose-600 uppercase">{routine.badge}</span>
                    <span aria-hidden="true">·</span>
                    <span>{routine.duration}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                    {routine.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
                    {routine.subtitle}
                  </p>
                  {routine.disclaimerNote && (
                    <p className="text-[11px] text-stone-400 italic pt-0.5">
                      {routine.disclaimerNote}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => startRoutineTimer(routine.id)}
                  className="py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-rose-950/15 flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Iniciar Esta Rotina (6 min)</span>
                </button>
              </div>

              {/* 3 Exercises of this routine with large clear visual illustrations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {routine.exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    routineTitle={routine.title}
                    index={index}
                    onOpenZoom={(ex) => setZoomedExercise(ex)}
                    onStartSingleTimer={(ex) => setSelectedExerciseForPractice(ex)}
                  />
                ))}
              </div>

              {/* Repetition indicator */}
              <div className="p-4 bg-stone-100/70 border border-stone-200/60 rounded-xl text-center text-xs text-stone-600 font-medium">
                Ao terminar os três exercícios (3 minutos), repita a sequência mais uma vez para completar os 6 minutos totais.
              </div>
            </div>
          ))}

          {/* Quick toggle to browse all 3 routines continuously */}
          <div className="pt-4 border-t border-stone-200 space-y-4">
            <h4 className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
              Ver todas as rotinas disponíveis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROUTINES_DATA.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setActiveRoutineTab(r.id);
                    scrollTo('rotinas');
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeRoutineTab === r.id
                      ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-300'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-rose-600 block">{r.badge}</span>
                  <strong className="text-sm font-semibold text-stone-900 block mt-0.5">{r.title}</strong>
                  <span className="text-xs text-stone-500 line-clamp-1 mt-1">{r.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: NUTRIÇÃO DEPOIS DO TREINO */}
        <NutritionGuide />

        {/* SECTION 6: CRONOGRAMA SEMANAL */}
        <section id="cronograma" className="scroll-mt-20">
          <WeeklyScheduleTracker
            routines={ROUTINES_DATA}
            onStartRoutine={startRoutineTimer}
          />
        </section>

        {/* SECTION 7: AVISO IMPORTANTE */}
        <DisclaimerSection />

        {/* FOOTER */}
        <footer className="pt-8 pb-12 border-t border-stone-200 text-stone-500 text-xs space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-display font-semibold text-stone-800 text-sm">
                Protocolo Bumbum Firme
              </span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Produto educativo sobre movimento, consciência corporal e hábitos saudáveis.
              </p>
            </div>
            <div className="text-[11px] text-stone-400">
              © {new Date().getFullYear()} · Uso responsável e individual
            </div>
          </div>
        </footer>

      </main>

      {/* FULL GUIDED 6-MINUTE WORKOUT TIMER MODAL */}
      {selectedRoutineForTimer && (
        <WorkoutTimerModal
          routine={selectedRoutineForTimer}
          onClose={() => setSelectedRoutineForTimer(null)}
          onOpenZoom={(ex) => setZoomedExercise(ex)}
        />
      )}

      {/* SINGLE EXERCISE PRACTICE TIMER MODAL */}
      {selectedExerciseForPractice && (
        <SingleExerciseTimerModal
          exercise={selectedExerciseForPractice}
          onClose={() => setSelectedExerciseForPractice(null)}
          onOpenZoom={(ex) => setZoomedExercise(ex)}
        />
      )}

      {/* FULL RESOLUTION IMAGE ZOOM MODAL */}
      {zoomedExercise && (
        <ImageModal
          exercise={zoomedExercise}
          onClose={() => setZoomedExercise(null)}
        />
      )}
    </div>
  );
}
