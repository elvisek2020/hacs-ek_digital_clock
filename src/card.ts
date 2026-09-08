import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  handleAction,
  hasAction,
  type ActionHandlerEvent,
  type HomeAssistant,
} from 'custom-card-helpers';

import { actionHandler } from './action-handler';
import { computeCssColor } from './color';
import { applyTheme } from './theme';
import {
  CARD_DESCRIPTION,
  CARD_NAME,
  CARD_TYPE,
  CARD_VERSION,
  DEFAULT_NAMEDAY_PREFIX,
} from './const';
import {
  formatDate,
  formatNeedsSeconds,
  formatTime,
  resolveDateTime,
} from './format';
import { formatPublicHoliday, formatSignificantDay } from './holidays';
import { formatNameday } from './nameday';
import { cardStyles } from './styles';
import {
  formatTemperatureSlot,
  hasTemperatureSlots,
} from './temperature';
import type {
  EkDigitalClockConfig,
  FormattedTemperature,
} from './types';

console.info(
  `%c ${CARD_NAME.toUpperCase()} %c ${CARD_VERSION} `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

const windowWithCards = window as unknown as {
  customCards?: Array<Record<string, unknown>>;
};
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: CARD_DESCRIPTION,
  preview: true,
});

@customElement(CARD_TYPE)
export class EkDigitalClock extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: EkDigitalClockConfig;
  @state() private _time = '';
  @state() private _date = '';
  @state() private _nameday: string | null = null;
  @state() private _holiday: string | null = null;
  @state() private _significant: string | null = null;

  private _tickId?: number;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./editor');
    return document.createElement(`${CARD_TYPE}-editor`);
  }

  public static getStubConfig(): Partial<EkDigitalClockConfig> {
    return {
      time_format: 'HH:mm',
      date_format: 'cccc dd. L.',
      show_nameday: true,
      show_public_holiday: true,
      show_significant_day: false,
      size: 'normal',
    };
  }

  public setConfig(config: EkDigitalClockConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = { ...config };
    this._updateDateTime();
    this._scheduleTick();
  }

  public getCardSize(): number {
    return this._config?.size === 'large' ? 3 : 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      rows: this._config?.size === 'compact' ? 2 : 3,
      min_columns: 6,
      min_rows: 2,
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._scheduleTick();
  }

  public disconnectedCallback(): void {
    this._stopTick();
    super.disconnectedCallback();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('_config') || changed.has('hass')) {
      this._updateDateTime();
    }
    this.setAttribute('data-size', this._config?.size || 'normal');

    if (changed.has('_config') || changed.has('hass')) {
      applyTheme(this, this.hass, this._config?.theme);
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }

    const left = formatTemperatureSlot(
      this.hass,
      this._config.left_temperature,
      'Venkovní',
      'mdi:home-thermometer',
    );
    const right = formatTemperatureSlot(
      this.hass,
      this._config.right_temperature,
      'Vnitřní',
      'mdi:thermometer',
    );
    const showTemps = hasTemperatureSlots(
      this._config.left_temperature,
      this._config.right_temperature,
    );

    const hasActions =
      hasAction(this._config.tap_action) ||
      hasAction(this._config.hold_action) ||
      hasAction(this._config.double_tap_action);

    const cardStyle = styleMap({
      background: computeCssColor(this._config.background_color),
      color: computeCssColor(this._config.text_color),
    });

    return html`
      <ha-card
        class=${hasActions ? 'has-action' : ''}
        style=${cardStyle}
        tabindex=${hasActions ? '0' : '-1'}
        @action=${this._handleAction}
        ${actionHandler({
          hasHold: hasAction(this._config.hold_action),
          hasDoubleClick: hasAction(this._config.double_tap_action),
        })}
      >
        <div class="row ${showTemps ? '' : 'no-temps'}">
          ${showTemps ? this._renderTemp(left, 'left') : nothing}
          <div class="center">
            <span class="time">${this._time}</span>
            <span class="date">${this._date}</span>
            ${this._nameday
              ? html`<span class="nameday">${this._nameday}</span>`
              : nothing}
            ${this._holiday
              ? html`<span class="holiday">${this._holiday}</span>`
              : nothing}
            ${this._significant
              ? html`<span class="significant">${this._significant}</span>`
              : nothing}
          </div>
          ${showTemps ? this._renderTemp(right, 'right') : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderTemp(
    temp: FormattedTemperature | null,
    side: 'left' | 'right',
  ): TemplateResult {
    if (!temp) {
      return html`<div class="temp ${side}"></div>`;
    }
    const iconStyle = styleMap({
      color: temp.iconColor || undefined,
    });
    return html`
      <div class="temp ${side}">
        <div class="temp-header">
          <ha-icon .icon=${temp.icon} style=${iconStyle}></ha-icon>
          <span class="temp-label" title=${temp.label}>${temp.label}</span>
        </div>
        <div class="temp-value">
          <span>${temp.value}</span>
          ${temp.unit ? html`<span class="temp-unit">${temp.unit}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    handleAction(this, this.hass, this._config, ev.detail.action);
  }

  private _updateDateTime(): void {
    if (!this._config) {
      return;
    }

    const locale = this._config.locale ?? this.hass?.locale?.language;
    const timeZone = this._config.time_zone ?? this.hass?.config?.time_zone;
    const dt = resolveDateTime(locale, timeZone);

    this._time = formatTime(dt, this._config.time_format);
    this._date = formatDate(dt, this._config.date_format);

    this._nameday = this._config.show_nameday
      ? formatNameday(dt, this._config.nameday_prefix ?? DEFAULT_NAMEDAY_PREFIX)
      : null;

    this._holiday = this._config.show_public_holiday
      ? formatPublicHoliday(dt)
      : null;

    this._significant = this._config.show_significant_day
      ? formatSignificantDay(dt)
      : null;
  }

  /** Tick zarovnaný na hranici sekundy/minuty, ať se čas nepřepíná se zpožděním. */
  private _scheduleTick(): void {
    this._stopTick();
    if (!this._config) {
      return;
    }
    const period = formatNeedsSeconds(this._config.time_format) ? 1000 : 60000;
    const delay = period - (Date.now() % period) + 20;
    this._tickId = window.setTimeout(() => {
      this._updateDateTime();
      this._scheduleTick();
    }, delay);
  }

  private _stopTick(): void {
    if (this._tickId !== undefined) {
      window.clearTimeout(this._tickId);
      this._tickId = undefined;
    }
  }

  static styles = cardStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'ek-digital-clock': EkDigitalClock;
  }
}
