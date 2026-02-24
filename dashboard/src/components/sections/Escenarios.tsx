// ============================================================
// ALERTA-ED — Escenarios Section
// Galería de 3 videos de buyer personas con captions
// ============================================================

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { personas } from '@/data/personas';
import { badgeVariantClasses, cn } from '@/lib/utils';

const CAPTIONS = [
  {
    titulo: 'El estudiante que considera abandonar',
    descripcion:
      'Carlos trabaja medio tiempo y sus calificaciones empiezan a caer. Sin intervención, la presión acumulada lo lleva a considerar dejar la carrera.',
  },
  {
    titulo: 'El docente que no llega a tiempo',
    descripcion:
      'José atiende más de 40 estudiantes por grupo. Cuando quiere actuar sobre un caso de riesgo, la información ya es obsoleta o el problema se agravó.',
  },
  {
    titulo: 'La coordinadora que actúa post-mortem',
    descripcion:
      'Marta recibe el reporte manual con semanas de retraso. Para cuando puede coordinar una respuesta, varios estudiantes ya tomaron la decisión de no volver.',
  },
];

export function Escenarios() {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SectionWrapper id="escenarios" className="bg-[#04080F]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

      <SectionHeader
        eyebrow="Escenarios"
        titulo="Historias reales del problema"
        subtitulo="Tres perspectivas. Un mismo sistema fallando. Mira los escenarios de cada actor antes de que existiera ALERTA-ED."
        centered
      />

      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {personas.map((persona, idx) => {
          const caption = CAPTIONS[idx];
          const isPlaying = playingIdx === idx;

          return (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.12, duration: 0.45 }}
              className="group rounded-2xl overflow-hidden border border-[#1E2E48] hover:border-[#2A3F60] transition-all duration-300 bg-[#0C1525]"
            >
              {/* Video container */}
              <div className="relative aspect-video bg-[#080E1A] overflow-hidden">
                <video
                  src={persona.video}
                  className="w-full h-full object-cover"
                  controls={isPlaying}
                  onPlay={() => setPlayingIdx(idx)}
                  onPause={() => setPlayingIdx(null)}
                  onEnded={() => setPlayingIdx(null)}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLVideoElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0C1525] to-[#04080F]">
                          <div class="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <svg class="w-7 h-7 text-indigo-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <p class="text-[11px] text-[#3D6080] px-4 text-center">Agregar video en public/assets/persona${idx+1}.mp4</p>
                        </div>
                      `;
                    }
                  }}
                />

                {/* Overlay con play button cuando no está reproduciendo */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                )}

                {/* Badge persona */}
                <div className="absolute top-3 left-3">
                  <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full', badgeVariantClasses(persona.badge.variant))}>
                    {persona.badge.label}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-2">
                  <div>
                    <p className="text-sm font-bold text-[#EFF6FF] leading-snug">
                      {caption.titulo}
                    </p>
                    <p className="text-xs text-[#3D6080] mt-0.5">{persona.nombre} · {persona.cargo}</p>
                  </div>
                </div>
                <p className="text-xs text-[#7CB3E0] leading-relaxed">{caption.descripcion}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
