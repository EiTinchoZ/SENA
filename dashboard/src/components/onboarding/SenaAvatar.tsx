// ============================================================
// ALERTA-ED — SenaAvatar
// Avatar geométrico animado de la mascota SENA
// Hexágono con anillo orbital y núcleo pulsante
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AvatarState = 'idle' | 'thinking' | 'speaking';

interface SenaAvatarProps {
  state?: AvatarState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZES = {
  sm:  { container: 'w-12 h-12',  svg: 48 },
  md:  { container: 'w-16 h-16',  svg: 64 },
  lg:  { container: 'w-24 h-24',  svg: 96 },
  xl:  { container: 'w-36 h-36',  svg: 144 },
};

export function SenaAvatar({ state = 'idle', size = 'md', className }: SenaAvatarProps) {
  const { container, svg } = SIZES[size];
  const cx = svg / 2;
  const cy = svg / 2;
  const hexR = svg * 0.38;
  const ringR = svg * 0.44;
  const coreR = svg * 0.11;
  const glowR = svg * 0.18;

  // Generar puntos del hexágono
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + hexR * Math.cos(angle)},${cy + hexR * Math.sin(angle)}`;
  }).join(' ');

  const spinDuration = state === 'thinking' ? 2 : state === 'speaking' ? 4 : 8;
  const pulseDuration = state === 'idle' ? 2.5 : 1.5;

  return (
    <div className={cn('relative flex items-center justify-center', container, className)}>
      {/* Glow externo */}
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
        }}
      />

      <svg
        width={svg}
        height={svg}
        viewBox={`0 0 ${svg} ${svg}`}
        fill="none"
        className="relative z-10"
        aria-hidden
      >
        {/* Defs: gradientes */}
        <defs>
          <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hexágono relleno */}
        <polygon
          points={hexPoints}
          fill="url(#hexGrad)"
          stroke="url(#hexStroke)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* Anillo orbital exterior (rotación) */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={ringR}
          stroke="#3B82F6"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray={`${ringR * 0.4} ${ringR * 0.25}`}
          fill="none"
          animate={{ rotate: 360 }}
          transition={{
            duration: spinDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Anillo orbital interior (rotación inversa) */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={ringR * 0.78}
          stroke="#6366F1"
          strokeWidth="0.75"
          strokeOpacity="0.25"
          strokeDasharray={`${ringR * 0.2} ${ringR * 0.35}`}
          fill="none"
          animate={{ rotate: -360 }}
          transition={{
            duration: spinDuration * 1.3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Glow del núcleo */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={glowR}
          fill="#3B82F6"
          fillOpacity="0.10"
          animate={{ r: [glowR, glowR * 1.25, glowR] }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Núcleo central */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={coreR}
          fill="url(#coreGrad)"
          filter="url(#glow)"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Punto de estado (thinking: rotando, speaking: flash) */}
        {state === 'thinking' && (
          <motion.circle
            cx={cx + ringR * 0.9}
            cy={cy}
            r={svg * 0.04}
            fill="#F59E0B"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        )}
      </svg>
    </div>
  );
}
