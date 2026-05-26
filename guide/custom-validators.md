# Custom Validators

Three built-in validators let you write custom validation logic.

## `callback` — Synchronous

```js
fields: {
  username: {
    validators: {
      callback: {
        message: 'Username must start with a letter',
        callback: (input) => ({
          valid: /^[a-zA-Z]/.test(input.value),
        }),
      },
    },
  },
},
```

The `callback` function receives a `ValidatorInput` object with `value`, `element`, `field`, and `elements`.

## `promise` — Asynchronous

```js
fields: {
  username: {
    validators: {
      promise: {
        message: 'Username is already taken',
        promise: async (input) => {
          const res = await fetch(`/api/check-username?q=${input.value}`);
          const data = await res.json();
          return { valid: data.available };
        },
      },
    },
  },
},
```

## `remote` — HTTP endpoint

```js
fields: {
  email: {
    validators: {
      remote: {
        url: '/api/validate-email',
        method: 'GET',           // default
        message: 'Email already registered',
        // The validator appends ?field=email&value=<input> to the URL.
        // The endpoint must return: { valid: true } or { valid: false, message: '...' }
      },
    },
  },
},
```

## Returning a Custom Message

Any validator can return a custom message alongside the result:

```js
callback: (input) => ({
  valid: false,
  message: `"${input.value}" is not allowed`,
}),
```
