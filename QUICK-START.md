# QUICK-START — ALERTA-ED

## Para ejecutar el proyecto

```bash
# 1. Ir al directorio del dashboard
cd "C:/Users/mbund/Escritorio/mi-claude/Emprendimiento Digitsal/dashboard"

# 2. Instalar dependencias (solo la primera vez)
npm install

# 3. Copiar assets a la carpeta pública (si aún no están)
# Copiar manualmente desde assets/ a dashboard/public/assets/:
# - persona1.png, persona2.png, persona3.png
# - persona1.mp4, persona2.mp4, persona3.mp4

# 4. Modo desarrollo
npm run dev
# → Abre http://localhost:5173

# 5. Build para presentación offline
npm run build
npm run preview
# → Sirve desde dist/ en http://localhost:4173
```

## Para editar contenido

| Qué cambiar             | Archivo                              |
|-------------------------|--------------------------------------|
| Buyer Personas          | `src/data/personas.ts`              |
| Fricciones por actor    | `src/data/fricciones.ts`            |
| Datos del proyecto      | `src/data/project.ts`               |
| Flujo de SENA           | `src/data/sena-flow.ts`             |
| Métricas de impacto     | `src/data/project.ts` sección metrics |
| Reflexión IA vs humano  | `src/data/project.ts` sección reflexion |

Todos los textos tienen comentarios `// TODO: REEMPLAZAR` donde hay contenido placeholder.

## Para iniciar sesión con Claude Code o Codex

**Prompt de inicio para Claude Code:**
```
Lee AGENT-SYNC.md y CLAUDE.md en "C:/Users/mbund/Escritorio/mi-claude/Emprendimiento Digitsal"
y continúa desde donde quedamos. El proyecto es ALERTA-ED.
```

**Prompt de inicio para Codex:**
```
Lee AGENT-SYNC.md y sección "PENDIENTE CODEX" en
"C:/Users/mbund/Escritorio/mi-claude/Emprendimiento Digitsal".
Implementa las tareas asignadas y documenta en el log.
```
