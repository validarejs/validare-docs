---
outline: deep
---

# `regexp`

Validates that a field value matches a regular expression.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `regexp` | `string \| RegExp` | *required* | The regular expression to match against |
| `flags` | `string` | `""` | Flags applied when `regexp` is a string (e.g. `"i"` for case-insensitive) |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Lowercase letters</label>
      <input type="text" name="val" placeholder="hello">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { regexp: { regexp: /^[a-z]+$/, message: 'Lowercase letters only' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"abc123"` | Matches `^[a-z0-9]+$` |
| `"my-slug"` | Matches `^[a-z0-9-]+$` |

## Invalid values

| Value | Reason |
|---|---|
| `"ABC!"` | Uppercase and special char fail `^[a-z0-9]+$` |
| `"has space"` | Space not in pattern |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- `regexp` can be a string (`"^[0-9]+$"`) or a `RegExp` literal (`/^[0-9]+$/`).
- `flags` only applies when `regexp` is a string; RegExp literals already carry their flags.
