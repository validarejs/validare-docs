---
outline: deep
---

# `Sequence` Plugin

Stops running validators for a field as soon as one fails, preventing unnecessary checks.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | `true` | Enable or disable sequential validation |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email (stops at first error)</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message, Sequence } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    email: {
      validators: {
        notEmpty: { message: 'Email is required' },
        email:    { message: 'Please enter a valid email address' }
      }
    }
  },
  plugins: {
    trigger:  new Trigger({ event: 'blur' }),
    message:  new Message(),
    sequence: new Sequence()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- Without `Sequence`, all validators run regardless of earlier failures.
- Particularly useful to prevent unnecessary `remote` requests when basic format validation fails.
- Uses the `field-should-validate` filter internally; compatible with `Excluded`.
- On the first validation run (before any previous results exist), the `element-validated` filter ensures only the first failing validator's message is shown.
