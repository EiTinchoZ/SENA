# CLAUDE.md — Emprendimiento Digitsal: ALERTA-ED
> Última actualización: 2026-02-24
> Agente activo: Claude Code (Arquitecto)
> Leer también: AGENT-SYNC.md antes de cada sesión

---

## IDENTIDAD DEL PROYECTO

**Nombre de la plataforma:** ALERTA-ED
**Subtítulo:** Sistema de Alerta Temprana para la Deserción Escolar
**Mascota IA:** SENA (Sistema de ENseñanza y Alerta)
**Tipo:** Dashboard interactivo / Presentación web para pitch de clase
**Objetivo:** Parecer una demo de startup edtech real lista para presentar

---

## TECH STACK

| Tecnología     | Versión   | Propósito                              |
|----------------|-----------|----------------------------------------|
| Vite           | 5.x       | Build tool + dev server                |
| React          | 18.x      | UI library                             |
| TypeScript     | 5.x       | Type safety                            |
| Tailwind CSS   | 3.x       | Utility-first styling                  |
| Framer Motion  | 11.x      | Animaciones y transiciones             |
| Lucide React   | latest    | Iconografía (bundle local)             |

**Sin APIs externas. Todo funciona offline.**
**Sin fuentes web. Se usa stack de sistema (system-ui → Segoe UI → Roboto).**

---

## ESTRUCTURA DE ARCHIVOS

```
Emprendimiento Digitsal/
├── CLAUDE.md                     ← Este archivo
├── AGENT-SYNC.md                 ← Sincronización entre agentes (LEER PRIMERO)
├── VIBE-CODE-METHODOLOGY.md      ← Marco de trabajo
├── PROMPT-MAESTRO.md             ← Prompt universal del proyecto
├── QUICK-START.md                ← Cómo iniciar el proyecto
├── README.md                     ← Documentación técnica
├── design-system/
│   └── MASTER.md                 ← Sistema de diseño completo
├── tasks/
│   └── todo.md                   ← Lista de tareas activa
├── assets/                       ← Archivos del usuario (no commitear)
│   ├── persona1.png
│   ├── persona2.png
│   ├── persona3.png
│   ├── persona1.mp4
│   ├── persona2.mp4
│   └── persona3.mp4
└── dashboard/                    ← Proyecto Vite + React
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── types/index.ts
        ├── data/
        │   ├── project.ts        ← Datos del proyecto y métricas
        │   ├── personas.ts       ← Datos de los 3 buyer personas
        │   ├── fricciones.ts     ← Fricciones por actor
        │   └── sena-flow.ts      ← Flujo de conversación de SENA
        ├── lib/utils.ts
        ├── hooks/
        │   ├── useScrollSpy.ts
        │   └── useOnboarding.ts
        └── components/
            ├── onboarding/
            │   ├── SenaOnboarding.tsx  ← Flujo completo de onboarding
            │   ├── SenaAvatar.tsx      ← Avatar geométrico animado
            │   └── OnboardingQuestion.tsx
            ├── layout/
            │   ├── Navigation.tsx
            │   └── ScrollProgress.tsx
            ├── ui/
            │   ├── RiskSignal.tsx      ← Componente único: señales de riesgo
            │   ├── AlertTimeline.tsx   ← Componente único: línea de tiempo
            │   └── SectionWrapper.tsx
            └── sections/
                ├── Hero.tsx
                ├── Problema.tsx
                ├── Solucion.tsx
                ├── Fricciones.tsx
                ├── BuyerPersonas.tsx
                ├── PersonaModal.tsx
                ├── Escenarios.tsx
                ├── Impacto.tsx
                └── Reflexion.tsx
```

---

## DESIGN SYSTEM (resumen, ver design-system/MASTER.md para detalle)

### Paleta de colores (tokens)

