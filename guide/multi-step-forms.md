# Multi-Step Forms

Multi-step forms (also called wizards) split a long form into sequential steps. Validare handles this natively — no special plugin needed.

## The Pattern

Create one `validare` instance per step, all pointing to the **same `<form>` element** but declaring only the fields for that step.

```js
const steps = [
  validare(form, {
    fields: {
      name:  { validators: { notEmpty: { message: 'Name is required' } } },
      email: { validators: { notEmpty: { message: 'Email is required' },
                             email:    { message: 'Enter a valid email' } } },
    },
    plugins: { message: new Message(), trigger: new Trigger() },
  }),
  validare(form, {
    fields: {
      address: { validators: { notEmpty: { message: 'Address is required' } } },
      city:    { validators: { notEmpty: { message: 'City is required' } } },
    },
    plugins: { message: new Message(), trigger: new Trigger() },
  }),
  validare(form, {
    fields: {
      card:    { validators: { notEmpty: { message: 'Card number is required' },
                               creditCard: { message: 'Invalid card number' } } },
      cvv:     { validators: { notEmpty: { message: 'CVV is required' },
                               digits:    { message: 'CVV must be digits' } } },
    },
    plugins: { message: new Message(), trigger: new Trigger() },
  }),
];
```

## Wiring the Navigation

```js
let currentStep = 0;

nextBtn.addEventListener('click', async () => {
  const status = await steps[currentStep].validate();
  if (status === 'Valid') {
    showStep(currentStep + 1);
    currentStep++;
  }
});

prevBtn.addEventListener('click', () => {
  showStep(currentStep - 1);
  currentStep--;
});

submitBtn.addEventListener('click', async () => {
  const status = await steps[currentStep].validate();
  if (status === 'Valid') {
    form.submit();
  }
});

function showStep(index) {
  document.querySelectorAll('.step').forEach((el, i) => {
    el.style.display = i === index ? '' : 'none';
  });
  prevBtn.style.display = index === 0 ? 'none' : '';
  nextBtn.style.display = index === steps.length - 1 ? 'none' : '';
  submitBtn.style.display = index === steps.length - 1 ? '' : 'none';
}
```

## Why Not a Plugin?

A Wizard plugin would manage DOM navigation internally — but navigation is always specific to your project: which stepper library, how steps animate, progress indicators, URL routing between steps. Keeping this in your own code gives you full control without fighting plugin constraints.

Each `validare` instance is independent: it only knows about its own fields, fires its own `core.form.valid`/`core.form.invalid` events, and cleans up independently.

## Complete Example

```html
<form id="wizard-form" novalidate>

  <!-- Step 1 -->
  <div class="step">
    <h3>Account</h3>
    <input type="text"  name="name"  placeholder="Full name">
    <input type="email" name="email" placeholder="Email">
  </div>

  <!-- Step 2 -->
  <div class="step" style="display:none">
    <h3>Address</h3>
    <input type="text" name="address" placeholder="Street address">
    <input type="text" name="city"    placeholder="City">
  </div>

  <!-- Step 3 -->
  <div class="step" style="display:none">
    <h3>Payment</h3>
    <input type="text" name="card" placeholder="Card number">
    <input type="text" name="cvv"  placeholder="CVV">
  </div>

  <button type="button" id="prev" style="display:none">← Back</button>
  <button type="button" id="next">Next →</button>
  <button type="button" id="submit" style="display:none">Submit</button>

</form>
```

```js
import { validare, Message, Trigger } from 'validare';

const form = document.getElementById('wizard-form');
const nextBtn   = document.getElementById('next');
const prevBtn   = document.getElementById('prev');
const submitBtn = document.getElementById('submit');

const steps = [
  validare(form, {
    fields: {
      name:  { validators: { notEmpty: { message: 'Name is required' } } },
      email: { validators: { notEmpty: { message: 'Email is required' },
                             email:    { message: 'Enter a valid email' } } },
    },
    plugins: { message: new Message(), trigger: new Trigger() },
  }),
  validare(form, {
    fields: {
      address: { validators: { notEmpty: { message: 'Address is required' } } },
      city:    { validators: { notEmpty: { message: 'City is required' } } },
    },
    plugins: { message: new Message(), trigger: new Trigger() },
  }),
  validare(form, {
    fields: {
      card: { validators: { notEmpty: { message: 'Card number is required' },
                            creditCard: { message: 'Invalid card number' } } },
      cvv:  { validators: { notEmpty: { message: 'CVV is required' },
                            digits:    { message: 'CVV must be digits only' } } },
    },
    plugins: { message: new Message(), trigger: new Trigger() },
  }),
];

let currentStep = 0;

function showStep(index) {
  document.querySelectorAll('.step').forEach((el, i) => {
    el.style.display = i === index ? '' : 'none';
  });
  prevBtn.style.display   = index === 0 ? 'none' : '';
  nextBtn.style.display   = index === steps.length - 1 ? 'none' : '';
  submitBtn.style.display = index === steps.length - 1 ? '' : 'none';
}

nextBtn.addEventListener('click', async () => {
  const status = await steps[currentStep].validate();
  if (status === 'Valid') {
    currentStep++;
    showStep(currentStep);
  }
});

prevBtn.addEventListener('click', () => {
  currentStep--;
  showStep(currentStep);
});

submitBtn.addEventListener('click', async () => {
  const status = await steps[currentStep].validate();
  if (status === 'Valid') {
    form.submit();
  }
});
```

## Tips

- **Reset on back:** Call `steps[previousStep].reset()` when going back if you want to clear the validation state.
- **Shared fields:** If a field appears in multiple steps (unusual), include it only in the first step's instance.
- **Async validators:** `validate()` returns a `Promise<ValidationStatus>` — `await` works naturally with `remote` or `promise` validators.
- **Progress indicators:** Read `currentStep / steps.length` to update your own progress bar — the instances don't manage UI state.
