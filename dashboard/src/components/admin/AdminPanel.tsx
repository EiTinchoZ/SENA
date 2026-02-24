// ============================================================
// ALERTA-ED — AdminPanel
// Drawer lateral derecho con tabs para editar todo el contenido
// del dashboard sin tocar código. Cambios en tiempo real.
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import type { FriccionItem } from '@/types';

type Tab = 'general' | 'hero' | 'metricas' | 'personas' | 'solucion' | 'problema' | 'fricciones' | 'reflexion';

const TABS: { id: Tab; label: string }[] = [
  { id: 'general',    label: 'General' },
  { id: 'hero',       label: 'Hero' },
  { id: 'metricas',   label: 'Métricas' },
  { id: 'personas',   label: 'Personas' },
  { id: 'solucion',   label: 'Solución' },
  { id: 'problema',   label: 'Problema' },
  { id: 'fricciones', label: 'Fricciones' },
  { id: 'reflexion',  label: 'Reflexión' },
];

// ─── Helpers de UI ───────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-semibold text-[#3D6080] uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full bg-[#080E1A] border border-[#1E2E48] rounded-lg px-3 py-2 text-sm text-[#EFF6FF] placeholder-[#3D6080] focus:outline-none focus:border-blue-500/50 transition-colors resize-none';

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} rows={3} className={inputCls} />;
}

// ─── Tabs de contenido ───────────────────────────────────────
function TabGeneral() {
  const { content, setProyecto } = useAdmin();
  const p = content.proyecto;
  return (
    <div className="space-y-4">
      <Field label="Nombre del proyecto">
        <Input value={p.nombre} onChange={(e) => setProyecto({ nombre: e.target.value })} />
      </Field>
      <Field label="Subtítulo">
        <Input value={p.subtitulo} onChange={(e) => setProyecto({ subtitulo: e.target.value })} />
      </Field>
      <Field label="Propuesta de valor">
        <Textarea
          rows={5}
          value={p.propuestaDeValor}
          onChange={(e) => setProyecto({ propuestaDeValor: e.target.value })}
        />
      </Field>
    </div>
  );
}

function TabHero() {
  const { content, setHero } = useAdmin();
  const h = content.hero;
  return (
    <div className="space-y-4">
      <p className="text-xs text-[#3D6080] leading-relaxed">
        Estos son los valores iniciales del monitor de riesgo. El panel los anima en tiempo real con variaciones pequeñas.
      </p>
      <Field label="Estudiantes en riesgo alto (rojo)">
        <Input
          type="number"
          min={0}
          max={999}
          value={h.riskDanger}
          onChange={(e) => setHero({ riskDanger: parseInt(e.target.value) || 0 })}
        />
      </Field>
      <Field label="Estudiantes en riesgo medio (ámbar)">
        <Input
          type="number"
          min={0}
          max={999}
          value={h.riskWarning}
          onChange={(e) => setHero({ riskWarning: parseInt(e.target.value) || 0 })}
        />
      </Field>
      <Field label="Estudiantes en seguimiento (verde)">
        <Input
          type="number"
          min={0}
          max={999}
          value={h.riskSafe}
          onChange={(e) => setHero({ riskSafe: parseInt(e.target.value) || 0 })}
        />
      </Field>
    </div>
  );
}

function TabMetricas() {
  const { content, setProyecto } = useAdmin();
  const metricas = content.proyecto.metricas;

  const updateMetrica = (idx: number, field: 'label' | 'valor' | 'descripcion', value: string) => {
    const updated = metricas.map((m, i) => (i === idx ? { ...m, [field]: value } : m));
    setProyecto({ metricas: updated });
  };

  return (
    <div className="space-y-5">
      {metricas.map((m, idx) => (
        <div key={m.id} className="bg-[#080E1A] border border-[#162035] rounded-xl p-3 space-y-3">
          <p className="text-[10px] font-mono text-[#3D6080]">Métrica {idx + 1}</p>
          <Field label="Etiqueta">
            <Input value={m.label} onChange={(e) => updateMetrica(idx, 'label', e.target.value)} />
          </Field>
          <Field label="Valor">
            <Input value={m.valor} onChange={(e) => updateMetrica(idx, 'valor', e.target.value)} placeholder="ej: 85%+" />
          </Field>
          <Field label="Descripción">
            <Textarea rows={2} value={m.descripcion} onChange={(e) => updateMetrica(idx, 'descripcion', e.target.value)} />
          </Field>
        </div>
      ))}
    </div>
  );
}

