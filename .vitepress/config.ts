import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Validare',
  description: 'Modern form validation. Plugin-based, zero dependencies, TypeScript-first.',
  base: '/validare-docs/',
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: 'Guide',       link: '/guide/getting-started' },
      { text: 'Validators',  link: '/validators/' },
      { text: 'Plugins',     link: '/plugins/' },
      { text: 'API',         link: '/api/' },
      { text: 'Changelog',    link: '/changelog' },
      { text: 'Contributing', link: '/contributing' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started',    link: '/guide/getting-started' },
            { text: 'Using Plugins',      link: '/guide/plugins' },
            { text: 'Localization',       link: '/guide/localization' },
            { text: 'Custom Validators',  link: '/guide/custom-validators' },
            { text: 'Multi-Step Forms',   link: '/guide/multi-step-forms' },
          ],
        },
      ],

      '/validators/': [
        { text: 'All Validators', link: '/validators/' },
        {
          text: 'Core (23)',
          collapsed: false,
          items: [
            { text: 'notEmpty',      link: '/validators/notEmpty' },
            { text: 'blank',         link: '/validators/blank' },
            { text: 'email',         link: '/validators/email' },
            { text: 'creditCard',    link: '/validators/creditCard' },
            { text: 'date',          link: '/validators/date' },
            { text: 'digits',        link: '/validators/digits' },
            { text: 'integer',       link: '/validators/integer' },
            { text: 'numeric',       link: '/validators/numeric' },
            { text: 'regexp',        link: '/validators/regexp' },
            { text: 'uri',           link: '/validators/uri' },
            { text: 'identical',     link: '/validators/identical' },
            { text: 'different',     link: '/validators/different' },
            { text: 'between',       link: '/validators/between' },
            { text: 'greaterThan',   link: '/validators/greaterThan' },
            { text: 'lessThan',      link: '/validators/lessThan' },
            { text: 'stringLength',  link: '/validators/stringLength' },
            { text: 'stringCase',    link: '/validators/stringCase' },
            { text: 'choice',        link: '/validators/choice' },
            { text: 'file',          link: '/validators/file' },
            { text: 'callback',      link: '/validators/callback' },
            { text: 'promise',       link: '/validators/promise' },
            { text: 'remote',        link: '/validators/remote' },
            { text: 'ip',            link: '/validators/ip' },
          ],
        },
        {
          text: 'Format & Encoding (6)',
          collapsed: true,
          items: [
            { text: 'base64', link: '/validators/base64' },
            { text: 'hex',    link: '/validators/hex' },
            { text: 'mac',    link: '/validators/mac' },
            { text: 'bic',    link: '/validators/bic' },
            { text: 'uuid',   link: '/validators/uuid' },
            { text: 'color',  link: '/validators/color' },
          ],
        },
        {
          text: 'Financial (6)',
          collapsed: true,
          items: [
            { text: 'iban',  link: '/validators/iban' },
            { text: 'vat',   link: '/validators/vat' },
            { text: 'cusip', link: '/validators/cusip' },
            { text: 'isin',  link: '/validators/isin' },
            { text: 'sedol', link: '/validators/sedol' },
            { text: 'grid',  link: '/validators/grid' },
          ],
        },
        {
          text: 'Publication (4)',
          collapsed: true,
          items: [
            { text: 'ean',  link: '/validators/ean' },
            { text: 'isbn', link: '/validators/isbn' },
            { text: 'ismn', link: '/validators/ismn' },
            { text: 'issn', link: '/validators/issn' },
          ],
        },
        {
          text: 'Device & Vehicle (5)',
          collapsed: true,
          items: [
            { text: 'imei', link: '/validators/imei' },
            { text: 'imo',  link: '/validators/imo' },
            { text: 'meid', link: '/validators/meid' },
            { text: 'step', link: '/validators/step' },
            { text: 'vin',  link: '/validators/vin' },
          ],
        },
        {
          text: 'Tax & Business (4)',
          collapsed: true,
          items: [
            { text: 'ein',   link: '/validators/ein' },
            { text: 'rtn',   link: '/validators/rtn' },
            { text: 'siren', link: '/validators/siren' },
            { text: 'siret', link: '/validators/siret' },
          ],
        },
        {
          text: 'Identity & Geographic (3)',
          collapsed: true,
          items: [
            { text: 'id',      link: '/validators/id' },
            { text: 'phone',   link: '/validators/phone' },
            { text: 'zipCode', link: '/validators/zipCode' },
          ],
        },
      ],

      '/plugins/': [
        { text: 'All Plugins', link: '/plugins/' },
        {
          text: 'Core Plugins (12)',
          items: [
            { text: 'Trigger',      link: '/plugins/Trigger' },
            { text: 'Message',      link: '/plugins/Message' },
            { text: 'Icon',         link: '/plugins/Icon' },
            { text: 'SubmitButton', link: '/plugins/SubmitButton' },
            { text: 'Excluded',     link: '/plugins/Excluded' },
            { text: 'Sequence',     link: '/plugins/Sequence' },
            { text: 'Aria',         link: '/plugins/Aria' },
            { text: 'AutoFocus',    link: '/plugins/AutoFocus' },
            { text: 'Tooltip',        link: '/plugins/Tooltip' },
            { text: 'DefaultSubmit', link: '/plugins/DefaultSubmit' },
            { text: 'FieldStatus',   link: '/plugins/FieldStatus' },
            { text: 'Declarative',   link: '/plugins/Declarative' },
          ],
        },
        {
          text: 'CSS Frameworks (3)',
          items: [
            { text: 'Bootstrap5', link: '/plugins/Bootstrap5' },
            { text: 'Bulma',      link: '/plugins/Bulma' },
            { text: 'Tailwind',   link: '/plugins/Tailwind' },
          ],
        },
        {
          text: 'Utility Plugins (5)',
          items: [
            { text: 'Dependency',       link: '/plugins/Dependency' },
            { text: 'StartEndDate',     link: '/plugins/StartEndDate' },
            { text: 'Transformer',      link: '/plugins/Transformer' },
            { text: 'PasswordStrength', link: '/plugins/PasswordStrength' },
            { text: 'CharCounter',      link: '/plugins/CharCounter' },
          ],
        },
      ],

      '/api/': [
        { text: 'API Reference', items: [{ text: 'Core', link: '/api/' }] },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/varantes/validare' },
    ],

    search: { provider: 'local' },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Inspired by FormValidation (discontinued)',
    },
  },
})
