# DESIGN SYSTEM MASTER — ALERTA-ED
> Sistema de diseño oficial de la plataforma
> Versión: 1.0 | Fecha: 2026-02-24

---

## IDENTIDAD VISUAL

### Concepto
**"Seria. Humana. Tecnológica."**

La identidad visual combina:
- La **seriedad** de un sistema de inteligencia institucional
- La **calidez** humana del cuidado al estudiante
- La **precisión** de un sistema basado en datos e IA

### Estilo
- Dark mode exclusivo (óptimo para proyector y contexto tech)
- Paleta azul profundo + señales de alerta en ámbar
- Composición asimétrica en secciones clave (no layout genérico)
- Tipografía de sistema (funciona sin internet)

---

## PALETA DE COLORES

### Fondos (Background Scale)
```
bg-base:     #04080F  → Fondo raíz (negro azulado profundo)
bg-surface:  #080E1A  → Superficie principal de página
bg-card:     #0C1525  → Fondo de tarjetas default
bg-elevated: #111D30  → Tarjetas destacadas / elevated
bg-overlay:  #162844  → Overlays y paneles flotantes
```

### Bordes (Border Scale)
```
border-subtle:  #162035  → Bordes muy sutiles (divisores)
border-default: #1E2E48  → Bordes estándar de componentes
border-strong:  #2A3F60  → Bordes activos / hover
border-focus:   #3B82F6  → Bordes de foco (accesibilidad)
```

### Primario (Azul — Tecnología & Confianza)
```
primary:       #3B82F6  → Azul-500 (default)
primary-hover: #2563EB  → Azul-600 (hover)
primary-light: #60A5FA  → Azul-400 (textos sobre oscuro)
primary-muted: rgba(59,130,246,0.12)  → Fondos muted
primary-glow:  rgba(59,130,246,0.20)  → Efectos glow
```

### Señales de Alerta (Signal Scale)
```
signal-danger:   #EF4444  → Rojo (riesgo alto)
signal-warning:  #F59E0B  → Ámbar (riesgo medio / atención)
signal-safe:     #10B981  → Esmeralda (en seguimiento / ok)
signal-info:     #3B82F6  → Azul (información)
signal-neutral:  #6B7280  → Gris (sin datos)
```

Versiones muted (para fondos de badges):
```
signal-danger-muted:  rgba(239,68,68,0.12)
signal-warning-muted: rgba(245,158,11,0.12)
signal-safe-muted:    rgba(16,185,129,0.12)
signal-info-muted:    rgba(59,130,246,0.12)
```

### Texto (Text Scale)
```
text-primary:   #EFF6FF  → Blanco azulado (headings, texto principal)
text-secondary: #7CB3E0  → Azul claro muted (body secundario)
text-muted:     #3D6080  → Muy apagado (captions, placeholders)
text-inverse:   #04080F  → Para texto sobre fondos claros
```

### Acento (Ámbar — Alertas & Highlights)
```
accent:        #F59E0B  → Ámbar principal
accent-hover:  #D97706  → Hover
accent-muted:  rgba(245,158,11,0.12)  → Fondo destacado
```

---

## TIPOGRAFÍA

### Stack (sin internet)
```css
/* Principal */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Monoespaciada (datos, código, métricas) */
--font-mono: 'Cascadia Code', 'Cascadia Mono', 'Consolas',
             'Fira Code', 'Courier New', monospace;
```

### Escala tipográfica

| Token       | Size  | Weight | Line-height | Uso                          |
|-------------|-------|--------|-------------|------------------------------|
| `text-xs`   | 11px  | 500    | 1.4         | Badges, labels técnicos       |
| `text-sm`   | 13px  | 400    | 1.5         | Captions, metadata            |
| `text-base` | 15px  | 400    | 1.6         | Body principal                |
| `text-lg`   | 17px  | 500    | 1.5         | Body destacado                |
| `text-xl`   | 20px  | 600    | 1.4         | Subtítulos de card            |
| `text-2xl`  | 24px  | 700    | 1.3         | Títulos de card               |
| `text-3xl`  | 30px  | 700    | 1.2         | Títulos de sección            |
| `text-4xl`  | 36px  | 800    | 1.1         | Títulos grandes               |
| `text-5xl`  | 48px  | 900    | 1.0         | Hero headline                 |
| `text-6xl`  | 60px  | 900    | 0.95        | Hero mega headline            |

### Jerarquía visual

```
NIVEL 1 → text-5xl/6xl + font-black + text-primary    → Hero headline
NIVEL 2 → text-3xl/4xl + font-bold + text-primary     → Títulos de sección
NIVEL 3 → text-xl/2xl + font-semibold + text-primary  → Títulos de card
NIVEL 4 → text-base/lg + font-normal + text-secondary → Body
NIVEL 5 → text-sm + font-medium + text-muted          → Metadata/captions
```

---

## ESPACIADO (8-point grid)

