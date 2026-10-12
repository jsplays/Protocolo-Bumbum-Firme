import React, { useState, useEffect } from 'react';
import { Play, Dumbbell, Sparkles, Calendar, Utensils, Info } from 'lucide-react';

interface NavigationProps {
  onStartRoutine: (routineId: string) => void;
  routinesCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ onStartRoutine }) => {
  const [activeSection, setActiveSection] = useState<string>('o-que-saber');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['o-que-saber', 'ativacao', 'rotinas', 'alimentacao', 'cronograma', 'aviso-importante'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      {/* Top Bar Header (Desktop & Tablet) adhering to 3-zone contract */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-stone-200/80 shadow-xs'
            : 'bg-white/80 backdrop-blur-sm border-stone-150'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display font-bold text-lg sm:text-xl tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-rose-600 transition-colors"
          >
            Protocolo Bumbum Firme
          </a>

          {/* Zone 2: 4-5 concise single-line nav links with hover styles */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide text-stone-600">
            <button
              onClick={() => scrollTo('o-que-saber')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'o-que-saber' ? 'text-rose-600' : ''
              }`}
            >
              O que saber
            </button>
            <button
              onClick={() => scrollTo('ativacao')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'ativacao' ? 'text-rose-600' : ''
              }`}
            >
              Ativação 10s
            </button>
            <button
              onClick={() => scrollTo('rotinas')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'rotinas' ? 'text-rose-600' : ''
              }`}
            >
              Rotinas
            </button>
            <button
              onClick={() => scrollTo('alimentacao')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'alimentacao' ? 'text-rose-600' : ''
              }`}
            >
              Alimentação
            </button>
            <button
              onClick={() => scrollTo('cronograma')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'cronograma' ? 'text-rose-600' : ''
              }`}
            >
              Cronograma
            </button>
            <button
              onClick={() => scrollTo('aviso-importante')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'aviso-importante' ? 'text-rose-600' : ''
              }`}
            >
              Aviso
            </button>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onStartRoutine('rotina-1')}
              className="py-2 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Começar Protocolo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Under 15% Viewport Cap) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-5 items-center justify-center max-w-md mx-auto">
          <button
            onClick={() => scrollTo('o-que-saber')}
            className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium transition-colors ${
              activeSection === 'o-que-saber' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Info className="w-4 h-4 mb-0.5" />
            <span className="truncate">O Que Saber</span>
          </button>

          <button
            onClick={() => scrollTo('ativacao')}
            className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium transition-colors ${
              activeSection === 'ativacao' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span className="truncate">Ativação</span>
          </button>

          <button
            onClick={() => scrollTo('rotinas')}
            className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium transition-colors ${
              activeSection === 'rotinas' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Dumbbell className="w-4 h-4 mb-0.5" />
            <span className="truncate">Rotinas</span>
          </button>

          <button
            onClick={() => scrollTo('alimentacao')}
            className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium transition-colors ${
              activeSection === 'alimentacao' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Utensils className="w-4 h-4 mb-0.5" />
            <span className="truncate">Nutrição</span>
          </button>

          <button
            onClick={() => scrollTo('cronograma')}
            className={`flex flex-col items-center justify-center py-1 text-[10px] font-medium transition-colors ${
              activeSection === 'cronograma' ? 'text-rose-600 font-semibold' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="truncate">Agenda</span>
          </button>
        </div>
      </div>
    </>
  );
};
