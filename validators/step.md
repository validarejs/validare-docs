---
outline: deep
---

# `step`

Validates that a number is a multiple of a step value from a base.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `step` | `number` | `1` | The step increment |
| `baseValue` | `number` | `0` | The base value from which multiples are counted |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Multiple of 5</label>
      <input type="number" name="val" placeholder="0, 5, 10...">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { step: { base: 0, step: 5 } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"5"` | Multiple of 5 from base 0 |
| `"100"` | Multiple of 5 |
| `"0"` | Base value itself |

## Invalid values

| Value | Reason |
|---|---|
| `"3"` | Not a multiple of 5 |
| `"5.5"` | Not a multiple of step=1 (default) |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- `baseValue` shifts the valid range: with `baseValue: 1, step: 2`, valid values are 1, 3, 5, 7…