function TabPersonas() {
  const { content, setPersona } = useAdmin();
  const [activePIdx, setActivePIdx] = useState(0);
  const p = content.personas[activePIdx];

  const arrayToText = (arr: string[]) => arr.join('\n');
  const textToArray = (text: string) =>
    text.split('\n').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Selector de persona */}
      <div className="flex gap-2">
        {content.personas.map((per, i) => (
          <button
            key={per.id}
            onClick={() => setActivePIdx(i)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activePIdx === i
                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                : 'bg-[#080E1A] text-[#3D6080] border border-[#1E2E48] hover:text-[#7CB3E0]'
            }`}
          >
            {per.nombre.split(' ')[0]}
          </button>
        ))}
      </div>

      <Field label="Nombre completo">
        <Input value={p.nombre} onChange={(e) => setPersona(activePIdx, { nombre: e.target.value })} />
      </Field>
      <Field label="Cargo / Rol">
        <Input value={p.cargo} onChange={(e) => setPersona(activePIdx, { cargo: e.target.value })} />
      </Field>
      <Field label="Edad">
        <Input type="number" min={15} max={80} value={p.edad} onChange={(e) => setPersona(activePIdx, { edad: parseInt(e.target.value) || p.edad })} />
      </Field>
      <Field label="Tagline (frase que la define)">
        <Textarea rows={2} value={p.tagline} onChange={(e) => setPersona(activePIdx, { tagline: e.target.value })} />
      </Field>
      <Field label="Narrativa">
        <Textarea rows={6} value={p.narrativa} onChange={(e) => setPersona(activePIdx, { narrativa: e.target.value })} />
      </Field>
      <Field label="Necesidades (una por línea)">
        <Textarea
          rows={4}
          value={arrayToText(p.necesidades)}
          onChange={(e) => setPersona(activePIdx, { necesidades: textToArray(e.target.value) })}
        />
      </Field>
      <Field label="Frustraciones (una por línea)">
        <Textarea
          rows={4}
          value={arrayToText(p.frustraciones)}
          onChange={(e) => setPersona(activePIdx, { frustraciones: textToArray(e.target.value) })}
        />
      </Field>
      <Field label="Momento de fricción: situación">
        <Textarea rows={2} value={p.momentoFriccion.situacion} onChange={(e) => setPersona(activePIdx, { momentoFriccion: { ...p.momentoFriccion, situacion: e.target.value } })} />
      </Field>
      <Field label="Cómo ayuda el sistema">
        <Textarea rows={3} value={p.comoAyudaElSistema} onChange={(e) => setPersona(activePIdx, { comoAyudaElSistema: e.target.value })} />
      </Field>
    </div>
  );
}

function TabSolucion() {
  const { content, setProyecto } = useAdmin();
  const flujo = content.proyecto.flujoSolucion;
  const difer = content.proyecto.diferenciacion ?? [];

  const updateFlujo = (idx: number, field: 'etiqueta' | 'descripcion', value: string) => {
    const updated = flujo.map((f, i) => (i === idx ? { ...f, [field]: value } : f));
    setProyecto({ flujoSolucion: updated });
  };

  const updateDifer = (idx: number, field: 'titulo' | 'descripcion', value: string) => {
    const updated = difer.map((d, i) => (i === idx ? { ...d, [field]: value } : d));
    setProyecto({ diferenciacion: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-[#7CB3E0] mb-3">Fases del flujo</p>
        <div className="space-y-4">
          {flujo.map((paso, idx) => (
            <div key={paso.id} className="bg-[#080E1A] border border-[#162035] rounded-xl p-3 space-y-2">
              <p className="text-[10px] font-mono text-[#3D6080]">Fase {idx + 1}</p>
              <Field label="Etiqueta">
                <Input value={paso.etiqueta} onChange={(e) => updateFlujo(idx, 'etiqueta', e.target.value)} />
              </Field>
              <Field label="Descripción">
                <Textarea rows={2} value={paso.descripcion} onChange={(e) => updateFlujo(idx, 'descripcion', e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>

      {difer.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#7CB3E0] mb-3">Diferenciadores competitivos</p>
          <div className="space-y-4">
            {difer.map((item, idx) => (
              <div key={item.id} className="bg-[#080E1A] border border-[#162035] rounded-xl p-3 space-y-2">
                <p className="text-[10px] font-mono text-[#3D6080]">Diferenciador {idx + 1}</p>
                <Field label="Título">
                  <Input value={item.titulo} onChange={(e) => updateDifer(idx, 'titulo', e.target.value)} />
                </Field>
                <Field label="Descripción">
                  <Textarea rows={2} value={item.descripcion} onChange={(e) => updateDifer(idx, 'descripcion', e.target.value)} />
                </Field>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabProblema() {
  const { content, setProyecto } = useAdmin();
  const ops = content.proyecto.oportunidades;
  const cons = content.proyecto.consecuenciasNegativas ?? [];

  const updateOp = (idx: number, field: 'causa' | 'impacto', value: string) => {
    const updated = ops.map((o, i) => (i === idx ? { ...o, [field]: value } : o));
    setProyecto({ oportunidades: updated });
  };

  const updateCons = (idx: number, value: string) => {
    const updated = cons.map((c, i) => (i === idx ? value : c));
    setProyecto({ consecuenciasNegativas: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-[#7CB3E0] mb-3">Mapa de oportunidades</p>
        <div className="space-y-4">
          {ops.map((op, idx) => (
            <div key={op.id} className="bg-[#080E1A] border border-[#162035] rounded-xl p-3 space-y-2">
              <p className="text-[10px] font-mono text-[#3D6080] uppercase tracking-wider">{op.nivel}</p>
              <Field label="Causa">
                <Textarea rows={2} value={op.causa} onChange={(e) => updateOp(idx, 'causa', e.target.value)} />
              </Field>
              <Field label="Impacto">
                <Textarea rows={2} value={op.impacto} onChange={(e) => updateOp(idx, 'impacto', e.target.value)} />
              </Field>
            </div>
          ))}
        </div>
      </div>

      {cons.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#7CB3E0] mb-3">Consecuencias negativas (si no actuamos)</p>
          <div className="space-y-3">
            {cons.map((c, idx) => (
              <Field key={idx} label={`Consecuencia ${idx + 1}`}>
                <Textarea rows={2} value={c} onChange={(e) => updateCons(idx, e.target.value)} />
              </Field>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabFricciones() {
  const { content, setFricciones } = useAdmin();
  const [activeAIdx, setActiveAIdx] = useState(0);
  const actor = content.fricciones[activeAIdx];

  const updateFriccion = (fIdx: number, field: keyof FriccionItem, value: string) => {
    const updated = content.fricciones.map((a, aIdx) => {
      if (aIdx !== activeAIdx) return a;
      return {
        ...a,
        fricciones: a.fricciones.map((f, fi) =>
          fi === fIdx ? { ...f, [field]: value } : f
        ),
      };
    });
    setFricciones(updated);
  };

  const updateActorDesc = (value: string) => {
    const updated = content.fricciones.map((a, i) =>
      i === activeAIdx ? { ...a, descripcion: value } : a
    );
    setFricciones(updated);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {content.fricciones.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setActiveAIdx(i)}
            className={`py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeAIdx === i
                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                : 'bg-[#080E1A] text-[#3D6080] border border-[#1E2E48] hover:text-[#7CB3E0]'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <Field label="Descripción del actor">
        <Textarea rows={3} value={actor.descripcion} onChange={(e) => updateActorDesc(e.target.value)} />
      </Field>

      <p className="text-xs font-semibold text-[#7CB3E0]">Fricciones</p>
      <div className="space-y-4">
        {actor.fricciones.map((f, fIdx) => (
          <div key={fIdx} className="bg-[#080E1A] border border-[#162035] rounded-xl p-3 space-y-2">
            <Field label="Título">
              <Input value={f.titulo} onChange={(e) => updateFriccion(fIdx, 'titulo', e.target.value)} />
            </Field>
            <Field label="Descripción">
              <Textarea rows={2} value={f.descripcion} onChange={(e) => updateFriccion(fIdx, 'descripcion', e.target.value)} />
            </Field>
            <Field label="Impacto">
              <select
                value={f.impacto}
                onChange={(e) => updateFriccion(fIdx, 'impacto', e.target.value)}
                className={inputCls}
              >
                <option value="alto">Alto</option>
                <option value="medio">Medio</option>
                <option value="bajo">Bajo</option>
              </select>
            </Field>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabReflexion() {
  const { content, setProyecto } = useAdmin();
  const r = content.proyecto.reflexion;

  const arrayToText = (arr: string[]) => arr.join('\n');
  const textToArray = (text: string) => text.split('\n').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-4">
      <Field label="Lo que aporta la IA (una por línea)">
        <Textarea
          rows={6}
          value={arrayToText(r.iaAporta)}
          onChange={(e) => setProyecto({ reflexion: { ...r, iaAporta: textToArray(e.target.value) } })}
        />
      </Field>
      <Field label="Lo que aporta el humano (una por línea)">
        <Textarea
          rows={6}
          value={arrayToText(r.humanoAporta)}
          onChange={(e) => setProyecto({ reflexion: { ...r, humanoAporta: textToArray(e.target.value) } })}
        />
      </Field>
      <Field label="Conclusión">
        <Textarea
          rows={5}
          value={r.conclusion}
          onChange={(e) => setProyecto({ reflexion: { ...r, conclusion: e.target.value } })}
        />
      </Field>
      <Field label="Razón de persona más viable">
        <Textarea
          rows={4}
          value={r.personaMasViable.razon}
          onChange={(e) =>
            setProyecto({ reflexion: { ...r, personaMasViable: { ...r.personaMasViable, razon: e.target.value } } })
          }
        />
      </Field>
    </div>
  );
}

// ─── Panel principal ──────────────────────────────────────────
interface AdminPanelProps {
  open: boolean;
}

export function AdminPanel({ open }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const { resetAll, hasChanges } = useAdmin();

  const tabContent: Record<Tab, React.ReactNode> = {
    general:    <TabGeneral />,
    hero:       <TabHero />,
    metricas:   <TabMetricas />,
    personas:   <TabPersonas />,
    solucion:   <TabSolucion />,
    problema:   <TabProblema />,
    fricciones: <TabFricciones />,
    reflexion:  <TabReflexion />,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-export-hide
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="fixed top-0 right-0 h-full w-96 z-40 bg-[#0C1525] border-l border-[#1E2E48] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex-shrink-0 px-5 py-4 border-b border-[#162035]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-[#EFF6FF]">Panel de administración</p>
                <p className="text-[11px] text-[#3D6080] mt-0.5">Los cambios se aplican en tiempo real</p>
              </div>
              {hasChanges && (
                <button
                  onClick={resetAll}
                  className="flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 border border-amber-500/20 hover:border-amber-500/40 rounded-lg px-2.5 py-1.5 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restaurar
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500/15 text-blue-300'
                      : 'text-[#3D6080] hover:text-[#7CB3E0] hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido del tab */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-5 py-3 border-t border-[#162035]">
            <p className="text-[10px] text-[#3D6080] font-mono text-center">
              {hasChanges ? 'Cambios guardados en localStorage' : 'Sin cambios — usando datos originales'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
