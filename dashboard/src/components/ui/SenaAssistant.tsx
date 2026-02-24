// ============================================================
// ALERTA-ED — SenaAssistant
// Widget flotante de SENA que explica cada sección en lenguaje
// simple y se adapta al rol del usuario
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SenaAvatar } from '@/components/onboarding/SenaAvatar';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';
import type { SenaProfile } from '@/types';

const SECTION_IDS = [
  'inicio', 'problema', 'solucion', 'fricciones',
  'personas', 'escenarios', 'impacto', 'reflexion',
];

interface SectionContent {
  titulo: string;
  default: string;
  estudiante?: string;
  investigador?: string;
}

const SENA_CONTENT: Record<string, SectionContent> = {
  inicio: {
    titulo: '¿Qué es ALERTA-ED?',
    default:
      'Soy SENA. ALERTA-ED es un sistema que usa inteligencia artificial para detectar cuándo un estudiante está en riesgo de abandonar sus estudios. El panel de la derecha muestra datos en tiempo real: peligro, advertencia y seguimiento activo.',
    estudiante:
      'Hola! Soy SENA, la IA de este sistema. ALERTA-ED analiza asistencia y calificaciones para detectar si un estudiante necesita apoyo antes de que sea tarde. Si detecta riesgo, avisa al docente y a la familia.',
  },
  problema: {
    titulo: '¿Por qué necesitamos esto?',
    default:
      'Más del 40% de los estudiantes del ITSE están en riesgo de abandonar. El problema: los sistemas actuales actúan cuando el problema ya ocurrió. Esta sección muestra las causas reales y por qué el modelo actual de atención falla.',
    estudiante:
      'Muchos estudiantes abandonan no por falta de capacidad, sino porque nadie los apoyó a tiempo. Esta sección explica por qué eso sigue pasando y qué está fallando en el sistema educativo hoy.',
  },
  solucion: {
    titulo: '¿Cómo funciona el sistema?',
    default:
      'Cinco pasos: reúne datos del estudiante → la IA calcula el nivel de riesgo → genera una alerta → envía mensajes de apoyo a docentes y familias → registra la intervención. Todo ocurre en menos de 48 horas.',
    estudiante:
      'El sistema lee tu asistencia y notas → detecta si hay señales de riesgo → avisa al docente → el docente te contacta. Antes de que sea tarde, no después.',
    investigador:
      'Pipeline: Random Forest + XGBoost sobre variables de asistencia, calificaciones y contexto socioeconómico. Evaluación con validación cruzada y métricas de precisión/recall. El módulo de nudging usa WhatsApp API + fallback SMS.',
  },
  fricciones: {
    titulo: '¿Por qué no funciona hoy?',
    default:
      'Existen obstáculos reales en cada actor: el estudiante no pide ayuda por vergüenza, los padres no están informados, el docente tiene 40 alumnos y no puede hacer seguimiento individual, y la institución solo actúa cuando el problema ya estalló.',
    estudiante:
      'Cuando un estudiante tiene dificultades, nadie se entera a tiempo. Los docentes quieren ayudar pero no tienen herramientas. Esta sección muestra esas barreras con nombres y apellidos.',
  },
  personas: {
    titulo: '¿A quiénes afecta este sistema?',
    default:
      'Tres actores clave: Carlos (estudiante en riesgo), José (docente que quiere ayudar pero no tiene herramientas) y Marta (coordinadora que necesita visibilidad global). Hacé clic en cada tarjeta para ver su historia completa.',
    estudiante:
      'Conocé a Carlos Mendoza, un estudiante como tú. Su historia muestra exactamente cómo el sistema detectaría su situación y qué pasaría después. Hacé clic en su tarjeta.',
  },
  escenarios: {
    titulo: '¿Cómo se vería en uso real?',
    default:
      'Estos videos muestran situaciones concretas de personas que se beneficiarían de ALERTA-ED. Cada escenario ilustra un punto de dolor real — lo que pasa hoy sin el sistema y lo que podría pasar con él.',
    estudiante:
      'Los videos muestran historias reales de personas en situaciones que el sistema podría cambiar. Prestá atención a cómo cada historia describe un momento en el que una alerta a tiempo hubiera marcado la diferencia.',
  },
  impacto: {
    titulo: '¿Qué resultados esperamos?',
    default:
      'Proyecciones si el sistema se implementa: detectar el 85% de los casos en riesgo, intervenir en menos de 48 horas y reducir la deserción un 30%. Son metas basadas en literatura académica — no datos reales todavía. Se marca claramente como "propuesto".',
    estudiante:
      'La meta: que 3 de cada 10 estudiantes que hoy abandonan, reciban ayuda a tiempo y terminen sus estudios. Son proyecciones, pero el impacto potencial es muy concreto para personas reales.',
  },
  reflexion: {
    titulo: '¿Qué hace la IA y qué hace el humano?',
    default:
      'La IA detecta señales que un humano no puede ver a escala — analiza cientos de estudiantes al mismo tiempo. Pero la decisión de intervenir, cómo hacerlo y con qué empatía, siempre la toma un humano. La tecnología amplifica, no reemplaza.',
    estudiante:
      'La IA es una herramienta. Quien decide ayudarte es siempre una persona real — tu docente, tu coordinador. El sistema solo hace que esa ayuda llegue en el momento en que más la necesitás.',
  },
};

