---
outline: deep
---

# `Icon` Plugin

Shows a validation state icon (valid, invalid, or validating) next to each field.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `valid` | `string` | `"✓"` | Content of the icon when the field is valid |
| `invalid` | `string` | `"✗"` | Content of the icon when the field is invalid |
| `validating` | `string` | `"…"` | Content of the icon while validation is running |

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
const { validare, Trigger, Message, Icon } = Validare;
validare(document.getElementById('demo'), {
  fields: { email: { validators: { notEmpty: {}, email: {} } } },
  plugins: {
    trigger:  new Trigger({ event: 'blur' }),
    message:  new Message(),
    icon:     new Icon({ valid: '✓', invalid: '✗', validating: '…' })
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- Icons are rendered as `<span>` elements inserted after each validated field element.
- The `valid`, `invalid`, and `validating` values are set as `textContent`. Plain Unicode characters work correctly. SVG markup and HTML entity syntax are NOT interpreted — use actual Unicode characters (e.g., `"✓"` not `"&check;"`).
- The `validating` option is reserved but not yet implemented — no icon state change occurs while validation is in progress.
- On `uninstall()`, all icon elements are removed from the DOM.