```css
/* Fondos */
--bg-base:     #04080F   /* Negro azulado profundo */
--bg-surface:  #080E1A   /* Superficie principal */
--bg-card:     #0C1525   /* Tarjetas default */
--bg-elevated: #111D30   /* Tarjetas destacadas */

/* Bordes */
--border-subtle: #162035
--border-default: #1E2E48
--border-strong: #2A3F60

/* Primario */
--primary:       #3B82F6  /* Azul-500 */
--primary-hover: #2563EB
--primary-muted: rgba(59,130,246,0.12)

/* Señales */
--signal-danger:  #EF4444
--signal-warning: #F59E0B
--signal-safe:    #10B981
--signal-info:    #3B82F6

/* Texto */
--text-primary:   #EFF6FF
--text-secondary: #7CB3E0
--text-muted:     #3D6080
```

### Tipografía

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'Cascadia Code', 'Consolas', 'Courier New', monospace;
```

Escala:
- `text-xs`: 12px (labels, badges)
- `text-sm`: 14px (body secundario)
- `text-base`: 16px (body principal)
- `text-lg`: 18px (body destacado)
- `text-xl`: 20px / `text-2xl`: 24px (títulos de card)
- `text-3xl`: 30px / `text-4xl`: 36px (títulos de sección)
- `text-5xl`: 48px / `text-6xl`: 60px (Hero headline)

### Espaciado (8-point grid)

```
4px  (xs)  → gap-1, p-1
8px  (sm)  → gap-2, p-2
16px (md)  → gap-4, p-4
24px (lg)  → gap-6, p-6
32px (xl)  → gap-8, p-8
48px (2xl) → gap-12, p-12
64px (3xl) → gap-16, p-16
```

---

## CONVENCIONES DE CÓDIGO

### TypeScript/React
- Componentes: PascalCase (`HeroSection.tsx`)
- Archivos data: camelCase (`personas.ts`)
- Hooks: prefijo `use` (`useScrollSpy.ts`)
- Tipos: interface con sufijo descriptivo (`PersonaData`, `SenaProfile`)
- Variables/funciones: camelCase
- Constantes: SCREAMING_SNAKE_CASE

### Componentes
- Named exports siempre
- Props tipadas con interface
- Evitar `any`
- `'use client'` no es necesario (no Next.js, es Vite puro)

### Tailwind
- No CSS inline (solo Tailwind utilities)
- Para variantes dinámicas: `clsx` o template literals
- Prefiero `className` con agrupación semántica

---

## MASCOTA SENA - REGLAS DE DISEÑO

### Identidad visual
- Avatar geométrico (hexágono con anillo orbital)
- Color: Gradiente azul-índigo (#3B82F6 → #6366F1)
- Animación idle: pulse suave + rotación lenta del anillo
- Animación activa: rotación rápida + glow pulsante

### Flujo de onboarding (5 pasos)
1. **Bienvenida** → Presentación de SENA + botón "Comenzar"
2. **Rol** → ¿Cuál es tu perfil? (Docente / Director / Investigador / Emprendedor)
3. **Pregunta 1** → Contextual según rol
4. **Pregunta 2** → Contextual según rol
5. **Perfil generado** → Resumen + "Explorar el sistema"

### Personalización post-onboarding
- Badge en nav: "Vista: [Rol]"
- Persona destacada según rol
- Intro de Hero personalizada

---

## SECCIONES DEL DASHBOARD

| ID         | Ruta    | Título                           |
|------------|---------|----------------------------------|
| inicio     | #inicio | Inicio / Hero                    |
| problema   | #problema | El problema                   |
| solucion   | #solucion | La solución                   |
| fricciones | #fricciones | Fricciones del sistema       |
| personas   | #personas | Buyer Personas                |
| escenarios | #escenarios | Escenarios de uso           |
| impacto    | #impacto | Impacto esperado              |
| reflexion  | #reflexion | Reflexión IA vs humano       |

---

## REGLAS ABSOLUTAS

1. **Todo en español** (sin emojis)
2. **Funciona 100% offline** (sin CDN, sin APIs externas)
3. **No inventar estadísticas reales** — solo métricas propuestas/sugeridas
4. **Contraste proyector**: todos los textos sobre fondos oscuros deben superar WCAG AA
5. **No se ve genérico**: cada sección tiene layout y composición propios
6. **Buyer Personas**: imagen local + video local + narrativa + fricción + solución
7. **Assets de usuario** están en `/assets/` — las rutas deben ser `../assets/persona1.png` desde `/dashboard/public/`
8. Los assets deben copiarse a `dashboard/public/assets/` para que Vite los sirva

---

## INSTRUCCIONES DE EJECUCIÓN

```bash
# Instalar dependencias
cd dashboard
npm install

