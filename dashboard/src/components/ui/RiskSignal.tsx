// ============================================================
// ALERTA-ED — RiskSignal
// Componente único: indicador visual de riesgo con animación
// Usado en el Hero como "Mission Control panel"
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SignalLevel = 'danger' | 'warning' | 'safe';

interface RiskSignalProps {
  nivel: SignalLevel;
  valor: string | number;
  label: string;
  sublabel?: string;
  animate?: boolean;
  className?: string;
}

const SIGNAL_CONFIG = {
  danger: {
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.20)',
    textColor: 'text-red-400',
    pulseColor: 'bg-red-500',
    label: 'Riesgo Alto',
    glowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  },
  warning: {
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.20)',
    textColor: 'text-amber-400',
    pulseColor: 'bg-amber-500',
    label: 'Riesgo Medio',
    glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  },
  safe: {
    color: '#10B981',
    bgColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.20)',
    textColor: 'text-emerald-400',
    pulseColor: 'bg-emerald-500',
    label: 'En Seguimiento',
    glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
} as const;

export function RiskSignal({
  nivel,
  valor,
  label,
  sublabel,
  animate = true,
  className,
}: RiskSignalProps) {
  const config = SIGNAL_CONFIG[nivel];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'relative rounded-xl p-5 border transition-all duration-300 cursor-default group',
        'hover:border-opacity-40 hover:scale-[1.02]',
        config.glowClass,
        className
      )}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
    >
      {/* Indicador de estado (dot con pulse) */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex items-center justify-center w-5 h-5">
          {animate && (
            <span
              className={cn(
                'absolute inline-flex w-full h-full rounded-full opacity-50 animate-ping',
                config.pulseColor
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex w-2.5 h-2.5 rounded-full',
              config.pulseColor
            )}
          />
        </div>
        <span className={cn('text-xs font-semibold tracking-wide uppercase', config.textColor)}>
          {label}
        </span>
      </div>

      {/* Valor principal */}
      <div className={cn('text-4xl font-black font-mono leading-none mb-1', config.textColor)}>
        {valor}
      </div>

      {/* Sublabel */}
      {sublabel && (
        <div className="text-xs text-[#3D6080] font-medium mt-2">
          {sublabel}
        </div>
      )}
    </motion.div>
  );
}

// ─── Panel de 3 señales ──────────────────────────────────────
interface RiskPanelProps {
  className?: string;
}

export function RiskPanel({ className }: RiskPanelProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <p className="text-xs font-semibold text-[#3D6080] uppercase tracking-widest mb-1">
        Monitor de riesgo activo
      </p>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="flex flex-col gap-3"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.4 }}
        >
          <RiskSignal
            nivel="danger"
            valor="23"
            label="Riesgo Alto"
            sublabel="Requieren intervención inmediata"
          />
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.4 }}
        >
          <RiskSignal
            nivel="warning"
            valor="147"
            label="Riesgo Medio"
            sublabel="En observación activa"
          />
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.4 }}
        >
          <RiskSignal
            nivel="safe"
            valor="89"
            label="En Seguimiento"
            sublabel="Intervenidos, con progreso"
          />
        </motion.div>
      </motion.div>
      <p className="text-[11px] text-[#3D6080] mt-1 font-mono">
        * Métricas propuestas — no representan datos reales
      </p>
    </div>
  );
}
