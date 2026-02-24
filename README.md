# SENA - ALERTA-ED

Dashboard/presentacion web interactiva de ALERTA-ED para prevencion de desercion escolar con IA y enfoque 100% offline.

## Estado

- Proyecto terminado y listo para presentacion.
- Build validado: Vite + React + TypeScript.
- Funciona sin APIs externas.

## Stack

- Vite 5
- React 18
- TypeScript 5
- Tailwind CSS 3
- Framer Motion 11
- Lucide React

## Estructura del repo

- `dashboard/`: app principal (frontend).
- `design-system/`: sistema de diseno y reglas visuales.
- `tasks/`: tareas del proyecto.
- `AGENT-SYNC.md`: estado de sesiones y handoffs.
- `CLAUDE.md`: arquitectura y lineamientos tecnicos.

## Ejecutar en local

```bash
cd dashboard
npm install
npm run dev
```

Build de produccion:

```bash
cd dashboard
npm run build
npm run preview
```

## Deploy en Vercel

Config recomendada:

- Root Directory: `dashboard`
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

## Seguridad y propiedad intelectual

Este repositorio esta protegido con licencia propietaria.

- Ver [LICENSE](LICENSE)
- Ver [NOTICE](NOTICE)
- Ver [SECURITY.md](SECURITY.md)

No se permite uso, copia, modificacion, redistribucion ni explotacion comercial sin autorizacion expresa y por escrito del titular.

## Autor

- Martin Bundy

