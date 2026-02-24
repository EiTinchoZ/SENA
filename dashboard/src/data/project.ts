// ============================================================
// ALERTA-ED — Datos principales del proyecto
// Fuente: Buyer Personas.pdf — Taller #3 ITSE 2026
// ============================================================

import type { ProyectoData } from '@/types';

export const proyectoData: ProyectoData = {
  nombre: 'ALERTA-ED',
  subtitulo: 'Sistema de Alerta Temprana para la Deserción Escolar — ITSE',

  propuestaDeValor:
    'Detectamos el riesgo de deserción antes de que sea irreversible, usando inteligencia artificial y comunicación preventiva personalizada para estudiantes, docentes y personal administrativo del ITSE.',

  pasos: [
    {
      titulo: 'Recolección de datos',
      descripcion:
        'El sistema integra asistencia, calificaciones y variables socioeconómicas de cada estudiante del ITSE en tiempo real.',
    },
    {
      titulo: 'Predicción con IA',
      descripcion:
        'Un modelo Random Forest / XGBoost calcula el nivel de riesgo individual y genera alertas automáticas por prioridad.',
    },
    {
      titulo: 'Intervención preventiva',
      descripcion:
        'Docentes y coordinadores reciben alertas accionables. Los estudiantes reciben mensajes motivacionales personalizados por WhatsApp y SMS.',
    },
  ],

  flujoSolucion: [
    {
      id: 'datos',
      etiqueta: 'Datos de entrada',
      descripcion: 'Captura continua de indicadores por estudiante',
      detalles: [
        'Registro de asistencia diaria',
        'Calificaciones por periodo',
        'Variables socioeconómicas',
        'Historial académico y conductual',
      ],
      color: '#3B82F6',
      bgColor: 'rgba(59,130,246,0.08)',
    },
    {
      id: 'modelo',
      etiqueta: 'Modelo IA',
      descripcion: 'Predicción de riesgo con machine learning supervisado',
      detalles: [
        'Random Forest / XGBoost',
        'Clasificación: Alto / Medio / Bajo',
        'Reentrenamiento periódico',
        'Explicabilidad de factores de riesgo',
      ],
      color: '#6366F1',
      bgColor: 'rgba(99,102,241,0.08)',
    },
    {
      id: 'alerta',
      etiqueta: 'Sistema de alertas',
      descripcion: 'Notificaciones inteligentes a actores clave',
      detalles: [
        'Dashboard para docentes (José)',
        'Panel para coordinación (Marta)',
        'Priorización por nivel de riesgo',
        'Historial de intervenciones',
      ],
      color: '#F59E0B',
      bgColor: 'rgba(245,158,11,0.08)',
    },
    {
      id: 'nudging',
      etiqueta: 'Módulo de nudging',
      descripcion: 'Mensajes personalizados a estudiantes',
      detalles: [
        'WhatsApp y SMS para bajo ancho de banda',
        'Mensajes motivacionales por perfil',
        'Recordatorios de fechas importantes',
        'Información sobre recursos de apoyo',
      ],
      color: '#10B981',
      bgColor: 'rgba(16,185,129,0.08)',
    },
    {
      id: 'intervencion',
      etiqueta: 'Intervención',
      descripcion: 'Acción coordinada y trazable',
      detalles: [
        'Tutorías adicionales coordinadas',
        'Programas de acompañamiento reforzados',
        'Comunicación con familias',
        'Cierre del ciclo con seguimiento',
      ],
      color: '#EF4444',
      bgColor: 'rgba(239,68,68,0.08)',
    },
  ],

  // Mapa de oportunidades — causas reales del PDF
  oportunidades: [
    {
      id: 'op1',
      causa: 'Alta tasa de abandono institucional en el ITSE',
      impacto:
        'Especialmente en estudiantes provenientes de contextos socioeconómicos vulnerables y con falta de motivación.',
      nivel: 'critico',
    },
    {
      id: 'op2',
      causa: 'Bajo rendimiento académico sostenido sin intervención',
      impacto:
        'El rezago se acumula sin que el sistema active ningún mecanismo de apoyo temprano.',
      nivel: 'critico',
    },
    {
      id: 'op3',
      causa: 'Ausentismo frecuente sin seguimiento sistemático',
      impacto:
        'Las inasistencias se registran pero no se analizan como patrón de riesgo hasta que el abandono es inminente.',
      nivel: 'critico',
    },
    {
      id: 'op4',
      causa: 'Problemas económicos familiares que compiten con el estudio',
      impacto:
        'La presión para trabajar genera conflicto directo con la dedicación requerida por la institución.',
      nivel: 'alto',
    },
    {
      id: 'op5',
      causa: 'Débil comunicación entre escuela y hogar',
      impacto:
        'Las familias se enteran del problema cuando el estudiante ya está próximo a abandonar, o cuando ya lo hizo.',
      nivel: 'alto',
    },
    {
      id: 'op6',
      causa: 'Sobrecarga docente que impide el seguimiento individual',
      impacto:
        'Con grupos de 40+ estudiantes y alta carga administrativa, el docente no puede identificar casos de riesgo a tiempo.',
      nivel: 'alto',
    },
    {
      id: 'op7',
      causa: 'Procesos manuales y reactivos en la institución',
      impacto:
        'Los reportes tardan semanas en elaborarse. Cuando llegan, la ventana de intervención preventiva ya se cerró.',
      nivel: 'medio',
    },
  ],

  metricas: [
    {
      id: 'm1',
      label: 'Tasa de detección temprana',
      valor: '85%+',
      descripcion:
        'Porcentaje proyectado de estudiantes en riesgo identificados antes del abandono efectivo.',
      tipo: 'proposed',
      signal: 'safe',
    },
    {
      id: 'm2',
      label: 'Tiempo de respuesta',
      valor: '< 48 hs',
      descripcion:
        'Tiempo objetivo entre la generación de una alerta y la primera acción de intervención.',
      tipo: 'proposed',
      signal: 'info',
    },
    {
      id: 'm3',
      label: 'Cobertura de nudging',
      valor: '90%',
      descripcion:
        'Porcentaje de estudiantes en riesgo alcanzados por mensajes motivacionales vía WhatsApp o SMS.',
      tipo: 'proposed',
      signal: 'info',
    },
    {
      id: 'm4',
      label: 'Reducción de deserción',
      valor: '30%',
      descripcion:
        'Reducción proyectada en la tasa de abandono institucional durante el primer año de implementación.',
      tipo: 'proposed',
      signal: 'safe',
    },
    {
      id: 'm5',
      label: 'Alertas generadas / mes',
      valor: '200+',
      descripcion:
        'Cantidad estimada de alertas activas mensuales en una institución de 1,000 estudiantes.',
      tipo: 'proposed',
      signal: 'warning',
    },
    {
      id: 'm6',
      label: 'Mejora del rendimiento',
      valor: '70%',
      descripcion:
        'Porcentaje objetivo de estudiantes intervenidos que completan el periodo académico satisfactoriamente.',
      tipo: 'proposed',
      signal: 'safe',
    },
  ],

  // Consecuencias negativas — Fuente: "Sistema de Alerta Temprana..." PDF
  consecuenciasNegativas: [
    'La tasa de abandono escolar aumentará, reduciendo el nivel educativo de la población',
    'Los estudiantes tendrán menos oportunidades laborales en el futuro',
    'Se incrementa el riesgo de pobreza y exclusión social para las familias afectadas',
    'Las instituciones educativas pierden recursos al no retener a sus estudiantes matriculados',
    'El país enfrenta menor desarrollo económico por una fuerza laboral con menor formación',
  ],

  // Diferenciación competitiva — Fuente: "Sistema de Alerta Temprana..." PDF
  diferenciacion: [
    {
      id: 'd1',
      titulo: 'Predicción con Machine Learning',
      descripcion: 'Random Forest y XGBoost entrenados con datos históricos reales por institución',
      icon: 'Brain',
    },
    {
      id: 'd2',
      titulo: 'Alertas automáticas en tiempo real',
      descripcion: 'El sistema activa notificaciones sin intervención manual del docente',
      icon: 'Bell',
    },
    {
      id: 'd3',
      titulo: 'Nudging personalizado',
      descripcion: 'Mensajes motivacionales adaptados al perfil de riesgo de cada estudiante',
      icon: 'MessageSquare',
    },
    {
      id: 'd4',
      titulo: 'Plataforma centralizada',
      descripcion: 'Un solo panel para estudiantes, docentes y administración',
      icon: 'LayoutDashboard',
    },
    {
      id: 'd5',
      titulo: 'Comunicación de bajo costo',
      descripcion: 'WhatsApp y SMS: accesible para familias sin acceso constante a internet',
      icon: 'Smartphone',
    },
  ],

  // Clientes objetivo — Fuente: "Sistema de Alerta Temprana..." PDF
  clientesObjetivo: [
    {
      id: 'c1',
      nombre: 'Ministerios de Educación',
      descripcion: 'Política educativa a escala nacional con datos de retención en tiempo real',
      tipo: 'publico',
    },
    {
      id: 'c2',
      nombre: 'Escuelas públicas',
      descripcion: 'Mayor necesidad, menor presupuesto — el caso de uso más urgente e impactante',
      tipo: 'publico',
    },
    {
      id: 'c3',
      nombre: 'Colegios privados',
      descripcion: 'Retención estudiantil como ventaja competitiva y diferenciador de calidad',
      tipo: 'privado',
    },
    {
      id: 'c4',
      nombre: 'Universidades (primer año)',
      descripcion: 'El primer año concentra la mayor tasa de abandono en educación superior',
      tipo: 'mixto',
    },
    {
      id: 'c5',
      nombre: 'ONG y organizaciones educativas',
      descripcion: 'Programas de retención en comunidades vulnerables con impacto social medible',
      tipo: 'ngo',
    },
  ],

  // Reflexión real del Taller #3
  reflexion: {
    iaAporta: [
      'Generación de perfiles de riesgo realistas y coherentes a partir de datos históricos',
      'Identificación de patrones de necesidades y frustraciones que el análisis manual perdería',
      'Desarrollo rápido de escenarios plausibles para cada buyer persona',
      'Apoyo creativo y analítico para estructurar la información del proyecto',
      'Automatización de alertas y mensajes motivacionales personalizados a escala',
    ],
    humanoAporta: [
      'Definición del problema central y el enfoque del proyecto',
      'Validación de coherencia con el contexto educativo real del ITSE',
      'Priorización de los usuarios y decisión sobre cuál persona validar primero',
      'Interpretación del impacto emocional y social de cada situación de riesgo',
      'Responsabilidad ética sobre las intervenciones y sus consecuencias',
    ],
    conclusion:
      'La IA fue una herramienta de amplificación: aceleró la redacción estructurada, organizó la información y simuló escenarios. Pero las decisiones que importan —qué problema resolver, para quién, cómo priorizarlo— fueron humanas. La IA no reemplaza el juicio; lo potencia.',
    personaMasViable: {
      personaId: 1,
      razon:
        'El estudiante en riesgo es el usuario principal y donde se evidencia de forma directa el impacto de la solución. Validar con Carlos permite confirmar si el sistema detecta correctamente los patrones de riesgo y si los mensajes motivacionales generan el cambio de comportamiento esperado.',
      criterios: [
        'Es el usuario principal: el impacto de la solución se mide directamente en él',
        'Su caso genera la cadena de valor completa (alerta → docente → intervención)',
        'La fricción es observable y medible: asistencia, calificaciones, comportamiento',
        'Su retroalimentación valida el núcleo del producto (predicción + nudging)',
        'Es el punto de partida natural antes de escalar a docentes e institución',
      ],
    },
  },
};
