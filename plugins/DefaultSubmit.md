# `DefaultSubmit` Plugin

Automatically submits the form when all fields pass validation — no manual submit handler needed.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |

## Playground

Fill in both fields and click Validate. When all fields are valid, the form submits automatically (intercepted here to show a confirmation message).

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Name</label>
      <input type="text" name="name" placeholder="Your name">
      <div class="fv-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="button" id="btn">Validate</button>
    <p id="out" style="margin-top:8px;font-size:13px;color:#16a34a;font-weight:600"></p>
  </form>
\`;
const { validare, Message, DefaultSubmit } = Validare;

// Intercept form.submit so the playground doesn't navigate
const form = document.getElementById('demo');
form.submit = () => {
  document.getElementById('out').textContent = '✓ Form submitted!';
};

const fv = validare(form, {
  fields: {
    name:  { validators: { notEmpty: { message: 'Name is required' } } },
    email: { validators: { notEmpty: { message: 'Email is required' },
                           email:    { message: 'Enter a valid email' } } },
  },
  plugins: {
    message:       new Message(),
    defaultSubmit: new DefaultSubmit(),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- `form.submit()` is called directly — it bypasses the form's `submit` event. If you need to intercept submission (e.g., for AJAX), listen to `core.form.valid` instead and call your own handler.
- Do **not** name any form control `name="submit"` — that shadows the native `form.submit()` method and will throw an error on install.
- Pair with `SubmitButton` to disable the submit button during async validation and re-enable on completion.
