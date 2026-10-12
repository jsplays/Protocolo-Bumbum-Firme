import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DisclaimerSectionProps {
  onAgreementChange?: (agreed: boolean) => void;
}

export const DisclaimerSection: React.FC<DisclaimerSectionProps> = ({ onAgreementChange }) => {
  const [agreed, setAgreed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('protocolo_bumbum_disclaimer_agreed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('protocolo_bumbum_disclaimer_agreed', String(agreed));
    } catch {
      // Storage error safely ignored
    }
    if (onAgreementChange) {
      onAgreementChange(agreed);
    }
  }, [agreed, onAgreementChange]);

  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  return (
    <section id="aviso-importante" className="scroll-mt-20">
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              Aviso Importante e Termos de Uso
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Finalidade exclusivamente informativa e educacional
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <p>
            Este material é um <strong>produto educativo</strong> e tem finalidade exclusivamente informativa. Não substitui avaliação, diagnóstico, tratamento ou acompanhamento individualizado de profissionais habilitados, como médico, nutricionista ou profissional de Educação Física.
          </p>

          <p>
            Os exercícios e as sugestões apresentados não garantem perda de gordura, redução da barriga, aumento ou firmeza dos glúteos, prevenção de flacidez ou preservação de massa muscular. Os resultados variam de pessoa para pessoa. Não é possível garantir a redução de gordura em uma região específica do corpo, e uma rotina curta, isoladamente, não assegura mudanças físicas determinadas.
          </p>

          <p>
            Faça os movimentos respeitando seus limites e <strong>interrompa a atividade se sentir dor, tontura, falta de ar fora do esperado ou mal-estar</strong>. Se você está grávida ou no pós-parto, tem uma condição de saúde, lesão, dor persistente ou limitação de movimento, procure orientação profissional antes de iniciar ou adaptar os exercícios.
          </p>

          <p className="text-stone-400 text-xs">
            As opções de alimentação são sugestões gerais e podem não ser adequadas para todas as pessoas. Para orientação alimentar individualizada, consulte um nutricionista.
          </p>
        </div>

        {/* Confirmation Checkbox Box */}
        <div className={`p-4 rounded-2xl border transition-all ${
          agreed 
            ? 'bg-emerald-950/40 border-emerald-500/40' 
            : 'bg-stone-800/80 border-stone-700 hover:border-stone-600'
        }`}>
          <label className="flex items-start gap-3.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={toggleAgreement}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              agreed 
                ? 'bg-emerald-500 text-white' 
                : 'border-2 border-stone-500 bg-stone-900 hover:border-stone-400'
            }`}>
              {agreed && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
            </div>

            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-semibold text-white block">
                Eu li e compreendi este aviso e concordo em utilizar o material com responsabilidade.
              </span>
              <span className="text-[11px] text-stone-400 block">
                {agreed 
                  ? 'Termo confirmado. Bons treinos conscientes!' 
                  : 'Toque para marcar a caixa de confirmação e registrar seu consentimento.'}
              </span>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
};
