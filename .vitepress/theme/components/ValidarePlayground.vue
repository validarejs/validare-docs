<template>
  <div style="border:1px solid #ccc;padding:1rem;border-radius:4px;color:#666">
    Playground loading…
  </div>
</template>
<script setup lang="ts">
defineProps<{ code: string; height?: string }>()
</script>
