---
outline: deep
---

# `date`

Validates that a field contains a date (and optionally a time) matching a specified format.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `format` | `string` | `"MM/DD/YYYY"` | Format string using the tokens below |
| `message` | `string` | locale default | Custom error message |

## Format tokens

| Token | Meaning | Range |
|---|---|---|
| `YYYY` | 4-digit year | e.g. `2025` |
| `MM` | Month | `01`–`12` |
| `DD` | Day | `01`–`31` |
| `HH` | Hour (24 h) | `00`–`23` |
| `hh` | Hour (12 h) | `01`–`12` |
| `mm` | Minutes | `00`–`59` |
| `ss` | Seconds | `00`–`59` |
| `A` | AM / PM | `AM` or `PM` |

Any literal character in the format (e.g. `/`, `-`, `:`, ` `) must appear verbatim in the value.

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Date (YYYY-MM-DD)</label>
      <input type="text" name="val" placeholder="2025-12-31">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { date: { format: 'YYYY-MM-DD' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Format | Notes |
|---|---|---|
| `"12/25/2025"` | `"MM/DD/YYYY"` | Default format |
| `"25/12/2025"` | `"DD/MM/YYYY"` | European format |
| `"2025-12-25 14:30"` | `"YYYY-MM-DD HH:mm"` | With 24 h time |
| `"12/25/2025 02:30 PM"` | `"MM/DD/YYYY hh:mm A"` | With 12 h time |
| `"2025-12-25 14:30:59"` | `"YYYY-MM-DD HH:mm:ss"` | With seconds |

## Invalid values

| Value | Format | Reason |
|---|---|---|
| `"25/12/2025"` | `"MM/DD/YYYY"` | Day/month swapped |
| `"13/32/2025"` | `"MM/DD/YYYY"` | Month 13 or day 32 do not exist |
| `"2025-12-25"` | `"MM/DD/YYYY"` | Wrong separator |
| `"12/25/2025 25:00"` | `"MM/DD/YYYY HH:mm"` | Hour 25 out of range |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- Leap years are validated correctly (e.g. `02/29/2024` is valid; `02/29/2023` is not).
- `12:00 AM` = midnight (0 h), `12:00 PM` = noon (12 h).
