---
outline: deep
---

# `imei`

Validates an IMEI (International Mobile Equipment Identity) number.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>IMEI</label>
      <input type="text" name="val" placeholder="490154203237518">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { imei: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"356938035643809"` | Valid 15-digit IMEI |
| `"35 693803 564380 9"` | Valid IMEI with spaces |

## Invalid values

| Value | Reason |
|---|---|
| `"123456789012345"` | Fails Luhn checksum |
| `"12345678901234"` | Only 14 digits |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- IMEI is 15 digits. Accepts with or without spaces or hyphens as separators.
- Uses the Luhn algorithm for checksum validation.
