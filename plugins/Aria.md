# `Aria` Plugin

Adds ARIA accessibility attributes to form fields, enabling screen readers to announce validation errors.

## Options

This plugin has no configurable options beyond `enabled`.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |

## Playground

When a field is invalid, the input receives `aria-invalid="true"` and `aria-describedby` pointing to the error container. When valid, `aria-invalid="false"` and `aria-describedby` is removed. The status line below the form shows the current attribute values.

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="button" id="btn">Validate</button>
    <p id="out" style="margin-top:8px;font-size:13px;color:#555;font-family:monospace"></p>
  </form>
\`;
const { validare, Message, Aria } = Validare;
const fv = validare(document.getElementById('demo'), {
  fields: {
    email: {
      validators: {
        notEmpty: { message: 'Email is required' },
        email:    { message: 'Please enter a valid email address' },
      },
    },
  },
  plugins: {
    message: new Message(),
    aria:    new Aria(),
  },
});
document.getElementById('btn').addEventListener('click', async () => {
  await fv.validate();
  const input = document.querySelector('[name="email"]');
  const parts = ['aria-invalid="' + input.getAttribute('aria-invalid') + '"'];
  if (input.getAttribute('aria-describedby')) {
    parts.push('aria-describedby="' + input.getAttribute('aria-describedby') + '"');
  }
  document.getElementById('out').textContent = parts.join(', ');
});
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- Sets `aria-invalid="true"` on invalid elements and `aria-invalid="false"` on valid elements after each validation run.
- When used alongside the `Message` plugin, also sets `aria-describedby` on the field pointing to the error container, and `role="alert"` on the container so screen readers announce new errors automatically.
- Works without `Message` — only `aria-invalid` is set in that case.
- For radio/checkbox groups, `aria-describedby` is set on all elements in the group.
- Container `id` and `role` attributes are cleaned up when a field transitions back to valid.
