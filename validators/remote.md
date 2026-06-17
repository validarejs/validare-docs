---
outline: deep
---

# `remote`

Validates a field by sending its value to a remote server and checking the response.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `url` | `string` | *required* | URL to send the validation request to |
| `method` | `"GET" \| "POST"` | `"GET"` | HTTP method |
| `data` | `Record<string, string>` | `{}` | Additional data to send with the request |
| `headers` | `Record<string, string>` | `{}` | Additional request headers |
| `message` | `string` | locale default | Custom error message |

## Playground

> The playground below uses the `promise` validator to simulate remote validation because a real server endpoint is unavailable in the browser sandbox. For actual usage, see the `remote` configuration example below.

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Username (try "admin" — already taken)</label>
      <input type="text" name="val" placeholder="username">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
// Simulated with promise validator (real usage: use the remote validator with a server endpoint)
validare(document.getElementById('demo'), {
  fields: {
    val: {
      validators: {
        promise: {
          message: 'Username is already taken',
          promise: (input) =>
            new Promise(resolve =>
              setTimeout(() => resolve({ valid: input.value !== 'admin' }), 400)
            )
        }
      }
    }
  },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

### Real `remote` validator configuration

```js
validare(form, {
  fields: {
    email: {
      validators: {
        remote: {
          url: '/api/validate-email',
          method: 'POST',
          message: 'Email is already registered',
        },
      },
    },
  },
});
```

## Valid values

| Value | Notes |
|---|---|
| Server returns `{ "valid": true }` | Validation passes |

## Invalid values

| Value | Reason |
|---|---|
| Server returns `{ "valid": false }` | Validation fails |
| Server returns `{ "valid": false, "message": "Email taken" }` | Fails with server-provided message |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- The server must return JSON: `{ "valid": true }` or `{ "valid": false, "message": "..." }`.
- For GET requests, the field value is appended as a query parameter.
- Use `Sequence` plugin to avoid sending requests until basic format validators pass.
