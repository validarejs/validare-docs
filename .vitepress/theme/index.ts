import DefaultTheme from 'vitepress/theme'
import ValidarePlayground from './components/ValidarePlayground.vue'
import './style.css'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ValidarePlayground', ValidarePlayground)
  },
} satisfies Theme
