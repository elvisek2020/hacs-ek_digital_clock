import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    container-type: inline-size;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    /* Boční sloupce nesmí být užší než hodnota teploty (jinak přeteče
       do data), na úzké kartě ustoupí prostředek. */
    grid-template-columns: minmax(min-content, 1fr) auto minmax(min-content, 1fr);
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

  /* Svátek a významný den jsou pod celým řádkem přes plnou šířku karty,
     jinak by dlouhý název roztáhl prostřední sloupec a zmáčkl teploty. */
  .events {
    width: 100%;
    min-width: 0;
    text-align: center;
    color: var(--primary-text-color);
    text-wrap: balance;
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
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    line-height: 1;
  }

  .temp.right .temp-reading {
    flex-direction: row-reverse;
  }

  .temp-value {
    display: inline-flex;
    align-items: center;
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
    line-height: 1;
  }

  .temp-unit {
    font-size: 0.72em;
    font-weight: 700;
    line-height: 1;
  }

  .temp ha-icon {
    --mdc-icon-size: 0.92em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    line-height: 0;
    color: inherit;
    /* MDI glyfy sedí opticky níž než číslice — drobný posun nahoru */
    transform: translateY(-0.06em);
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
    font-size: 0.8em;
  }
  :host([data-size='compact']) .temp-reading {
    font-size: 1.3em;
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
  :host([data-size='normal']) .temp-label {
    font-size: 0.95em;
  }
  :host([data-size='normal']) .temp-reading {
    font-size: 1.65em;
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
    font-size: 1.05em;
  }
  :host([data-size='large']) .temp-reading {
    font-size: 1.9em;
  }

  /* Úzká karta (mobil): menší písmo a mezery, ať se teploty a datum
     vejdou vedle sebe. Compact je malý sám o sobě. */
  @container (max-width: 420px) {
    .row {
      gap: 6px;
    }
    :host([data-size='normal']) .time {
      font-size: 2.2em;
    }
    :host([data-size='normal']) .date {
      font-size: 1em;
    }
    :host([data-size='normal']) .temp-label {
      font-size: 0.8em;
    }
    :host([data-size='normal']) .temp-reading {
      font-size: 1.2em;
    }
    :host([data-size='large']) .time {
      font-size: 2.6em;
    }
    :host([data-size='large']) .date {
      font-size: 1.15em;
    }
    :host([data-size='large']) .temp-label {
      font-size: 0.9em;
    }
    :host([data-size='large']) .temp-reading {
      font-size: 1.4em;
    }
  }
`;
