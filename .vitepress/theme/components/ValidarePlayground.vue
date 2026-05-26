<template>
  <div class="vp-playground">
    <div class="vp-playground__editor" ref="editorEl" />
    <div class="vp-playground__toolbar">
      <button class="vp-playground__reset" @click="reset">Reset</button>
    </div>
    <div v-if="error" class="vp-playground__error">{{ error }}</div>
    <iframe
      class="vp-playground__preview"
      sandbox="allow-scripts"
      :srcdoc="srcdoc"
      :style="{ height: props.height ?? '280px' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { buildSrcdoc } from '../buildSrcdoc'

const props = withDefaults(
  defineProps<{ code: string; height?: string }>(),
  { height: '280px' }
)

const editorEl = ref<HTMLElement | null>(null)
const srcdoc    = ref('')
const error     = ref('')

let view: EditorView | null = null
let validareSource = ''
let timer: ReturnType<typeof setTimeout> | null = null

function render(code: string) {
  srcdoc.value = buildSrcdoc(validareSource, code)
  error.value  = ''
}

function reset() {
  view?.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: props.code } })
  render(props.code)
}

function onMessage(e: MessageEvent) {
  if (e.data?.type === 'pg-error') error.value = e.data.msg
}

onMounted(async () => {
  // 1. Fetch validare UMD bundle
  try {
    const res = await fetch(import.meta.env.BASE_URL + 'validare.umd.js')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    validareSource = await res.text()
  } catch (e) {
    error.value = 'Could not load validare.umd.js: ' + String(e)
    return
  }

  // 2. Create CodeMirror editor
  view = new EditorView({
    doc: props.code,
    extensions: [
      basicSetup,
      javascript(),
      oneDark,
      EditorView.updateListener.of(u => {
        if (!u.docChanged) return
        const code = u.state.doc.toString()
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => render(code), 300)
      }),
    ],
    parent: editorEl.value!,
  })

  // 3. Initial render
  render(props.code)

  window.addEventListener('message', onMessage)
})

onUnmounted(() => {
  view?.destroy()
  if (timer) clearTimeout(timer)
  window.removeEventListener('message', onMessage)
})
</script>

<style scoped>
.vp-playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
}
.vp-playground__editor { border-bottom: 1px solid var(--vp-c-divider); }
.vp-playground__editor :deep(.cm-editor) { max-height: 320px; }
.vp-playground__editor :deep(.cm-scroller) { overflow: auto; }
.vp-playground__toolbar {
  display: flex;
  justify-content: flex-end;
  padding: .25rem .5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}
.vp-playground__reset {
  font-size: 12px;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.vp-playground__reset:hover { color: var(--vp-c-text-1); }
.vp-playground__error {
  padding: .4rem .75rem;
  background: #fee2e2;
  color: #dc2626;
  font-size: .8125rem;
  font-family: var(--vp-font-family-mono);
}
.vp-playground__preview {
  width: 100%;
  border: none;
  display: block;
  background: #fff;
}
</style>
