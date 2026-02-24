// ============================================================
// ALERTA-ED — SenaOnboarding
// Flujo completo de onboarding con SENA (5 pasos)
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, CheckCircle } from 'lucide-react';
import { SenaAvatar } from './SenaAvatar';
import { OnboardingQuestion } from './OnboardingQuestion';
import { useOnboarding } from '@/hooks/useOnboarding';
import { pregunta1Options, pregunta2Options, senaResponses } from '@/data/sena-flow';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

const ROLE_LABELS: Record<UserRole, string> = {
  docente:      'Docente / Tutor',
  director:     'Director / Rector',
  investigador: 'Investigador / Académico',
  emprendedor:  'Emprendedor / Inversor',
  estudiante:   'Estudiante',
  otro:         'Otro perfil',
};

const ROLE_COLORS: Record<UserRole, string> = {
  docente:      'text-blue-400',
  director:     'text-amber-400',
  investigador: 'text-purple-400',
  emprendedor:  'text-emerald-400',
  estudiante:   'text-cyan-400',
  otro:         'text-gray-400',
};

interface SenaOnboardingProps {
  onComplete: (profile: ReturnType<typeof useOnboarding>['profile']) => void;
}

export function SenaOnboarding({ onComplete }: SenaOnboardingProps) {
  const {
    step,
    answers,
    profile,
    isAnimating,
    goToNext,
    selectAnswer,
    finalizeProfile,
    completeOnboarding,
    getCurrentRole,
  } = useOnboarding();

  const [senaState, setSenaState] = useState<'idle' | 'thinking' | 'speaking'>('idle');

  // Simular estado "thinking" al pasar de pregunta
  useEffect(() => {
    if (isAnimating) {
      setSenaState('thinking');
    } else if (step > 0) {
      setSenaState('speaking');
      const t = setTimeout(() => setSenaState('idle'), 1200);
      return () => clearTimeout(t);
    }
  }, [step, isAnimating]);

  // Al llegar al paso 4 (perfil), generar el perfil
  useEffect(() => {
    if (step === 4) {
      finalizeProfile();
    }
  }, [step, finalizeProfile]);

  const role = getCurrentRole();
  const q1Options = pregunta1Options[role] ?? pregunta1Options['otro'];
  const q2Options = pregunta2Options[role] ?? pregunta2Options['otro'];
  const roleResponse = senaResponses[`rol:${answers['rol']}`];

  const handleComplete = () => {
    completeOnboarding();
    onComplete(profile);
  };

  return (
    <div className="min-h-screen bg-[#04080F] bg-gradient-mesh flex items-center justify-center px-4 py-12">
      {/* Fondo con orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {/* PASO 0: Bienvenida */}
          {step === 0 && (
            <motion.div
              key="bienvenida"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <SenaAvatar state="idle" size="xl" />
              </div>

              <h1 className="text-4xl font-black text-[#EFF6FF] mb-3">
                Hola. Soy <span className="text-blue-400">SENA</span>.
              </h1>

              <p className="text-sm text-[#3D6080] font-mono mb-6">
                Sistema de ENseñanza y Alerta
              </p>

              <p className="text-base text-[#7CB3E0] leading-relaxed mb-8 max-w-sm mx-auto">
                Estoy aquí para mostrarte cómo detectamos y prevenimos la
                deserción escolar antes de que sea irreversible.
              </p>

              <p className="text-sm text-[#3D6080] mb-8">
                Antes de empezar, quiero conocer tu contexto para mostrarte
                la información más relevante para ti.
              </p>

              <button
                onClick={goToNext}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(59,130,246,0.35)]"
              >
                Comenzar
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* PASO 1: Rol */}
          {step === 1 && (
            <OnboardingStep
              key="rol"
              titulo="Cuéntame sobre tu rol"
              subtitulo="Personalizo la presentación según tu contexto."
              step={1}
              totalSteps={4}
              senaState={senaState}
            >
              <OnboardingQuestion
                pregunta="¿Cuál es tu perfil principal?"
                opciones={[
                  { valor: 'docente', label: 'Docente o Tutor', descripcion: 'Trabajo directamente con estudiantes en el aula' },
                  { valor: 'director', label: 'Director o Rector', descripcion: 'Gestiono una institución educativa' },
                  { valor: 'investigador', label: 'Investigador o Académico', descripcion: 'Estudio el problema desde la academia' },
                  { valor: 'emprendedor', label: 'Emprendedor o Inversor', descripcion: 'Evalúo soluciones tecnológicas para educación' },
                  { valor: 'estudiante', label: 'Estudiante', descripcion: 'Soy estudiante y quiero entender cómo funciona este sistema' },
                ]}
                selected={answers['rol']}
                onSelect={(v) => selectAnswer('rol', v)}
              />
            </OnboardingStep>
          )}

          {/* Respuesta al rol seleccionado */}
          {step === 1 && answers['rol'] && roleResponse && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-blue-500/8 border border-blue-500/15 text-sm text-blue-300 text-center"
            >
              {roleResponse}
            </motion.div>
          )}

          {/* PASO 2: Pregunta 1 */}
          {step === 2 && (
            <OnboardingStep
              key="pregunta1"
              titulo="Entendiendo tu contexto"
              subtitulo="Una pregunta sobre tu realidad cotidiana."
              step={2}
              totalSteps={4}
              senaState={senaState}
            >
              <OnboardingQuestion
                pregunta="¿Cuál de estas situaciones se acerca más a tu realidad?"
                opciones={q1Options}
                selected={answers['pregunta1']}
                onSelect={(v) => selectAnswer('pregunta1', v)}
              />
            </OnboardingStep>
          )}

          {/* PASO 3: Pregunta 2 */}
          {step === 3 && (
            <OnboardingStep
              key="pregunta2"
              titulo="Casi listo"
              subtitulo="Una última pregunta antes de mostrarte el sistema."
              step={3}
              totalSteps={4}
              senaState={senaState}
            >
              <OnboardingQuestion
                pregunta="¿Qué es lo más importante para ti en una solución como esta?"
                opciones={q2Options}
                selected={answers['pregunta2']}
                onSelect={(v) => selectAnswer('pregunta2', v)}
              />
            </OnboardingStep>
          )}

          {/* PASO 4: Perfil generado */}
          {step === 4 && profile && (
            <motion.div
              key="perfil"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <SenaAvatar state="speaking" size="lg" />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#EFF6FF] mb-2">
                Tu perfil está listo
              </h2>

              {/* Tarjeta de perfil */}
              <div className="bg-[#0C1525] border border-[#1E2E48] rounded-2xl p-5 mb-5 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-xs text-[#3D6080] font-mono">Perfil identificado</p>
                    <p className={cn('text-base font-bold', ROLE_COLORS[profile.role])}>
                      {ROLE_LABELS[profile.role]}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#7CB3E0] leading-relaxed mb-4">
                  {profile.personalizationMessage}
                </p>

                <div className="pt-3 border-t border-[#162035]">
                  <p className="text-xs text-[#3D6080] font-semibold mb-2 uppercase tracking-wide">
                    Lo que voy a destacar para ti
                  </p>
                  <ul className="space-y-1.5">
                    {getHighlights(profile.role).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#7CB3E0]">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-1.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(59,130,246,0.35)]"
              >
                <Sparkles className="w-4 h-4" />
                Explorar el sistema
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Contenedor de paso con barra de progreso ─────────────────
interface OnboardingStepProps {
  titulo: string;
  subtitulo: string;
  step: number;
  totalSteps: number;
  senaState: 'idle' | 'thinking' | 'speaking';
  children: React.ReactNode;
}

function OnboardingStep({
  titulo,
  subtitulo,
  step,
  totalSteps,
  senaState,
  children,
}: OnboardingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
    >
      {/* Progreso */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              i < step ? 'bg-blue-500' : i === step - 1 ? 'bg-blue-400' : 'bg-[#162035]'
            )}
          />
        ))}
        <span className="text-xs font-mono text-[#3D6080] ml-1">
          {step}/{totalSteps}
        </span>
      </div>

      {/* Avatar + texto */}
      <div className="flex items-start gap-4 mb-6">
        <SenaAvatar state={senaState} size="md" className="flex-shrink-0" />
        <div className="pt-1">
          <h2 className="text-lg font-bold text-[#EFF6FF] leading-snug">{titulo}</h2>
          <p className="text-sm text-[#7CB3E0] mt-1">{subtitulo}</p>
        </div>
      </div>

      {children}
    </motion.div>
  );
}

