// ============================================================
// ALERTA-ED — AdminContext
// Estado global editable del contenido del dashboard.
// Inicializa desde localStorage (si existe), luego desde datos
// estáticos. Todas las secciones leen desde aquí para permitir
// edición en vivo desde el panel de administración.
// ============================================================

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { proyectoData } from '@/data/project';
import { personas as defaultPersonas } from '@/data/personas';
import { friccionesData as defaultFricciones } from '@/data/fricciones';
import type { ProyectoData, PersonaData, FriccionActor } from '@/types';

const STORAGE_KEY = 'alertaed-admin-v1';

// ─── Hero metrics (números del RiskPanel) ────────────────────
export interface HeroMetrics {
  riskDanger: number;
  riskWarning: number;
  riskSafe: number;
}

// ─── Contenido editable completo ─────────────────────────────
export interface AdminContent {
  proyecto: ProyectoData;
  personas: PersonaData[];
  fricciones: FriccionActor[];
  hero: HeroMetrics;
}

interface AdminContextValue {
  content: AdminContent;
  setProyecto: (updates: Partial<ProyectoData>) => void;
  setPersona: (idx: number, updates: Partial<PersonaData>) => void;
  setFricciones: (data: FriccionActor[]) => void;
  setHero: (updates: Partial<HeroMetrics>) => void;
  resetAll: () => void;
  hasChanges: boolean;
}

// ─── Defaults ────────────────────────────────────────────────
function getDefaults(): AdminContent {
  return {
    proyecto: { ...proyectoData },
    personas: defaultPersonas.map((p) => ({ ...p })),
    fricciones: defaultFricciones.map((f) => ({
      ...f,
      fricciones: f.fricciones.map((fi) => ({ ...fi })),
    })),
    hero: { riskDanger: 23, riskWarning: 147, riskSafe: 89 },
  };
}

function loadFromStorage(): AdminContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminContent;
  } catch {
    return null;
  }
}

function saveToStorage(content: AdminContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // localStorage no disponible (incógnito sin permisos)
  }
}

// ─── Context ─────────────────────────────────────────────────
const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AdminContent>(() => {
    return loadFromStorage() ?? getDefaults();
  });
  const [hasChanges, setHasChanges] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  });

  // Persistir en localStorage cada vez que cambia el contenido
  useEffect(() => {
    saveToStorage(content);
  }, [content]);

  const setProyecto = useCallback((updates: Partial<ProyectoData>) => {
    setContent((prev) => ({
      ...prev,
      proyecto: { ...prev.proyecto, ...updates },
    }));
    setHasChanges(true);
  }, []);

  const setPersona = useCallback((idx: number, updates: Partial<PersonaData>) => {
    setContent((prev) => {
      const personas = [...prev.personas];
      personas[idx] = { ...personas[idx], ...updates };
      return { ...prev, personas };
    });
    setHasChanges(true);
  }, []);

  const setFricciones = useCallback((data: FriccionActor[]) => {
    setContent((prev) => ({ ...prev, fricciones: data }));
    setHasChanges(true);
  }, []);

  const setHero = useCallback((updates: Partial<HeroMetrics>) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...updates },
    }));
    setHasChanges(true);
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(getDefaults());
    setHasChanges(false);
  }, []);

  return (
    <AdminContext.Provider value={{ content, setProyecto, setPersona, setFricciones, setHero, resetAll, hasChanges }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin debe usarse dentro de <AdminProvider>');
  return ctx;
}
