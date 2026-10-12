/** Replaced at build time with the version from package.json (vite.config.ts). */
declare const __CARD_VERSION__: string;

export const CARD_VERSION = __CARD_VERSION__;
export const CARD_TYPE = 'ek-digital-clock';
export const CARD_NAME = 'Ek Digital Clock';
export const CARD_DESCRIPTION =
  'Digitální hodiny s jmeninami, státními svátky a teplotami';

export const DEFAULT_TIME_FORMAT = 'HH:mm';
export const DEFAULT_DATE_FORMAT = 'cccc dd. L.';
export const DEFAULT_NAMEDAY_PREFIX = 'Svátek:';
