// ============================================================
// ALERTA-ED — Utilidades generales
// ============================================================

// Combina clases de Tailwind de forma segura
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Convierte un nivel de impacto a clase de color
export function impactToColor(nivel: 'alto' | 'medio' | 'bajo'): string {
  const map = {
    alto: 'text-red-400',
    medio: 'text-amber-400',
    bajo: 'text-emerald-400',
  };
  return map[nivel];
}

// Convierte una señal a clase de color de texto
export function signalToTextColor(signal: 'safe' | 'warning' | 'danger' | 'info'): string {
  const map = {
    safe: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    info: 'text-blue-400',
  };
  return map[signal];
}

// Convierte una señal a clase de fondo muted
export function signalToBgMuted(signal: 'safe' | 'warning' | 'danger' | 'info'): string {
  const map = {
    safe: 'bg-emerald-500/10',
    warning: 'bg-amber-500/10',
    danger: 'bg-red-500/10',
    info: 'bg-blue-500/10',
  };
  return map[signal];
}

// Convierte una señal a clase de borde
export function signalToBorder(signal: 'safe' | 'warning' | 'danger' | 'info'): string {
  const map = {
    safe: 'border-emerald-500/25',
    warning: 'border-amber-500/25',
    danger: 'border-red-500/25',
    info: 'border-blue-500/25',
  };
  return map[signal];
}

// Badge variant a colores combinados
export function badgeVariantClasses(variant: 'safe' | 'warning' | 'danger' | 'info'): string {
  const map = {
    safe: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };
  return map[variant];
}

// Formatea un número con separador de miles
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-AR').format(n);
}

// Trunca un texto a N caracteres
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

// Scroll suave a una sección por ID
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
