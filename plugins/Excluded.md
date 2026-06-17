---
outline: deep
---

# `Excluded` Plugin

Skips validation for fields that are disabled, hidden, or match a custom exclusion function.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `excluded` | `string \| ((field: string, element: HTMLElement) => boolean)` | built-in rules | Custom exclusion rule. A CSS selector string or a function returning `true` to exclude the field. |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Visible field</label>
      <input type="text" name="visible" placeholder="This is validated">
      <div class="vd-plugins-message-container"></div>
    </div>
    <input type="hidden" name="hidden" value="">
    <div class="field">
      <label>Disabled field (skipped)</label>
      <input type="text" name="disabled" disabled placeholder="This is skipped">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message, Excluded } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    visible:  { validators: { notEmpty: {} } },
    hidden:   { validators: { notEmpty: {} } },
    disabled: { validators: { notEmpty: {} } }
  },
  plugins: {
    trigger:  new Trigger({ event: 'blur' }),
    message:  new Message(),
    excluded: new Excluded()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- By default, always excludes elements that have the `disabled` attribute or `type="hidden"`.
- The custom `excluded` function is evaluated after the built-in disabled/hidden check. If the built-in check already excludes the field, the custom function is not called.
- Compatible with `Sequence` — excluded fields do not count as failures.
