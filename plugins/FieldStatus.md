# `FieldStatus` Plugin

Tracks the validation status of each field in real time and fires a callback whenever the form's overall validity changes — useful for enabling or disabling a submit button as the user fills the form.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | Enable or disable the plugin |
| `onStatusChanged` | `(areFieldsValid: boolean) => void` | `undefined` | Called after any field status change |

## Public Methods

| Method | Returns | Description |
| --- | --- | --- |
| `getStatuses()` | `Map<string, FieldValidationStatus>` | Returns the current status of every field. Returns an empty map when the plugin is disabled. |
| `areFieldsValid()` | `boolean` | Returns `true` when all fields are `"Valid"` or `"NotValidated"`. Returns `false` if any field is `"Invalid"` or `"Validating"`. |

## Field Status Values

| Value | Meaning |
| --- | --- |
| `"NotValidated"` | Field has not been validated yet (initial state) |
| `"Validating"` | Async validators are running |
| `"Valid"` | All validators passed |
| `"Invalid"` | At least one validator failed |

## Playground

Fill in the fields and watch the submit button enable automatically when all fields are valid.

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Name</label>
      <input type="text" name="name" placeholder="Your name">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit" id="submit" disabled>Submit</button>
  </form>
\`;
const { validare, Message, Trigger, FieldStatus } = Validare;

const submitBtn = document.getElementById('submit');

const fv = validare(document.getElementById('demo'), {
  fields: {
    name:  { validators: { notEmpty: { message: 'Name is required' } } },
    email: { validators: { notEmpty: { message: 'Email is required' },
                           email:    { message: 'Enter a valid email' } } },
  },
  plugins: {
    message: new Message(),
    trigger: new Trigger(),
    fieldStatus: new FieldStatus({
      onStatusChanged: (areFieldsValid) => {
        submitBtn.disabled = !areFieldsValid;
      },
    }),
  },
});
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- `areFieldsValid()` returns `true` when all fields are `"NotValidated"` (initial state) — this means the submit button starts enabled by default. If you want it disabled until the user attempts submission, initialise the button as disabled and only enable it after the first validation.
- `onStatusChanged` is called multiple times during validation (once when validation starts, once when it finishes). Always use the latest value.
- Access `getStatuses()` to build per-field UI indicators (e.g., coloured dots in a multi-step progress bar).
