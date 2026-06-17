---
outline: deep
---

# `zipCode`

Validates a postal/ZIP code for a specified country.

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
      <label>US ZIP code</label>
      <input type="text" name="val" placeholder="90210">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { zipCode: { country: 'US' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values by country (examples)

| Country | Value | Notes |
|---|---|---|
| `US` | `"10001"` | New York ZIP code |
| `DE` | `"10115"` | Berlin postal code |
| `GB` | `"SW1A 1AA"` | London postal code |
| `CA` | `"K1A 0A9"` | Ottawa postal code |

## Invalid values

| Value | Country | Reason |
|---|---|---|
| `"AAAAA"` | `DE` | Not digits |
| `"1234"` | `US` | Only 4 digits instead of 5 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Without `country`, returns `valid: true` for any value (pass-through).
- Supported countries: AT, BG, BR, CA, CH, CZ, DE, DK, ES, FR, GB, IE, IN, IT, MA, NL, PL, PT, RO, RU, SE, SG, SK, US.
