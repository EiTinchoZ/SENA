// ============================================================
// ALERTA-ED — App.tsx
// Raíz de la aplicación: onboarding SENA → dashboard completo
// ============================================================

import { useState } from 'react';
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

import type { SenaProfile } from '@/types';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [profile, setProfile] = useState<SenaProfile | null>(null);

  const handleOnboardingComplete = (completedProfile: SenaProfile | null) => {
    setProfile(completedProfile);
    // Pequeña pausa antes de mostrar el dashboard para la transición
    setTimeout(() => setShowDashboard(true), 200);
  };

  return (
    <div className="min-h-screen bg-[#04080F] text-[#EFF6FF]">
      <AnimatePresence mode="wait">
        {!showDashboard ? (
          // ── Onboarding SENA ──────────────────────────────────────
          <motion.div
            key="onboarding"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <SenaOnboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          // ── Dashboard principal ──────────────────────────────────
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <Navigation profile={profile} />

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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
