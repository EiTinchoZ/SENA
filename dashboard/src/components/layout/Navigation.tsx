// ============================================================
// ALERTA-ED — Navigation
// Barra de navegación fija con scroll spy y perfil de SENA
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { scrollToSection, cn } from '@/lib/utils';
import type { SenaProfile } from '@/types';

const NAV_ITEMS = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'problema',    label: 'Problema' },
  { id: 'solucion',    label: 'Solución' },
  { id: 'fricciones',  label: 'Fricciones' },
  { id: 'personas',    label: 'Personas' },
  { id: 'escenarios',  label: 'Escenarios' },
  { id: 'impacto',     label: 'Impacto' },
  { id: 'reflexion',   label: 'Reflexión' },
];

const ROLE_LABELS: Record<string, string> = {
  docente:      'Vista: Docente',
  director:     'Vista: Director',
  investigador: 'Vista: Investigador',
  emprendedor:  'Vista: Emprendedor',
  otro:         'Vista: General',
};

interface NavigationProps {
  profile: SenaProfile | null;
}

export function Navigation({ profile }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = NAV_ITEMS.map((i) => i.id);
  const activeSection = useScrollSpy(sectionIds);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-2 left-0 right-0 z-50 px-4">
        <nav className="max-w-7xl mx-auto bg-[#080E1A]/90 backdrop-blur-xl border border-[#1E2E48] rounded-2xl px-5 py-3 flex items-center justify-between shadow-elevated">
          {/* Logo */}
          <button
            onClick={() => handleNav('inicio')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors">
              <AlertTriangle className="w-3.5 h-3.5 text-blue-400" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-[#EFF6FF] tracking-tight">
              ALERTA<span className="text-blue-400">-ED</span>
            </span>
          </button>

          {/* Links — desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                  activeSection === item.id
                    ? 'bg-blue-500/15 text-blue-400'
                    : 'text-[#7CB3E0] hover:text-[#EFF6FF] hover:bg-white/5'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Perfil de SENA + menú mobile */}
          <div className="flex items-center gap-3">
            {profile && (
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-[#3D6080] bg-[#111D30] border border-[#1E2E48] rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {ROLE_LABELS[profile.role] ?? 'Vista: General'}
              </span>
            )}

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#7CB3E0] hover:text-[#EFF6FF] hover:bg-white/5 transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Menú mobile */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#080E1A]/95 backdrop-blur-xl border border-[#1E2E48] rounded-2xl p-3 shadow-elevated"
            >
              <div className="grid grid-cols-2 gap-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={cn(
                      'px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200',
                      activeSection === item.id
                        ? 'bg-blue-500/15 text-blue-400'
                        : 'text-[#7CB3E0] hover:text-[#EFF6FF] hover:bg-white/5'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
