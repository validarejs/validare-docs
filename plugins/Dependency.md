---
outline: deep
---

# `Dependency` Plugin

Automatically revalidates dependent fields when a primary field validates.

## Options

| Option | Type | Description |
|---|---|---|
| `[field]` | `string` | Space-separated list of dependent field names to revalidate when `field` validates |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Country</label>
      <select name="country">
        <option value="">— select —</option>
        <option value="US">United States</option>
        <option value="BR">Brazil</option>
      </select>
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Postal Code (re-validates when country changes)</label>
      <input type="text" name="postal" placeholder="e.g. 90210 or 01310-100">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message, Dependency } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    country: { validators: { notEmpty: { message: 'Please select a country' } } },
    postal:  {
      validators: {
        notEmpty: { message: 'Postal code is required' },
        callback: {
          message: 'Invalid postal code for selected country',
          callback: ({ value, form }) => {
            const country = form.querySelector('[name="country"]').value;
            if (country === 'US') return /^\d{5}(-\d{4})?$/.test(value);
            if (country === 'BR') return /^\d{5}-?\d{3}$/.test(value);
            return value.length > 0;
          }
        }
      }
    }
  },
  plugins: {
    trigger:    new Trigger({ event: 'change' }),
    message:    new Message(),
    dependency: new Dependency({ country: 'postal' })
  }
});`
</script>

<ValidarePlayground :code="code" height="380px" />

## Notes

- Dependents are space-separated: `{ a: 'b c' }` revalidates both `b` and `c` when `a` validates.
- Built-in loop protection: if `a` depends on `b` and `b` depends on `a`, the chain stops after one full cycle.
- Works with any event — combine with `Trigger` to trigger the cascade on `change` or `input`.
