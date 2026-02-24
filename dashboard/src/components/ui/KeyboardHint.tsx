// ============================================================
// ALERTA-ED — KeyboardHint
// Indicador flotante de atajos de teclado disponibles
// Se muestra 3s tras entrar al dashboard, desaparece al usar teclado
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard } from 'lucide-react';

export function KeyboardHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hideTimer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(hideTimer);
  }, [visible]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const navKeys = [
        'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight',
        'PageDown', 'PageUp', '1', '2', '3', '4', '5', '6', '7', '8',
      ];
      if (navKeys.includes(e.key)) {
        setDismissed(true);
        setVisible(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-[#080E1A]/95 backdrop-blur-xl border border-[#1E2E48] rounded-full px-5 py-2 shadow-elevated pointer-events-none"
        >
          <Keyboard className="w-3.5 h-3.5 text-[#3D6080]" />
          <span className="text-[11px] font-mono text-[#3D6080] whitespace-nowrap">
            Flechas para navegar &middot; 1-8 para saltar a sección
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
