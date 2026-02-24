# HANDOFF-PROTOCOL.md — Protocolo de Peer-Review entre Agentes
> Aplica a: ALERTA-ED, CV Martin Bundy 2026, Proyecto Financiero
> Última actualización: 2026-02-24 | Establecido en sesión 003

---

## PRINCIPIO FUNDAMENTAL

Ningún agente trabaja en el vacío. **Cada sesión termina generando un prompt de handoff.**
El otro agente DEBE revisar lo que se hizo antes de continuar con su tarea.
El usuario aprueba o rechaza el trabajo antes de que el siguiente agente proceda.

---

## FLUJO DE TRABAJO

```
Claude Code trabaja
        ↓
Genera HANDOFF PROMPT → se lo da al usuario
        ↓
Usuario se lo pasa a Codex
        ↓
Codex REVISA lo que hizo Claude Code
        ↓
Codex da feedback: ✅ aprobado / ⚠️ observaciones / ❌ necesita corrección
        ↓
Usuario aprueba el visto bueno o pide correcciones
        ↓
Codex ejecuta su tarea
        ↓
Codex genera HANDOFF PROMPT → se lo da al usuario
        ↓
Usuario se lo pasa a Claude Code
        ↓
Claude Code REVISA lo que hizo Codex
        ↓
Claude Code da feedback + continúa
```

---

## TEMPLATE: HANDOFF PROMPT DE CLAUDE CODE PARA CODEX

```
=== HANDOFF: CLAUDE CODE → CODEX ===
Proyecto: [nombre del proyecto]
Sesión: [N]
Fecha: [fecha]

--- LO QUE HICE EN ESTA SESIÓN ---
[Lista detallada de cambios: archivos modificados, qué hace cada cambio,
decisiones técnicas tomadas, por qué se tomaron]

--- ARCHIVOS MODIFICADOS ---
[Lista con ruta completa de cada archivo tocado]

--- BUILD STATUS ---
[✓/✗] npm run build — [tiempo] — [tamaño bundle]
[✓/✗] TypeScript — sin errores / errores encontrados

--- LO QUE NECESITO QUE REVISES ---
Antes de empezar tu tarea, necesito que:
1. [Aspecto específico a revisar — ej: "Verifica que los fallbacks de imágenes funcionen"]
2. [Aspecto específico — ej: "Confirma que los tipos TypeScript sean correctos"]
3. [Aspecto específico — ej: "Revisa que el diseño de X sección sea premium y no genérico"]

Dame tu visto bueno (✅), observaciones (⚠️) o correcciones necesarias (❌).

--- TU SIGUIENTE TAREA ---
[Descripción exacta de lo que Codex debe hacer en su sesión]

--- CONTEXTO PARA TU TAREA ---
[Información relevante que Codex necesita para su tarea]

=== FIN DE HANDOFF ===
```

---

## TEMPLATE: HANDOFF PROMPT DE CODEX PARA CLAUDE CODE

```
=== HANDOFF: CODEX → CLAUDE CODE ===
Proyecto: [nombre del proyecto]
Sesión: [N]
Fecha: [fecha]

--- REVISIÓN DE LO QUE HIZO CLAUDE CODE ---
Analicé los cambios de la sesión anterior:

ARCHIVOS REVISADOS:
- [archivo 1]: [comentario — ej: "Lógica correcta, tipos bien definidos"]
- [archivo 2]: [comentario — ej: "Observación: el padding en mobile podría ajustarse"]

VISTO BUENO GENERAL: ✅ / ⚠️ / ❌
OBSERVACIONES:
[Comentarios concretos, constructivos. No ser genérico. Si algo está mal, decir por qué.]

CORRECCIONES REALIZADAS (si aplica):
[Lista de lo que tuve que corregir del trabajo anterior]

--- LO QUE HICE EN ESTA SESIÓN ---
[Lista detallada de cambios ejecutados]

--- ARCHIVOS MODIFICADOS ---
[Lista con ruta completa]

--- BUILD STATUS ---
[✓/✗] npm run build — [tiempo] — [tamaño bundle]

--- LO QUE NECESITO QUE REVISES (CLAUDE CODE) ---
1. [Aspecto específico a verificar]
2. [Aspecto específico a verificar]

--- PRÓXIMA TAREA SUGERIDA ---
[Lo que Codex recomienda que Claude Code haga a continuación]

=== FIN DE HANDOFF ===
```

---

## REGLAS DEL PEER-REVIEW

### Ambos agentes deben:

1. **Leer AGENT-SYNC.md al inicio de cada sesión** — ver qué hizo el otro
2. **Dar feedback específico** — no "se ve bien" sino "el gradiente en línea 47 de Hero.tsx es muy saturado para proyector"
3. **Verificar el build** antes de generar su handoff — nunca entregar trabajo roto
4. **Nunca asumir** que el otro hizo las cosas perfectas — revisar con ojos críticos
5. **Documentar toda decisión técnica** no obvia en AGENT-SYNC.md

### Criterios de calidad a revisar en cada handoff:

**Diseño (anti-genérico)**
- ¿Cada sección tiene un layout distinto o es un copy-paste con otro color?
- ¿Los colores son semánticos y consistentes con el design system?
- ¿Las animaciones tienen propósito o son decorativas sin función?
- ¿El contraste supera WCAG AA para proyector?

**Código**
- ¿Hay errores TypeScript ocultos con `as any` o `!`?
- ¿Los tipos son correctos o genéricos?
- ¿Los fallbacks de assets (imágenes/videos) están implementados?
- ¿La estructura de carpetas sigue las convenciones del proyecto?

**Contenido**
- ¿Los datos reflejan el contenido real del PDF o son genéricos?
- ¿Los nombres (Carlos, José, Marta) son consistentes en toda la app?
- ¿Los textos están en español sin anglicismos innecesarios?

**Performance**
- ¿El bundle sigue siendo < 400 kB?
- ¿Las animaciones usan `once: true` en useInView?

---

## VISTO BUENO DEL USUARIO

El usuario (Martín Bundy) debe aprobar cada handoff antes de que el siguiente agente proceda.

**Si el feedback es ✅**: el siguiente agente puede proceder con su tarea.
**Si el feedback es ⚠️**: el siguiente agente corrige primero las observaciones, luego ejecuta su tarea.
**Si el feedback es ❌**: el agente actual corrige sus errores antes de generar un nuevo handoff.

El usuario puede agregar contexto adicional, assets, o nuevos requisitos al aprobar el handoff.

---

## HISTORIAL DE HANDOFFS

| Sesión | De → Para | Status | Fecha |
|--------|-----------|--------|-------|
| 001→002 | Claude Code → Claude Code | ✅ | 2026-02-24 |
| 002→003 | Claude Code → Claude Code | ✅ | 2026-02-24 |
| 003→Codex | Ver sección abajo | Pendiente usuario | 2026-02-24 |
