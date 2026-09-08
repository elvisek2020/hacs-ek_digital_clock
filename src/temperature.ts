import type { HomeAssistant } from 'custom-card-helpers';
import type { FormattedTemperature, TemperatureSlotConfig } from './types';

const DEFAULT_ICON = 'mdi:thermometer';

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
  const unit = stateObj?.attributes?.unit_of_measurement ?? '°C';
  const precision = slot.precision ?? 1;

  let value = '—';
  if (raw !== undefined && raw !== 'unavailable' && raw !== 'unknown') {
    const num = Number(raw);
    if (!Number.isNaN(num)) {
      value = num.toFixed(precision).replace('.', ',');
    } else {
      value = String(raw);
    }
  }

  return {
    label: slot.name || stateObj?.attributes?.friendly_name || fallbackLabel,
    value,
    unit,
    icon: slot.icon || stateObj?.attributes?.icon || fallbackIcon || DEFAULT_ICON,
    iconColor: slot.icon_color,
    entity: slot.entity,
  };
}
