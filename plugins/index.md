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
| [Aria](./Aria.md) | Adds `aria-invalid` and `aria-describedby` for screen reader accessibility |
| [AutoFocus](./AutoFocus.md) | Focuses the first invalid field automatically after form validation fails |
| [Tooltip](./Tooltip.md) | Shows error messages in a floating tooltip on hover or click |
| [DefaultSubmit](./DefaultSubmit.md) | Automatically submits the form when all fields are valid |
| [FieldStatus](./FieldStatus.md) | Tracks per-field validation status and fires a callback on change |
| [Declarative](./Declarative.md) | Configure validators via HTML `data-fv-*` attributes, no JavaScript needed |

## CSS Framework Plugins

| Plugin | Framework |
|---|---|
| [Bootstrap5](/plugins/Bootstrap5) | Applies Bootstrap 5 `is-valid` / `is-invalid` classes |
| [Bulma](/plugins/Bulma) | Applies Bulma `is-success` / `is-danger` classes |
| [Tailwind](/plugins/Tailwind) | Applies configurable Tailwind utility classes |

## Utility Plugins

| Plugin | Description |
|---|---|
| [Dependency](/plugins/Dependency) | Revalidates dependent fields when a primary field validates |
| [StartEndDate](/plugins/StartEndDate) | Ensures start date ≤ end date across two fields |
| [Transformer](/plugins/Transformer) | Transforms the value seen by a specific validator |
| [PasswordStrength](./PasswordStrength.md) | Evaluates password strength with a 0–4 score and minimum threshold |
