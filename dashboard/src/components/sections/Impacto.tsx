// ============================================================
// ALERTA-ED — Impacto Section
// Métricas propuestas + beneficios por actor
// ============================================================

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Clock, MessageSquare, ShieldCheck, Bell, Target, Building2, School, BookOpen, GraduationCap, Heart } from 'lucide-react';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { useAdmin } from '@/context/AdminContext';
import { signalToTextColor, signalToBgMuted, signalToBorder, cn } from '@/lib/utils';

const METRIC_ICONS = {
  m1: TrendingUp,
  m2: Clock,
  m3: MessageSquare,
  m4: ShieldCheck,
  m5: Bell,
  m6: Target,
};

const CLIENTE_ICONS = {
  c1: Building2,
  c2: School,
  c3: BookOpen,
  c4: GraduationCap,
  c5: Heart,
};

const CLIENTE_CONFIG = {
  publico: {
    border: 'border-blue-500/20',
    hover: 'hover:border-blue-400/45 hover:bg-[#0F1A2E]',
    icon: 'bg-blue-500/14 border-blue-500/25',
    text: 'text-blue-200',
    label: 'Público',
  },
  privado: {
    border: 'border-indigo-500/20',
    hover: 'hover:border-indigo-400/45 hover:bg-[#101631]',
    icon: 'bg-indigo-500/14 border-indigo-500/25',
    text: 'text-indigo-200',
    label: 'Privado',
  },
  mixto: {
    border: 'border-amber-500/20',
    hover: 'hover:border-amber-400/45 hover:bg-[#17130D]',
    icon: 'bg-amber-500/14 border-amber-500/25',
    text: 'text-amber-200',
    label: 'Mixto',
  },
  ngo: {
    border: 'border-emerald-500/20',
    hover: 'hover:border-emerald-400/45 hover:bg-[#0D1D18]',
    icon: 'bg-emerald-500/14 border-emerald-500/25',
    text: 'text-emerald-200',
    label: 'ONG',
  },
};

const BENEFICIOS = [
  {
    actor: 'Para el docente',
    items: [
      'Alerta temprana automática sin trabajo adicional',
      'Panel de su aula con estado de cada estudiante',
      'Protocolo de acción claro ante cada nivel de riesgo',
    ],
  },
  {
    actor: 'Para el director',
    items: [
      'Vista institucional en tiempo real',
      'Reportes automáticos para organismos reguladores',
      'Evidencia de gestión preventiva medible',
    ],
  },
  {
    actor: 'Para la familia',
    items: [
      'Comunicación proactiva antes de que sea tarde',
      'Mensajes simples y orientación práctica',
      'Canal directo con la institución sin trámites',
    ],
  },
  {
    actor: 'Para la institución',
    items: [
      'Proceso de intervención estandarizado y trazable',
      'Reducción proyectada del abandono escolar',
      'Datos para fundamentar políticas internas',
    ],
  },
];

export function Impacto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const { content } = useAdmin();
  const { metricas } = content.proyecto;

  return (
    <SectionWrapper id="impacto" className="bg-[#080E1A]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2E48] to-transparent" />

      <SectionHeader
        eyebrow="Impacto esperado"
        titulo="Métricas que importan"
        subtitulo="Indicadores propuestos para medir el éxito del sistema. Basados en la literatura de intervención educativa preventiva."
      />

      {/* Nota de disclaimer */}
      <div className="mb-8 inline-flex items-center gap-2 bg-amber-500/8 border border-amber-500/20 rounded-full px-4 py-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span className="text-xs font-medium text-amber-400">
          Todas las métricas son propuestas. No representan datos reales validados.
        </span>
      </div>

      {/* Grid de métricas */}
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {metricas.map((metrica, idx) => {
          const Icon = METRIC_ICONS[metrica.id as keyof typeof METRIC_ICONS] ?? TrendingUp;
          return (
            <motion.div
              key={metrica.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={cn(
                'group rounded-xl border p-5 transition-all duration-200 hover:bg-[#111D30]',
                'bg-[#0C1525]',
                signalToBorder(metrica.signal)
              )}
            >
              {/* Icono */}
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center mb-4 border',
                signalToBgMuted(metrica.signal),
                signalToBorder(metrica.signal)
              )}>
                <Icon className={cn('w-4 h-4', signalToTextColor(metrica.signal))} />
              </div>

              {/* Valor */}
              <div className={cn('text-3xl font-black font-mono mb-1', signalToTextColor(metrica.signal))}>
                {metrica.valor}
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-[#EFF6FF] mb-2 leading-snug">
                {metrica.label}
              </p>

              {/* Descripción */}
              <p className="text-xs text-[#3D6080] leading-relaxed">
                {metrica.descripcion}
              </p>

              {/* Badge propuesto */}
              <div className="mt-3 pt-3 border-t border-[#162035]">
                <span className="text-[10px] font-mono text-[#3D6080]">Métrica propuesta</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Beneficios por actor */}
      <div>
        <h3 className="text-lg font-bold text-[#EFF6FF] mb-6">Beneficios concretos por actor</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFICIOS.map((grupo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
              className="bg-[#0C1525] border border-[#1E2E48] rounded-xl p-4"
            >
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                {grupo.actor}
              </p>
              <ul className="space-y-2">
                {grupo.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-[#7CB3E0] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mercado potencial — clientes objetivo */}
      {content.proyecto.clientesObjetivo && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-12 pt-10 border-t border-[#162035]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-[#EFF6FF]">Mercado potencial</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {content.proyecto.clientesObjetivo.map((cliente, idx) => {
              const Icon = CLIENTE_ICONS[cliente.id as keyof typeof CLIENTE_ICONS] ?? Building2;
              const config = CLIENTE_CONFIG[cliente.tipo];
              return (
                <motion.div
                  key={cliente.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + idx * 0.07, duration: 0.35 }}
                  className={cn(
                    'group rounded-xl border p-4 transition-all duration-200 bg-[#0C1525] hover:-translate-y-0.5',
                    config.border,
                    config.hover
                  )}
                >
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-3 border', config.icon)}>
                    <Icon className={cn('w-3.5 h-3.5', config.text)} />
                  </div>
                  <p className={cn('text-[10px] font-semibold uppercase tracking-wider mb-2', config.text)}>
                    {config.label}
                  </p>
                  <p className={cn('text-sm font-bold mb-1.5 leading-snug', config.text)}>
                    {cliente.nombre}
                  </p>
                  <p className="text-[13px] text-[#9BC2DF] leading-relaxed">{cliente.descripcion}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
