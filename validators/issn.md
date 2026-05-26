---
outline: deep
---

# `issn`

Validates an ISSN (International Standard Serial Number) used to identify periodicals.

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
      <label>ISSN</label>
      <input type="text" name="val" placeholder="0378-5955">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { issn: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"0028-0836"` | Nature journal ISSN |
| `"1476-4687"` | Nature online ISSN |

## Invalid values

| Value | Reason |
|---|---|
| `"0028-0837"` | Wrong check digit |
| `"12345678"` | Missing hyphen |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Format: 4 digits, hyphen, 3 digits, check character (digit or `X`): `NNNN-NNNC`.
