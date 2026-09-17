<script setup lang="ts">
import { communityRhythm, eventFormats } from '../../content/events'

defineProps<{
  activeFormatId?: string | null
}>()

const emit = defineEmits<{
  focus: [id: string | null]
}>()
</script>

<template>
  <section
    class="community-rhythm"
    :class="{ [`community-rhythm--${activeFormatId}`]: activeFormatId }"
    aria-labelledby="community-rhythm-title"
  >
    <header class="community-rhythm__header">
      <p class="community-rhythm__eyebrow">{{ communityRhythm.eyebrow }}</p>
      <h2 id="community-rhythm-title" class="community-rhythm__title">
        {{ communityRhythm.title }}
      </h2>
      <p class="community-rhythm__lede">{{ communityRhythm.lede }}</p>
    </header>

    <ol class="community-rhythm__rail">
      <li
        v-for="format in eventFormats"
        :key="format.id"
        class="community-rhythm__item"
        :class="{ 'community-rhythm__item--active': activeFormatId === format.id }"
        @mouseenter="emit('focus', format.id)"
        @mouseleave="emit('focus', null)"
      >
        <span class="community-rhythm__index">{{ format.index }}</span>
        <span class="community-rhythm__label">{{ format.label }}</span>
        <span class="community-rhythm__name">{{ format.title }}</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.community-rhythm {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: var(--space-8) var(--space-10);
  align-items: start;
}

.community-rhythm__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.community-rhythm__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.community-rhythm__lede {
  margin: var(--space-4) 0 0;
  max-width: 28rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.community-rhythm__rail {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.community-rhythm__item {
  display: grid;
  grid-template-columns: 2.5rem 5.5rem minmax(0, 1fr);
  gap: var(--space-3);
  align-items: baseline;
  padding-block: var(--space-4);
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.community-rhythm:has(.community-rhythm__item--active)
  .community-rhythm__item:not(.community-rhythm__item--active) {
  opacity: 0.55;
}

.community-rhythm__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.community-rhythm__label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.community-rhythm__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
}

.community-rhythm__item--active .community-rhythm__name {
  color: var(--color-mountain);
}

.community-rhythm__item--active .community-rhythm__label {
  color: var(--color-sky);
}

@media (max-width: 900px) {
  .community-rhythm {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

@media (max-width: 560px) {
  .community-rhythm__item {
    grid-template-columns: 2.25rem minmax(0, 1fr);
    gap: var(--space-2) var(--space-3);
  }

  .community-rhythm__label {
    grid-column: 2;
  }

  .community-rhythm__name {
    grid-column: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .community-rhythm__item {
    transition: none;
  }
}
</style>
