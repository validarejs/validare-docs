# `Declarative` Plugin

Configure form validation entirely through HTML attributes — no JavaScript field configuration needed. Add `data-vd-*` attributes to your inputs and Validare will pick them up automatically.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |
| `prefix` | `string` | `"data-vd-"` | Attribute prefix for validators |
| `html5Input` | `boolean` | `false` | Map native HTML5 attributes (`required`, `type`, `minlength`, …) to validators |

## Attribute Syntax

### Enabling a validator

```html
<input name="email" data-vd-email="true" />
```

The attribute name is `{prefix}{validator-kebab-case}`. Set the value to `"true"` to enable the validator.

### Setting validator options

```html
<input
  name="username"
  data-vd-not-empty="true"
  data-vd-not-empty___message="Username is required"
  data-vd-string-length="true"
  data-vd-string-length___min="3"
  data-vd-string-length___max="20"
  data-vd-string-length___message="Username must be 3–20 characters"
/>
```

Options use three underscores (`___`) as a separator between the validator name and the option name:

```
data-vd-{validator}___{option}="{value}"
```

Both the validator name and option name use **kebab-case** in the attribute and are automatically converted to camelCase: `string-length` → `stringLength`, `not-empty` → `notEmpty`.

### Value coercion

| Attribute value | JavaScript value |
| --- | --- |
| `"true"` or `""` | `true` (boolean) |
| `"false"` | `false` (boolean) |
| `"3"`, `"3.14"` | `3`, `3.14` (number) |
| Anything else | string |

### Field name fallback

If an element has no `name` attribute, use `data-vd-field` to name the field:

```html
<input data-vd-field="username" data-vd-not-empty="true" />
```

## All Validators Reference

Every Validare validator can be configured declaratively. Validator names map directly from camelCase to kebab-case:

| Validator | Attribute | Common options |
| --- | --- | --- |
| `notEmpty` | `data-vd-not-empty` | `message` |
| `email` | `data-vd-email` | `message` |
| `stringLength` | `data-vd-string-length` | `min`, `max`, `message` |
| `between` | `data-vd-between` | `min`, `max`, `inclusive`, `message` |
| `greaterThan` | `data-vd-greater-than` | `min`, `inclusive`, `message` |
| `lessThan` | `data-vd-less-than` | `max`, `inclusive`, `message` |
| `regexp` | `data-vd-regexp` | `regexp`, `flags`, `message` |
| `digits` | `data-vd-digits` | `message` |
| `numeric` | `data-vd-numeric` | `message` |
| `integer` | `data-vd-integer` | `message` |
| `uri` | `data-vd-uri` | `message` |
| `creditCard` | `data-vd-credit-card` | `message` |
| `date` | `data-vd-date` | `format`, `min`, `max`, `message` |
| `identical` | `data-vd-identical` | `compare`, `message` |
| `different` | `data-vd-different` | `compare`, `message` |
| `choice` | `data-vd-choice` | `min`, `max`, `message` |
| `ip` | `data-vd-ip` | `ipv4`, `ipv6`, `message` |
| `callback` | `data-vd-callback` | `callback`, `message` |

## `html5Input` Mode

When `html5Input: true`, standard HTML5 attributes are automatically mapped to validators:

| HTML5 attribute | Condition | Validator |
| --- | --- | --- |
| `required` | — | `notEmpty` |
| `type="email"` | — | `email` |
| `type="url"` | — | `uri` |
| `type="range"` | — | `between` (reads `min`/`max`) |
| `minlength="N"` | — | `stringLength` with `min: N` |
| `maxlength="N"` | — | `stringLength` with `max: N` |
| `pattern="…"` | — | `regexp` |
| `min="N"` | type ≠ date/range | `greaterThan` with `min: N` |
| `max="N"` | type ≠ date/range | `lessThan` with `max: N` |

You can still add `data-vd-*` attributes alongside HTML5 attributes — both are merged.

## Playground — Basic

A form configured entirely in HTML. No `fields` option in JavaScript.

<script setup>
const codeBasic = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Username</label>
      <input type="text" name="username"
        data-vd-not-empty="true"
        data-vd-not-empty___message="Username is required"
        data-vd-string-length="true"
        data-vd-string-length___min="3"
        data-vd-string-length___max="20"
        data-vd-string-length___message="Must be 3–20 characters"
      >
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="text" name="email"
        data-vd-not-empty="true"
        data-vd-not-empty___message="Email is required"
        data-vd-email="true"
        data-vd-email___message="Enter a valid email address"
      >
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="button" id="btn">Validate</button>
  </form>
\`;
const { validare, Message, Trigger, Declarative } = Validare;
const fv = validare(document.getElementById('demo'), {
  plugins: {
    message:     new Message(),
    trigger:     new Trigger(),
    declarative: new Declarative(),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()

const codeHtml5 = `
document.body.innerHTML = \`
  <form id="demo2" novalidate>
    <div class="field">
      <label>Full name (3–40 chars)</label>
      <input type="text" name="name" required minlength="3" maxlength="40"
             placeholder="Jane Doe">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" required placeholder="jane@example.com">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Age (18–120)</label>
      <input type="number" name="age" required min="18" max="120" placeholder="25">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Postal code (letters only)</label>
      <input type="text" name="zip" required pattern="^[A-Za-z0-9 -]+$"
             placeholder="SW1A 1AA">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="button" id="btn2">Validate</button>
  </form>
\`;
const { validare, Message, Trigger, Declarative } = Validare;
const fv = validare(document.getElementById('demo2'), {
  plugins: {
    message:     new Message(),
    trigger:     new Trigger(),
    declarative: new Declarative({ html5Input: true }),
  },
});
document.getElementById('btn2').addEventListener('click', () => fv.validate());
`.trim()

