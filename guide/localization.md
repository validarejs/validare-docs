# Localization

Validare ships default error messages in `en_US`. Pass a locale object to override all messages at once.

```js
import { validare, pt_BR } from 'validare';

const fv = validare(form, {
  locale: pt_BR,
  fields: {
    email: { validators: { notEmpty: {}, email: {} } },
  },
});
```

## Available Locales

| Locale | Language |
|---|---|
| `en_US` | English (default — no import needed) |
| `pt_BR` | Portuguese (Brazil) |

## Per-Field Override

Any `message` option on a validator overrides the locale default for that field:

```js
fields: {
  email: {
    validators: {
      email: { message: 'Endereço de e-mail inválido' },
    },
  },
},
```

## Adding a Custom Locale

Import and build a locale object matching the `LocaleData` interface, then pass it as `locale`:

```ts
import type { LocaleData } from 'validare';

const myLocale: LocaleData = {
  notEmpty:     { default: 'Este campo é obrigatório' },
  email:        { default: 'E-mail inválido' },
  // ... all 22+ validators
};

validare(form, { locale: myLocale, fields: { /* ... */ } });
```
