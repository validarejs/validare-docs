---
outline: deep
---

# `ein`

Validates a US EIN (Employer Identification Number), also known as a Federal Tax ID.

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
      <label>EIN</label>
      <input type="text" name="val" placeholder="12-3456789">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { ein: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"12-3456789"` | Standard EIN format with hyphen |
| `"123456789"` | EIN without hyphen |

## Invalid values

| Value | Reason |
|---|---|
| `"07-1234567"` | Prefix `07` is not assigned |
| `"00-0000000"` | All-zero EIN is invalid |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Format: two-digit prefix + hyphen + seven digits (`XX-XXXXXXX`).
- Certain prefix codes (00, 07, 08, 09, 17, 18, 19, 28, 29, 49, 69, 70, 78, 79, 89, 96, 97) are not assigned. Note: prefix `99` is valid and assigned.
