---
outline: deep
---

# `bic`

Validates that a field contains a valid BIC (Bank Identifier Code) / SWIFT code.

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
      <label>BIC/SWIFT code</label>
      <input type="text" name="val" placeholder="DEUTDEDB">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { bic: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"DEUTDEFF"` | Deutsche Bank Frankfurt (8 chars) |
| `"BNPAFRPPXXX"` | BNP Paribas Paris (11 chars with branch) |

## Invalid values

| Value | Reason |
|---|---|
| `"INVALID"` | Does not match BIC format |
| `"DEUT1234"` | Digits in bank/country code positions |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- BIC is either 8 characters (no branch) or 11 characters (with branch code).
