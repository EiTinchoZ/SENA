// ============================================================
// ALERTA-ED — RiskSignal + RiskPanel
// Indicador de riesgo con animación de número en tiempo real
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

      {/* Valor principal con AnimatePresence para transición suave */}
      <div className={cn('text-4xl font-black font-mono leading-none mb-1 overflow-hidden h-10', config.textColor)}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={String(valor)}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="block"
          >
            {valor}
          </motion.span>
        </AnimatePresence>
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

// ─── Panel de 3 señales con datos en tiempo real ─────────────
export interface RiskPanelProps {
  className?: string;
  initialDanger?: number;
  initialWarning?: number;
  initialSafe?: number;
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function randDelta(range: number): number {
  return Math.round((Math.random() - 0.5) * 2 * range);
}

export function RiskPanel({
  className,
  initialDanger = 23,
  initialWarning = 147,
  initialSafe = 89,
}: RiskPanelProps) {
  const [danger, setDanger] = useState(initialDanger);
  const [warning, setWarning] = useState(initialWarning);
  const [safe, setSafe] = useState(initialSafe);
  const [lastUpdate, setLastUpdate] = useState(0);

  // Actualizar números cada 4 segundos simulando datos en vivo
  useEffect(() => {
    const interval = setInterval(() => {
      setDanger((prev) => clamp(prev + randDelta(2), 15, 35));
      setWarning((prev) => clamp(prev + randDelta(3), 120, 180));
      setSafe((prev) => clamp(prev + randDelta(2), 70, 110));
      setLastUpdate(0);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Contador regresivo "actualizado hace X seg"
  useEffect(() => {
    const counter = setInterval(() => {
      setLastUpdate((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(counter);
  }, []);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Header con badge EN VIVO */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold text-[#3D6080] uppercase tracking-widest">
          Monitor de riesgo activo
        </p>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
            En vivo
          </span>
        </div>
      </div>

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
            valor={danger}
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
            valor={warning}
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
            valor={safe}
            label="En Seguimiento"
            sublabel="Intervenidos, con progreso"
          />
        </motion.div>
      </motion.div>

      <p className="text-[11px] text-[#3D6080] mt-1 font-mono">
        Actualizado hace {lastUpdate}s &middot; Métricas propuestas
      </p>
    </div>
  );
}
