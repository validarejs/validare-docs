---
outline: deep
---

# `Message` Plugin

Displays validation error messages in the DOM next to each field.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `container` | `string` | `undefined` | CSS selector for a single container to display all messages. Without this, a `<div>` is inserted after each field. |
| `clazz` | `string` | `"fv-plugins-message-container"` | CSS class applied to each message container element |
| `first` | `boolean` | `false` | When `true`, only the first error message is shown per field |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { email: { validators: { notEmpty: {}, email: {} } } },
  plugins: {
    trigger:  new Trigger({ event: 'blur' }),
    message:  new Message()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- Without `container`, a `<div class="fv-plugins-message-container">` is inserted immediately after each validated field element.
- With `container: '#errors'`, per-field message divs are inserted inside that container instead of after each field element.
- On `uninstall()` (e.g., `fv.destroy()`), all injected message elements are removed from the DOM.
- Use `first: true` to show only the first error message per field (similar to Sequence, but at the display layer — all validators still run).
