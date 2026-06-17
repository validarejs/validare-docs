---
outline: deep
---

# `Tailwind` Plugin

Applies Tailwind CSS utility classes to form fields based on their validation state.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `validClass` | `string` | `""` | Space-separated Tailwind classes applied when the field is valid |
| `invalidClass` | `string` | `""` | Space-separated Tailwind classes applied when the field is invalid |

## Playground

<script setup>
const code = `const script = document.createElement('script');
script.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(script);

script.onload = () => {
  const form = document.createElement('form');
  form.id = 'tw-demo';
  form.noValidate = true;
  form.className = 'p-4 max-w-sm';
  form.innerHTML = \`
    <div class="mb-4">
      <label class="block font-medium mb-1" for="name">Full Name</label>
      <input type="text" id="name" name="name"
             class="w-full border rounded px-3 py-2 text-sm"
             placeholder="Jane Doe">
      <div class="vd-plugins-message-container text-red-600 text-xs mt-1"></div>
    </div>
    <div class="mb-4">
      <label class="block font-medium mb-1" for="email">Email</label>
      <input type="email" id="email" name="email"
             class="w-full border rounded px-3 py-2 text-sm"
             placeholder="jane@example.com">
      <div class="vd-plugins-message-container text-red-600 text-xs mt-1"></div>
    </div>
    <button type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
      Submit
    </button>
  \`;
  document.body.appendChild(form);

  const { validare, Trigger, Message, Tailwind } = Validare;
  validare(form, {
    fields: {
      name:  { validators: { notEmpty: {}, stringLength: { min: 2 } } },
      email: { validators: { notEmpty: {}, email: {} } }
    },
    plugins: {
      trigger: new Trigger({ event: 'blur' }),
      message: new Message(),
      ui:      new Tailwind({ validClass: 'border-green-500', invalidClass: 'border-red-500' })
    }
  });
};`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- The `Tailwind` plugin has no default classes. Always pass `validClass` and `invalidClass` options. Also add the `Message` plugin to show error text.
- Both `validClass` and `invalidClass` default to `""` — you must provide class names for the plugin to have any visual effect.
- Supports multiple space-separated classes: `"ring-2 ring-green-500 border-green-500"`.
- Classes are added to the `<input>` element directly.
- On `uninstall()`, all validation classes are removed.
