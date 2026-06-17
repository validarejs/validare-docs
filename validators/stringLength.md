---
outline: deep
---

# `stringLength`

Validates that a string's length is within specified minimum and maximum bounds.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `undefined` | Minimum number of characters |
| `max` | `number` | `undefined` | Maximum number of characters |
| `trim` | `boolean` | `false` | Trim whitespace before measuring length |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Username (8–20 characters)</label>
      <input type="text" name="val" placeholder="myusername">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { stringLength: { min: 8, max: 20 } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"hello"` | 5 characters — within min=3, max=20 |
| `"abc"` | 3 characters — equal to min |

## Invalid values

| Value | Reason |
|---|---|
| `"ab"` | 2 characters — below min=3 |
| `"averylongusernamethatexceeds"` | Exceeds max=20 |

## Notes

- Empty string (`""`) always returns `valid: true` (unless `min` is set and greater than 0).
- Combine with `notEmpty` to explicitly require a non-empty value.
