---
outline: deep
---

# `sedol`

Validates a SEDOL (Stock Exchange Daily Official List) number used by the London Stock Exchange.

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
      <label>SEDOL</label>
      <input type="text" name="val" placeholder="B0WNLY7">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { sedol: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"0263494"` | Valid SEDOL |
| `"B0WNLY7"` | Alphanumeric SEDOL |

## Invalid values

| Value | Reason |
|---|---|
| `"0263495"` | Fails check digit |
| `"12345"` | Too short |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- SEDOL is 7 characters: 6 alphanumeric + 1 check digit.
