---
layout: home

hero:
  name: Validare
  text: Modern form validation
  tagline: Plugin-based, zero dependencies, TypeScript-first.
  actions:
    - theme: brand
      text: Get Started →
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/varantes/validare

features:
  - icon: 🚫
    title: Zero dependencies
    details: No jQuery, no frameworks required. Works in any JS environment.
  - icon: 🔷
    title: TypeScript-first
    details: Full type safety and IDE autocompletion out of the box.
  - icon: 🔌
    title: Plugin-based architecture
    details: Tiny core engine. Add only the plugins your project needs.
  - icon: ✅
    title: 50 built-in validators
    details: Core, financial, identity, encoding, device, and more — ready to use.
  - icon: 🎨
    title: CSS framework integrations
    details: Bootstrap 5, Bulma, and Tailwind CSS plugins included.
  - icon: ⚡
    title: Sync + async validation
    details: Callback, Promise, and remote validators with debounce support.
---

## Try it live

Edit the code below and validate the form instantly.

<script setup>
const demoCode = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="user@example.com">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Password (min 8 characters)</label>
      <input type="password" name="password" placeholder="••••••••">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;

const { validare, Trigger, Message } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    email:    { validators: { notEmpty: {}, email: {} } },
    password: { validators: { notEmpty: {}, stringLength: { min: 8 } } }
  },
  plugins: {
    trigger: new Trigger({ event: 'blur' }),
    message: new Message()
  }
});`
</script>

<ValidarePlayground :code="demoCode" height="300px" />

## Install

::: code-group

```bash [npm]
npm install validare
```

```bash [pnpm]
pnpm add validare
```

```bash [yarn]
yarn add validare
```

:::

50 validators · 9 plugins · 686 tests passing · MIT license
