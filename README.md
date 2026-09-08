# Ek Digital Clock

Moderní digitální hodiny pro Home Assistant (Lovelace) s UI konfigurací — bez nutnosti psát YAML.

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/elvisek2020/hacs-ek_digital_clock.svg)](https://github.com/elvisek2020/hacs-ek_digital_clock/releases)
[![License](https://img.shields.io/github/license/elvisek2020/hacs-ek_digital_clock.svg)](LICENSE)

Inspirováno [wassy92x/lovelace-digital-clock](https://github.com/wassy92x/lovelace-digital-clock), přepsáno od nuly pro aktuální HA (Lit 3, Sections view, tap/hold akce).

**Repo:** https://github.com/elvisek2020/hacs-ek_digital_clock

## Funkce

- Digitální čas a datum (Luxon formáty + předvolby v editoru)
- České **jmeniny** (`namedays-cs`, offline v bundle)
- České **státní svátky** a volitelné **významné dny** (`holidays-cs`, offline)
- Volitelné **teploty** vlevo/vpravo (entita, popisek, ikona, barva)
- `tap_action` / `hold_action` / `double_tap_action`
- Motiv HA, vlastní barva pozadí/textu, velikost karty

## Layout

```text
┌───────────────┬──────────────────────────┬───────────────┐
│ 🏠 Venkovní   │         18:38            │ 🌡 Obývák     │
│    28,4 °C    │    úterý 08. 9.          │    22,9 °C    │
│               │   Svátek: Elvis          │               │
│               │   Den české státnosti    │               │
└───────────────┴──────────────────────────┴───────────────┘
```

Bez teplotních entit zůstane klasický centrovovaný digi clock.

## Instalace (HACS)

1. HACS → **Frontend** → ⋮ → **Custom repositories**
2. Repository: `https://github.com/elvisek2020/hacs-ek_digital_clock`
3. Category: **Lovelace**
4. Nainstaluj **Ek Digital Clock**
5. Restartuj Home Assistant (nebo znovu načti zdroje / hard refresh prohlížeče)
6. Dashboard → **Přidat kartu** → Ek Digital Clock → nastav v UI

> HACS stahuje `ek-digital-clock.js` z GitHub Release (asset musí odpovídat `hacs.json` → `filename`).

### Manuální instalace

1. Stáhni `ek-digital-clock.js` z [Releases](https://github.com/elvisek2020/hacs-ek_digital_clock/releases)
2. Zkopíruj do `/config/www/`
3. Nastavení → Dashboards → Resources → `/local/ek-digital-clock.js` (**JavaScript module**)
4. Přidej kartu přes UI: `custom:ek-digital-clock`

## Konfigurace

Vše nastavíš v grafickém editoru karty. YAML je potřeba jen pokud chceš.

```yaml
type: custom:ek-digital-clock
time_format: HH:mm
date_format: cccc dd. L.
show_nameday: true
nameday_prefix: 'Svátek:'
show_public_holiday: true
show_significant_day: false
size: normal
left_temperature:
  entity: sensor.venkovni_teplota
  name: Venkovní
  icon: mdi:home-thermometer
  icon_color: '#e53935'
  precision: 1
right_temperature:
  entity: sensor.teplota_obyvak
  name: Obývák
  icon: mdi:thermometer
  icon_color: '#e53935'
tap_action:
  action: navigate
  navigation_path: /lovelace/kalendar
```

### Volby

| Volba | Popis |
| --- | --- |
| `time_format` / `date_format` | Luxon `toFormat` string |
| `locale` / `time_zone` | Override HA locale / zóny |
| `show_nameday` | Jmeniny pod datem |
| `show_public_holiday` | Státní svátek (jen když dnes je) |
| `show_significant_day` | Významný den |
| `left_temperature` / `right_temperature` | Slot: `entity`, `name`, `icon`, `icon_color`, `precision` |
| `background_color` / `text_color` | CSS barvy |
| `theme` | HA motiv |
| `size` | `compact` \| `normal` \| `large` |
| `tap_action` / `hold_action` / `double_tap_action` | Standardní HA akce |

## Verze a release

- Verze v `package.json` a `src/const.ts` (`CARD_VERSION`)
- Git tag `vX.Y.Z` spustí GitHub Action, která sestaví bundle a nahraje `ek-digital-clock.js` do Release (to HACS potřebuje)

```bash
npm run build
git tag v1.0.1
git push origin v1.0.1
```

## Vývoj

```bash
npm install
npm run build
```

Výstup: `dist/ek-digital-clock.js`

## Backlog

- Slovenské jmeniny / svátky
- Dynamická ikona z weather entity
- Blikající dvojtečka
- Druhá časová zóna
- Vlhkost vedle teploty
- Highlight „moje jména“

## Licence

MIT
