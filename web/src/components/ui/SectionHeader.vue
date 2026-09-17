<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    description?: string
    align?: 'left' | 'center'
  }>(),
  {
    align: 'left',
  },
)
</script>

<template>
  <header
    class="section-header"
    :class="`section-header--${align}`"
  >
    <p v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-header__title">{{ title }}</h2>
    <p v-if="description" class="section-header__description">
      {{ description }}
    </p>
  </header>
</template>

<style scoped>
.section-header {
  display: grid;
  gap: var(--space-3);
  max-width: 42rem;
}

.section-header--center {
  margin-inline: auto;
  text-align: center;
  justify-items: center;
}

.section-header__eyebrow {
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.section-header__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.section-header__description {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}
</style>