const codeMixed = `
document.body.innerHTML = \`
  <form id="demo3" novalidate>
    <div class="field">
      <label>Username</label>
      <!-- notEmpty and stringLength come from attributes -->
      <input type="text" name="username"
        data-vd-not-empty="true"
        data-vd-not-empty___message="Username is required"
        data-vd-string-length="true"
        data-vd-string-length___min="3"
        data-vd-string-length___message="At least 3 characters"
        placeholder="alice">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Password</label>
      <!-- notEmpty comes from attribute; the callback validator is programmatic -->
      <input type="password" name="password"
        data-vd-not-empty="true"
        data-vd-not-empty___message="Password is required"
        placeholder="••••••">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="button" id="btn3">Validate</button>
  </form>
\`;
const { validare, Message, Trigger, Declarative } = Validare;
const fv = validare(document.getElementById('demo3'), {
  plugins: {
    message:     new Message(),
    trigger:     new Trigger(),
    declarative: new Declarative(),
  },
  // Programmatic: callback validator added on top of declarative notEmpty
  fields: {
    password: {
      validators: {
        callback: {
          message: 'Password must be at least 8 characters',
          callback: ({ value }) => ({ valid: value.length >= 8 }),
        },
      },
    },
  },
});
document.getElementById('btn3').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="codeBasic" />

## Playground — html5Input

Use native HTML5 attributes — zero custom `data-vd-*` needed.

<ValidarePlayground :code="codeHtml5" />

## Playground — Mixed: declarative + programmatic

Programmatic validators always take precedence. Use declarative for markup-friendly options (messages, constraints) and programmatic for logic-heavy validators (callback, remote).

<ValidarePlayground :code="codeMixed" />

## Complete HTML Example

A fully declarative sign-up form — copy-paste ready, no `fields` configuration needed:

```html
<form id="signup" novalidate>
  <div>
    <label for="username">Username</label>
    <input id="username" type="text" name="username"
      data-vd-not-empty="true"
      data-vd-not-empty___message="Username is required"
      data-vd-string-length="true"
      data-vd-string-length___min="3"
      data-vd-string-length___max="20"
      data-vd-string-length___message="Must be 3–20 characters"
    >
  </div>

  <div>
    <label for="email">Email</label>
    <input id="email" type="text" name="email"
      data-vd-not-empty="true"
      data-vd-not-empty___message="Email is required"
      data-vd-email="true"
      data-vd-email___message="Enter a valid email address"
    >
  </div>

  <div>
    <label for="password">Password</label>
    <input id="password" type="password" name="password"
      data-vd-not-empty="true"
      data-vd-not-empty___message="Password is required"
      data-vd-string-length="true"
      data-vd-string-length___min="8"
      data-vd-string-length___message="At least 8 characters"
    >
  </div>

  <div>
    <label for="confirm">Confirm password</label>
    <input id="confirm" type="password" name="confirm"
      data-vd-not-empty="true"
      data-vd-not-empty___message="Please confirm your password"
      data-vd-identical="true"
      data-vd-identical___compare="() => document.getElementById('password').value"
      data-vd-identical___message="Passwords do not match"
    >
  </div>

  <button type="submit">Sign up</button>
</form>

<script type="module">
import { validare, Message, Trigger, SubmitButton, Declarative } from 'validare';

validare(document.getElementById('signup'), {
  plugins: {
    message:      new Message(),
    trigger:      new Trigger(),
    submitButton: new SubmitButton(),
    declarative:  new Declarative(),
  },
});
</script>
```

## Notes

- **Programmatic takes precedence.** If the same validator is defined both in `fields` and in an attribute, the programmatic version wins. Declarative attributes only add validators for names not already present in the programmatic config.

- **Validator names use kebab-case.** `notEmpty` → `data-vd-not-empty`, `stringLength` → `data-vd-string-length`, `creditCard` → `data-vd-credit-card`, and so on.

- **All validators disabled by default without the base attribute.** Setting only option attributes (e.g. `data-vd-string-length___min="3"`) without the base `data-vd-string-length="true"` attribute leaves the validator disabled. Always include the base attribute to enable validation.

- **Dynamic fields are supported.** If you call `fv.addField('newField', ...)` after initialisation and the DOM element for that field has `data-vd-*` attributes, the Declarative plugin will pick them up automatically.

- **Custom prefix.** If `data-vd-` conflicts with other libraries, change it: `new Declarative({ prefix: 'data-val-' })` and use `data-val-not-empty="true"` instead.

- **`html5Input` adds validators, not replaces.** You can combine HTML5 attributes with `data-vd-*` on the same element — both are merged.

- **`callback` validator requires a function reference — not a string name.** The Declarative plugin reads attribute values as strings and cannot resolve a function by name at runtime. `data-vd-callback___callback="myFunction"` will **not** work because the `callback` validator expects a function object, not a string. Use the mixed declarative + programmatic pattern instead: declare simple validators (notEmpty, stringLength, …) in attributes and register the `callback` validator via the `fields` option in JavaScript. See the [Mixed playground](#playground-mixed-declarative-programmatic) above for an example.
