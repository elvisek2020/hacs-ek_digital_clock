import type { HomeAssistant } from 'custom-card-helpers';

type ThemeVars = Record<string, string>;

type ThemeDefinition = ThemeVars & {
  modes?: { light?: ThemeVars; dark?: ThemeVars };
};

interface ThemesData {
  themes?: Record<string, ThemeDefinition>;
  darkMode?: boolean;
}

const APPLIED_KEY = '__ekDigitalClockThemeVars';

type ThemedElement = HTMLElement & { [APPLIED_KEY]?: string[] };

/**
 * Aplikuje HA motiv na element. Na rozdíl od `applyThemesOnElement`
 * z custom-card-helpers zvládá i `modes: { light, dark }`, které
 * používá většina dnešních motivů.
 */
export function applyTheme(
  element: HTMLElement,
  hass: HomeAssistant | undefined,
  themeName?: string,
): void {
  const host = element as ThemedElement;

  for (const property of host[APPLIED_KEY] ?? []) {
    element.style.removeProperty(property);
  }
  host[APPLIED_KEY] = [];

  const name = themeName?.trim();
  if (!hass || !name || name === 'default') {
    return;
  }

  const themes = hass.themes as unknown as ThemesData | undefined;
  const theme = themes?.themes?.[name];
  if (!theme) {
    return;
  }

  const { modes, ...base } = theme;
  const modeVars = themes?.darkMode ? modes?.dark : modes?.light;
  const vars: ThemeVars = { ...(base as ThemeVars), ...(modeVars ?? {}) };

  const applied: string[] = [];
  for (const [key, value] of Object.entries(vars)) {
    if (typeof value !== 'string') {
      continue;
    }
    const property = `--${key}`;
    element.style.setProperty(property, value);
    applied.push(property);

    const rgb = hexToRgbList(value);
    if (rgb) {
      const rgbProperty = `--rgb-${key}`;
      element.style.setProperty(rgbProperty, rgb);
      applied.push(rgbProperty);
    }
  }

  host[APPLIED_KEY] = applied;
}

function hexToRgbList(value: string): string | null {
  const hex = value.trim();
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
    return null;
  }
  const full =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  const r = parseInt(full.slice(1, 3), 16);
  const g = parseInt(full.slice(3, 5), 16);
  const b = parseInt(full.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
