import {
  getPublicHoliday,
  getSignificantDay,
} from 'holidays-cs';
import type { DateTime } from 'luxon';

export function formatPublicHoliday(dt: DateTime): string | null {
  const holiday = getPublicHoliday(dt);
  return typeof holiday === 'string' && holiday.length > 0 ? holiday : null;
}

export function formatSignificantDay(dt: DateTime): string | null {
  const day = getSignificantDay(dt);
  if (!day || typeof day !== 'object') {
    return null;
  }
  const name = (day as { name?: string }).name;
  return name && name.length > 0 ? name : null;
}
