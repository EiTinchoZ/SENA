// ============================================================
// ALERTA-ED — AlertTimeline
// Componente único: línea de tiempo de alertas simuladas
// Muestra el flujo de una intervención ficticia
// ============================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  tiempo: string;
  tipo: 'danger' | 'warning' | 'info' | 'safe';
  titulo: string;
  descripcion: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    tiempo: 'Día 0',
    tipo: 'danger',
    titulo: 'Alerta generada',
    descripcion: 'ALERTA-ED detecta patrón de riesgo alto en Sebastián M.',
  },
  {
    tiempo: 'Día 1',
    tipo: 'warning',
    titulo: 'Docente notificado',
    descripcion: 'Carlos Méndez recibe alerta en su dashboard. Revisa el caso.',
  },
  {
    tiempo: 'Día 2',
    tipo: 'info',
    titulo: 'Nudging enviado',
    descripcion: 'Mensaje personalizado enviado a Rosa (madre) vía WhatsApp.',
  },
  {
    tiempo: 'Día 3',
    tipo: 'info',
    titulo: 'Familia contactada',
    descripcion: 'Rosa responde. Acuerdan reunión con el docente para el viernes.',
  },
  {
    tiempo: 'Día 7',
    tipo: 'safe',
    titulo: 'Intervención exitosa',
    descripcion: 'Sebastián retoma asistencia. Alerta cerrada con seguimiento activo.',
  },
];

const TYPE_CONFIG = {
  danger: {
    dot: 'bg-red-500',
    line: 'border-red-500/30',
    title: 'text-red-400',
  },
  warning: {
    dot: 'bg-amber-500',
    line: 'border-amber-500/30',
    title: 'text-amber-400',
  },
  info: {
    dot: 'bg-blue-500',
    line: 'border-blue-500/30',
    title: 'text-blue-400',
  },
  safe: {
    dot: 'bg-emerald-500',
    line: 'border-emerald-500/30',
    title: 'text-emerald-400',
  },
};

interface AlertTimelineProps {
  className?: string;
}

export function AlertTimeline({ className }: AlertTimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <p className="text-xs font-semibold text-[#3D6080] uppercase tracking-widest mb-4">
        Ciclo de intervención
      </p>

      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-red-500/40 via-blue-500/30 to-emerald-500/40" />

        <div className="space-y-5">
          {TIMELINE_EVENTS.map((event, idx) => {
            const config = TYPE_CONFIG[event.tipo];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.35 }}
                className="flex gap-4 relative"
              >
                {/* Dot */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={cn('w-[18px] h-[18px] rounded-full border-2 border-[#080E1A] z-10', config.dot)} />
                </div>

                {/* Contenido */}
                <div className="flex-1 pb-1">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className={cn('text-xs font-mono font-bold', config.title)}>
                      {event.tiempo}
                    </span>
                    <span className="text-sm font-semibold text-[#EFF6FF]">
                      {event.titulo}
                    </span>
                  </div>
                  <p className="text-xs text-[#3D6080] leading-relaxed">
                    {event.descripcion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-[#3D6080] mt-4 font-mono">
        * Escenario de ejemplo — no representa un caso real
      </p>
    </div>
  );
}
