---
outline: deep
---

# `id`

Validates a national identification number for one of 42 supported countries.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `country` | `string` | `undefined` | ISO 3166-1 alpha-2 country code (e.g. `"BR"`, `"DE"`, `"ES"`) |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>US SSN</label>
      <input type="text" name="val" placeholder="123-45-6789">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { id: { country: 'US' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values by country (examples)

| Country | Value | Notes |
|---|---|---|
| `BR` | `"231.002.999-81"` | Brazilian CPF |
| `DE` | `"85055201671"` | German Personalausweis |
| `ES` | `"99999999R"` | Spanish DNI |
| `FR` | `"195017530058990"` | French NIR |

## Invalid values

| Value | Country | Reason |
|---|---|---|
| `"000.000.000-00"` | `BR` | All-zeros CPF |
| `"99999999X"` | `ES` | Wrong check letter |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Unknown or omitted `country` returns `valid: true` (pass-through).
- The playground uses `country: 'US'` (SSN format). Other supported countries include BR (CPF), DE, ES (DNI), FR (NIR), MX (CURP), PL (PESEL), and many more.
- Supported countries: AR, BA, BG, BR, CH, CL, CN, CO, CZ, DK, EE, ES, FI, FR, HK, HR, ID, IE, IL, IS, KR, LT, LV, ME, MK, MX, MY, NL, NO, PE, PL, RO, RS, SE, SI, SK, SM, TH, TR, TW, UY, ZA.
- EE (Estonia) uses the Lithuanian algorithm. SK (Slovakia) uses the Czech algorithm.
