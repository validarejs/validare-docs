---
outline: deep
---

# `greaterThan`

Validates that a numeric value is greater than (or equal to) a minimum.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | *required* | Minimum allowed value |
| `inclusive` | `boolean` | `true` | If `true`, the minimum value itself is valid |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Number (greater than 0)</label>
      <input type="number" name="val" placeholder="e.g. 5">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { greaterThan: { value: 0, inclusive: false } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"1"` | Above min=0 |
| `"100"` | Well above min |

## Invalid values

| Value | Reason |
|---|---|
| `"-1"` | Below min=0 |
| `"0"` | Equal to min when `inclusive: false` |
| `"abc"` | Not a number |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- With `inclusive: true` (default), the boundary value itself is valid.
