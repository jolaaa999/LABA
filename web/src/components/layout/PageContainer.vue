<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'div' | 'section' | 'main' | 'header' | 'footer'
    narrow?: boolean
  }>(),
  {
    as: 'div',
    narrow: false,
  },
)
</script>

<template>
  <component
    :is="as"
    class="page-container"
    :class="{ 'page-container--narrow': narrow }"
  >
    <slot />
  </component>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--page-gutter);
}

.page-container--narrow {
  max-width: 44rem;
}

@media (max-width: 720px) {
  .page-container {
    --page-gutter: var(--space-4);
  }
}
</style>
