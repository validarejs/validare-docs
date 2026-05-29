# Checkboxes & Radios

Validare handles checkbox and radio groups natively — no extra plugin needed. Elements sharing the same `name` are automatically grouped into a single field.

## Radio groups

Validate that the user selected one option using `notEmpty`:

```html
<form id="demo" novalidate>
  <label><input type="radio" name="gender" value="m"> Male</label>
  <label><input type="radio" name="gender" value="f"> Female</label>
  <label><input type="radio" name="gender" value="o"> Other</label>
  <div class="fv-plugins-message-container"></div>
</form>
```

```js
validare(form, {
  fields: {
    gender: {
      validators: {
        notEmpty: { message: 'Please select an option' },
      },
    },
  },
  plugins: { message: new Message() },
});
```

All three radio inputs share `name="gender"` — Validare reads the value of whichever is checked. If none is checked, the value is `""` and `notEmpty` returns invalid.

## Checkbox groups — require at least one

Use the `choice` validator with `min: 1`:

```html
<form id="demo" novalidate>
  <label><input type="checkbox" name="interests" value="sports"> Sports</label>
  <label><input type="checkbox" name="interests" value="music">  Music</label>
  <label><input type="checkbox" name="interests" value="travel"> Travel</label>
  <div class="fv-plugins-message-container"></div>
</form>
```

```js
validare(form, {
  fields: {
    interests: {
      validators: {
        choice: { min: 1, message: 'Select at least one interest' },
      },
    },
  },
  plugins: { message: new Message() },
});
```

## Checkbox groups — require a range

Use `min` and `max` together:

```js
validators: {
  choice: { min: 2, max: 4, message: 'Select between 2 and 4 interests' },
}
```

## Single checkbox — terms & conditions

A single checkbox also uses `notEmpty` (checked → `"on"`, unchecked → `""`):

```html
<input type="checkbox" name="terms" value="agree">
<label>I agree to the terms</label>
```

```js
validators: {
  notEmpty: { message: 'You must accept the terms' },
}
```

## Checkboxes with different `name` attributes

If each checkbox has a different `name`, treat them as independent fields:

```html
<input type="checkbox" name="newsletter" value="yes">
<input type="checkbox" name="sms"        value="yes">
```

```js
fields: {
  newsletter: { validators: { notEmpty: { message: 'Subscribe to at least one channel' } } },
  sms:        { validators: { notEmpty: { message: 'Subscribe to at least one channel' } } },
}
```

To require **at least one** of a set of differently-named checkboxes, use `callback`:

```js
function atLeastOne(input) {
  const form = input.form;
  const checked = ['newsletter', 'sms', 'push'].some(
    (name) => form.querySelector(`[name="${name}"]`)?.checked,
  );
  return { valid: checked, message: 'Select at least one notification channel' };
}

fields: {
  newsletter: { validators: { callback: { callback: atLeastOne } } },
  sms:        { validators: { callback: { callback: atLeastOne } } },
  push:       { validators: { callback: { callback: atLeastOne } } },
}
```
