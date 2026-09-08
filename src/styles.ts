import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    height: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    overflow: hidden;
    cursor: default;
  }

  ha-card.has-action {
    cursor: pointer;
  }

  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr) minmax(0, 1fr);
    align-items: center;
    gap: 8px;
    min-height: 100%;
  }

  .row.no-temps {
    grid-template-columns: 1fr;
  }

  .center {
    text-align: center;
    min-width: 0;
  }

  .time {
    display: block;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
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
    line-height: 1.25;
    margin-top: 4px;
    opacity: 0.9;
  }

  .holiday {
    font-weight: 700;
    color: var(--accent-color, var(--primary-color));
    opacity: 1;
  }

  .significant {
    font-style: italic;
    opacity: 0.85;
  }

  .temp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-width: 0;
    text-align: center;
  }

  .temp.left {
    align-items: flex-start;
    text-align: left;
  }

  .temp.right {
    align-items: flex-end;
    text-align: right;
  }

  .temp-header {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .temp.right .temp-header {
    flex-direction: row-reverse;
  }

  .temp-label {
    font-size: 0.85em;
    font-weight: 600;
    opacity: 0.85;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .temp-value {
    font-size: 1.35em;
    font-weight: 700;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .temp-unit {
    font-size: 0.7em;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 2px;
  }

  ha-icon {
    --mdc-icon-size: 1.15em;
    width: 1.15em;
    height: 1.15em;
    flex-shrink: 0;
  }

  /* Size variants */
  :host([data-size='compact']) .time {
    font-size: 2.1em;
  }
  :host([data-size='compact']) .date {
    font-size: 1.05em;
  }
  :host([data-size='compact']) .nameday,
  :host([data-size='compact']) .holiday,
  :host([data-size='compact']) .significant {
    font-size: 0.85em;
  }
  :host([data-size='compact']) .temp-value {
    font-size: 1.15em;
  }

  :host([data-size='normal']) .time {
    font-size: 2.8em;
  }
  :host([data-size='normal']) .date {
    font-size: 1.35em;
  }
  :host([data-size='normal']) .nameday,
  :host([data-size='normal']) .holiday,
  :host([data-size='normal']) .significant {
    font-size: 0.95em;
  }

  :host([data-size='large']) .time {
    font-size: 3.4em;
  }
  :host([data-size='large']) .date {
    font-size: 1.6em;
  }
  :host([data-size='large']) .nameday,
  :host([data-size='large']) .holiday,
  :host([data-size='large']) .significant {
    font-size: 1.1em;
  }
  :host([data-size='large']) .temp-value {
    font-size: 1.55em;
  }
`;
