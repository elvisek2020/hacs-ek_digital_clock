import { DateTime } from 'luxon';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from './const';

export interface FormatPreset {
  value: string;
  label: string;
}

export const TIME_FORMAT_PRESETS: FormatPreset[] = [
  { value: 'HH:mm', label: '18:38' },
  { value: 'HH:mm:ss', label: '18:38:05' },
  { value: 'h:mm a', label: '6:38 PM' },
  { value: 'H:mm', label: '8:38' },
];

export const DATE_FORMAT_PRESETS: FormatPreset[] = [
  { value: 'cccc dd. L.', label: 'úterý 08. 9.' },
  { value: 'cccc dd. LL. yyyy', label: 'úterý 08. 09. 2026' },
  { value: 'ccc dd. LL.', label: 'út 08. 09.' },
  { value: 'dd. MM. yyyy', label: '08. 09. 2026' },
  { value: 'cccc d. MMMM', label: 'úterý 8. září' },
  { value: 'EEE, MMM d', label: 'Tue, Sep 8' },
];

export function resolveDateTime(
  locale?: string,
  timeZone?: string,
): DateTime {
  let dt: DateTime = DateTime.local();
  if (timeZone) {
    dt = dt.setZone(timeZone);
  }
  if (locale) {
    dt = dt.setLocale(locale);
  }
  return dt;
}

export function formatTime(dt: DateTime, format?: string): string {
  return dt.toFormat(format || DEFAULT_TIME_FORMAT);
}

export function formatDate(dt: DateTime, format?: string): string {
  return dt.toFormat(format || DEFAULT_DATE_FORMAT);
}

export function formatNeedsSeconds(format?: string): boolean {
  const f = format || DEFAULT_TIME_FORMAT;
  return f.includes('s') || f.includes('S');
}
