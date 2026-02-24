// ============================================================
// ALERTA-ED — Solución Section
// Diagrama de flujo del sistema con nodos conectados
// ============================================================

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Brain, Bell, MessageSquare, ShieldCheck, ArrowRight, LayoutDashboard, Smartphone } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { proyectoData } from '@/data/project';

const FLOW_ICONS = {
  datos:        Database,
  modelo:       Brain,
  alerta:       Bell,
  nudging:      MessageSquare,
  intervencion: ShieldCheck,
};

const DIFER_ICONS: Record<string, React.ElementType> = {
  Brain,
  Bell,
  MessageSquare,
  LayoutDashboard,
  Smartphone,
};

const DIFER_THEME = [
  {
    border: 'border-blue-500/20 hover:border-blue-400/45',
    panel: 'hover:bg-[#0E1B30]',
    iconWrap: 'bg-blue-500/12 border-blue-500/25 group-hover:bg-blue-500/20',
    icon: 'text-blue-300',
    text: 'group-hover:text-[#C7E3FA]',
    glow: 'hover:shadow-[0_0_22px_rgba(59,130,246,0.12)]',
  },
  {
    border: 'border-indigo-500/20 hover:border-indigo-400/45',
    panel: 'hover:bg-[#111631]',
    iconWrap: 'bg-indigo-500/12 border-indigo-500/25 group-hover:bg-indigo-500/20',
    icon: 'text-indigo-300',
    text: 'group-hover:text-[#CFD5FF]',
    glow: 'hover:shadow-[0_0_22px_rgba(99,102,241,0.12)]',
  },
  {
    border: 'border-amber-500/20 hover:border-amber-400/45',
    panel: 'hover:bg-[#1A1410]',
    iconWrap: 'bg-amber-500/12 border-amber-500/25 group-hover:bg-amber-500/20',
    icon: 'text-amber-300',
    text: 'group-hover:text-[#F9E4B5]',
    glow: 'hover:shadow-[0_0_22px_rgba(245,158,11,0.12)]',
  },
  {
    border: 'border-emerald-500/20 hover:border-emerald-400/45',
    panel: 'hover:bg-[#0E1D19]',
    iconWrap: 'bg-emerald-500/12 border-emerald-500/25 group-hover:bg-emerald-500/20',
    icon: 'text-emerald-300',
    text: 'group-hover:text-[#C6F8DF]',
    glow: 'hover:shadow-[0_0_22px_rgba(16,185,129,0.12)]',
  },
  {
    border: 'border-red-500/20 hover:border-red-400/45',
    panel: 'hover:bg-[#1A1014]',
    iconWrap: 'bg-red-500/12 border-red-500/25 group-hover:bg-red-500/20',
    icon: 'text-red-300',
    text: 'group-hover:text-[#FFD0D0]',
    glow: 'hover:shadow-[0_0_22px_rgba(239,68,68,0.12)]',
  },
] as const;

