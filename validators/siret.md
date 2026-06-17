---
outline: deep
---

# `siret`

Validates a SIRET (Système d'Identification du Répertoire des Établissements) number, the French establishment identifier.

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
      <label>SIRET</label>
      <input type="text" name="val" placeholder="55214450300135">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { siret: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"73207531200045"` | SIRET of a Total establishment |

## Invalid values

| Value | Reason |
|---|---|
| `"73207531200046"` | Fails Luhn checksum |
| `"1234567890123"` | Only 13 digits instead of 14 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- SIRET is 14 digits: the 9-digit SIREN + 5-digit establishment code (NIC). Validated using the Luhn algorithm.
