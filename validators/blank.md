---
outline: deep
---

# `blank`

Validates that a field is empty. The opposite of [`notEmpty`](/validators/notEmpty).

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `trim` | `boolean` | `false` | If `true`, trims whitespace before checking — `"   "` becomes valid |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Must be left empty</label>
      <input type="text" name="val" placeholder="Leave this blank">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { blank: { message: 'This field must be empty' } } } },
  plugins: { trigger: new Trigger({ event: 'input' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `""` | Empty string |
| `"   "` | Whitespace only (when `trim: true`) |

## Invalid values

| Value | Reason |
|---|---|
| `"hello"` | Non-empty string |
| `"0"` | The string `"0"` is not empty |
| `"   "` | Whitespace only (when `trim: false`, the default) |

## Notes

- Common use case: honeypot fields — hidden inputs that should remain empty to detect bots.
- Use `trim: true` if you want whitespace-only values to also be considered empty.
