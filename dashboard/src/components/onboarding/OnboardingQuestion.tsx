// ============================================================
// ALERTA-ED — OnboardingQuestion
// Componente de pregunta del flujo de SENA
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SenaOptionItem } from '@/types';

interface OnboardingQuestionProps {
  pregunta: string;
  opciones: SenaOptionItem[];
  selected?: string;
  onSelect: (valor: string) => void;
}

export function OnboardingQuestion({
  pregunta,
  opciones,
  selected,
  onSelect,
}: OnboardingQuestionProps) {
  return (
    <div className="w-full">
      <p className="text-base font-medium text-[#EFF6FF] mb-5 text-center">
        {pregunta}
      </p>

      <motion.div
        className="grid gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
      >
        {opciones.map((opcion) => (
          <motion.button
            key={opcion.valor}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
            onClick={() => onSelect(opcion.valor)}
            className={cn(
              'relative w-full rounded-xl border p-4 text-left transition-all duration-200 group',
              selected === opcion.valor
                ? 'border-blue-500/60 bg-blue-500/12 shadow-[0_0_16px_rgba(59,130,246,0.15)]'
                : 'border-[#1E2E48] bg-[#0C1525] hover:border-[#2A3F60] hover:bg-[#111D30]'
            )}
          >
            {/* Indicador seleccionado */}
            <div
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-200',
                selected === opcion.valor
                  ? 'border-blue-400 bg-blue-400'
                  : 'border-[#2A3F60] bg-transparent group-hover:border-[#3B82F6]'
              )}
            />

            <div className="pl-6">
              <p
                className={cn(
                  'text-sm font-semibold leading-snug transition-colors duration-200',
                  selected === opcion.valor ? 'text-blue-300' : 'text-[#EFF6FF]'
                )}
              >
                {opcion.label}
              </p>
              {opcion.descripcion && (
                <p className="text-xs text-[#3D6080] mt-0.5 leading-relaxed">
                  {opcion.descripcion}
                </p>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
