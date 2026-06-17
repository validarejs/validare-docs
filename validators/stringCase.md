---
outline: deep
---

# `stringCase`

Validates that a string is entirely uppercase or entirely lowercase.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `case` | `"upper" \| "lower"` | *required* | The required case |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Country code (uppercase)</label>
      <input type="text" name="val" placeholder="US">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { stringCase: { case: 'upper' } } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"HELLO"` | All uppercase (case=upper) |
| `"hello"` | All lowercase (case=lower) |

## Invalid values

| Value | Reason |
|---|---|
| `"hello"` | Lowercase when `case: "upper"` |
| `"Hello"` | Mixed case |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- Non-letter characters (digits, symbols) are ignored in the case check.
