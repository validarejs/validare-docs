---
outline: deep
---

# `identical`

Validates that a field's value is equal to another field's value (or a fixed string).

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
      <label>Password</label>
      <input type="password" name="password" placeholder="Password">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Confirm password</label>
      <input type="password" name="confirm" placeholder="Confirm password">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    password: { validators: { notEmpty: {} } },
    confirm:  { validators: { identical: { compare: 'password', message: 'Passwords do not match' } } }
  },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| Same as the `password` field | Values match |

## Invalid values

| Value | Reason |
|---|---|
| Different from the `password` field | Values do not match |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` if the field is required.
- `compare` can be a field name (resolved at validation time) or a fixed string literal.
