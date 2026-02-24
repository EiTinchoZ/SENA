// ============================================================
// ALERTA-ED — Flujo de conversación de SENA
// La mascota guía al usuario en 5 pasos antes del dashboard
// ============================================================

import type { SenaFlowStep, UserRole, SenaProfile } from '@/types';

// ─── Pasos del flujo de SENA ─────────────────────────────────
export const senaSteps: SenaFlowStep[] = [
  // PASO 0: Bienvenida
  {
    id: 'bienvenida',
    tipo: 'bienvenida',
    titulo: 'Hola. Soy SENA.',
    subtitulo:
      'Sistema de ENseñanza y Alerta. Estoy aquí para mostrarte cómo podemos detectar y prevenir la deserción escolar antes de que sea tarde.\n\nAntes de comenzar, quiero entender tu contexto para presentarte lo que es más relevante para ti.',
  },

  // PASO 1: Rol del usuario
  {
    id: 'rol',
    tipo: 'pregunta',
    titulo: 'Cuéntame sobre tu rol',
    subtitulo: 'Esto me ayuda a personalizar lo que vas a ver.',
    pregunta: {
      id: 'rol',
      pregunta: '¿Cuál es tu perfil principal?',
      opciones: [
        {
          valor: 'docente',
          label: 'Docente o Tutor',
          descripcion: 'Trabajo directamente con estudiantes en el aula',
        },
        {
          valor: 'director',
          label: 'Director o Rector',
          descripcion: 'Gestiono una institución educativa',
        },
        {
          valor: 'investigador',
          label: 'Investigador o Académico',
          descripcion: 'Estudio el problema desde la academia o la investigación',
        },
        {
          valor: 'emprendedor',
          label: 'Emprendedor o Inversor',
          descripcion: 'Evalúo soluciones tecnológicas para el sector educativo',
        },
      ],
    },
  },

  // PASO 2: Pregunta contextual 1 (varía por rol)
  {
    id: 'pregunta1',
    tipo: 'pregunta',
    titulo: 'Entendiendo tu experiencia',
    subtitulo: 'Una pregunta más sobre tu contexto.',
    pregunta: {
      id: 'pregunta1',
      pregunta: '¿Cuál de estas situaciones se acerca más a tu realidad?',
      opciones: [], // Poblado dinámicamente según rol
    },
  },

  // PASO 3: Pregunta contextual 2
  {
    id: 'pregunta2',
    tipo: 'pregunta',
    titulo: 'Casi listo',
    subtitulo: 'Una última pregunta antes de mostrarte el sistema.',
    pregunta: {
      id: 'pregunta2',
      pregunta: '¿Qué es lo más importante para ti en una solución como esta?',
      opciones: [], // Poblado dinámicamente según rol
    },
  },

  // PASO 4: Perfil generado
  {
    id: 'perfil',
    tipo: 'perfil',
    titulo: 'Tu perfil está listo',
    subtitulo: 'He ajustado la presentación para que sea más relevante para ti.',
  },
];

// ─── Opciones dinámicas según rol ────────────────────────────

export const pregunta1Options: Record<UserRole, { valor: string; label: string; descripcion: string }[]> = {
  docente: [
    {
      valor: 'detecto_pero_tarde',
      label: 'Detecto señales, pero cuando actúo ya es tarde',
      descripcion: 'Reconozco el problema pero no tengo cómo actuar a tiempo',
    },
    {
      valor: 'no_tengo_tiempo',
      label: 'No tengo tiempo para el seguimiento individual',
      descripcion: 'La carga administrativa me lo impide',
    },
    {
      valor: 'no_tengo_herramientas',
      label: 'No tengo herramientas ni protocolos claros',
      descripcion: 'Actúo por intuición, sin criterios formales',
    },
  ],
  director: [
    {
      valor: 'proceso_reactivo',
      label: 'Mi institución actúa cuando el problema ya ocurrió',
      descripcion: 'No tenemos prevención real',
    },
    {
      valor: 'datos_fragmentados',
      label: 'Los datos están fragmentados, es difícil tener una vista global',
      descripcion: 'No hay un sistema integrado',
    },
    {
      valor: 'protocolo_informal',
      label: 'Hay protocolos, pero son informales y dependen de las personas',
      descripcion: 'No escala ni es consistente',
    },
  ],
  investigador: [
    {
      valor: 'algoritmos',
      label: 'Me interesan principalmente los algoritmos de predicción',
      descripcion: 'Random Forest, XGBoost, feature engineering',
    },
    {
      valor: 'intervencion',
      label: 'Mi foco está en las intervenciones pedagógicas',
      descripcion: 'Qué funciona para retener al estudiante',
    },
    {
      valor: 'impacto_social',
      label: 'Trabajo en el impacto social y las políticas educativas',
      descripcion: 'El problema en su dimensión sistémica',
    },
  ],
  emprendedor: [
    {
      valor: 'publico',
      label: 'Me enfoco en instituciones educativas públicas',
      descripcion: 'Escala, impacto social, presupuesto limitado',
    },
    {
      valor: 'privado',
      label: 'Me enfoco en instituciones privadas',
      descripcion: 'Disposición a pagar, velocidad de adopción',
    },
    {
      valor: 'ambos',
      label: 'Busco soluciones que escalen en ambos contextos',
      descripcion: 'Modelo híbrido o freemium',
    },
  ],
  otro: [
    {
      valor: 'general',
      label: 'Me interesa el problema de la deserción en general',
      descripcion: 'Desde una perspectiva general',
    },
    {
      valor: 'familiar',
      label: 'Tengo conexión personal con el tema',
      descripcion: 'Como padre, estudiante o miembro de familia',
    },
    {
      valor: 'politica',
      label: 'Trabajo en política pública educativa',
      descripcion: 'En el sector gubernamental o de organismos',
    },
  ],
};

