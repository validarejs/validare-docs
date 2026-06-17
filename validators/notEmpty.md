---
outline: deep
---

# `notEmpty`

Validates that a field is not empty.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `trim` | `boolean` | `false` | If `true`, trims whitespace before checking — `"   "` becomes invalid |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Full name</label>
      <input type="text" name="val" placeholder="Jane Doe">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { notEmpty: { trim: true } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"hello"` | Non-empty string |
| `"0"` | The string `"0"` is non-empty |
| `" hello "` | Whitespace around content |

## Invalid values

| Value | Reason |
|---|---|
| `""` | Empty string |
| `"   "` | Whitespace only (when `trim: true`) |

## Notes

- Unlike all other validators, `notEmpty` returns `valid: false` for empty string.
- Use with `trim: true` if you want to reject values that are only spaces.
