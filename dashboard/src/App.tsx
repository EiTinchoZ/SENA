// ============================================================
// ALERTA-ED — App.tsx
// Raíz de la aplicación: onboarding SENA → dashboard completo
// ============================================================

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Onboarding
import { SenaOnboarding } from '@/components/onboarding/SenaOnboarding';

// Layout
import { Navigation } from '@/components/layout/Navigation';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

// Secciones
import { Hero }          from '@/components/sections/Hero';
import { Problema }      from '@/components/sections/Problema';
import { Solucion }      from '@/components/sections/Solucion';
import { Fricciones }    from '@/components/sections/Fricciones';
import { BuyerPersonas } from '@/components/sections/BuyerPersonas';
import { Escenarios }    from '@/components/sections/Escenarios';
import { Impacto }       from '@/components/sections/Impacto';
import { Reflexion }     from '@/components/sections/Reflexion';

// Admin panel + contexto
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { AdminPanel }              from '@/components/admin/AdminPanel';
import { AdminToggle }             from '@/components/admin/AdminToggle';

// Utilitarios del backlog
import { KeyboardHint }          from '@/components/ui/KeyboardHint';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

import type { SenaProfile } from '@/types';

type Theme = 'dark' | 'light';

// ─── Dashboard envuelto en AdminProvider ─────────────────────
function DashboardContent({ profile }: { profile: SenaProfile | null }) {
  const [adminOpen, setAdminOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const { hasChanges } = useAdmin();

  // Aplicar clase light-mode al elemento <html>
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    return () => { document.documentElement.classList.remove('light-mode'); };
  }, [theme]);

  // Navegación por teclado (flechas + 1-8)
  useKeyboardNavigation();

  return (
    <>
      <ScrollProgress />
      <Navigation
        profile={profile}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      <main>
        <Hero          profile={profile} />
        <Problema      />
        <Solucion      />
        <Fricciones    />
        <BuyerPersonas profile={profile} />
        <Escenarios    />
        <Impacto       />
        <Reflexion     />
      </main>

      {/* Panel de administración */}
      <AdminPanel open={adminOpen} />
      <AdminToggle
        open={adminOpen}
        onToggle={() => setAdminOpen((v) => !v)}
        hasChanges={hasChanges}
      />

      {/* Hint de navegación por teclado */}
      <KeyboardHint />
    </>
  );
}

// ─── App principal ────────────────────────────────────────────
export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [profile, setProfile] = useState<SenaProfile | null>(null);

  const handleOnboardingComplete = (completedProfile: SenaProfile | null) => {
    setProfile(completedProfile);
    setTimeout(() => setShowDashboard(true), 200);
  };

  return (
    <div className="min-h-screen bg-[#04080F] text-[#EFF6FF]">
      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <SenaOnboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AdminProvider>
              <DashboardContent profile={profile} />
            </AdminProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
