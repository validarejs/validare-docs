# `Summary` Plugin

Renders a consolidated list of all form errors in a fixed container — useful for long forms where inline errors may be out of the viewport when the user clicks submit.

## Markup

Place a container element with the class `fv-plugins-summary` anywhere on the page — typically above the form:

```html
<div class="fv-plugins-summary"></div>

<form id="myForm" novalidate>
  ...
</form>
```

The summary appears when the form fails validation and clears automatically when the form becomes valid or is reset.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |
| `container` | `string` | `".fv-plugins-summary"` | CSS selector for the summary container |
| `renderTitle` | `() => string` | `"Please fix the following errors:"` | Title rendered above the list. Return `""` to omit. |
| `renderItem` | `(field, message) => string` | `message` | Formats each error item. Receives the field name and message. |
| `autoScroll` | `boolean` | `false` | Scrolls the container into view after rendering |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <div class="fv-plugins-summary" style="
    margin-bottom:12px; padding:12px 16px;
    background:#fef2f2; border:1px solid #fca5a5;
    border-radius:6px; color:#991b1b; display:none
  "></div>
  <form id="demo" novalidate>
    <div class="field">
      <label>Name</label>
      <input type="text" name="name" placeholder="Jane Doe">
      <div class="fv-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="jane@example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Password (min 8 chars)</label>
      <input type="password" name="password" placeholder="••••••••">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="button" id="btn">Submit</button>
  </form>
\`;

// Show/hide the summary container based on content
const summaryEl = document.querySelector('.fv-plugins-summary');
const observer = new MutationObserver(() => {
  summaryEl.style.display = summaryEl.innerHTML ? 'block' : 'none';
});
observer.observe(summaryEl, { childList: true, subtree: true });

const { validare, Message, Summary } = Validare;
const fv = validare(document.getElementById('demo'), {
  fields: {
    name:     { validators: { notEmpty: { message: 'Name is required' } } },
    email:    { validators: {
      notEmpty: { message: 'Email is required' },
      email:    { message: 'Enter a valid email' },
    }},
    password: { validators: {
      notEmpty:     { message: 'Password is required' },
      stringLength: { min: 8, message: 'At least 8 characters' },
    }},
  },
  plugins: {
    message: new Message(),
    summary: new Summary({ autoScroll: false }),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- The summary renders on `core.form.invalid` and clears on `core.form.valid` and `core.form.reset`.
- Error messages come from the validators — the same messages shown by the `Message` plugin.
- Use `renderItem` to add links that focus the relevant field: `(field, msg) => \`<a href="#" onclick="...">${msg}</a>\``.
- The container is not shown or hidden by the plugin — use a `MutationObserver` or CSS (`:empty { display: none }`) to control visibility.
- Pair with `autoScroll: true` on long forms so the user sees the error list immediately after clicking submit.
