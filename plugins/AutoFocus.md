# `AutoFocus` Plugin

Automatically focuses the first invalid field when form validation fails, improving keyboard navigation and accessibility.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |
| `onPrefocus` | `function` | `undefined` | Called before focusing: `({ field, element }) => void` |

## Playground

Submit the form with empty fields — the cursor jumps to the first invalid input automatically. The status line shows which field was focused.

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Name</label>
      <input type="text" name="name" placeholder="Your name">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="button" id="btn">Validate</button>
    <p id="out" style="margin-top:8px;font-size:13px;color:#555;font-family:monospace"></p>
  </form>
\`;
const { validare, Message, AutoFocus } = Validare;
const fv = validare(document.getElementById('demo'), {
  fields: {
    name:  { validators: { notEmpty: { message: 'Name is required' } } },
    email: { validators: { notEmpty: { message: 'Email is required' },
                           email:    { message: 'Please enter a valid email' } } },
  },
  plugins: {
    message:   new Message(),
    autoFocus: new AutoFocus({
      onPrefocus: ({ field }) => {
        document.getElementById('out').textContent = 'Focused: ' + field;
      }
    }),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- Focuses the **first** invalid field in the order they were defined in `fields`.
- Only fires on `core.form.invalid` — triggered by `fv.validate()`, not by `fv.validateField()`.
- Use `onPrefocus` to scroll to the field, show a toast, or log analytics before focus occurs.
- Compatible with the `Aria` plugin — combining both gives full keyboard and screen reader accessibility.
- Field statuses are cleared at the start of each `validate()` call and re-tracked fresh.
