---
outline: deep
---

# `isbn`

Validates an ISBN (International Standard Book Number) — ISBN-10 or ISBN-13.

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
      <label>ISBN</label>
      <input type="text" name="val" placeholder="978-3-16-148410-0">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { isbn: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"978-0-306-40615-2"` | Valid ISBN-13 with hyphens |
| `"0-306-40615-2"` | Valid ISBN-10 with hyphens |
| `"9780306406157"` | Valid ISBN-13 without hyphens |

## Invalid values

| Value | Reason |
|---|---|
| `"978-0-306-40615-3"` | Wrong check digit |
| `"12345"` | Too short |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- Accepts both ISBN-10 (10 digits) and ISBN-13 (978- or 979- prefix, 13 digits).
- Hyphens are optional and ignored during validation.
