<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  }>(),
  {
    as: 'span',
  },
)
</script>

<template>
  <component :is="as" class="gradient-text">
    <slot />
  </component>
</template>

<style scoped>
.gradient-text {
  display: inline;
  background-image: linear-gradient(
    115deg,
    var(--color-mountain) 0%,
    var(--color-sky) 48%,
    var(--color-aurora) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