// ─── Highlights por rol ───────────────────────────────────────
function getHighlights(role: UserRole): string[] {
  const map: Record<UserRole, string[]> = {
    docente: [
      'Las alertas que recibirías como docente y cómo actuar',
      'El flujo de comunicación con familias vía WhatsApp',
      'La perspectiva de tu buyer persona equivalente',
    ],
    director: [
      'Las métricas de impacto institucional y el panel directivo',
      'Cómo el sistema estandariza el proceso de intervención',
      'El potencial de reducción de deserción a escala',
    ],
    investigador: [
      'La arquitectura del modelo de IA (Random Forest / XGBoost)',
      'Las variables de entrada y el diseño del pipeline',
      'La metodología de evaluación y validación del modelo',
    ],
    emprendedor: [
      'La propuesta de valor y el diferenciador del mercado',
      'Las métricas de adopción y el modelo de negocio',
      'El potencial de escalabilidad en LATAM',
    ],
    estudiante: [
      'La historia de Carlos Mendoza: un estudiante como tú en riesgo real',
      'Cómo el sistema detecta señales de alerta sin que lo notes',
      'Qué pasa después: quién recibe la alerta y cómo te ayudan',
    ],
    otro: [
      'El problema de la deserción desde una perspectiva humana',
      'Cómo la tecnología puede cambiar el rumbo de un estudiante',
      'El impacto esperado en comunidades educativas',
    ],
  };
  return map[role] ?? map['otro'];
}
