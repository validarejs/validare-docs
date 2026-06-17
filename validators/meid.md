---
outline: deep
---

# `meid`

Validates a MEID (Mobile Equipment Identifier) used in CDMA devices.

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
      <label>MEID</label>
      <input type="text" name="val" placeholder="AF012389ABE2">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { meid: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"A10000009296F2"` | Valid 14-char hex MEID |

## Invalid values

| Value | Reason |
|---|---|
| `"Z10000009296F2"` | `Z` is not a valid hex digit in MEID |
| `"12345"` | Too short |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- MEID is 14 hexadecimal characters. The decimal representation is 18 digits.
