// ============================================================
// ALERTA-ED — useKeyboardNavigation
// Navegar entre secciones con teclado (flechas + teclas 1-8)
// ============================================================

import { useEffect } from 'react';
import { scrollToSection } from '@/lib/utils';

const SECTION_IDS = [
  'inicio',
  'problema',
  'solucion',
  'fricciones',
  'personas',
  'escenarios',
  'impacto',
  'reflexion',
];

function getCurrentSectionIndex(): number {
  const scrollY = window.scrollY + 81;
  for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTION_IDS[i]);
    if (el && el.offsetTop <= scrollY) return i;
  }
  return 0;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!target) return false;
  const el = target as HTMLElement;
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT' ||
    el.contentEditable === 'true'
  );
}

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        const idx = getCurrentSectionIndex();
        if (idx < SECTION_IDS.length - 1) scrollToSection(SECTION_IDS[idx + 1]);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        const idx = getCurrentSectionIndex();
        if (idx > 0) scrollToSection(SECTION_IDS[idx - 1]);
      } else if (e.key >= '1' && e.key <= '8') {
        const idx = parseInt(e.key) - 1;
        e.preventDefault();
        scrollToSection(SECTION_IDS[idx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
