# VIBE-CODE METHODOLOGY — Adaptación para ALERTA-ED
> Basado en el framework "Technical Co-Founder" (Miles Deutscher)
> Adaptado de MONDI y Vitae.ai — ver proyectos hermanos para referencia

---

## LAS 5 FASES

### Fase 1: DISCOVERY ✅
- Entendimiento del proyecto: Sistema de Alerta Temprana para Deserción Escolar
- Stack definido: Vite + React + TypeScript + Tailwind + Framer Motion
- Mascota IA: SENA con onboarding personalizado por rol
- Modo: 100% offline, para presentación en clase / proyector

### Fase 2: PLANNING ✅
- Sistema de diseño definido (tokens, tipografía, composición)
- Arquitectura de componentes definida
- Flujo de SENA definido (5 pasos)
- División de trabajo Claude Code / Codex documentada

### Fase 3: BUILDING 🔄 (actual)
- Setup del proyecto Vite + React
- Componentes UI base
- Secciones del dashboard
- Onboarding SENA

### Fase 4: POLISH
- Microinteracciones
- Revisión de contraste/accesibilidad
- Prueba en proyector
- Ajuste de tiempos de animación

### Fase 5: HANDOFF
- Build de producción (`npm run build`)
- Documentación de uso
- Instrucciones para agregar assets

---

## REGLAS DE ORO (Adaptadas al proyecto)

### 1. "No solo que funcione — algo de lo que estés orgulloso de mostrar en clase"
- Cada sección debe verse como una demo de startup real
- Los Buyer Personas deben verse vivos: imagen + video + historia completa
- El Hero debe captar atención en los primeros 15 segundos
- El contraste en proyector debe ser impecable

### 2. "Esto es REAL, no mockup"
- El código compila y corre: `npm install && npm run dev`
- Los assets se referencian con rutas reales (no placeholder broken images)
- La navegación funciona, los modales abren, los videos se reproducen

### 3. "Tú en control, siempre"
- Todo el contenido de texto está en `/src/data/` — fácil de editar
- Los assets van en `dashboard/public/assets/` — fácil de reemplazar
- Los comentarios `// TODO: REEMPLAZAR` marcan dónde agregar contenido real

---

## DIVISIÓN CLAUDE CODE vs CODEX

### Claude Code (Anthropic) — El Arquitecto
**Hace:**
- Define la arquitectura y el sistema de diseño
- Escribe los componentes principales y su lógica
- Decide las decisiones técnicas y de UX
- Crea y mantiene la documentación
- Resuelve problemas complejos (animaciones, state management)

**No hace:**
- Código repetitivo simple (Codex lo hace más rápido)
- Variantes menores de un componente ya existente

### Codex (OpenAI) — El Implementador
**Hace:**
- Genera variantes de componentes ya existentes
- Completa funcionalidades menores
- Refactoriza código repetitivo
- Genera código boilerplate rápido

**No hace:**
- Decisiones arquitectónicas (eso es de Claude Code)
- Cambiar el design system sin consultar CLAUDE.md

---

## PUNTOS DE SINCRONIZACIÓN

Cada vez que cualquier agente trabaja en el proyecto:
1. Leer `AGENT-SYNC.md` al inicio
2. Actualizar estado en `AGENT-SYNC.md` al finalizar
3. Si se agregan archivos nuevos, documentarlos en CLAUDE.md estructura

---

## CRITERIOS DE ÉXITO (auto-validación)

Antes de declarar el proyecto completo, verificar:

- [ ] `npm run dev` corre sin errores
- [ ] `npm run build` compila exitosamente
- [ ] La presentación corre offline (sin WiFi)
- [ ] SENA onboarding completa los 5 pasos sin bugs
- [ ] Cada sección tiene un layout distinto (no genérico)
- [ ] Hero: en 15 segundos se entiende problema → solución → valor
- [ ] Buyer Personas: imagen + video + historia visibles
- [ ] Textos legibles en proyector (contraste alto)
- [ ] Sin emojis en ninguna parte del UI
- [ ] Todo el contenido en español neutro
