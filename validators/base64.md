---
outline: deep
---

# `base64`

Validates that a field contains a valid Base64 encoded string.

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
      <label>Base64 string</label>
      <input type="text" name="val" placeholder="SGVsbG8gV29ybGQ=">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { base64: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"SGVsbG8="` | "Hello" in Base64 |
| `"dGVzdA=="` | "test" in Base64 |

## Invalid values

| Value | Reason |
|---|---|
| `"Hello!"` | Contains `!` which is not a Base64 character |
| `"SGVsbG8"` | Missing required padding (`=`) |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
