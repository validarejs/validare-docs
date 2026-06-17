---
outline: deep
---

# `file`

Validates file input constraints: allowed extensions, file size, and number of files.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `extension` | `string` | `undefined` | Comma-separated allowed extensions without dots (e.g. `"pdf,jpg,png"`) |
| `maxSize` | `number` | `undefined` | Maximum file size in bytes |
| `minFiles` | `number` | `undefined` | Minimum number of files |
| `maxFiles` | `number` | `undefined` | Maximum number of files |
| `message` | `string` | locale default | Custom error message |

## Playground

<script setup>
const code = `
document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Image (JPG/PNG, max 2 MB)</label>
      <input type="file" name="val" accept=".jpg,.png">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: { val: { validators: { file: { extension: 'jpg,png', maxSize: 2097152, message: 'JPG or PNG, max 2 MB' } } } },
  plugins: { trigger: new Trigger({ event: 'change' }), message: new Message() }
});
`
</script>

<ValidarePlayground :code="code" />

## Valid values

| Value | Notes |
|---|---|
| `.jpg` file under 5 MB | Extension and size within limits |
| `.jpeg` file | Matches allowed extensions |

## Invalid values

| Value | Reason |
|---|---|
| `.exe` file | Extension not in allowed list |
| 10 MB `.jpg` | Exceeds `maxSize` |

## Notes

- Empty string (`""`) always returns `valid: true` — validators only run on non-empty values. Combine with `notEmpty` to require a value.
- `extension` is comma-separated without dots: `"pdf,jpg,png"`.
- `maxSize` is in bytes: `5 * 1024 * 1024` for 5 MB.