export const pregunta2Options: Record<UserRole, { valor: string; label: string; descripcion: string }[]> = {
  docente: [
    {
      valor: 'ahorro_tiempo',
      label: 'Que me ahorre tiempo y me diga qué hacer',
      descripcion: 'Alertas claras y accionables',
    },
    {
      valor: 'comunicacion',
      label: 'Que mejore mi comunicación con las familias',
      descripcion: 'Menos llamadas manuales, más efectividad',
    },
    {
      valor: 'visibilidad',
      label: 'Que me dé visibilidad del estado de mi aula',
      descripcion: 'Un dashboard simple y útil',
    },
  ],
  director: [
    {
      valor: 'metricas',
      label: 'Métricas claras y reportes para rendir cuentas',
      descripcion: 'Evidencia de gestión preventiva',
    },
    {
      valor: 'estandarizacion',
      label: 'Estandarizar el proceso de intervención',
      descripcion: 'Que no dependa de cada docente',
    },
    {
      valor: 'reduccion',
      label: 'Reducir la tasa de deserción de forma medible',
      descripcion: 'Impacto real, no solo tecnología',
    },
  ],
  investigador: [
    {
      valor: 'datos',
      label: 'Acceso a datos educativos de calidad para investigar',
      descripcion: 'Dataset real con variables ricas',
    },
    {
      valor: 'metodologia',
      label: 'Rigor metodológico y reproducibilidad',
      descripcion: 'Código abierto, validación cruzada',
    },
    {
      valor: 'impacto',
      label: 'Que la investigación tenga aplicación real',
      descripcion: 'No solo publicaciones, sino cambio concreto',
    },
  ],
  emprendedor: [
    {
      valor: 'adopcion',
      label: 'Que sea fácil de adoptar por las instituciones',
      descripcion: 'Bajo costo de implementación',
    },
    {
      valor: 'escalabilidad',
      label: 'Que escale a miles de instituciones',
      descripcion: 'Modelo de negocio sostenible',
    },
    {
      valor: 'diferenciacion',
      label: 'Que tenga diferenciación real frente a competidores',
      descripcion: 'Ventaja competitiva defendible',
    },
  ],
  otro: [
    {
      valor: 'comprension',
      label: 'Entender mejor el problema de la deserción',
      descripcion: 'Sus causas, dimensiones y soluciones posibles',
    },
    {
      valor: 'tecnologia',
      label: 'Ver cómo la IA puede aplicarse en educación',
      descripcion: 'Sin tecnicismos, de forma comprensible',
    },
    {
      valor: 'impacto',
      label: 'Conocer el impacto potencial de una solución así',
      descripcion: 'En términos de estudiantes y familias',
    },
  ],
};

// ─── Generación del perfil final ─────────────────────────────

export function generateProfile(
  role: UserRole,
  answers: Record<string, string>
): SenaProfile {
  // Persona 1 = Carlos (estudiante), 2 = José (docente), 3 = Marta (coordinadora)
  const personaMap: Record<UserRole, number | null> = {
    docente:      2, // → José Rodríguez (docente universitario)
    director:     3, // → Marta González (coordinadora académica)
    investigador: 2, // → foco técnico, similar al docente
    emprendedor:  3, // → foco institucional/escalabilidad
    otro:         1, // → Carlos Mendoza (estudiante en riesgo)
  };

  const messages: Record<UserRole, string> = {
    docente:
      'Te voy a mostrar el sistema desde la perspectiva de José Rodríguez: las alertas que recibirías, cómo priorizar los casos de riesgo en tu grupo y cómo actuar antes de que el problema se agrave.',
    director:
      'Te voy a mostrar el panel de coordinación de Marta González: métricas en tiempo real, indicadores de retención institucional y cómo pasar de una gestión reactiva a una estrategia preventiva.',
    investigador:
      'Voy a enfatizar la arquitectura del modelo de IA (Random Forest / XGBoost), las variables utilizadas, la metodología de predicción y las métricas de evaluación del sistema.',
    emprendedor:
      'Te voy a mostrar la propuesta de valor del sistema, el diferenciador frente al mercado, las métricas de adopción y el potencial de escalabilidad en instituciones públicas como el ITSE.',
    otro:
      'Te voy a mostrar el sistema a través de la historia de Carlos Mendoza: cómo el patrón de riesgo se forma, cómo se detecta y cómo una intervención a tiempo cambia el resultado.',
  };

  return {
    role,
    answers,
    highlightedPersonaId: personaMap[role],
    personalizationMessage: messages[role],
  };
}

// ─── Textos de respuesta personalizados de SENA ──────────────
export const senaResponses: Record<string, string> = {
  // Respuestas para el rol
  'rol:docente':
    'Entendido. Como docente, estás en el centro del sistema. Eres quien primero detecta las señales.',
  'rol:director':
    'Perfecto. Desde la dirección, la visión global y los datos en tiempo real son cruciales.',
  'rol:investigador':
    'Excelente. Te voy a mostrar la arquitectura técnica con más detalle.',
  'rol:emprendedor':
    'Bien. Me voy a enfocar en el modelo de negocio y el potencial del mercado.',
  'rol:otro':
    'Entendido. Te mostraré el sistema desde su dimensión humana y de impacto.',
};
