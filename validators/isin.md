---
outline: deep
---

# `isin`

Validates an ISIN (International Securities Identification Number).

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
      <label>ISIN</label>
      <input type="text" name="val" placeholder="US0378331005">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { isin: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"US0378331005"` | Apple Inc. ISIN |
| `"DE0005140008"` | Deutsche Bank ISIN |

## Invalid values

| Value | Reason |
|---|---|
| `"US0378331006"` | Fails Luhn check digit |
| `"XX0378331005"` | Unknown country code prefix |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Format: 2-letter country code + 9 alphanumeric chars + 1 check digit (12 chars total).
