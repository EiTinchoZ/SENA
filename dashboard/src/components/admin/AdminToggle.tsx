// ============================================================
// ALERTA-ED — AdminToggle
// Botón flotante para abrir/cerrar el panel de administración
// ============================================================

import { motion } from 'framer-motion';
import { Settings, X } from 'lucide-react';

interface AdminToggleProps {
  open: boolean;
  onToggle: () => void;
  hasChanges: boolean;
}

export function AdminToggle({ open, onToggle, hasChanges }: AdminToggleProps) {
  return (
    <motion.button
      data-export-hide
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#0C1525] border border-[#2A3F60] text-[#7CB3E0] hover:text-[#EFF6FF] hover:bg-[#111D30] shadow-elevated flex items-center justify-center transition-colors duration-200"
      title={open ? 'Cerrar panel de administración' : 'Abrir panel de administración'}
    >
      {open ? (
        <X className="w-4 h-4" />
      ) : (
        <>
          <Settings className="w-4 h-4" />
          {hasChanges && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </>
      )}
    </motion.button>
  );
}
