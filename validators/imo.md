---
outline: deep
---

# `imo`

Validates an IMO (International Maritime Organization) ship number.

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
      <label>IMO number</label>
      <input type="text" name="val" placeholder="IMO 9074729">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { imo: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"IMO 1234567"` | Standard IMO format |

## Invalid values

| Value | Reason |
|---|---|
| `"IMO 1234568"` | Fails weighted checksum |
| `"IMO 123456"` | Only 6 digits after prefix |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Format must be `"IMO NNNNNNN"` (the `"IMO "` prefix is required). The check digit is a weighted sum of the first 6 digits.
