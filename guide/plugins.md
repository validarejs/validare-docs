# Using Plugins

Plugins extend the core engine. Pass them in the `plugins` option as a key → instance map.

```js
const fv = validare(form, {
  fields: { /* ... */ },
  plugins: {
    trigger:      new Trigger({ event: 'blur' }),
    message:      new Message(),
    submitButton: new SubmitButton(),
    sequence:     new Sequence(),
  },
});
```

The key name is arbitrary — it's just how you reference the plugin later (e.g. `fv.getPlugin('trigger')`).

## Recommended Combinations

### Minimal (manual submit only)

```js
plugins: {}  // validate only via fv.validate()
```

### Standard

```js
plugins: {
  trigger: new Trigger({ event: 'blur' }),
  message: new Message(),
}
```

### Full UX

```js
plugins: {
  trigger:      new Trigger({ event: 'blur' }),
  message:      new Message(),
  icon:         new Icon({ valid: '✓', invalid: '✗' }),
  submitButton: new SubmitButton(),
  sequence:     new Sequence(),
}
```

### With Bootstrap 5

```js
plugins: {
  trigger: new Trigger({ event: 'blur' }),
  message: new Message(),
  ui:      new Bootstrap5(),
}
```

See the [Plugins reference](/plugins/) for full documentation on each plugin.
