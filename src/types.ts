import type { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

export type CardSize = 'compact' | 'normal' | 'large';

export interface TemperatureSlotConfig {
  entity?: string;
  name?: string;
  icon?: string;
  icon_color?: string;
  precision?: number;
}

export interface EkDigitalClockConfig extends LovelaceCardConfig {
  type: string;
  locale?: string;
  time_zone?: string;
  time_format?: string;
  date_format?: string;
  show_nameday?: boolean;
  nameday_prefix?: string;
  show_public_holiday?: boolean;
  show_significant_day?: boolean;
  left_temperature?: TemperatureSlotConfig;
  right_temperature?: TemperatureSlotConfig;
  theme?: string;
  background_color?: string;
  text_color?: string;
  size?: CardSize;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface FormattedTemperature {
  label: string;
  value: string;
  unit: string;
  icon: string;
  iconColor?: string;
  entity?: string;
}