export function Solucion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { flujoSolucion } = proyectoData;

  return (
    <SectionWrapper id="solucion" className="bg-[#080E1A]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

      <SectionHeader
        eyebrow="La Solución"
        titulo="Flujo del sistema"
        subtitulo="Desde la captura de datos hasta la intervención efectiva: un pipeline cerrado, trazable y preventivo."
      />

      {/* Diagrama de flujo horizontal (desktop) */}
      <div ref={ref} className="relative">
        {/* Nodos conectados */}
        <div className="flex flex-col lg:flex-row items-stretch gap-0">
          {flujoSolucion.map((paso, idx) => {
            const Icon = FLOW_ICONS[paso.id as keyof typeof FLOW_ICONS] ?? Bell;
            const isLast = idx === flujoSolucion.length - 1;

            return (
              <div key={paso.id} className="flex flex-col lg:flex-row items-stretch flex-1">
                {/* Nodo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.12, duration: 0.4 }}
                  className="flex-1 group relative"
                >
                  <div
                    className="h-full border rounded-xl p-5 transition-all duration-300 hover:border-opacity-50"
                    style={{
                      backgroundColor: paso.bgColor,
                      borderColor: paso.color + '30',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = paso.color + '60';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = paso.color + '30';
                    }}
                  >
                    {/* Número + Icono */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: paso.color + 'AA' }}
                      >
                        0{idx + 1}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: paso.color + '18', border: `1px solid ${paso.color}25` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: paso.color }} />
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="text-sm font-bold text-[#EFF6FF] mb-1 leading-snug">
                      {paso.etiqueta}
                    </h3>
                    <p className="text-xs text-[#3D6080] mb-3 leading-relaxed">
                      {paso.descripcion}
                    </p>

                    {/* Detalles */}
                    <ul className="space-y-1.5">
                      {paso.detalles.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#7CB3E0]">
                          <span
                            className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: paso.color + '80' }}
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Flecha conectora */}
                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: idx * 0.12 + 0.2, duration: 0.3 }}
                    className="flex items-center justify-center lg:w-8 py-3 lg:py-0 flex-shrink-0"
                  >
                    <ArrowRight className="w-4 h-4 text-[#2A3F60] rotate-90 lg:rotate-0" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Línea de flujo decorativa (desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-red-500/10 -z-10" />
      </div>

      {/* Nota técnica */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-10 grid md:grid-cols-2 gap-4"
      >
        <div className="bg-[#0C1525] border border-[#1E2E48] rounded-xl p-5">
          <p className="text-xs font-semibold text-[#3D6080] uppercase tracking-wider mb-2">
            Modelo de predicción
          </p>
          <p className="text-sm font-bold text-[#EFF6FF] mb-1">
            Random Forest + XGBoost
          </p>
          <p className="text-xs text-[#3D6080] leading-relaxed">
            Ensemble de modelos supervisados entrenados con datos históricos de asistencia,
            calificaciones y variables socioeconómicas. Clasificación multiclase: riesgo alto,
            medio y bajo.
          </p>
        </div>
        <div className="bg-[#0C1525] border border-[#1E2E48] rounded-xl p-5">
          <p className="text-xs font-semibold text-[#3D6080] uppercase tracking-wider mb-2">
            Módulo de nudging
          </p>
          <p className="text-sm font-bold text-[#EFF6FF] mb-1">
            WhatsApp API + SMS fallback
          </p>
          <p className="text-xs text-[#3D6080] leading-relaxed">
            Mensajes personalizados por perfil de riesgo, contexto del estudiante y canal
            preferido de la familia. No es comunicación masiva: es comunicación relevante,
            en el momento correcto.
          </p>
        </div>
      </motion.div>

      {/* Diferenciación competitiva */}
      {proyectoData.diferenciacion && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="mt-10"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1E2E48]" />
            <span className="text-xs font-semibold text-[#3D6080] uppercase tracking-widest px-3">
              Ventaja competitiva
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1E2E48]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {proyectoData.diferenciacion.map((item, i) => {
              const Icon = DIFER_ICONS[item.icon] ?? Bell;
              const theme = DIFER_THEME[i % DIFER_THEME.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.06, duration: 0.3 }}
                  className={`group relative bg-[#0C1525] border rounded-xl p-4 transition-all duration-200 cursor-default hover:-translate-y-0.5 ${theme.border} ${theme.panel} ${theme.glow}`}
                >
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 transition-colors ${theme.iconWrap}`}>
                    <Icon className={`w-3.5 h-3.5 ${theme.icon}`} />
                  </div>
                  <p className="text-sm font-bold text-[#EFF6FF] leading-snug mb-1.5">{item.titulo}</p>
                  <p className={`text-[13px] text-[#9BC2DF] leading-relaxed transition-colors ${theme.text}`}>{item.descripcion}</p>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
