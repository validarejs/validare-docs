---
outline: deep
---

# `mac`

Validates that a field contains a valid MAC address.

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
      <label>MAC address</label>
      <input type="text" name="val" placeholder="00:11:22:33:44:55">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { mac: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"01:23:45:67:89:ab"` | Colon-separated, lowercase |
| `"01-23-45-67-89-AB"` | Hyphen-separated, uppercase |

## Invalid values

| Value | Reason |
|---|---|
| `"ZZ:ZZ:ZZ:ZZ:ZZ:ZZ"` | `Z` is not a hex digit |
| `"01:23:45:67:89"` | Only 5 groups instead of 6 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
