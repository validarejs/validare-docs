---
outline: deep
---

# `different`

Validates that a field's value is different from another field's value (or a fixed string).

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `compare` | `string` | *required* | Field name to compare against, or a fixed value |
| `trim` | `boolean` | `false` | Trim whitespace from both values before comparing |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Username</label>
      <input type="text" name="username" placeholder="Username">
      <div class="fv-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email (must differ from username)</label>
      <input type="email" name="email" placeholder="Email">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    username: { validators: { notEmpty: {} } },
    email:    { validators: { different: { compare: 'username', message: 'Email must differ from username' } } }
  },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| Different from the `currentPassword` field | Values differ |

## Invalid values

| Value | Reason |
|---|---|
| Same as the `currentPassword` field | Values match |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` if the field is required.
- `compare` can be a field name or a fixed string literal.
