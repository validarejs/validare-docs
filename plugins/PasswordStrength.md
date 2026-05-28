# `PasswordStrength` Plugin

Evaluates password strength on a 0–4 scale and validates against a minimum score threshold.

## Score Algorithm

| Score | Criteria met |
| --- | --- |
| 0 | None (empty or very short) |
| 1 | Length ≥ 8 |
| 2 | + Uppercase letter |
| 3 | + Digit |
| 4 | + Special character |

Each criterion adds 1 point. A password with all four criteria scores 4.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `field` | `string` | *(required)* | The field name to evaluate |
| `message` | `string` | `'The password is not strong enough'` | Error message when score is below `minScore` |
| `minScore` | `number` | `3` | Minimum required score (0–4) |
| `onScore` | `function` | `undefined` | Called after each evaluation: `({ field, score, valid }) => void` |

## Playground

Type a password and click Validate to see the strength score. The indicator below the field updates in real time via the `onScore` callback.

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Password</label>
      <input type="password" name="password" placeholder="Enter a password" autocomplete="new-password">
      <div class="fv-plugins-message-container"></div>
      <div id="strength-bar" style="margin-top:6px;height:6px;border-radius:3px;background:#eee;overflow:hidden">
        <div id="strength-fill" style="height:100%;width:0;transition:width 0.3s,background 0.3s"></div>
      </div>
      <p id="strength-label" style="margin:4px 0 0;font-size:12px;color:#888"></p>
    </div>
    <button type="button" id="btn">Validate</button>
  </form>
\`;
const { validare, Message, PasswordStrength } = Validare;
const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
const colors = ['#ef4444','#f97316','#eab308','#22c55e','#16a34a'];
const fv = validare(document.getElementById('demo'), {
  fields: {
    password: { validators: {} },
  },
  plugins: {
    message: new Message(),
    pwStrength: new PasswordStrength({
      field: 'password',
      minScore: 3,
      onScore: ({ score }) => {
        const fill = document.getElementById('strength-fill');
        const label = document.getElementById('strength-label');
        fill.style.width = (score * 25) + '%';
        fill.style.background = colors[score];
        label.textContent = labels[score];
        label.style.color = colors[score];
      },
    }),
  },
});
document.getElementById('btn').addEventListener('click', () => fv.validate());
`.trim()
</script>

<ValidarePlayground :code="code" />

## Notes

- Adds a strength validator to the specified `field` at plugin install time — the field must already exist in `fields`.
- Score is computed each time the field is validated (not on every keystroke unless `Trigger` is configured).
- Use `onScore` with the `Trigger` plugin (`event: 'input'`) for live feedback as the user types.
- Two `PasswordStrength` instances on different fields are fully independent.
- Removing the plugin (via `deregisterPlugin`) removes the strength validator from the field.
