---
outline: deep
---

# `email`

Validates that a field contains a valid email address.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `multiple` | `boolean` | `false` | Accept a comma- or semicolon-separated list of email addresses |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email</label>
      <input type="email" name="val" placeholder="user@example.com">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { email: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"user@example.com"` | Standard email |
| `"user+tag@sub.example.co.uk"` | Subdomains and tags |

## Invalid values

| Value | Reason |
|---|---|
| `"user@"` | Missing domain |
| `"user"` | No @ symbol |
| `"@example.com"` | Missing local part |

## Valid values

| Value | Notes |
|---|---|
| `"user@example.com"` | Standard email |
| `"user+tag@sub.example.co.uk"` | Subdomains and tags |
| `"a@b.com, c@d.com"` | Two addresses with `multiple: true` |
| `"a@b.com;c@d.com"` | Semicolon separator with `multiple: true` |

## Invalid values

| Value | Reason |
|---|---|
| `"user@"` | Missing domain |
| `"user"` | No @ symbol |
| `"@example.com"` | Missing local part |
| `"a@b.com, notanemail"` | One invalid address in the list |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- With `multiple: true`, all addresses in the list must be valid for the field to pass.
