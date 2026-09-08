import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: default;
  }

  ha-card.has-action {
    cursor: pointer;
  }

  ha-card.has-action:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .row.no-temps {
    grid-template-columns: minmax(0, 1fr);
  }

  .center {
    text-align: center;
    min-width: 0;
    color: var(--primary-text-color);
  }

  .time {
    display: block;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: 0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .date {
    display: block;
    font-weight: 600;
    line-height: 1.2;
    margin-top: 2px;
    opacity: 0.95;
  }

  .nameday,
  .holiday,
  .significant {
    display: block;
    font-weight: 500;
    line-height: 1.3;
    margin-top: 3px;
    opacity: 0.85;
  }

  .holiday {
    font-weight: 700;
    color: var(--accent-color, var(--primary-color));
    opacity: 1;
  }

  .significant {
    font-style: italic;
    opacity: 0.8;
  }

  .temp {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .temp.left {
    align-items: flex-start;
    text-align: left;
  }

  .temp.right {
    align-items: flex-end;
    text-align: right;
  }

  .temp-label {
    font-size: 0.85em;
    font-weight: 700;
    line-height: 1.2;
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .temp-reading {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  .temp.right .temp-reading {
    flex-direction: row-reverse;
  }

  .temp-value {
    display: flex;
    align-items: baseline;
    gap: 2px;
    min-width: 0;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .temp-number {
    font-size: 1em;
  }

  .temp-unit {
    font-size: 0.72em;
    font-weight: 700;
    /* jednotka dědí accent barvu z .temp */
  }

  .temp ha-icon {
    --mdc-icon-size: 1em;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    color: inherit;
  }

  /* Velikostní varianty */
  :host([data-size='compact']) ha-card {
    padding: 8px 12px;
  }
  :host([data-size='compact']) .time {
    font-size: 2em;
  }
  :host([data-size='compact']) .date {
    font-size: 1em;
  }
  :host([data-size='compact']) .nameday,
  :host([data-size='compact']) .holiday,
  :host([data-size='compact']) .significant {
    font-size: 0.8em;
  }
  :host([data-size='compact']) .temp-label {
    font-size: 0.75em;
  }
  :host([data-size='compact']) .temp-reading {
    font-size: 1.15em;
  }

  :host([data-size='normal']) .time {
    font-size: 2.7em;
  }
  :host([data-size='normal']) .date {
    font-size: 1.3em;
  }
  :host([data-size='normal']) .nameday,
  :host([data-size='normal']) .holiday,
  :host([data-size='normal']) .significant {
    font-size: 0.9em;
  }
  :host([data-size='normal']) .temp-reading {
    font-size: 1.4em;
  }

  :host([data-size='large']) ha-card {
    padding: 16px 20px;
  }
  :host([data-size='large']) .time {
    font-size: 3.4em;
  }
  :host([data-size='large']) .date {
    font-size: 1.55em;
  }
  :host([data-size='large']) .nameday,
  :host([data-size='large']) .holiday,
  :host([data-size='large']) .significant {
    font-size: 1.05em;
  }
  :host([data-size='large']) .temp-label {
    font-size: 0.95em;
  }
  :host([data-size='large']) .temp-reading {
    font-size: 1.65em;
  }
`;
