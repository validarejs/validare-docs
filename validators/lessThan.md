---
outline: deep
---

# `lessThan`

Validates that a numeric value is less than (or equal to) a maximum.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `max` | `number` | *required* | Maximum allowed value |
| `inclusive` | `boolean` | `true` | If `true`, the maximum value itself is valid |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Number (less than 100)</label>
      <input type="number" name="val" placeholder="e.g. 50">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { lessThan: { value: 100, inclusive: false } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"100"` | Equal to max (inclusive=true) |
| `"50"` | Below max |

## Invalid values

| Value | Reason |
|---|---|
| `"101"` | Above max |
| `"100"` | Equal to max when `inclusive: false` |
| `"abc"` | Not a number |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- With `inclusive: true` (default), the boundary value itself is valid.