```
4px  → spacing-1  (micro: entre badge y texto)
8px  → spacing-2  (small: padding interno mínimo)
12px → spacing-3  (entre elementos inline)
16px → spacing-4  (padding estándar de componentes)
24px → spacing-6  (padding de cards)
32px → spacing-8  (gap entre componentes)
48px → spacing-12 (gap entre secciones internas)
64px → spacing-16 (padding de secciones)
96px → spacing-24 (margin entre secciones grandes)
128px → spacing-32 (secciones hero)
```

---

## BORDES Y RADIOS

```
rounded-sm:  4px   → Badges, tags pequeños
rounded:     6px   → Botones pequeños, inputs
rounded-md:  8px   → Cards default
rounded-lg:  12px  → Cards premium
rounded-xl:  16px  → Modales, panels
rounded-2xl: 20px  → Hero cards, destacados
rounded-full: 9999px → Avatares, pills
```

---

## SOMBRAS

```css
/* Shadow sutil (cards default) */
shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2);

/* Shadow elevada (modales, panels) */
shadow-elevated: 0 10px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3);

/* Glow primario (elementos destacados) */
glow-primary: 0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.08);

/* Glow señal de alerta */
glow-warning: 0 0 20px rgba(245,158,11,0.15), 0 0 40px rgba(245,158,11,0.08);

/* Glow peligro */
glow-danger: 0 0 20px rgba(239,68,68,0.15);
```

---

## COMPONENTES BASE

### Card
```
Default card:
- bg-card (#0C1525)
- border border-default (#1E2E48)
- rounded-lg (12px)
- p-6 (24px padding)
- Hover: border-strong (#2A3F60) + shadow elevada
```

### Badge
```
Tamaños: xs (20px) | sm (24px)
Shape: rounded-full
Padding: px-2 py-0.5 (sm) | px-3 py-1 (default)

Variantes:
- default: bg-primary-muted + text-primary + border-primary/20
- warning: bg-warning-muted + text-amber-400 + border-amber/20
- danger: bg-danger-muted + text-red-400 + border-red/20
- safe: bg-safe-muted + text-emerald-400 + border-emerald/20
```

### Button
```
Primary: bg-primary hover:bg-primary-hover text-white
          px-6 py-3 rounded-lg font-semibold
          transition-all duration-200

Ghost: bg-transparent border border-default hover:border-strong
       text-secondary hover:text-primary

Outline: border border-primary text-primary hover:bg-primary-muted
```

### RiskSignal (componente único)
```
Tres indicadores visuales en el Hero:
- Círculo con color de señal + pulse animation
- Número grande (font-mono)
- Label pequeño debajo
- Hover: glow intensificado + tooltip
```

### AlertTimeline (componente único)
```
Línea de tiempo vertical con eventos ficticios:
- Puntos de evento con color según severidad
- Línea conectora con gradiente
- Timestamps en monospace
- Animación de entrada escalonada
```

---

## ANIMACIONES

### Principios
- Duración estándar: 200-400ms
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out suave)
- Sin animaciones demasiado llamativas que distraigan
- Microinteracciones en hover/focus siempre

### Framer Motion presets
```ts
// Fade in + slide up (entradas de sección)
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
}

// Stagger container (grupos de cards)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

// Scale in (modales)
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

// SENA pulse (avatar animación idle)
const senaPulse = {
  animate: {
    scale: [1, 1.04, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
  }
}
```

---

## LAYOUTS POR SECCIÓN

| Sección       | Layout                                                    |
|---------------|-----------------------------------------------------------|
| Hero          | Split panel: 60% briefing + 40% Risk Signals / Mission Control |
| Problema      | Grid asimétrico: título lateral + cards en 2 columnas + conexiones |
| Solución      | Flow horizontal con nodos conectados + descripción lateral |
| Fricciones    | Tabs por actor + bullets dentro de panel                  |
| Buyer Personas| Grid 3 columnas con cards premium + modal de detalle      |
| Escenarios    | Galería horizontal de videos con captions descriptivos    |
| Impacto       | Métricas en grid + columnas de beneficios                 |
| Reflexión     | Dos columnas: IA vs Humano + análisis de persona viable   |

---

## GUÍA DE CONTRASTE (Proyector)

Todos los textos deben superar WCAG AA (4.5:1 ratio mínimo):

| Texto        | Fondo       | Ratio estimado |
|--------------|-------------|----------------|
| #EFF6FF      | #0C1525     | ~18:1 ✅        |
| #7CB3E0      | #0C1525     | ~8:1  ✅        |
| #3B82F6      | #0C1525     | ~6:1  ✅        |
| #F59E0B      | #0C1525     | ~9:1  ✅        |
| #10B981      | #0C1525     | ~7:1  ✅        |
| #EF4444      | #0C1525     | ~5:1  ✅        |

**Regla de proyector:** Nunca usar texto más pequeño de 14px en partes informativas clave.
