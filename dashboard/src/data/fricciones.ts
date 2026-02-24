// ============================================================
// ALERTA-ED — Fricciones por actor del sistema
// Fuente: Buyer Personas.pdf — Lista de Fricciones real del Taller #3
// ITSE — Emprendimiento Tecnológico Digital — 24/02/2026
// ============================================================

import type { FriccionActor } from '@/types';

export const friccionesData: FriccionActor[] = [
  {
    id: 'estudiante',
    label: 'Estudiante',
    descripcion:
      'El actor principal del sistema. Sus fricciones son el detonante del abandono escolar y el punto donde la intervención tiene mayor impacto directo.',
    fricciones: [
      {
        titulo: 'Desmotivación escolar',
        descripcion:
          'La pérdida progresiva del interés en el estudio no activa ninguna alerta formal. La institución solo reacciona cuando el ausentismo ya es extremo.',
        impacto: 'alto',
      },
      {
        titulo: 'Dificultades para comprender materias',
        descripcion:
          'El rezago académico acumulado genera frustración y disminuye la percepción de que el esfuerzo vale la pena, acelerando la decisión de abandono.',
        impacto: 'alto',
      },
      {
        titulo: 'Problemas emocionales o familiares',
        descripcion:
          'Situaciones personales críticas impactan directamente en el rendimiento y la asistencia, pero son invisibles para el sistema educativo formal.',
        impacto: 'alto',
      },
      {
        titulo: 'Presión económica para trabajar',
        descripcion:
          'La necesidad de contribuir al ingreso familiar genera un conflicto directo con los horarios y la dedicación requerida por la institución.',
        impacto: 'alto',
      },
      {
        titulo: 'Percepción de que la escuela no aporta a su futuro',
        descripcion:
          'Cuando el estudiante no ve una conexión entre la formación y sus objetivos de vida, el costo de oportunidad de estudiar se vuelve inaceptable.',
        impacto: 'medio',
      },
    ],
  },
  {
    id: 'padres',
    label: 'Padres o tutores',
    descripcion:
      'Actor clave para la retención estudiantil, pero frecuentemente desconectado del sistema educativo por barreras de tiempo, acceso y comunicación.',
    fricciones: [
      {
        titulo: 'Falta de tiempo para supervisión académica',
        descripcion:
          'Las jornadas laborales extensas impiden a los padres hacer seguimiento activo del desempeño escolar de sus hijos.',
        impacto: 'alto',
      },
      {
        titulo: 'Desconocimiento del desempeño del estudiante',
        descripcion:
          'Los padres no reciben información oportuna sobre asistencia ni calificaciones. Se enteran del problema cuando ya es difícil de revertir.',
        impacto: 'alto',
      },
      {
        titulo: 'Comunicación limitada con la institución',
        descripcion:
          'El canal de comunicación con la escuela es escaso, tardío y depende de iniciativas del propio estudiante para funcionar.',
        impacto: 'alto',
      },
      {
        titulo: 'Bajo nivel educativo propio',
        descripcion:
          'Muchos padres no pueden apoyar académicamente a sus hijos por barreras de comprensión de los contenidos o del sistema educativo.',
        impacto: 'medio',
      },
      {
        titulo: 'Acceso tecnológico limitado',
        descripcion:
          'En contextos vulnerables, el acceso a plataformas digitales o internet puede ser intermitente, limitando la efectividad de herramientas digitales convencionales.',
        impacto: 'medio',
      },
    ],
  },
  {
    id: 'docente',
    label: 'Docente',
    descripcion:
      'El actor con mayor contacto directo con la señal de riesgo, pero con la menor capacidad de respuesta individual por la magnitud de su carga de trabajo.',
    fricciones: [
      {
        titulo: 'Sobrecarga laboral',
        descripcion:
          'La gestión de múltiples grupos con más de 40 estudiantes cada uno, sumada a tareas administrativas, deja poco espacio para el seguimiento individual.',
        impacto: 'alto',
      },
      {
        titulo: 'Falta de herramientas analíticas',
        descripcion:
          'El docente actúa por intuición porque no tiene métricas objetivas que le confirmen sus sospechas sobre el riesgo de un estudiante a tiempo.',
        impacto: 'alto',
      },
      {
        titulo: 'Información dispersa entre distintos sistemas',
        descripcion:
          'Asistencia, calificaciones y datos de contexto están en plataformas separadas. Consolidarlos para un análisis de riesgo es manual, lento e ineficiente.',
        impacto: 'alto',
      },
      {
        titulo: 'Grupos numerosos que dificultan el seguimiento individual',
        descripcion:
          'Con 40 o más estudiantes por grupo, el seguimiento personalizado se vuelve inviable sin herramientas de priorización automática.',
        impacto: 'alto',
      },
      {
        titulo: 'Dificultad para el seguimiento individual sostenido',
        descripcion:
          'Incluso cuando el docente identifica un caso de riesgo, mantener el seguimiento en el tiempo sin apoyo del sistema es difícilmente sostenible.',
        impacto: 'medio',
      },
    ],
  },
  {
    id: 'institucion',
    label: 'Institución',
    descripcion:
      'La institución enfrenta el problema a escala, pero con procesos reactivos, datos tardíos y recursos limitados para construir una respuesta preventiva.',
    fricciones: [
      {
        titulo: 'Ausencia de sistemas predictivos',
        descripcion:
          'Sin modelos de predicción, la institución no puede anticipar quién abandonará. Solo registra el hecho cuando ya ocurrió.',
        impacto: 'alto',
      },
      {
        titulo: 'Reacción tardía ante señales de riesgo',
        descripcion:
          'Los procesos institucionales de intervención se activan cuando el abandono es inminente o ya consumado, eliminando la ventana de oportunidad preventiva.',
        impacto: 'alto',
      },
      {
        titulo: 'Recursos humanos y tecnológicos limitados',
        descripcion:
          'Las instituciones públicas enfrentan restricciones presupuestarias que dificultan la adopción de tecnología educativa avanzada.',
        impacto: 'medio',
      },
      {
        titulo: 'Procesos manuales de seguimiento',
        descripcion:
          'Los reportes se elaboran manualmente, tardan semanas y llegan cuando la información ya no sirve para decidir acciones preventivas.',
        impacto: 'alto',
      },
    ],
  },
];
