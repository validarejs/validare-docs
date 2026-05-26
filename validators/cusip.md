---
outline: deep
---

# `cusip`

Validates a CUSIP (Committee on Uniform Securities Identification Procedures) number used to identify North American securities.

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
      <label>CUSIP</label>
      <input type="text" name="val" placeholder="037833100">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { cusip: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"037833100"` | Apple Inc. CUSIP |
| `"38259P508"` | Google (Alphabet) CUSIP |

## Invalid values

| Value | Reason |
|---|---|
| `"037833101"` | Fails check digit |
| `"12345678"` | Too short (8 chars instead of 9) |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- CUSIP is always 9 characters: 6 alphanumeric issuer, 2 issue, 1 check digit.
