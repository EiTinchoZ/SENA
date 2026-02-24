// ============================================================
// ALERTA-ED — Hero Section
// Layout "Mission Control": panel izquierdo + panel derecho
// ============================================================

import { motion } from 'framer-motion';
import { ChevronRight, Cpu, Bell, MessageSquare } from 'lucide-react';
import { RiskPanel } from '@/components/ui/RiskSignal';
import { AlertTimeline } from '@/components/ui/AlertTimeline';
import { scrollToSection } from '@/lib/utils';
import type { SenaProfile } from '@/types';

const PASOS = [
  {
    icon: Cpu,
    numero: '01',
    titulo: 'Recolección y análisis',
    descripcion: 'Asistencia, calificaciones y variables socioeconómicas.',
  },
  {
    icon: Bell,
    numero: '02',
    titulo: 'Predicción con IA',
    descripcion: 'Random Forest / XGBoost clasifica el riesgo individual.',
  },
  {
    icon: MessageSquare,
    numero: '03',
    titulo: 'Intervención preventiva',
    descripcion: 'Alertas a docentes + nudging a familias por WhatsApp.',
  },
];

interface HeroProps {
  profile: SenaProfile | null;
}

export function Hero({ profile }: HeroProps) {
  const personalizedGreeting = profile
    ? getPersonalizedGreeting(profile)
    : null;

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Fondo con gradiente mesh */}
      <div className="absolute inset-0 bg-[#04080F]">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        {/* Orbs decorativos */}
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Label personalizado de SENA */}
        {personalizedGreeting && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-medium text-blue-300">{personalizedGreeting}</span>
          </motion.div>
        )}

        {/* Grid principal: 60/40 */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Panel izquierdo (60%) — Mission Briefing */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 bg-[#0C1525] border border-[#1E2E48] rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-[#3D6080]">SISTEMA ACTIVO</span>
                </div>
                <span className="text-[11px] font-mono text-[#3D6080]">v1.0 — Piloto</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl lg:text-6xl font-black text-[#EFF6FF] leading-[1.05] tracking-tight mb-6">
                Detectamos el{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    riesgo
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-500/50 to-indigo-500/50" />
                </span>
                <br />
                antes de que
                <br />
                sea tarde.
              </h1>

              {/* Propuesta de valor */}
              <p className="text-lg text-[#7CB3E0] leading-relaxed mb-8 max-w-xl">
                Plataforma de IA que identifica estudiantes en riesgo de
                deserción usando asistencia, calificaciones y variables
                socioeconómicas, y activa intervenciones preventivas
                personalizadas.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  onClick={() => scrollToSection('solucion')}
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-glow-blue"
                >
                  Ver la solución
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('personas')}
                  className="inline-flex items-center gap-2 border border-[#1E2E48] hover:border-[#2A3F60] text-[#7CB3E0] hover:text-[#EFF6FF] px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                >
                  Conocer los usuarios
                </button>
              </div>

              {/* 3 pasos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PASOS.map((paso, idx) => (
                  <motion.div
                    key={paso.numero}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                    className="bg-[#0C1525] border border-[#1E2E48] rounded-xl p-4 hover:border-[#2A3F60] hover:bg-[#111D30] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-[#3D6080]">{paso.numero}</span>
                      <paso.icon className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <p className="text-xs font-semibold text-[#EFF6FF] mb-1 leading-snug">{paso.titulo}</p>
                    <p className="text-[11px] text-[#3D6080] leading-relaxed">{paso.descripcion}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Panel derecho (40%) — Risk Monitor + Timeline */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-[#080E1A] border border-[#1E2E48] rounded-2xl p-5"
            >
              <RiskPanel />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="bg-[#080E1A] border border-[#1E2E48] rounded-2xl p-5"
            >
              <AlertTimeline />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getPersonalizedGreeting(profile: SenaProfile): string {
  const map: Record<string, string> = {
    docente:      'Vista docente activa — José Rodríguez es tu perfil de referencia',
    director:     'Vista directiva activa — Marta González es tu perfil de referencia',
    investigador: 'Vista investigador activa — datos completos del modelo habilitados',
    emprendedor:  'Vista emprendedor activa — mercado y diferenciación destacados',
    otro:         'Vista estudiante activa — Carlos Mendoza es tu perfil de referencia',
  };
  return map[profile.role] ?? 'Bienvenido a ALERTA-ED';
}
