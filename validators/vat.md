---
outline: deep
---

# `vat`

Validates a VAT (Value Added Tax) number for one of 38 supported countries.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `country` | `string` | `undefined` | ISO 3166-1 alpha-2 country code (e.g. `"DE"`, `"BR"`, `"FR"`) |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>VAT number (GB)</label>
      <input type="text" name="val" placeholder="GB123456789">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { vat: { country: 'GB' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Country | Value | Notes |
|---|---|---|
| `DE` | `"DE123456789"` | German USt-IdNr |
| `BR` | `"11222333000181"` | Brazilian CNPJ |
| `FR` | `"FR40303265045"` | French TVA |
| `GB` | `"GB980780684"` | UK VAT |

## Invalid values

| Value | Country | Reason |
|---|---|---|
| `"DE000000000"` | `DE` | Fails weighted checksum |
| `"FR00000000000"` | `FR` | Invalid key digits |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Unknown or omitted `country` returns `valid: true` (pass-through).
- Supported countries: AR, AT, BE, BG, BR, CH, CY, CZ, DE, DK, EE, ES, FI, FR, GB, GR, HR, HU, IE, IS, IT, LT, LU, LV, MT, NL, NO, PL, PT, RO, RS, RU, SE, SI, SK, VE, ZA.
