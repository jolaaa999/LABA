<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'plain' | 'glass' | 'elevated'
    padding?: 'sm' | 'md' | 'lg'
  }>(),
  {
    variant: 'plain',
    padding: 'md',
  },
)
</script>

<template>
  <div
    class="glass-card"
    :class="[`glass-card--${variant}`, `glass-card--pad-${padding}`]"
  >
    <slot />
  </div>
</template>

<style scoped>
.glass-card {
  border-radius: var(--radius-md);
  color: var(--color-text);
}

.glass-card--pad-sm {
  padding: var(--space-4);
}

.glass-card--pad-md {
  padding: var(--space-6);
}

.glass-card--pad-lg {
  padding: var(--space-8);
}

.glass-card--plain {
  background-color: var(--color-white);
  border: var(--border-subtle);
}

.glass-card--elevated {
  background-color: var(--color-white);
  border: var(--border-subtle);
  box-shadow: var(--shadow-md);
}

.glass-card--glass {
  background: var(--glass-bg);
  border: var(--glass-border);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}
</style>
