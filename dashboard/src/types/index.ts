// ============================================================
// ALERTA-ED — Definición de tipos TypeScript
// ============================================================

// ─── Roles de usuario (personalización por SENA) ────────────
export type UserRole = 'docente' | 'director' | 'investigador' | 'emprendedor' | 'otro';

// ─── Perfil generado por el onboarding de SENA ──────────────
export interface SenaProfile {
  role: UserRole;
  answers: Record<string, string>;
  highlightedPersonaId: number | null; // ID de persona más relevante para el usuario
  personalizationMessage: string;
}

// ─── Estado del onboarding ──────────────────────────────────
export interface OnboardingState {
  step: number;
  completed: boolean;
  profile: SenaProfile | null;
}

// ─── Flujo de conversación de SENA ──────────────────────────
export interface SenaOptionItem {
  valor: string;
  label: string;
  descripcion?: string;
}

export interface SenaQuestion {
  id: string;
  pregunta: string;
  opciones: SenaOptionItem[];
  forRoles?: UserRole[];
}

export interface SenaFlowStep {
  id: string;
  tipo: 'bienvenida' | 'pregunta' | 'perfil';
  titulo: string;
  subtitulo?: string;
  pregunta?: SenaQuestion;
}

// ─── Buyer Persona ──────────────────────────────────────────
export interface MomentoFriccion {
  situacion: string;
  impacto: string;
}

export interface PersonaBadge {
  label: string;
  variant: 'safe' | 'warning' | 'danger' | 'info';
}

export interface PersonaData {
  id: number;
  nombre: string;
  cargo: string;
  edad: number;
  imagen: string;   // ruta relativa desde /public → ej: 'assets/persona1.png'
  video: string;    // ruta relativa desde /public → ej: 'assets/persona1.mp4'
  tagline: string;  // frase corta que define a la persona
  narrativa: string;
  necesidades: string[];
  frustraciones: string[];
  objetivos: string[];
  relacionConSolucion: string;
  momentoFriccion: MomentoFriccion;
  comoAyudaElSistema: string;
  badge: PersonaBadge;
  rolEnSistema: UserRole; // qué rol del onboarding le corresponde
}

// ─── Fricciones por actor ────────────────────────────────────
export type ActorId = 'estudiante' | 'padres' | 'docente' | 'institucion';

export interface FriccionItem {
  titulo: string;
  descripcion: string;
  impacto: 'alto' | 'medio' | 'bajo';
}

export interface FriccionActor {
  id: ActorId;
  label: string;
  descripcion: string;
  fricciones: FriccionItem[];
}

// ─── Flujo de la solución ────────────────────────────────────
export interface FlujoPaso {
  id: string;
  etiqueta: string;
  descripcion: string;
  detalles: string[];
  color: string;
  bgColor: string;
}

// ─── Métricas de impacto ─────────────────────────────────────
export interface Metrica {
  id: string;
  label: string;
  valor: string;
  descripcion: string;
  tipo: 'proposed'; // siempre propuesta, nunca dato real
  signal: 'safe' | 'warning' | 'info';
}

// ─── Mapa de oportunidades ───────────────────────────────────
export interface OportunidadItem {
  id: string;
  causa: string;
  impacto: string;
  nivel: 'critico' | 'alto' | 'medio';
}

// ─── Reflexión IA vs Humano ──────────────────────────────────
export interface ReflexionData {
  iaAporta: string[];
  humanoAporta: string[];
  conclusion: string;
  personaMasViable: {
    personaId: number;
    razon: string;
    criterios: string[];
  };
}

// ─── Diferenciación competitiva ──────────────────────────────
export interface DiferenciadorItem {
  id: string;
  titulo: string;
  descripcion: string;
  icon: string; // nombre del icono Lucide
}

// ─── Segmento de mercado / cliente objetivo ───────────────────
export interface ClienteObjetivo {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: 'publico' | 'privado' | 'mixto' | 'ngo';
}

// ─── Datos completos del proyecto ────────────────────────────
export interface ProyectoData {
  nombre: string;
  subtitulo: string;
  propuestaDeValor: string;
  pasos: { titulo: string; descripcion: string }[];
  flujoSolucion: FlujoPaso[];
  oportunidades: OportunidadItem[];
  metricas: Metrica[];
  reflexion: ReflexionData;
  consecuenciasNegativas?: string[];
  diferenciacion?: DiferenciadorItem[];
  clientesObjetivo?: ClienteObjetivo[];
}
