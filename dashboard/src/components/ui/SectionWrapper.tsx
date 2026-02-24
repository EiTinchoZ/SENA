// ============================================================
// ALERTA-ED — SectionWrapper
// Contenedor estándar para todas las secciones del dashboard
// ============================================================

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  noPaddingTop?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  innerClassName,
  noPaddingTop = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'relative',
        noPaddingTop ? 'pb-24 lg:pb-32' : 'py-24 lg:py-32',
        className
      )}
    >
      <div className={cn('max-w-7xl mx-auto px-6 lg:px-8', innerClassName)}>
        {children}
      </div>
    </motion.section>
  );
}

// ─── Encabezado estándar de sección ──────────────────────────
interface SectionHeaderProps {
  eyebrow?: string;
  titulo: string;
  subtitulo?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  titulo,
  subtitulo,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        centered && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold text-[#EFF6FF] leading-tight">
        {titulo}
      </h2>
      {subtitulo && (
        <p className="mt-4 text-base lg:text-lg text-[#7CB3E0] max-w-2xl leading-relaxed">
          {subtitulo}
        </p>
      )}
    </div>
  );
}
