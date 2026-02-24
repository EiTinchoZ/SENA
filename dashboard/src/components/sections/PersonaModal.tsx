// ============================================================
// ALERTA-ED — PersonaModal
// Modal de detalle completo de buyer persona
// Imagen + Video + Narrativa + Necesidades + Fricciones + Solución
// ============================================================

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Target, Frown, Compass, AlertCircle, Lightbulb } from 'lucide-react';
import { badgeVariantClasses, cn } from '@/lib/utils';
import type { PersonaData } from '@/types';

interface PersonaModalProps {
  persona: PersonaData | null;
  onClose: () => void;
}

export function PersonaModal({ persona, onClose }: PersonaModalProps) {
  const shouldReduceMotion = useReducedMotion();

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    if (persona) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [persona]);

  return (
    <AnimatePresence>
      {persona && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
            }
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
          >
            <div className="w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-[#080E1A] border border-[#1E2E48] sm:rounded-2xl rounded-t-2xl shadow-elevated pointer-events-auto">
              {/* Barra de color por persona (acento visual único) */}
              <div className={cn(
                'h-1 w-full rounded-t-2xl',
                persona.badge.variant === 'danger'  && 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500',
                persona.badge.variant === 'info'    && 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500',
                persona.badge.variant === 'warning' && 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500',
                persona.badge.variant === 'safe'    && 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500',
              )} />

              {/* Header */}
              <div className="sticky top-0 bg-[#080E1A]/95 backdrop-blur-xl border-b border-[#162035] px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', badgeVariantClasses(persona.badge.variant))}>
                    {persona.badge.label}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-[#EFF6FF] leading-none">{persona.nombre}</h2>
                    <p className="text-xs text-[#3D6080] mt-0.5">{persona.cargo} · {persona.edad} años</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group w-8 h-8 rounded-lg bg-[#0C1525] border border-[#1E2E48] flex items-center justify-center text-[#7CB3E0] hover:text-[#EFF6FF] hover:border-[#2A3F60] hover:bg-[#111D30] transition-all duration-200"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
                </button>
              </div>

              <div className="p-6">
                {/* Grid superior: imagen + video + datos básicos */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Imagen */}
                  <div className="group relative rounded-xl overflow-hidden bg-[#0C1525] border border-[#1E2E48] hover:border-blue-500/35 transition-colors aspect-[4/3]">
                    <img
                      src={persona.imagen}
                      alt={`Foto de ${persona.nombre}`}
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={(e) => {
                        // Fallback si no existe la imagen
                        const el = e.currentTarget;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                              <div class="w-16 h-16 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                                <svg class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                              </div>
                              <p class="text-xs text-[#3D6080] text-center">Agregar persona.png en dashboard/public/assets/</p>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#04080F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Video */}
                  <div className="group relative rounded-xl overflow-hidden bg-black border border-[#1E2E48] hover:border-indigo-500/35 transition-colors aspect-[4/3]">
                    <video
                      src={persona.video}
                      controls
                      preload="metadata"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = 'none';
                        const parent = el.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                              <div class="w-16 h-16 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                                <svg class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                              </div>
                              <p class="text-xs text-[#3D6080] text-center">Agregar persona.mp4 en dashboard/public/assets/</p>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#04080F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Tagline */}
                <blockquote className="bg-[#0C1525] border-l-4 border-blue-500 rounded-r-xl px-5 py-4 mb-8 transition-colors hover:bg-[#101A2E]">
                  <p className="text-base italic text-[#7CB3E0] leading-relaxed">{persona.tagline}</p>
                </blockquote>

                {/* Narrativa */}
                <div className="mb-8 bg-[#0A1020] border border-[#162035] rounded-xl p-5">
                  <h3 className="text-xs font-semibold text-[#3D6080] uppercase tracking-wider mb-4">
                    Narrativa
                  </h3>
                  <p className="text-sm text-[#8BBFD8] leading-[1.8] whitespace-pre-line">
                    {persona.narrativa}
                  </p>
                </div>

                {/* Grid: necesidades / frustraciones / objetivos */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <InfoBlock
                    icon={Target}
                    titulo="Necesidades"
                    items={persona.necesidades}
                    color="blue"
                  />
                  <InfoBlock
                    icon={Frown}
                    titulo="Frustraciones"
                    items={persona.frustraciones}
                    color="red"
                  />
                  <InfoBlock
                    icon={Compass}
                    titulo="Objetivos"
                    items={persona.objetivos}
                    color="emerald"
                  />
                </div>

                {/* Momento de fricción + Cómo ayuda el sistema */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Momento de fricción */}
                  <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-5 transition-colors hover:bg-red-500/12 hover:border-red-500/35">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                        Momento de fricción
                      </span>
                    </div>
                    <p className="text-sm text-[#EFF6FF] font-medium mb-2 leading-snug">
                      {persona.momentoFriccion.situacion}
                    </p>
                    <p className="text-xs text-[#7CB3E0] leading-relaxed">
                      Impacto: {persona.momentoFriccion.impacto}
                    </p>
                  </div>

                  {/* Cómo ayuda el sistema */}
                  <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-5 transition-colors hover:bg-emerald-500/12 hover:border-emerald-500/35">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        Cómo ayuda ALERTA-ED
                      </span>
                    </div>
                    <p className="text-sm text-[#EFF6FF] leading-relaxed">
                      {persona.comoAyudaElSistema}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Bloque de lista con icono ─────────────────────────────────
function InfoBlock({
  icon: Icon,
  titulo,
  items,
  color,
}: {
  icon: React.ElementType;
  titulo: string;
  items: string[];
  color: 'blue' | 'red' | 'emerald';
}) {
  const colorMap = {
    blue: {
      icon: 'text-blue-400',
      dot: 'bg-blue-500/50',
      header: 'text-[#3D6080]',
      hover: 'hover:border-blue-500/30 hover:bg-[#101A2E]',
    },
    red: {
      icon: 'text-red-400',
      dot: 'bg-red-500/50',
      header: 'text-[#3D6080]',
      hover: 'hover:border-red-500/30 hover:bg-[#1A1116]',
    },
    emerald: {
      icon: 'text-emerald-400',
      dot: 'bg-emerald-500/50',
      header: 'text-[#3D6080]',
      hover: 'hover:border-emerald-500/30 hover:bg-[#0F1C18]',
    },
  };
  const c = colorMap[color];

  return (
    <div className={cn('bg-[#0C1525] border border-[#1E2E48] rounded-xl p-4 transition-colors', c.hover)}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn('w-4 h-4', c.icon)} />
        <span className={cn('text-xs font-semibold uppercase tracking-wider', c.header)}>
          {titulo}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', c.dot)} />
            <span className="text-xs text-[#7CB3E0] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
