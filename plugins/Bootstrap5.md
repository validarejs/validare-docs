---
outline: deep
---

# `Bootstrap5` Plugin

Applies Bootstrap 5 validation classes (`is-valid` / `is-invalid`) to form fields based on their validation state.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `validClass` | `string` | `"is-valid"` | CSS class applied when the field is valid |
| `invalidClass` | `string` | `"is-invalid"` | CSS class applied when the field is invalid |

## Playground

<script setup>
const code = `// Inject Bootstrap 5 stylesheet into the iframe head
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
document.head.appendChild(link);

document.body.innerHTML = \`
  <div style="padding:1rem;max-width:400px">
    <div class="mb-3">
      <label for="name" class="form-label">Full Name</label>
      <input type="text" id="name" name="name" class="form-control" placeholder="Jane Doe">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" name="email" class="form-control" placeholder="jane@example.com">
    </div>
    <button type="submit" class="btn btn-primary" form="bs-demo">Submit</button>
  </div>
\`;

// Wrap in a form
const form = document.createElement('form');
form.id = 'bs-demo';
form.noValidate = true;
form.appendChild(document.body.firstElementChild);
document.body.appendChild(form);

const { validare, Trigger, Bootstrap5 } = Validare;
validare(form, {
  fields: {
    name:  { validators: { notEmpty: {}, stringLength: { min: 2 } } },
    email: { validators: { notEmpty: {}, email: {} } }
  },
  plugins: {
    trigger: new Trigger({ event: 'blur' }),
    ui:      new Bootstrap5()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- Classes are added directly to the `<input>` element (not the wrapper `<div>`).
- The `Message` plugin is recommended alongside `Bootstrap5` to display error text.
- On `uninstall()` (e.g., `fv.destroy()`), all classes are removed.
