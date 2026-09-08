const EXPLICIT_COLOR = /^(#|rgb|rgba|hsl|hsla|var\()/i;

/**
 * Převede hodnotu z `ui_color` selectoru na použitelnou CSS barvu.
 * Pojmenované HA barvy (red, primary, ...) mapuje na theme proměnné.
 */
export function computeCssColor(value?: string): string | undefined {
  const color = value?.trim();
  if (!color || color === 'none' || color === 'state') {
    return undefined;
  }
  if (EXPLICIT_COLOR.test(color)) {
    return color;
  }
  return `var(--${color}-color)`;
}
