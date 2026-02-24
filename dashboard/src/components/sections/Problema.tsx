// ============================================================
// ALERTA-ED — Problema Section
// Mapa de oportunidades: causas + impacto en formato visual
// ============================================================

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';

const NIVEL_CONFIG = {
  critico: {
    label: 'Crítico',
    dot: 'bg-red-500',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    border: 'border-red-500/20 hover:border-red-500/40',
    glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.08)]',
  },
  alto: {
    label: 'Alto',
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]',
  },
  medio: {
    label: 'Medio',
    dot: 'bg-blue-500',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]',
  },
} as const;

const CONSECUENCIA_EJES = [
  'Impacto educativo',
  'Impacto laboral',
  'Impacto social',
  'Impacto institucional',
  'Impacto económico',
];

export function Problema() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { content } = useAdmin();
  const { oportunidades } = content.proyecto;
  const criticos = oportunidades.filter((o) => o.nivel === 'critico');
  const altos = oportunidades.filter((o) => o.nivel === 'alto');
  const medios = oportunidades.filter((o) => o.nivel === 'medio');

  return (
    <SectionWrapper id="problema" className="bg-[#04080F]">
      {/* Divisor superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

      <SectionHeader
        eyebrow="El Problema"
        titulo="Mapa de oportunidades"
        subtitulo="Las causas raíz de la deserción escolar y su impacto sistémico en la comunidad educativa."
      />

      {/* Stat destacado */}
      <div ref={ref} className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'de deserciones podrían evitarse con detección temprana', valor: '60%', color: 'text-red-400' },
          { label: 'días en promedio pasan antes de la primera intervención', valor: '42', color: 'text-amber-400' },
          { label: 'actores involucrados, raramente coordinados', valor: '4+', color: 'text-blue-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-[#0C1525] border border-[#1E2E48] rounded-xl p-5"
          >
            <div className={cn('text-4xl font-black font-mono mb-1', stat.color)}>
              {stat.valor}
            </div>
            <p className="text-xs text-[#3D6080] leading-relaxed">{stat.label}</p>
            <p className="text-[10px] text-[#3D6080]/60 mt-1 font-mono">Métrica propuesta</p>
          </motion.div>
        ))}
      </div>

      {/* Mapa de causas */}
      <div className="space-y-8">
        {/* Nivel Crítico */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
              Causas críticas
            </span>
            <div className="flex-1 h-px bg-red-500/15" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {criticos.map((op, i) => (
              <OportunidadCard key={op.id} oportunidad={op} delay={i * 0.08} inView={inView} />
            ))}
          </div>
        </div>

        {/* Nivel Alto */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Causas de alto impacto
            </span>
            <div className="flex-1 h-px bg-amber-500/15" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {altos.map((op, i) => (
              <OportunidadCard key={op.id} oportunidad={op} delay={0.2 + i * 0.08} inView={inView} />
            ))}
          </div>
        </div>

        {/* Nivel Medio */}
        {medios.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                Causas secundarias
              </span>
              <div className="flex-1 h-px bg-blue-500/15" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {medios.map((op, i) => (
                <OportunidadCard key={op.id} oportunidad={op} delay={0.35 + i * 0.08} inView={inView} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conclusión del problema */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-12 bg-[#0C1525] border border-[#1E2E48] rounded-2xl p-6 lg:p-8 flex gap-5"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <TrendingDown className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#EFF6FF] mb-2">El patrón que se repite</h3>
          <p className="text-sm text-[#7CB3E0] leading-relaxed">
            Las instituciones actúan de forma reactiva: cuando detectan que un estudiante está en riesgo,
            ya tomó la decisión de abandonar. La ventana de intervención efectiva se cierra entre 4 y 8
            semanas antes de que el abandono se haga efectivo. ALERTA-ED opera en esa ventana.
          </p>
        </div>
      </motion.div>

      {/* Consecuencias negativas — si no intervenimos */}
      {content.proyecto.consecuenciasNegativas && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                Si no actuamos
              </p>
              <p className="text-sm font-bold text-[#EFF6FF]">El costo de no intervenir</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {content.proyecto.consecuenciasNegativas.map((consecuencia, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.35 }}
                className="relative bg-[#0C1525] border border-red-500/15 hover:border-red-400/35 rounded-xl p-4 sm:p-5 transition-all duration-200 group hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-red-300/85">
                    0{i + 1}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-red-300/70">
                    {CONSECUENCIA_EJES[i] ?? 'Impacto'}
                  </span>
                </div>
                <p className="text-[13px] text-[#9BC2DF] leading-relaxed group-hover:text-[#C0DEF2] transition-colors">
                  {consecuencia}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/35 to-transparent rounded-b-xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}

// ─── Card individual de oportunidad ──────────────────────────
function OportunidadCard({
  oportunidad,
  delay,
  inView,
}: {
  oportunidad: { id: string; causa: string; impacto: string; nivel: 'critico' | 'alto' | 'medio' };
  delay: number;
  inView: boolean;
}) {
  const config = NIVEL_CONFIG[oportunidad.nivel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className={cn(
        'group bg-[#0C1525] border rounded-xl p-5 transition-all duration-200',
        config.border,
        config.glow
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={cn('flex-shrink-0 w-2 h-2 rounded-full mt-1.5', config.dot)} />
        <h4 className="text-sm font-semibold text-[#EFF6FF] leading-snug">{oportunidad.causa}</h4>
      </div>
      <p className="text-xs text-[#3D6080] leading-relaxed pl-5">{oportunidad.impacto}</p>
      <div className="mt-3 pl-5">
        <span className={cn('text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border', config.badge)}>
          {config.label}
        </span>
      </div>
    </motion.div>
  );
}
