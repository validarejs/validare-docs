---
outline: deep
---

# `Bulma` Plugin

Applies Bulma validation classes (`is-success` / `is-danger`) to form fields based on their validation state.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `validClass` | `string` | `"is-success"` | CSS class applied when the field is valid |
| `invalidClass` | `string` | `"is-danger"` | CSS class applied when the field is invalid |

## Playground

<script setup>
const code = `const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css';
document.head.appendChild(link);

const form = document.createElement('form');
form.id = 'bulma-demo';
form.noValidate = true;
form.style.padding = '1rem';
form.style.maxWidth = '400px';
form.innerHTML = \`
  <div class="field">
    <label class="label" for="name">Full Name</label>
    <div class="control">
      <input type="text" id="name" name="name" class="input" placeholder="Jane Doe">
    </div>
  </div>
  <div class="field">
    <label class="label" for="email">Email</label>
    <div class="control">
      <input type="email" id="email" name="email" class="input" placeholder="jane@example.com">
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button type="submit" class="button is-primary">Submit</button>
    </div>
  </div>
\`;
document.body.appendChild(form);

const { validare, Trigger, Bulma } = Validare;
validare(form, {
  fields: {
    name:  { validators: { notEmpty: {}, stringLength: { min: 2 } } },
    email: { validators: { notEmpty: {}, email: {} } }
  },
  plugins: {
    trigger: new Trigger({ event: 'blur' }),
    ui:      new Bulma()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- Classes are added directly to the `<input>` element.
- The `Message` plugin is recommended alongside `Bulma` to display error text.
- On `uninstall()`, all validation classes are removed.
