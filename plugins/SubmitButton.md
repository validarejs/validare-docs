---
outline: deep
---

# `SubmitButton` Plugin

Disables the form's submit button while validation is in progress to prevent double-submission.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `selector` | `string` | `'[type="submit"]'` | CSS selector for the button(s) to disable during validation |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="fv-plugins-message-container"></div>
    </div>
    <button type="submit">Submit</button>
  </form>
\`;
const { validare, Trigger, Message, SubmitButton } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    email: {
      validators: {
        promise: {
          promise: (i) => new Promise(r => setTimeout(() => r({ valid: i.value.includes('@') }), 800))
        }
      }
    }
  },
  plugins: {
    trigger:      new Trigger({ event: 'blur' }),
    message:      new Message(),
    submitButton: new SubmitButton()
  }
});`
</script>

<ValidarePlayground :code="code" height="320px" />

## Notes

- The button is disabled at the start of validation (`core.form.validating`) and re-enabled when validation completes.
- To target a specific button, set `selector: '#my-submit-btn'`.
- On `uninstall()`, the button is re-enabled regardless of validation state.
