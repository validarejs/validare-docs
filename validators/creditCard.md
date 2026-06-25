---
outline: deep
---

# `creditCard`

Validates a credit card number using the Luhn checksum algorithm and detects the card network.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | locale default | Custom error message |

## Result `meta`

When valid, the result includes a `meta` object with the detected card type:

```js
// result from validate()
{ valid: true, meta: { type: 'visa' } }
```

| `meta.type` | Network |
|---|---|
| `"visa"` | Visa |
| `"mastercard"` | Mastercard |
| `"amex"` | American Express |
| `"discover"` | Discover |
| `"dinersclub"` | Diners Club |
| `"jcb"` | JCB |
| `"maestro"` | Maestro |
| `"unionpay"` | UnionPay |
| `"unknown"` | Unrecognised prefix |

Use `meta.type` to display a live card logo while the user types.

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Card number</label>
      <input type="text" name="val" placeholder="4111 1111 1111 1111">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { creditCard: {} } } },
  plugins: { trigger: new Trigger({ event: 'blur' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `"4532015112830366"` | Visa |
| `"5425233430109903"` | Mastercard |
| `"378282246310005"` | American Express |

## Invalid values

| Value | Reason |
|---|---|
| `"4532015112830367"` | Fails Luhn checksum |
| `"1234567890123456"` | Not a valid card number |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- Accepts digits with or without spaces/hyphens.
