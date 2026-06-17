---
outline: deep
---

# `between`

Validates that a numeric value is between a minimum and maximum.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | *required* | Minimum allowed value |
| `max` | `number` | *required* | Maximum allowed value |
| `inclusive` | `boolean` | `true` | If `true`, min and max themselves are valid |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Number (between 1 and 100)</label>
      <input type="number" name="val" placeholder="e.g. 42">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { between: { min: 1, max: 100, inclusive: true } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"18"` | Equal to min (inclusive=true) |
| `"50"` | Between min and max |
| `"99"` | Equal to max (inclusive=true) |

## Invalid values

| Value | Reason |
|---|---|
| `"17"` | Below min |
| `"100"` | Above max |
| `"18"` | When `inclusive: false` |
| `"abc"` | Not a number |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- `inclusive: false` means min and max themselves are invalid.
