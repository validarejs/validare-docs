---
outline: deep
---

# `hex`

Validates that a field contains a hexadecimal number.

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
      <label>Hex number</label>
      <input type="text" name="val" placeholder="1a2b3c">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { hex: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"FF5733"` | Valid hex digits |
| `"0a1b2c"` | Lowercase hex |
| `"0"` | Single digit |

## Invalid values

| Value | Reason |
|---|---|
| `"GG5733"` | `G` is not a hex digit |
| `"#FF5733"` | Hash prefix is not allowed |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- For CSS color validation (with `#` prefix, `rgb()`, etc.), use `color` instead.
