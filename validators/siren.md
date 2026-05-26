---
outline: deep
---

# `siren`

Validates a SIREN (Système d'Identification du Répertoire des Entreprises) number, the French company identifier.

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
      <label>SIREN</label>
      <input type="text" name="val" placeholder="552 144 503">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { siren: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"732075312"` | SIREN of Total S.A. |
| `"552032534"` | SIREN of Air France |

## Invalid values

| Value | Reason |
|---|---|
| `"732075313"` | Fails Luhn checksum |
| `"12345678"` | Only 8 digits instead of 9 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- SIREN is exactly 9 digits, validated using the Luhn algorithm.
