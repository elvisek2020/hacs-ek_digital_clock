import type { HomeAssistant } from 'custom-card-helpers';
import { computeCssColor } from './color';
import type { FormattedTemperature, TemperatureSlotConfig } from './types';

const DEFAULT_ICON = 'mdi:thermometer';
const UNAVAILABLE_STATES = ['unavailable', 'unknown', 'none', ''];

export function hasTemperatureSlots(
  left?: TemperatureSlotConfig,
  right?: TemperatureSlotConfig,
): boolean {
  return Boolean(left?.entity || right?.entity);
}

export function formatTemperatureSlot(
  hass: HomeAssistant | undefined,
  slot: TemperatureSlotConfig | undefined,
  fallbackLabel: string,
  fallbackIcon: string,
): FormattedTemperature | null {
  if (!slot?.entity) {
    return null;
  }

  const stateObj = hass?.states?.[slot.entity];
  const raw = stateObj?.state;
  const precision = slot.precision ?? 1;

  let value = '—';
  let available = false;
  if (raw !== undefined && !UNAVAILABLE_STATES.includes(raw)) {
    const num = Number(raw);
    available = true;
    value = Number.isNaN(num)
      ? String(raw)
      : num.toFixed(precision).replace('.', ',');
  }

  const stateUnit = stateObj?.attributes?.unit_of_measurement;
  const configuredUnit = slot.unit?.trim();
  const unit =
    slot.show_unit === false || !available
      ? ''
      : (configuredUnit || stateUnit || '');

  return {
    label: slot.name || stateObj?.attributes?.friendly_name || fallbackLabel,
    value,
    unit,
    icon: slot.icon || stateObj?.attributes?.icon || fallbackIcon || DEFAULT_ICON,
    iconColor: computeCssColor(slot.icon_color),
    entity: slot.entity,
  };
}
