---
outline: deep
---

# `uri`

Validates that a field contains a valid URL.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>URL</label>
      <input type="url" name="val" placeholder="https://example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { uri: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"https://example.com"` | HTTPS URL |
| `"http://sub.example.co.uk/path?q=1"` | With subdomain, path, and query |
| `"ftp://files.example.com"` | FTP URL |

## Invalid values

| Value | Reason |
|---|---|
| `"not a url"` | No protocol |
| `"example.com"` | Missing protocol |
| `"http://"` | Missing host |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
