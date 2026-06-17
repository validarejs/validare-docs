---
outline: deep
---

# `iban`

Validates an International Bank Account Number (IBAN) for 77 countries.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `country` | `string` | `undefined` | Restrict to a specific country code (e.g. `"DE"`) |
| `sepa` | `boolean \| string` | `undefined` | If `true`, restrict to SEPA countries; if a string, treated as a country code |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>IBAN</label>
      <input type="text" name="val" placeholder="GB82 WEST 1234 5698 7654 32">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { iban: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Country |
|---|---|
| `"DE89370400440532013000"` | Germany |
| `"GB29NWBK60161331926819"` | United Kingdom |
| `"FR7614508059009054924040816"` | France |

## Invalid values

| Value | Reason |
|---|---|
| `"DE89370400440532013001"` | Wrong mod-97 checksum |
| `"XX89370400440532013000"` | Unknown country code |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Without `country` option, accepts IBANs from all 77 supported countries.
- With `sepa: true`, only accepts IBANs from the 36 SEPA member countries.
