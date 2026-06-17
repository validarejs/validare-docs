---
outline: deep
---

# `integer`

Validates that a field contains a whole number (positive or negative).

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
      <label>Integer</label>
      <input type="text" name="val" placeholder="-42 or 100">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { integer: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"42"` | Positive integer |
| `"-42"` | Negative integer |
| `"0"` | Zero |

## Invalid values

| Value | Reason |
|---|---|
| `"3.14"` | Decimal number |
| `"1e5"` | Scientific notation |
| `"abc"` | Not a number |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- For positive integers only, combine with `greaterThan: { min: 0 }`.
