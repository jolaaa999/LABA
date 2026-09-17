<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'div' | 'section' | 'article'
    active?: boolean
    focusable?: boolean
  }>(),
  {
    as: 'div',
    active: false,
    focusable: false,
  },
)
</script>

<template>
  <component
    :is="as"
    class="glow-border"
    :class="{ 'glow-border--active': active }"
    :tabindex="focusable ? 0 : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.glow-border {
  position: relative;
  border-radius: var(--radius-md);
  transition:
    box-shadow var(--duration-normal) var(--ease-out-soft),
    border-color var(--duration-normal) var(--ease-out-soft);
  border: var(--border-subtle);
  background-color: var(--color-white);
}

.glow-border:hover,
.glow-border:focus-visible,
.glow-border--active {
  border-color: color-mix(in srgb, var(--color-aurora) 55%, var(--color-line));
  box-shadow: var(--shadow-glow);
}

.glow-border:focus-visible {
  outline: var(--border-focus);
  outline-offset: 3px;
}
</style>
