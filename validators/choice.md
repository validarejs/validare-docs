---
outline: deep
---

# `choice`

Validates that the number of selected checkboxes in a group is within a specified range.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `min` | `number` | `undefined` | Minimum number of checkboxes that must be checked |
| `max` | `number` | `undefined` | Maximum number of checkboxes that can be checked |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <fieldset class="field">
      <legend>Pick 1–3 interests</legend>
      <label><input type="checkbox" name="val" value="sports"> Sports</label>
      <label><input type="checkbox" name="val" value="music"> Music</label>
      <label><input type="checkbox" name="val" value="travel"> Travel</label>
      <label><input type="checkbox" name="val" value="food"> Food</label>
      <div class="vd-plugins-message-container"></div>
    </fieldset>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { choice: { min: 1, max: 3 } } } },
  plugins: { trigger: new Trigger({ event: 'change' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| 2 checkboxes checked | Within min=1, max=3 |
| 1 checkbox checked | Equal to min |

## Invalid values

| Value | Reason |
|---|---|
| 0 checkboxes checked | Below min=1 |
| 4 checkboxes checked | Exceeds max=3 |

## Notes

- If no checkboxes are checked, `choice` counts 0 selected items. Set `min: 1` or higher to require at least one selection.
- Do not combine with `notEmpty` — it checks string values, not checkbox state.
- Applies to groups of checkboxes sharing the same `name` attribute.
