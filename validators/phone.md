---
outline: deep
---

# `phone`

Validates a phone number for a specified country.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `country` | `string` | `undefined` | ISO 3166-1 alpha-2 country code |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>US phone</label>
      <input type="tel" name="val" placeholder="(201) 555-0123">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { phone: { country: 'US' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values by country (examples)

| Country | Value | Notes |
|---|---|---|
| `US` | `"+1 (555) 123-4567"` | US number |
| `BR` | `"(11) 98765-4321"` | Brazilian mobile |
| `DE` | `"030 12345678"` | German landline |
| `GB` | `"07700 900123"` | UK mobile |

## Invalid values

| Value | Country | Reason |
|---|---|---|
| `"123"` | `US` | Too short |
| `"abc-def-ghij"` | `US` | Non-numeric |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Without `country`, accepts any string that looks like a phone number (loose validation).
- Supported countries: AE, BG, BR, CN, CZ, DE, DK, ES, FR, GB, IN, MA, NL, PK, RO, RU, SK, TH, US, VE.
