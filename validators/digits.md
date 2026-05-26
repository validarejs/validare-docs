---
outline: deep
---

# `digits`

Validates that a field contains only digit characters (0–9).

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
      <label>Digits only</label>
      <input type="text" name="val" placeholder="12345">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { digits: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"123456"` | All digits |
| `"0"` | Single digit |

## Invalid values

| Value | Reason |
|---|---|
| `"12a456"` | Contains a letter |
| `"123 456"` | Contains a space |
| `"3.14"` | Contains a decimal point |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- Does not allow spaces, dots, or signs. Use `numeric` or `integer` for those cases.
