---
outline: deep
---

# API Reference

## `validare(form, options)`

Creates a Validare instance with all built-in validators pre-registered.

```ts
import { validare } from 'validare';

// Signature
function validare(form: HTMLFormElement, options: ValidareOptions): Core

// Usage
const fv = validare(document.getElementById('myForm') as HTMLFormElement, options);
```

### `ValidareOptions`

```ts
interface ValidareOptions {
  fields:   Record<string, FieldOptions>;
  plugins?: Record<string, Plugin>;
  locale?:  LocaleData;
}

interface FieldOptions {
  validators: Record<string, ValidatorOptions>;
  enabled?:   boolean;   // default: true
}

interface ValidatorOptions {
  message?:  string;     // overrides locale default
  enabled?:  boolean;    // default: true
  [key: string]: unknown;
}
```

---

## Core instance methods

### `fv.validate()`

Validates all fields.

```ts
fv.validate(): Promise<'Valid' | 'Invalid' | 'NotValidated'>
```

### `fv.validateField(field)`

Validates a single field by name.

```ts
fv.validateField(field: string): Promise<'Valid' | 'Invalid' | 'NotValidated'>
```

### `fv.addField(field, options)`

Adds a field to the validator after initialisation.

```ts
fv.addField(field: string, options: FieldOptions): Core
```

### `fv.removeField(field)`

Removes a field and its validators.

```ts
fv.removeField(field: string): Core
```

### `fv.enableValidator(field, validator)` / `fv.disableValidator(field, validator)`

Enables or disables a specific validator for a field.

```ts
fv.enableValidator(field: string, validator: string): Core
fv.disableValidator(field: string, validator: string): Core
```

### `fv.resetField(field)` / `fv.reset()`

Resets validation state for one field or the entire form.

```ts
fv.resetField(field: string): Core
fv.reset(): Core
```

### `fv.destroy()`

Removes all event listeners, uninstalls plugins, and cleans up.

```ts
fv.destroy(): void
```

### `fv.on(event, handler)` / `fv.off(event, handler)`

Subscribe/unsubscribe to core events.

```ts
fv.on(event: string, handler: (payload: unknown) => void): Core
fv.off(event: string, handler: (payload: unknown) => void): Core
```

---

## Events

| Event | Payload | Fires when |
|---|---|---|
| `core.form.validating` | `{ instance }` | Before all fields validate |
| `core.form.valid` | `{ instance }` | All fields Valid |
| `core.form.invalid` | `{ instance }` | At least one Invalid |
| `core.form.notvalidated` | `{ instance }` | At least one NotValidated |
| `core.form.reset` | `{ instance }` | After `reset()` |
| `core.field.added` | `{ field, elements, options }` | `addField()` |
| `core.field.removed` | `{ field, elements, options }` | `removeField()` |
| `core.field.validating` | `{ field }` | Before a field validates |
| `core.field.validated` | `{ field, result, elements }` | After a field validates (any result) |
| `core.field.valid` | `{ field, elements }` | After a field validates — result is `Valid` |
| `core.field.invalid` | `{ field, elements }` | After a field validates — result is `Invalid` |
| `core.field.notvalidated` | `{ field, elements }` | After a field validates — result is `NotValidated` |
| `core.element.validated` | `ElementValidatedPayload` | After each DOM element validates |
| `core.validator.validated` | `{ field, validator, result }` | After each validator runs |

### `ElementValidatedPayload`

```ts
interface ElementValidatedPayload {
  field:      string;
  element:    HTMLElement;
  elements:   HTMLElement[];
  valid:      boolean;
  result:     'Valid' | 'Invalid' | 'NotValidated';
  validators: Record<string, {
    valid:    boolean;
    message:  string;
    result:   'Valid' | 'Invalid' | 'NotValidated';
  }>;
}
```

---

## Validation status

| Value | Meaning |
|---|---|
| `'Valid'` | All validators passed |
| `'Invalid'` | At least one validator failed |
| `'NotValidated'` | Field has not been validated yet |
