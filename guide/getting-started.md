# Getting Started

## Installation

::: code-group

```bash [npm]
npm install @validare/core
```

```bash [CDN (UMD)]
<script src="https://unpkg.com/@validare/core/dist/index.umd.js"></script>
```

:::

## Your First Form

```html
<form id="myForm" novalidate>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" />
    <div class="vd-plugins-message-container"></div>
  </div>
  <button type="submit">Submit</button>
</form>
```

```js
import { validare, Trigger, Message } from '@validare/core';

const fv = validare(document.getElementById('myForm'), {
  fields: {
    email: {
      validators: {
        notEmpty: { message: 'Email is required' },
        email:    { message: 'Please enter a valid email' },
      },
    },
  },
  plugins: {
    trigger:  new Trigger({ event: 'blur' }),
    message:  new Message(),
  },
});
```

## Handling Submit

```js
document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const result = await fv.validate();
  if (result === 'Valid') {
    // safe to submit
  }
});
```

`fv.validate()` returns `'Valid'`, `'Invalid'`, or `'NotValidated'`.

## CDN Usage

```html
<script src="https://unpkg.com/@validare/core/dist/index.umd.js"></script>
<script>
  const { validare, Trigger, Message } = Validare;

  const fv = validare(document.getElementById('myForm'), {
    fields: {
      email: { validators: { notEmpty: {}, email: {} } },
    },
    plugins: {
      trigger: new Trigger({ event: 'blur' }),
      message: new Message(),
    },
  });
</script>
```
