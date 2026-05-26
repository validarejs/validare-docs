---
outline: deep
---

# `vin`

Validates a VIN (Vehicle Identification Number) for USA vehicles.

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
      <label>VIN (USA)</label>
      <input type="text" name="val" placeholder="1HGBH41JXMN109186">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { vin: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"1HGBH41JXMN109186"` | Valid Honda VIN |

## Invalid values

| Value | Reason |
|---|---|
| `"1HGBH41JXMN109187"` | Fails check digit |
| `"1HGBH41JXMN10918"` | Only 16 chars instead of 17 |

## Notes

- Empty string (`""`) always returns `valid: true`. Combine with `notEmpty` to require a value.
- VIN is exactly 17 alphanumeric characters. Letters I, O, and Q are not used.
- The 9th character is a check digit validated using a weighted sum algorithm.
