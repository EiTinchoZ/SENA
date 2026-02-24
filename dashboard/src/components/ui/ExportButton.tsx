// ============================================================
// ALERTA-ED — ExportButton
// Captura el dashboard completo como PNG usando html2canvas
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';

export function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const html2canvas = (await import('html2canvas')).default;

      // Guardar estado de scroll para restaurar después
      const scrollY = window.scrollY;
      window.scrollTo(0, 0);

      // Ocultar elementos que no deben aparecer en el export
      const hiddenEls: HTMLElement[] = [];
      const selectors = [
        'header',
        '[data-export-hide]',
        '.fixed',
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (el.style.display !== 'none') {
            el.setAttribute('data-prev-display', el.style.display);
            el.style.display = 'none';
            hiddenEls.push(el);
          }
        });
      });

      // Pequeña pausa para que el DOM se estabilice
      await new Promise((r) => setTimeout(r, 150));

      const canvas = await html2canvas(document.body, {
        scrollY: 0,
        useCORS: true,
        scale: 1,
        logging: false,
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
        windowWidth: document.body.scrollWidth,
        windowHeight: document.body.scrollHeight,
      });

      // Restaurar elementos ocultos
      hiddenEls.forEach((el) => {
        const prev = el.getAttribute('data-prev-display') ?? '';
        el.style.display = prev;
        el.removeAttribute('data-prev-display');
      });

      // Restaurar scroll
      window.scrollTo(0, scrollY);

      // Descargar
      const link = document.createElement('a');
      link.download = 'alerta-ed-dashboard.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error al exportar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      data-export-hide
      onClick={handleExport}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#1E2E48] text-[#7CB3E0] hover:text-[#EFF6FF] hover:border-[#2A3F60] hover:bg-white/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Exportar dashboard como PNG"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Download className="w-3.5 h-3.5" />
      )}
      {loading ? 'Exportando...' : 'Exportar'}
    </motion.button>
  );
}
