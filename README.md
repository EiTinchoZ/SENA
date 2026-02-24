<div align="center">

<img src="assets/github/logo-sena-alertaed.png" alt="ALERTA-ED" width="80" />

# ALERTA-ED

**Sistema de Alerta Temprana para la Deserción Escolar**

[**Ver demo en vivo →**](https://EiTinchoZ.github.io/SENA/)
&nbsp;·&nbsp;
[Reportar problema](https://github.com/EiTinchoZ/SENA/issues)

<br />

![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF0080?logo=framer&logoColor=white&style=flat-square)
![Estado](https://img.shields.io/badge/estado-listo%20para%20presentar-16a34a?style=flat-square)
![Offline](https://img.shields.io/badge/100%25-offline-0f766e?style=flat-square)

</div>

<br />

![Cover](assets/github/cover-sena-alertaed.png)

<br />

## Qué es

Dashboard interactivo construido como pitch académico/profesional para presentar **ALERTA-ED**: una propuesta de sistema predictivo que detecta riesgo de abandono escolar antes de que sea irreversible.

La experiencia emula un producto real: onboarding con IA, visualizaciones de datos, narrativa de negocio y panel de administración con persistencia local.

---

## Características

| Feature | Descripción |
|---|---|
| **Onboarding SENA** | La mascota IA identifica tu rol (docente, director, investigador, emprendedor) y personaliza la vista |
| **8 secciones narrativas** | Problema → Solución → Fricciones → Personas → Escenarios → Impacto → Reflexión |
| **Datos EN VIVO** | Panel de riesgo con animación en tiempo real, actualización cada 4 segundos |
| **Panel de admin** | Drawer lateral para editar todo el contenido, persistido en `localStorage` |
| **Modo claro/oscuro** | Toggle instantáneo sin recarga de página |
| **Exportar como PNG** | Captura el dashboard completo en alta resolución |
| **Navegación por teclado** | Flechas `↑ ↓` y teclas `1–8` para navegar entre secciones |
| **100% offline** | Sin APIs externas, sin Google Fonts, funciona sin internet |

---

## Stack

| Tecnología | Versión | Propósito |
|---|---|---|
| [Vite](https://vitejs.dev/) | 5.x | Build tool y dev server |
| [React](https://react.dev/) | 18.x | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilos utility-first |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animaciones y transiciones |
| [Lucide React](https://lucide.dev/) | latest | Iconografía |
| [html2canvas](https://html2canvas.hertzen.com/) | 1.x | Exportación a PNG (lazy-loaded) |

---

## Inicio rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/EiTinchoZ/SENA.git
cd SENA/dashboard

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:5173
```

**Build de producción:**

```bash
npm run build    # genera dashboard/dist/
npm run preview  # previsualiza el build
```

> **Nota sobre assets:** las imágenes y videos de personas van en `dashboard/public/assets/`. Sin ellos la app funciona con estados de fallback visuales.

---

## Estructura del proyecto

```
SENA/
├── dashboard/               # Aplicación Vite + React
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/       # AdminPanel y AdminToggle (drawer editable)
│   │   │   ├── layout/      # Navigation y ScrollProgress
│   │   │   ├── onboarding/  # SenaOnboarding, SenaAvatar
│   │   │   ├── sections/    # 8 secciones del dashboard
│   │   │   └── ui/          # RiskSignal, AlertTimeline, ExportButton…
│   │   ├── context/         # AdminContext (estado global con localStorage)
│   │   ├── data/            # Datos estáticos del proyecto
│   │   ├── hooks/           # useScrollSpy, useKeyboardNavigation…
│   │   └── types/           # Tipos TypeScript
│   └── public/assets/       # Imágenes y videos (no incluidos en repo)
├── design-system/           # Sistema de diseño y tokens
├── assets/github/           # Branding del repositorio
└── docs/                    # Documentación técnica interna
```

---

## Despliegue

El proyecto se despliega automáticamente en **GitHub Pages** al hacer push a `main`.

Para deploy manual en Vercel:

| Campo | Valor |
|---|---|
| Root Directory | `dashboard` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## Licencia y autoría

Desarrollado por **Martín Bundy** — [@EiTinchoZ](https://github.com/EiTinchoZ)

Publicado para demostración académica. Todos los derechos reservados.
No se permite uso, copia, modificación o distribución sin autorización expresa del autor.

Ver [LICENSE](LICENSE) · [NOTICE](NOTICE) · [SECURITY.md](SECURITY.md)

---

<div align="center">
  <sub>ALERTA-ED — Proyecto académico / Emprendimiento Digital · 2026</sub>
</div>
