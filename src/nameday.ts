import { getNameDay } from 'namedays-cs';
import type { DateTime } from 'luxon';

export function formatNameday(dt: DateTime, prefix?: string): string | null {
  const names = getNameDay(dt.toJSDate());
  if (!names.length) {
    return null;
  }
  const joined = names.join(' a ');
  const label = prefix?.trim();
  return label ? `${label} ${joined}` : joined;
}
