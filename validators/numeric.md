---
outline: deep
---

# `numeric`

Validates that a field contains a numeric value, with support for custom thousand and decimal separators.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `thousandsSeparator` | `string` | `""` | Character used as thousands separator (e.g. `","`) |
| `decimalSeparator` | `string` | `"."` | Character used as decimal separator |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Numeric</label>
      <input type="text" name="val" placeholder="3.14">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { numeric: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"1234.56"` | Standard decimal |
| `"1,234.56"` | With thousands separator |
| `"-42"` | Negative number |

## Invalid values

| Value | Reason |
|---|---|
| `"abc"` | Not a number |
| `"1.234,56"` | Separators swapped without reconfiguring |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- For European format, use `thousandsSeparator: "."` and `decimalSeparator: ","`.
