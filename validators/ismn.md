---
outline: deep
---

# `ismn`

Validates an ISMN (International Standard Music Number).

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
      <label>ISMN</label>
      <input type="text" name="val" placeholder="979-0-2600-0043-8">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { ismn: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"M-2306-7118-7"` | Valid ISMN-10 |
| `"979-0-2600-0043-8"` | Valid ISMN-13 |

## Invalid values

| Value | Reason |
|---|---|
| `"M-230-22107-9"` | Wrong check character |
| `"INVALID"` | Does not match ISMN format |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- ISMN identifies printed music publications. It starts with `M` (legacy) or `979-0` (ISMN-13).
