---
outline: deep
---

# `callback`

Validates a field using a custom synchronous function.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `callback` | `(input: ValidatorInput) => { valid: boolean, message?: string }` | *required* | Custom validation function |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Username (must start with a letter)</label>
      <input type="text" name="val" placeholder="username">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    val: {
      validators: {
        callback: {
          message: 'Must start with a letter',
          callback: (input) => ({ valid: /^[a-zA-Z]/.test(input.value) })
        }
      }
    }
  },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| Callback returns `{ valid: true }` | Validation passes |

## Invalid values

| Value | Reason |
|---|---|
| Callback returns `{ valid: false }` | Validation fails with default or inline message |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- The `input` object has: `value` (string), `elements` (HTMLElement[]), `options` (validator options), `field` (field name).
- The callback can return `{ valid: false, message: 'Custom message' }` to override the configured message.
- For async operations, use `promise` instead.
