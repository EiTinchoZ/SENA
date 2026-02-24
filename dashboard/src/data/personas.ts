// ============================================================
// ALERTA-ED — Buyer Personas (contenido real del Taller #3)
// Fuente: Buyer Personas.pdf — Martín Bundy, Susan Villaneros, Ian Quintero
// ITSE — Emprendimiento Tecnológico Digital — 24/02/2026
// ============================================================

import type { PersonaData } from '@/types';

export const personas: PersonaData[] = [
  // ─── PERSONA 1 — Estudiante en riesgo de deserción ──────────
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    cargo: 'Estudiante — Desarrollo de Software',
    edad: 19,
    imagen: 'assets/persona1.png',
    video: 'assets/persona1.mp4',
    rolEnSistema: 'otro',
    badge: { label: 'Estudiante', variant: 'danger' },

    tagline: '"La presión laboral y el cansancio me llevaron a considerar seriamente abandonar la carrera."',

    narrativa: `Carlos trabaja medio tiempo para ayudar a su familia, lo que reduce significativamente el tiempo que puede dedicar a sus estudios. En las últimas semanas ha faltado a varias clases y sus calificaciones han comenzado a bajar, lo que le genera ansiedad y frustración. La presión laboral y el cansancio acumulado lo han llevado a considerar seriamente abandonar la carrera.

El sistema de alerta temprana detecta el patrón de inasistencias y bajo rendimiento académico, generando una alerta automática. Carlos comienza a recibir mensajes motivacionales y recordatorios sobre fechas importantes, mientras que su docente es notificado para brindarle apoyo académico. Gracias a esta intervención, Carlos percibe que no está solo y decide continuar con sus estudios, buscando alternativas para mejorar su situación.`,

    necesidades: [
      'Mantenerse en la institución y terminar su carrera',
      'Mejorar su rendimiento académico',
      'Recibir apoyo cuando presenta dificultades',
      'Compatibilizar estudio y responsabilidades económicas',
    ],

    frustraciones: [
      'Dificultad para seguir el ritmo de las clases',
      'Cansancio por trabajo y estudio simultáneo',
      'Falta de orientación personalizada',
      'Sensación de que podría abandonar si reprueba varias materias',
    ],

    objetivos: [
      'Corto plazo: aprobar el semestre actual',
      'Largo plazo: graduarse y conseguir un empleo estable en tecnología',
    ],

    relacionConSolucion:
      'El sistema detecta ausencias, bajo rendimiento y cambios en su desempeño, enviándole recordatorios, apoyo motivacional y alertas tempranas a la institución.',

    momentoFriccion: {
      situacion:
        'Carlos considera abandonar la carrera tras reprobar un parcial. Está agotado por la doble jornada de trabajo y estudio, y siente que no tiene salida.',
      impacto:
        'Sin intervención, toma la decisión de abandonar antes de agotar las alternativas de apoyo disponibles.',
    },

    comoAyudaElSistema:
      'ALERTA-ED detecta el patrón de riesgo y le envía un mensaje motivacional junto con información sobre recursos de apoyo académico. Carlos percibe que no está solo y decide buscar ayuda antes de tomar una decisión definitiva.',
  },

  // ─── PERSONA 2 — Docente universitario ──────────────────────
  {
    id: 2,
    nombre: 'José Rodríguez',
    cargo: 'Docente Universitario — Matemáticas',
    edad: 39,
    imagen: 'assets/persona2.png',
    video: 'assets/persona2.mp4',
    rolEnSistema: 'docente',
    badge: { label: 'Docente', variant: 'info' },

    tagline: '"Sé que algunos estudiantes podrían abandonar si no reciben ayuda, pero no siempre llego a tiempo."',

    narrativa: `El profesor José atiende varios grupos con más de 40 estudiantes cada uno, lo que dificulta identificar quién necesita apoyo antes de que su situación empeore. Gran parte de su tiempo se consume en tareas administrativas y revisión de evaluaciones, por lo que no siempre puede analizar detalladamente la asistencia o el rendimiento individual. Esta situación le genera preocupación, ya que sabe que algunos estudiantes podrían abandonar si no reciben ayuda a tiempo.

Gracias al dashboard del sistema de alerta temprana, José puede visualizar de forma clara qué estudiantes presentan mayor riesgo según su asistencia, notas y participación. Esta información priorizada le permite contactar primero a quienes realmente lo necesitan, ofrecer tutorías o apoyo adicional y actuar antes de que el problema se agrave.`,

    necesidades: [
      'Detectar estudiantes con dificultades de forma temprana',
      'Optimizar el seguimiento académico sin aumentar su carga',
      'Mejorar los índices de aprobación de sus cursos',
    ],

    frustraciones: [
      'Falta de herramientas analíticas integradas',
      'Tiempo limitado para atención individual',
      'Información dispersa entre distintos sistemas',
      'Grupos numerosos que impiden el seguimiento personalizado',
    ],

    objetivos: [
      'Corto plazo: reducir el número de estudiantes reprobados',
      'Largo plazo: mejorar el desempeño general de sus cursos',
    ],

    relacionConSolucion:
      'La plataforma le proporciona indicadores de riesgo basados en datos reales y recomendaciones de intervención, permitiéndole actuar de forma priorizada sin trabajo adicional.',

    momentoFriccion: {
      situacion:
        'Mientras revisa calificaciones al finalizar el parcial, nota que varios estudiantes tienen bajo rendimiento y ausentismo, pero no puede determinar cuáles son los casos más urgentes.',
      impacto:
        'Sin priorización, el tiempo que dedica a cada caso puede estar mal distribuido: atiende primero al que lo busca, no al que más lo necesita.',
    },

    comoAyudaElSistema:
      'El dashboard muestra qué estudiantes presentan mayor riesgo según asistencia, notas y participación. José puede contactar primero a quienes realmente lo necesitan y actuar antes de que el problema se agrave.',
  },

  // ─── PERSONA 3 — Personal administrativo ─────────────────────
  {
    id: 3,
    nombre: 'Marta González',
    cargo: 'Coordinadora Académica — ITSE',
    edad: 45,
    imagen: 'assets/persona3.png',
    video: 'assets/persona3.mp4',
    rolEnSistema: 'director',
    badge: { label: 'Administrativo', variant: 'warning' },

    tagline: '"Dependo de reportes manuales que tardan semanas. Cuando actúo, la deserción ya ocurrió."',

    narrativa: `Marta, como coordinadora académica, debe monitorear constantemente los niveles de retención estudiantil. Sin embargo, actualmente depende de reportes manuales que tardan semanas en elaborarse, lo que dificulta detectar problemas a tiempo. Esta demora limita su capacidad para tomar decisiones preventivas y la obliga a actuar cuando la deserción ya ha ocurrido.

Con el sistema predictivo, Marta puede acceder a estadísticas en tiempo real sobre estudiantes en riesgo, lo que le permite anticiparse a la situación. A partir de estos datos, puede coordinar acciones como abrir tutorías adicionales, reforzar programas de acompañamiento o mejorar la comunicación con las familias, transformando una gestión reactiva en una estrategia preventiva.`,

    necesidades: [
      'Reducir la deserción institucional en el ITSE',
      'Tomar decisiones basadas en datos en tiempo real',
      'Implementar estrategias de retención efectivas',
    ],

    frustraciones: [
      'Falta de información predictiva y actualizada',
      'Intervenciones tardías por reportes lentos',
      'Limitaciones de recursos humanos y tecnológicos',
    ],

    objetivos: [
      'Corto plazo: identificar las áreas con mayor índice de abandono',
      'Largo plazo: mejorar los indicadores institucionales de retención',
    ],

    relacionConSolucion:
      'Utiliza paneles de control con análisis predictivo que permiten planificar acciones preventivas a nivel institucional, transformando la gestión de reactiva a estratégica.',

    momentoFriccion: {
      situacion:
        'Recibe el reporte manual de retención con semanas de retraso. Para ese momento, varios estudiantes en riesgo ya tomaron la decisión de no regresar.',
      impacto:
        'La demora en los datos convierte la deserción en un hecho consumado que solo puede registrar, no prevenir.',
    },

    comoAyudaElSistema:
      'Con ALERTA-ED, Marta accede a estadísticas en tiempo real antes de cada periodo. Puede coordinar tutorías adicionales, reforzar programas de acompañamiento y comunicarse con las familias con anticipación, evitando pérdidas masivas de matrícula.',
  },
];
