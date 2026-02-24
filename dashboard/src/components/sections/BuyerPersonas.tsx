// ============================================================
// ALERTA-ED — BuyerPersonas Section
// Grid de 3 tarjetas premium con apertura de modal
// ============================================================

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { PersonaModal } from './PersonaModal';
import { personas } from '@/data/personas';
import { badgeVariantClasses, cn } from '@/lib/utils';
import type { PersonaData, SenaProfile } from '@/types';

interface BuyerPersonasProps {
  profile: SenaProfile | null;
}

export function BuyerPersonas({ profile }: BuyerPersonasProps) {
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      <SectionWrapper id="personas" className="bg-[#080E1A]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

        <SectionHeader
          eyebrow="Buyer Personas"
          titulo="Los protagonistas del sistema"
          subtitulo="Tres actores reales con necesidades distintas, conectados por el mismo problema. El sistema los une."
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, idx) => {
            const isHighlighted =
              profile?.highlightedPersonaId === persona.id;

            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.12, duration: 0.45 }}
              >
                <PersonaCard
                  persona={persona}
                  active={selectedPersona?.id === persona.id}
                  highlighted={isHighlighted}
                  onClick={() => setSelectedPersona(persona)}
                />
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      <PersonaModal
        persona={selectedPersona}
        onClose={() => setSelectedPersona(null)}
      />
    </>
  );
}

// ─── Tarjeta de persona ──────────────────────────────────────
interface PersonaCardProps {
  persona: PersonaData;
  active: boolean;
  highlighted: boolean;
  onClick: () => void;
}

function PersonaCard({ persona, active, highlighted, onClick }: PersonaCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={active}
      className={cn(
        'group relative w-full text-left rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer',
        'hover:shadow-elevated focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        active && 'ring-2 ring-blue-500/45',
        highlighted
          ? 'border-blue-500/50 shadow-glow-blue'
          : 'border-[#1E2E48] hover:border-[#2A3F60]'
      )}
    >
      {/* Anillo pulsante en la card destacada */}
      {highlighted && (
        <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/30 animate-pulse-slow pointer-events-none z-10" />
      )}

      {/* Badge "Tu perfil" */}
      {highlighted && (
        <div className="absolute top-3 right-3 z-20">
          <span className="flex items-center gap-1.5 text-[10px] font-bold bg-blue-500/25 text-blue-200 border border-blue-400/40 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
            Tu perfil
          </span>
        </div>
      )}

      {/* Imagen */}
      <div className="relative h-64 bg-[#0C1525] overflow-hidden">
        <img
          src={persona.imagen}
          alt={`Foto de ${persona.nombre}`}
          className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            const parent = el.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0C1525] to-[#111D30]">
                  <div class="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <svg class="w-8 h-8 text-blue-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <p class="text-[11px] text-[#3D6080] px-4 text-center">Agregar imagen en public/assets/</p>
                </div>
              `;
            }
          }}
        />
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E1A] via-transparent to-transparent" />
        <div className={cn(
          'absolute inset-0 border-2 border-transparent transition-colors duration-200',
          active && 'border-blue-500/40'
        )} />

        {/* Badge de rol */}
        <div className="absolute bottom-3 left-3">
          <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full', badgeVariantClasses(persona.badge.variant))}>
            {persona.badge.label}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 bg-[#0C1525]">
        {/* Nombre y datos */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-base font-bold text-[#EFF6FF] leading-snug">{persona.nombre}</h3>
            <p className="text-xs text-[#3D6080] mt-0.5">{persona.cargo} · {persona.edad} años</p>
          </div>
          <div className="w-7 h-7 rounded-lg bg-[#111D30] border border-[#1E2E48] flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
            <ChevronRight className="w-3.5 h-3.5 text-[#3D6080] group-hover:text-blue-400 transition-colors" />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-[#7CB3E0] italic leading-relaxed mb-4 line-clamp-2">
          {persona.tagline}
        </p>

        {/* Preview de necesidades */}
        <div className="space-y-1.5">
          {persona.necesidades.slice(0, 2).map((n, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
              <span className="text-[11px] text-[#3D6080] leading-relaxed line-clamp-1">{n}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-[#162035] flex items-center gap-1.5 text-xs font-medium text-[#3D6080] group-hover:text-blue-400 transition-colors">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full bg-blue-500/0 transition-colors',
            (active || highlighted) && 'bg-blue-400/80'
          )} />
          <span>Ver perfil completo</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.button>
  );
}
