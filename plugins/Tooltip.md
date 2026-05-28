# `Tooltip` Plugin

Displays validation error messages in a floating tooltip instead of a static message block, triggered by hovering or clicking the invalid field.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |
| `placement` | `string` | `'top'` | Tooltip position: `'top'`, `'bottom'`, `'left'`, `'right'` |
| `trigger` | `string` | `'hover'` | Show trigger: `'hover'` (mouseenter/mouseleave) or `'click'` (click field; document click hides) |

## Playground

Validate the form, then hover over the invalid field to see the tooltip.

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
    </div>
    <div class="field">
      <label>Name</label>
      <input type="text" name="name" placeholder="Your name">
    </div>
    <button type="button" id="btn">Validate</button>
  </form>
\`;
const css = document.createElement('style');
css.textContent = \`
  .fv-plugins-tooltip {
    position: absolute; z-index: 9999;
    background: #1e293b; color: #fff;
    font-size: 12px; padding: 5px 10px;
    border-radius: 4px; pointer-events: none;
    white-space: nowrap; display: none;
  }
  .fv-plugins-tooltip--show { display: block; }
  .fv-plugins-tooltip--top { margin-top: -4px; transform: translateY(-100%); }
  .fv-plugins-tooltip--bottom { margin-top: 4px; }
\`;
document.head.appendChild(css);
const { validare, Tooltip } = Validare;
const fv = validare(document.getElementById('demo'), {
  fields: {
    email: { validators: {
      notEmpty: { message: 'Email is required' },
      email:    { message: 'Please enter a valid email' },
    }},
    name: { validators: {
      notEmpty: { message: 'Name is required' },
    }},
  },
  plugins: {
    tooltip: new Tooltip({ placement: 'top', trigger: 'hover' }),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- Tooltip is an **alternative to `Message`** — use one or the other (both can coexist but it's unusual).
- The plugin creates a single `div.fv-plugins-tooltip` in `document.body` and positions it using `getBoundingClientRect`.
- Add CSS for `.fv-plugins-tooltip` and `.fv-plugins-tooltip--show` to control appearance (the plugin only handles visibility and position).
- With `trigger: 'click'`, clicking the field shows the tooltip; clicking anywhere else hides it.
- Use `Tooltip` alongside `Trigger` (with `event: 'input'`) for live feedback as the user types.
