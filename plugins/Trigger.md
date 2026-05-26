---
outline: deep
---

# `Trigger` Plugin

Attaches DOM event listeners to form fields and triggers validation when they fire.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `event` | `string \| Record<string, string \| false>` | `"input"` | DOM event name(s) to listen to. Use a record to set per-field events. Set to `false` to disable a field. |
| `delay` | `number` | `0` | Debounce delay in milliseconds before triggering validation |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email (validates on blur)</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Username (validates on every keystroke)</label>
      <input type="text" name="username" placeholder="Type to validate live">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate all</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    email:    { validators: { notEmpty: {}, email: {} } },
    username: { validators: { notEmpty: {}, stringLength: { min: 3, max: 20 } } }
  },
  plugins: {
    trigger:  new Trigger({ event: { email: 'blur', username: 'input' } }),
    message:  new Message()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- Without `Trigger`, validation only runs when you call `fv.validate()` or `fv.validateField()` manually.
- `delay` debounces the handler — useful for fields like `remote` that make network requests.
- Events are attached on `core.field.added` and cleaned up on `core.field.removed`.
