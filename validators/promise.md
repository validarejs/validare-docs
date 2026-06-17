---
outline: deep
---

# `promise`

Validates a field using a custom asynchronous function.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `promise` | `(input: ValidatorInput) => Promise<{ valid: boolean, message?: string }>` | *required* | Custom async validation function |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Code (async check — valid if length > 3)</label>
      <input type="text" name="val" placeholder="e.g. ABCD">
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
        promise: {
          message: 'Code must be longer than 3 characters',
          promise: (input) =>
            new Promise(resolve =>
              setTimeout(() => resolve({ valid: input.value.length > 3 }), 400)
            )
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
| Promise resolves `{ valid: true }` | Validation passes |

## Invalid values

| Value | Reason |
|---|---|
| Promise resolves `{ valid: false }` | Validation fails with default or inline message |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- Same `input` object as `callback`: `value`, `elements`, `options`, `field`.
- For synchronous checks, use `callback` instead.
- Rejection (thrown error) is treated as invalid.
