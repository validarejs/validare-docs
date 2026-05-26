---
outline: deep
---

# `ean`

Validates an EAN (European Article Number) barcode — EAN-8 or EAN-13.

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
      <label>EAN barcode</label>
      <input type="text" name="val" placeholder="4006381333931">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { ean: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"5901234123457"` | Valid EAN-13 |
| `"96385074"` | Valid EAN-8 |

## Invalid values

| Value | Reason |
|---|---|
| `"5901234123456"` | EAN-13 with wrong check digit |
| `"12345678901"` | 11 digits — neither EAN-8 nor EAN-13 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- EAN-8 has 8 digits; EAN-13 has 13 digits. Both use a mod-10 checksum.
