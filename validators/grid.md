---
outline: deep
---

# `grid`

Validates a GRId (Global Release Identifier) used to identify music releases.

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
      <label>GRId</label>
      <input type="text" name="val" placeholder="A1-2425G-ABC1234002-M">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { grid: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"A1-2425G-ABC1234002-M"` | Valid GRId with hyphens |
| `"A12425GABC1234002M"` | Valid GRId without hyphens |

## Invalid values

| Value | Reason |
|---|---|
| `"A1-2425G-ABC1234002-N"` | Fails check character |
| `"INVALID"` | Does not match GRId format |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- GRId format: scheme identifier (2) + issuer code (5) + release number (10) + check character (1).
