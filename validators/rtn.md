---
outline: deep
---

# `rtn`

Validates a US RTN (Routing Transit Number) used to identify financial institutions.

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
      <label>Routing number</label>
      <input type="text" name="val" placeholder="021000021">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { rtn: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"021000021"` | JPMorgan Chase routing number |
| `"011000138"` | Bank of America routing number |

## Invalid values

| Value | Reason |
|---|---|
| `"021000022"` | Fails weighted checksum |
| `"12345678"` | Only 8 digits instead of 9 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- RTN is exactly 9 digits. Validated using a weighted checksum (mod 10).
