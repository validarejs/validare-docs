---
outline: deep
---

# `color`

Validates that a field contains a valid CSS color value.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | `string \| string[]` | all | Accepted color format(s): `"hex"`, `"rgb"`, `"rgba"`, `"hsl"`, `"hsla"`, `"keyword"`, or `"all"` |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>CSS color</label>
      <input type="text" name="val" placeholder="#ff5733">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { color: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"#FF5733"` | Hex color |
| `"rgb(255, 87, 51)"` | RGB |
| `"hsl(9, 100%, 60%)"` | HSL |
| `"red"` | CSS color keyword |

## Invalid values

| Value | Reason |
|---|---|
| `"notacolor"` | Not a recognized CSS color format |
| `"#GGHHII"` | Invalid hex digits |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- `type` can be a single string (`"hex"`) or an array (`["hex", "rgb"]`).
