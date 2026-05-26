# Plugins

Plugins extend the Validare core engine. Pass them in the `plugins` option map.

## Core Plugins

| Plugin | Description |
|---|---|
| [Trigger](/plugins/Trigger) | Validates on DOM events (`blur`, `input`, `change`) |
| [Message](/plugins/Message) | Displays error messages in the DOM |
| [Icon](/plugins/Icon) | Shows valid/invalid icons next to fields |
| [SubmitButton](/plugins/SubmitButton) | Disables the submit button during validation |
| [Excluded](/plugins/Excluded) | Skips disabled, hidden, or invisible fields |
| [Sequence](/plugins/Sequence) | Stops validation at the first failing validator per field |

## CSS Framework Plugins

| Plugin | Framework |
|---|---|
| [Bootstrap5](/plugins/Bootstrap5) | Applies Bootstrap 5 `is-valid` / `is-invalid` classes |
| [Bulma](/plugins/Bulma) | Applies Bulma `is-success` / `is-danger` classes |
| [Tailwind](/plugins/Tailwind) | Applies configurable Tailwind utility classes |