interface SenaAssistantProps {
  profile: SenaProfile | null;
}

export function SenaAssistant({ profile }: SenaAssistantProps) {
  const activeSection = useScrollSpy(SECTION_IDS);
  const [isOpen, setIsOpen] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking'>('idle');
  const prevSectionRef = useRef<string>('');
  const manualInteractionRef = useRef(false);

  const content = SENA_CONTENT[activeSection];
  const role = profile?.role;

  const texto =
    (role === 'estudiante' && content?.estudiante)
      ? content.estudiante
      : (role === 'investigador' && content?.investigador)
      ? content.investigador
      : content?.default ?? '';

  // Auto-open + auto-close cuando cambia la sección
  useEffect(() => {
    if (!activeSection || activeSection === prevSectionRef.current) return;
    prevSectionRef.current = activeSection;
    manualInteractionRef.current = false;

    setAvatarState('speaking');
    const avatarTimer = setTimeout(() => setAvatarState('idle'), 1500);

    setIsOpen(true);
    const closeTimer = setTimeout(() => {
      if (!manualInteractionRef.current) setIsOpen(false);
    }, 6000);

    return () => {
      clearTimeout(avatarTimer);
      clearTimeout(closeTimer);
    };
  }, [activeSection]);

  const handleToggle = () => {
    manualInteractionRef.current = true;
    setIsOpen((v) => !v);
  };

  if (!content) return null;

  return (
    <div data-export-hide className="fixed bottom-20 left-4 z-40 flex flex-col items-start gap-2">
      {/* Tarjeta de explicación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="w-72 bg-[#080E1A]/96 backdrop-blur-xl border border-[#1E2E48] rounded-2xl shadow-elevated overflow-hidden"
          >
            {/* Barra de color superior */}
            <div className="h-0.5 bg-gradient-to-r from-blue-500/70 via-indigo-500/50 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                  SENA — Asistente
                </span>
              </div>
              <button
                onClick={handleToggle}
                className="w-5 h-5 flex items-center justify-center rounded-md text-[#3D6080] hover:text-[#EFF6FF] transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="px-4 pb-4">
              <p className="text-xs font-bold text-[#EFF6FF] mb-2 leading-snug">{content.titulo}</p>
              <p className="text-xs text-[#7CB3E0] leading-relaxed">{texto}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón toggle */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'flex items-center gap-2.5 rounded-2xl border px-3 py-2 transition-all duration-200 shadow-elevated',
          isOpen
            ? 'bg-blue-500/12 border-blue-500/30'
            : 'bg-[#080E1A]/90 border-[#1E2E48] hover:border-blue-500/25 hover:bg-[#0C1525]'
        )}
        title="Preguntar a SENA sobre esta sección"
      >
        <SenaAvatar state={avatarState} size="sm" />
        <div className="text-left">
          <p className="text-[10px] font-mono font-bold text-blue-400 leading-none">SENA</p>
          <p className="text-[10px] text-[#3D6080] leading-none mt-0.5 max-w-[96px] truncate">
            {content.titulo}
          </p>
        </div>
      </motion.button>
    </div>
  );
}
