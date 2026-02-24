// ============================================================
// ALERTA-ED — Fricciones Section
// Tabs por actor con bullets de fricción e impacto
// ============================================================

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { User, Users, BookOpen, Building2 } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import type { ActorId } from '@/types';

const ACTOR_ICONS: Record<ActorId, React.ElementType> = {
  estudiante:  User,
  padres:      Users,
  docente:     BookOpen,
  institucion: Building2,
};

const IMPACTO_CONFIG = {
  alto:  { label: 'Alto',  classes: 'bg-red-500/10 text-red-400 border-red-500/20' },
  medio: { label: 'Medio', classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  bajo:  { label: 'Bajo',  classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

export function Fricciones() {
  const [activeTab, setActiveTab] = useState<ActorId>('estudiante');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { content } = useAdmin();
  const friccionesData = content.fricciones;
  const activeActor = friccionesData.find((a) => a.id === activeTab)!;

  return (
    <SectionWrapper id="fricciones" className="bg-[#04080F]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

      <SectionHeader
        eyebrow="Fricciones del sistema"
        titulo="Quiénes sienten el problema"
        subtitulo="Cada actor en el sistema educativo enfrenta fricciones distintas. Sin una solución integrada, ninguno puede resolverlo solo."
      />

      <div ref={ref}>
        {/* Tabs de actores */}
        <div className="flex flex-wrap gap-2 mb-8">
          {friccionesData.map((actor) => {
            const Icon = ACTOR_ICONS[actor.id];
            const isActive = actor.id === activeTab;
            return (
              <motion.button
                key={actor.id}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: friccionesData.indexOf(actor) * 0.08, duration: 0.35 }}
                onClick={() => setActiveTab(actor.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.12)]'
                    : 'bg-[#0C1525] text-[#7CB3E0] border border-[#1E2E48] hover:border-[#2A3F60] hover:text-[#EFF6FF]'
                )}
              >
                <Icon className="w-4 h-4" />
                {actor.label}
              </motion.button>
            );
          })}
        </div>

        {/* Panel de fricciones */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Columna izquierda: descripción del actor */}
            <div className="lg:col-span-1">
              <div className="bg-[#0C1525] border border-[#1E2E48] rounded-2xl p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  {(() => {
                    const Icon = ACTOR_ICONS[activeActor.id];
                    return <Icon className="w-5 h-5 text-blue-400" />;
                  })()}
                </div>
                <h3 className="text-lg font-bold text-[#EFF6FF] mb-2">{activeActor.label}</h3>
                <p className="text-sm text-[#7CB3E0] leading-relaxed">{activeActor.descripcion}</p>

                {/* Resumen de fricciones */}
                <div className="mt-6 pt-5 border-t border-[#162035]">
                  <p className="text-xs font-semibold text-[#3D6080] uppercase tracking-wider mb-3">
                    Distribución de impacto
                  </p>
                  <div className="space-y-2">
                    {(['alto', 'medio', 'bajo'] as const).map((nivel) => {
                      const count = activeActor.fricciones.filter(f => f.impacto === nivel).length;
                      if (count === 0) return null;
                      const config = IMPACTO_CONFIG[nivel];
                      return (
                        <div key={nivel} className="flex items-center justify-between">
                          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', config.classes)}>
                            {config.label}
                          </span>
                          <span className="text-xs text-[#3D6080]">{count} {count === 1 ? 'fricción' : 'fricciones'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: lista de fricciones */}
            <div className="lg:col-span-2 space-y-3">
              {activeActor.fricciones.map((friccion, idx) => {
                const config = IMPACTO_CONFIG[friccion.impacto];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07, duration: 0.3 }}
                    className="group bg-[#0C1525] border border-[#1E2E48] rounded-xl p-5 hover:border-[#2A3F60] hover:bg-[#111D30] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-sm font-semibold text-[#EFF6FF] leading-snug flex-1">
                        {friccion.titulo}
                      </h4>
                      <span className={cn('flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border', config.classes)}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#3D6080] leading-relaxed">
                      {friccion.descripcion}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
