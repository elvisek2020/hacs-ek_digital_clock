import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from 'custom-card-helpers';

import { CARD_TYPE, DEFAULT_NAMEDAY_PREFIX } from './const';
import { DATE_FORMAT_PRESETS, TIME_FORMAT_PRESETS } from './format';
import type { EkDigitalClockConfig, TemperatureSlotConfig } from './types';

type HaFormSchema = Record<string, unknown>;

@customElement(`${CARD_TYPE}-editor`)
export class EkDigitalClockEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: EkDigitalClockConfig;

  public setConfig(config: EkDigitalClockConfig): void {
    this._config = { ...config };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._formData()}
          .schema=${this._schema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }

  private _formData(): Record<string, unknown> {
    const c = this._config!;
    return {
      locale: c.locale ?? '',
      time_zone: c.time_zone ?? '',
      time_format: c.time_format ?? 'HH:mm',
      date_format: c.date_format ?? 'cccc dd. L.',
      size: c.size ?? 'normal',
      theme: c.theme ?? '',
      background_color: c.background_color ?? '',
      text_color: c.text_color ?? '',
      show_nameday: c.show_nameday ?? false,
      nameday_prefix: c.nameday_prefix ?? DEFAULT_NAMEDAY_PREFIX,
      show_public_holiday: c.show_public_holiday ?? false,
      show_significant_day: c.show_significant_day ?? false,
      left_entity: c.left_temperature?.entity ?? '',
      left_name: c.left_temperature?.name ?? '',
      left_icon: c.left_temperature?.icon ?? 'mdi:home-thermometer',
      left_icon_color: c.left_temperature?.icon_color ?? '',
      left_precision: c.left_temperature?.precision ?? 1,
      right_entity: c.right_temperature?.entity ?? '',
      right_name: c.right_temperature?.name ?? '',
      right_icon: c.right_temperature?.icon ?? 'mdi:thermometer',
      right_icon_color: c.right_temperature?.icon_color ?? '',
      right_precision: c.right_temperature?.precision ?? 1,
      tap_action: c.tap_action ?? { action: 'none' },
      hold_action: c.hold_action ?? { action: 'none' },
      double_tap_action: c.double_tap_action ?? { action: 'none' },
    };
  }

  private _schema(): HaFormSchema[] {
    // flatten: true je nutný — bez něj ha-form nestuje data pod name expandable
    // a hodnoty se v editoru neuloží / nezobrazí.
    return [
      {
        name: 'time_date',
        type: 'expandable',
        flatten: true,
        title: 'Čas a datum',
        schema: [
          {
            name: 'time_format',
            selector: {
              select: {
                mode: 'dropdown',
                custom_value: true,
                options: TIME_FORMAT_PRESETS.map((p) => ({
                  value: p.value,
                  label: `${p.label} (${p.value})`,
                })),
              },
            },
          },
          {
            name: 'date_format',
            selector: {
              select: {
                mode: 'dropdown',
                custom_value: true,
                options: DATE_FORMAT_PRESETS.map((p) => ({
                  value: p.value,
                  label: `${p.label} (${p.value})`,
                })),
              },
            },
          },
          {
            type: 'grid',
            name: '',
            schema: [
              { name: 'locale', selector: { text: {} } },
              { name: 'time_zone', selector: { text: {} } },
            ],
          },
        ],
      },
      {
        name: 'appearance',
        type: 'expandable',
        flatten: true,
        title: 'Vzhled',
        schema: [
          {
            name: 'size',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'compact', label: 'Kompaktní' },
                  { value: 'normal', label: 'Normální' },
                  { value: 'large', label: 'Velké' },
                ],
              },
            },
          },
          { name: 'theme', selector: { theme: {} } },
          {
            type: 'grid',
            name: '',
            schema: [
              { name: 'background_color', selector: { text: {} } },
              { name: 'text_color', selector: { text: {} } },
            ],
          },
        ],
      },
      {
        name: 'calendar',
        type: 'expandable',
        flatten: true,
        title: 'Kalendář (jmeniny / svátky)',
        schema: [
          { name: 'show_nameday', selector: { boolean: {} } },
          { name: 'nameday_prefix', selector: { text: {} } },
          { name: 'show_public_holiday', selector: { boolean: {} } },
          { name: 'show_significant_day', selector: { boolean: {} } },
        ],
      },
      {
        name: 'left_temp',
        type: 'expandable',
        flatten: true,
        title: 'Levá teplota',
        schema: [
          {
            name: 'left_entity',
            selector: { entity: { domain: 'sensor' } },
          },
          { name: 'left_name', selector: { text: {} } },
          { name: 'left_icon', selector: { icon: {} } },
          { name: 'left_icon_color', selector: { text: {} } },
          {
            name: 'left_precision',
            selector: { number: { min: 0, max: 3, mode: 'box' } },
          },
        ],
      },
      {
        name: 'right_temp',
        type: 'expandable',
        flatten: true,
        title: 'Pravá teplota',
        schema: [
          {
            name: 'right_entity',
            selector: { entity: { domain: 'sensor' } },
          },
          { name: 'right_name', selector: { text: {} } },
          { name: 'right_icon', selector: { icon: {} } },
          { name: 'right_icon_color', selector: { text: {} } },
          {
            name: 'right_precision',
            selector: { number: { min: 0, max: 3, mode: 'box' } },
          },
        ],
      },
      {
        name: 'actions',
        type: 'expandable',
        flatten: true,
        title: 'Akce',
        schema: [
          { name: 'tap_action', selector: { ui_action: {} } },
          { name: 'hold_action', selector: { ui_action: {} } },
          { name: 'double_tap_action', selector: { ui_action: {} } },
        ],
      },
    ];
  }

  private _computeLabel = (schema: { name?: string }): string => {
    const labels: Record<string, string> = {
      time_format: 'Formát času (Luxon)',
      date_format: 'Formát data (Luxon)',
      locale: 'Locale (např. cs)',
      time_zone: 'Časová zóna (např. Europe/Prague)',
      size: 'Velikost',
      theme: 'Motiv',
      background_color: 'Barva pozadí (CSS)',
      text_color: 'Barva textu (CSS)',
      show_nameday: 'Zobrazit jmeniny',
      nameday_prefix: 'Prefix jmenin',
      show_public_holiday: 'Zobrazit státní svátek',
      show_significant_day: 'Zobrazit významný den',
      left_entity: 'Entita',
      left_name: 'Popisek',
      left_icon: 'Ikona',
      left_icon_color: 'Barva ikony',
      left_precision: 'Desetinná místa',
      right_entity: 'Entita',
      right_name: 'Popisek',
      right_icon: 'Ikona',
      right_icon_color: 'Barva ikony',
      right_precision: 'Desetinná místa',
      tap_action: 'Klepnutí',
      hold_action: 'Podržení',
      double_tap_action: 'Dvojité klepnutí',
    };
    return labels[schema.name ?? ''] ?? schema.name ?? '';
  };

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }

    // Defenzivně zplošti nested expandable objekty (starší HA / bez flatten)
    const data = this._flattenFormValue(ev.detail.value as Record<string, unknown>);

    const next: EkDigitalClockConfig = {
      ...this._config,
      type: `custom:${CARD_TYPE}`,
      time_format: String(data.time_format || 'HH:mm'),
      date_format: String(data.date_format || 'cccc dd. L.'),
      size: (data.size as EkDigitalClockConfig['size']) || 'normal',
      show_nameday: Boolean(data.show_nameday),
      show_public_holiday: Boolean(data.show_public_holiday),
      show_significant_day: Boolean(data.show_significant_day),
      nameday_prefix: String(data.nameday_prefix || DEFAULT_NAMEDAY_PREFIX),
    };

    const locale = String(data.locale || '').trim();
    const timeZone = String(data.time_zone || '').trim();
    const theme = String(data.theme || '').trim();
    const background = String(data.background_color || '').trim();
    const textColor = String(data.text_color || '').trim();

    if (locale) next.locale = locale;
    else delete next.locale;
    if (timeZone) next.time_zone = timeZone;
    else delete next.time_zone;
    if (theme) next.theme = theme;
    else delete next.theme;
    if (background) next.background_color = background;
    else delete next.background_color;
    if (textColor) next.text_color = textColor;
    else delete next.text_color;

    next.left_temperature = this._slotFromForm(data, 'left');
    next.right_temperature = this._slotFromForm(data, 'right');
    if (!next.left_temperature) delete next.left_temperature;
    if (!next.right_temperature) delete next.right_temperature;

    this._assignAction(next, 'tap_action', data.tap_action);
    this._assignAction(next, 'hold_action', data.hold_action);
    this._assignAction(next, 'double_tap_action', data.double_tap_action);

    this._config = next;
    fireEvent(this, 'config-changed', { config: next });
  }

  private _flattenFormValue(raw: Record<string, unknown>): Record<string, unknown> {
    const nestedKeys = [
      'time_date',
      'appearance',
      'calendar',
      'left_temp',
      'right_temp',
      'actions',
    ];
    const out: Record<string, unknown> = { ...raw };
    for (const key of nestedKeys) {
      const nested = raw[key];
      if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
        Object.assign(out, nested as Record<string, unknown>);
        delete out[key];
      }
    }
    return out;
  }

  private _assignAction(
    config: EkDigitalClockConfig,
    key: 'tap_action' | 'hold_action' | 'double_tap_action',
    value: unknown,
  ): void {
    const action = value as { action?: string } | undefined;
    if (!action || !action.action || action.action === 'none') {
      delete config[key];
      return;
    }
    config[key] = action as EkDigitalClockConfig[typeof key];
  }

  private _slotFromForm(
    data: Record<string, unknown>,
    side: 'left' | 'right',
  ): TemperatureSlotConfig | undefined {
    const entity = String(data[`${side}_entity`] || '').trim();
    if (!entity) {
      return undefined;
    }
    const slot: TemperatureSlotConfig = { entity };
    const name = String(data[`${side}_name`] || '').trim();
    const icon = String(data[`${side}_icon`] || '').trim();
    const iconColor = String(data[`${side}_icon_color`] || '').trim();
    const precision = Number(data[`${side}_precision`]);
    if (name) slot.name = name;
    if (icon) slot.icon = icon;
    if (iconColor) slot.icon_color = iconColor;
    if (!Number.isNaN(precision)) slot.precision = precision;
    return slot;
  }

  static styles = css`
    .card-config {
      padding: 0 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ek-digital-clock-editor': EkDigitalClockEditor;
  }
}
