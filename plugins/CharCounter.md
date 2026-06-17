# `CharCounter` Plugin

Displays a live character counter for fields that have a `stringLength` max configured. Updates on every keystroke.

## Markup

Add a container element with the class `vd-plugins-char-counter` inside the field wrapper — the plugin writes the count into it:

```html
<div class="field">
  <label>Bio</label>
  <input type="text" name="bio">
  <span class="vd-plugins-char-counter"></span>
</div>
```

Fields without a `stringLength` max validator are silently ignored.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |
| `container` | `string` | `".vd-plugins-char-counter"` | CSS selector for the counter element inside the field wrapper |
| `renderCount` | `(current, max) => string` | `"current / max"` | Custom render function for the counter text |
| `exceededClass` | `string` | `"vd-plugins-char-counter--exceeded"` | CSS class added to the container when the count exceeds `max` |
| `fields` | `string[]` | all fields | Restrict counter to specific field names |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Username (max 20)</label>
      <input type="text" name="username" placeholder="Type here...">
      <div class="vd-plugins-message-container"></div>
      <small class="vd-plugins-char-counter" style="color:#64748b"></small>
    </div>
    <div class="field">
      <label>Bio (max 100)</label>
      <textarea name="bio" rows="3" placeholder="Tell us about yourself..."></textarea>
      <div class="vd-plugins-message-container"></div>
      <small class="vd-plugins-char-counter" style="color:#64748b"></small>
    </div>
    <button type="button" id="btn">Validate</button>
  </form>
\`;
const css = document.createElement('style');
css.textContent = '.vd-plugins-char-counter--exceeded { color: #dc2626 !important; font-weight: 600; }';
document.head.appendChild(css);

const { validare, Message, Trigger, CharCounter } = Validare;
const fv = validare(document.getElementById('demo'), {
  fields: {
    username: { validators: {
      notEmpty:     { message: 'Username is required' },
      stringLength: { max: 20, message: 'Max 20 characters' },
    }},
    bio: { validators: {
      stringLength: { max: 100, message: 'Max 100 characters' },
    }},
  },
  plugins: {
    trigger:     new Trigger({ event: 'input' }),
    message:     new Message(),
    charCounter: new CharCounter({
      renderCount: (current, max) => \`\${max - current} characters remaining\`,
    }),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- The counter element must be **inside the same wrapper** as the input (the plugin searches within the closest `div`, `fieldset`, or `li` ancestor).
- Works with `<textarea>` in addition to `<input>`.
- The `exceededClass` is purely visual — it does not affect validation. The `stringLength` validator handles the actual constraint.
- Use `renderCount` to localise the counter or switch to a "remaining" format: `(current, max) => \`${max - current} left\``.
