<script setup lang="ts">
import { eventFormats } from '../../content/events'

defineProps<{
  activeFormatId?: string | null
}>()

const emit = defineEmits<{
  focus: [id: string | null]
}>()
</script>

<template>
  <section class="format-stream" aria-labelledby="format-stream-title">
    <header class="format-stream__header">
      <p class="format-stream__eyebrow">活动形式</p>
      <h2 id="format-stream-title" class="format-stream__title">
        实践走向共享的四种方式。
      </h2>
    </header>

    <div class="format-stream__list">
      <article
        v-for="format in eventFormats"
        :id="format.slug"
        :key="format.id"
        class="format-entry"
        :class="{ 'format-entry--active': activeFormatId === format.id }"
        @mouseenter="emit('focus', format.id)"
        @mouseleave="emit('focus', null)"
      >
        <header class="format-entry__head">
          <p class="format-entry__meta">
            <span>{{ format.index }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ format.label }}</span>
          </p>
          <h3 class="format-entry__title">{{ format.title }}</h3>
          <p class="format-entry__desc">{{ format.description }}</p>
        </header>

        <div class="format-entry__body">
          <p class="format-entry__purpose">{{ format.purpose }}</p>
          <ul class="format-entry__happens">
            <li v-for="(item, i) in format.whatHappens" :key="i">{{ item }}</li>
          </ul>
          <p class="format-entry__takeaway">
            <span class="format-entry__takeaway-label">收获</span>
            {{ format.takeaway }}
          </p>
        </div>
        <span class="format-entry__pulse" aria-hidden="true" />
      </article>
    </div>
  </section>
</template>

<style scoped>
.format-stream {
  display: grid;
  gap: var(--space-8);
}

.format-stream__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.format-stream__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.format-stream__list {
  display: grid;
  gap: 0;
}

.format-entry {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: var(--space-6) var(--space-10);
  padding-block: var(--space-7, var(--space-8));
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.format-stream:has(.format-entry--active) .format-entry:not(.format-entry--active) {
  opacity: 0.58;
}

.format-entry__meta {
  margin: 0 0 var(--space-3);
  display: inline-flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.format-entry__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  transition: color var(--duration-normal) var(--ease-out-soft);
}

.format-entry--active .format-entry__title {
  color: var(--color-mountain);
}

.format-entry__desc {
  margin: var(--space-3) 0 0;
  max-width: 28rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.format-entry__purpose {
  margin: 0 0 var(--space-4);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.format-entry__happens {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: var(--space-2);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.format-entry__takeaway {
  margin: var(--space-5) 0 0;
  padding-top: var(--space-4);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 40%, transparent);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.format-entry__takeaway-label {
  display: block;
  margin-bottom: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.format-entry__pulse {
  position: absolute;
  left: 0;
  top: var(--space-8);
  width: 0;
  height: 1px;
  background: color-mix(in srgb, var(--color-sky) 70%, transparent);
  transition: width var(--duration-slow) var(--ease-out-soft);
}

.format-entry--active .format-entry__pulse {
  width: min(6rem, 20%);
}

@media (max-width: 900px) {
  .format-entry {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}

@media (prefers-reduced-motion: reduce) {
  .format-entry,
  .format-entry__pulse,
  .format-entry__title {
    transition: none;
  }

  .format-entry--active .format-entry__pulse {
    width: min(6rem, 20%);
  }
}
</style>