# Desarrollo
npm run dev
# → Abre http://localhost:5173

# Build de producción
npm run build

# Preview del build
npm run preview
```

**Antes de correr:** copiar assets del usuario a `dashboard/public/assets/`

---

## NOTAS PARA CODEX

Cuando Claude Code pasa trabajo a Codex, los archivos pendientes están en `AGENT-SYNC.md` sección "PENDIENTE CODEX".
Codex debe leer AGENT-SYNC.md antes de cada sesión y documentar sus cambios en el log.

Ver también: `HANDOFF-PROTOCOL.md` — protocolo completo de peer-review entre agentes.

---

## VIBE CODING 2.0 — REGLAS ADAPTADAS AL PROYECTO

> Fuente: artículo "Vibe Coding 2.0: 18 Rules to be the Top 1% builder"
> Adaptado al contexto offline/presentación de ALERTA-ED

### Reglas activas en este proyecto

**1. Usa componentes listos para producción**
- Usamos Lucide React para iconos (no dibujamos SVGs manuales)
- Tailwind para todo el estilo (cero CSS inline, cero hojas externas)
- Framer Motion para animaciones (no CSS keyframes manuales)
- Sistema de diseño propio (tokens en tailwind.config.js, no colores ad-hoc)

**2. No sobreingenieres el estado**
- Solo `useState` + `useRef` + props — sin Context, sin Zustand, sin Redux
- Estado global únicamente para el onboarding (hook `useOnboarding`)
- Framer Motion maneja estados de animación, no React

**3. Estructura de carpetas limpia y modular**
- components/ → onboarding/ + layout/ + ui/ + sections/
- data/ → un archivo por dominio (personas, fricciones, project, sena-flow)
- hooks/ → solo hooks que se reusan en 2+ componentes
- Nunca archivos "utils" que terminen siendo catch-all de basura

**4. Rendimiento desde el inicio**
- Imágenes optimizadas en /public/assets/ (no URLs externas)
- Sin fuentes web (system font stack)
- Bundle target: < 400 kB JS total (Lighthouse score > 80)
- useInView con `once: true` — animaciones solo al primer scroll

**5. Diseño anti-genérico — REGLA MÁS IMPORTANTE**
- Cada sección tiene layout y composición únicos (no repetir el mismo card grid en todas)
- Colores semánticos: rojo = peligro, ámbar = advertencia, azul = info — siempre consistentes
- Tipografía con jerarquía clara: no usar text-sm para todo
- Animaciones con propósito: no agregar motion.div donde no aporte UX
- Gradientes sutiles, no llamativos. Glow effects solo en elementos clave.

**6. Documentar decisiones técnicas**
- Cada cambio de arquitectura va en AGENT-SYNC.md
- Cada componente complejo tiene comentario de propósito en línea 1-3
- Los datos ficticios/propuestos siempre marcados con `// TODO` o "Métrica propuesta"

**7. Build verde antes de hacer commit**
- `npm run build` debe completar sin errores TypeScript
- Si TypeScript da error, resolverlo — nunca usar `as any` como escape
- Los assets opcionales (imágenes, videos) SIEMPRE tienen fallback visual

**8. Iteración sobre perfección**
- Mejor presentable y funcional que perfecto y sin terminar
- Los TODOs de contenido se documentan en AGENT-SYNC.md, no bloquean el build
- Cada sesión termina con un build verde y un log de actividad

### Reglas que NO aplican (contexto offline/presentación)

- ~~Clerk/Supabase Auth~~ — No hay usuarios reales ni login
- ~~Stripe payments~~ — No hay transacciones
- ~~Prisma/PostgreSQL~~ — Datos estáticos en .ts
- ~~Vercel/CI-CD~~ — Build local + preview manual
- ~~Sentry/Analytics~~ — No hay producción real
- ~~Environment variables~~ — No hay secrets (todo offline)
- ~~tRPC/Server Actions~~ — No hay backend
