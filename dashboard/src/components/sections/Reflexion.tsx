// ============================================================
// ALERTA-ED — Reflexión Section
// IA vs Humano + persona más viable a validar primero
// ============================================================

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Heart, CheckCircle, Target } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { proyectoData } from '@/data/project';
import { personas } from '@/data/personas';
import { badgeVariantClasses, cn } from '@/lib/utils';

export function Reflexion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { reflexion } = proyectoData;
  const personaViable = personas.find((p) => p.id === reflexion.personaMasViable.personaId);

  return (
    <SectionWrapper id="reflexion" className="bg-[#04080F]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

      <SectionHeader
        eyebrow="Reflexión"
        titulo="IA y humano: roles distintos, mismo objetivo"
        subtitulo="La inteligencia artificial amplifica la capacidad humana. No la reemplaza. Este sistema existe en esa intersección."
      />

      <div ref={ref} className="space-y-8">
        {/* Comparativa IA vs Humano */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* IA aporta */}
          <div className="bg-[#0C1525] border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-[#3D6080] font-semibold uppercase tracking-wider">La IA aporta</p>
                <p className="text-sm font-bold text-[#EFF6FF]">Velocidad y escala</p>
              </div>
            </div>
            <ul className="space-y-3">
              {reflexion.iaAporta.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#7CB3E0] leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Humano aporta */}
          <div className="bg-[#0C1525] border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-[#3D6080] font-semibold uppercase tracking-wider">El humano aporta</p>
                <p className="text-sm font-bold text-[#EFF6FF]">Contexto y responsabilidad</p>
              </div>
            </div>
            <ul className="space-y-3">
              {reflexion.humanoAporta.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#7CB3E0] leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Conclusión */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-[#0C1525] border border-[#1E2E48] rounded-2xl p-6 lg:p-8"
        >
          <p className="text-[11px] font-semibold text-[#3D6080] uppercase tracking-widest mb-3">
            Conclusión
          </p>
          <blockquote className="text-base lg:text-lg text-[#EFF6FF] leading-relaxed font-medium border-l-4 border-blue-500 pl-5">
            {reflexion.conclusion}
          </blockquote>
        </motion.div>

        {/* Persona más viable a validar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-[#EFF6FF]">Persona prioritaria para validar</h3>
          </div>

          {personaViable && (
            <div className="bg-[#0C1525] border border-amber-500/20 rounded-2xl p-6 grid md:grid-cols-3 gap-6">
              {/* Imagen del persona */}
              <div className="md:col-span-1">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#080E1A] border border-[#1E2E48]">
                  <img
                    src={personaViable.imagen}
                    alt={personaViable.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = 'none';
                    }}
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', badgeVariantClasses(personaViable.badge.variant))}>
                    {personaViable.badge.label}
                  </span>
                  <p className="text-sm font-bold text-[#EFF6FF] mt-2">{personaViable.nombre}</p>
                  <p className="text-xs text-[#3D6080]">{personaViable.cargo}</p>
                </div>
              </div>

              {/* Razón y criterios */}
              <div className="md:col-span-2">
                <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-3">
                  Por qué validar primero con este actor
                </p>
                <p className="text-sm text-[#7CB3E0] leading-relaxed mb-5">
                  {reflexion.personaMasViable.razon}
                </p>

                <p className="text-[11px] font-semibold text-[#3D6080] uppercase tracking-wider mb-3">
                  Criterios de selección
                </p>
                <ul className="space-y-2">
                  {reflexion.personaMasViable.criterios.map((criterio, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#7CB3E0] leading-relaxed">{criterio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer de la presentación */}
      <div className="mt-16 pt-8 border-t border-[#162035] text-center">
        <p className="text-xs font-mono text-[#3D6080]">
          ALERTA-ED — Sistema de Alerta Temprana para la Deserción Escolar
        </p>
        <p className="text-xs text-[#3D6080]/60 mt-1">
          Presentado con SENA — Sistema de ENseñanza y Alerta
        </p>
      </div>
    </SectionWrapper>
  );
}
