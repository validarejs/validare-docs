---
outline: deep
---

# `Transformer` Plugin

Transforms the value seen by a specific validator without modifying the actual input. Other validators on the same field receive the original value.

## Options

The options object is a nested map:

```ts
{
  [fieldName: string]: {
    [validatorName: string]: (field: string, element: HTMLElement, validator: string) => string
  }
}
```

Each transform function receives the field name, the DOM element, and the validator name, and returns the value string to use for that validator.

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Credit Card (spaces and dashes are stripped before validation)</label>
      <input type="text" name="cc" placeholder="4111 1111 1111 1111">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Phone (non-digits stripped before digits check)</label>
      <input type="text" name="phone" placeholder="(555) 123-4567">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message, Transformer } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    cc: {
      validators: {
        notEmpty:   { message: 'Card number is required' },
        creditCard: { message: 'Invalid card number' }
      }
    },
    phone: {
      validators: {
        notEmpty: { message: 'Phone is required' },
        digits:   { message: 'Phone must contain only digits' }
      }
    }
  },
  plugins: {
    trigger:     new Trigger({ event: 'blur' }),
    message:     new Message(),
    transformer: new Transformer({
      cc:    { creditCard: (_f, el) => el.value.replace(/[\s-]/g, '') },
      phone: { digits:    (_f, el) => el.value.replace(/\D/g, '') }
    })
  }
});`
</script>

<ValidarePlayground :code="code" height="400px" />

## Notes

- Only the specified validator sees the transformed value — `notEmpty` on the same field always sees the raw value.
- The transform function is called on every validation run; it does not modify the DOM.
- Disable the plugin with `fv.disablePlugin('transformer')` to revert to raw values.
- Works with the built-in `field-value` filter hook added to Core.
