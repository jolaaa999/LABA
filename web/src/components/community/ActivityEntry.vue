<script setup lang="ts">
import type { Activity } from '../../types/activity'

defineProps<{
  activity: Activity
  active: boolean
}>()
</script>

<template>
  <article
    class="activity-entry"
    :class="{ 'activity-entry--active': active }"
    :data-activity-id="activity.id"
  >
    <div class="activity-entry__rail" aria-hidden="true">
      <span class="activity-entry__index">{{ activity.index }}</span>
      <span class="activity-entry__category">{{ activity.category }}</span>
    </div>

    <div class="activity-entry__body">
      <h3 class="activity-entry__title">{{ activity.title }}</h3>
      <p class="activity-entry__statement">{{ activity.statement }}</p>
      <div class="activity-entry__foot">
        <span class="activity-entry__rule" aria-hidden="true" />
        <p v-if="activity.meta" class="activity-entry__meta">{{ activity.meta }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.activity-entry {
  display: grid;
  grid-template-columns: minmax(5.5rem, 7rem) minmax(0, 1fr);
  gap: var(--space-6) var(--space-8);
  padding-block: var(--space-10);
  min-height: 11rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.activity-entry:last-child {
  border-bottom: 0;
}

.activity-entry__rail {
  display: grid;
  gap: var(--space-2);
  align-content: start;
  padding-top: 0.15rem;
}

.activity-entry__index {
  font-family: var(--font-mono);
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  letter-spacing: 0.04em;
  line-height: 1;
  color: var(--color-text-muted);
  transition: color var(--duration-normal) var(--ease-out-soft);
}

.activity-entry__category {
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color var(--duration-normal) var(--ease-out-soft);
}

.activity-entry__body {
  display: grid;
  gap: var(--space-4);
  max-width: 36rem;
}

.activity-entry__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2.2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
  transition: transform var(--duration-normal) var(--ease-out-soft), color var(--duration-fast) var(--ease-out-soft);
}

.activity-entry__statement {
  margin: 0;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.activity-entry__foot {
  display: grid;
  gap: var(--space-3);
  padding-top: var(--space-1);
}

.activity-entry__rule {
  display: block;
  width: 2.75rem;
  height: 1px;
  background: color-mix(in srgb, var(--color-line) 80%, transparent);
  transform-origin: left center;
  transition:
    width var(--duration-normal) var(--ease-out-soft),
    background var(--duration-normal) var(--ease-out-soft);
}

.activity-entry__meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color var(--duration-normal) var(--ease-out-soft);
}

.activity-entry--active .activity-entry__index {
  color: var(--color-mountain);
}

.activity-entry--active .activity-entry__category {
  color: var(--color-sky);
}

.activity-entry--active .activity-entry__rule {
  width: 5.5rem;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-aurora) 80%, transparent),
    color-mix(in srgb, var(--color-sky) 35%, transparent)
  );
}

.activity-entry--active .activity-entry__meta {
  color: var(--color-mountain);
}

@media (hover: hover) and (pointer: fine) {
  .activity-entry:hover .activity-entry__title {
    transform: translateX(4px);
  }

  .activity-entry:hover .activity-entry__rule {
    width: 4.5rem;
    background: color-mix(in srgb, var(--color-aurora) 55%, var(--color-line));
  }
}

@media (max-width: 900px) {
  .activity-entry {
    grid-template-columns: 1fr;
    gap: var(--space-3);
    padding-block: var(--space-7);
  }

  .activity-entry__rail {
    grid-template-columns: auto auto;
    align-items: baseline;
    gap: var(--space-3);
  }

  .activity-entry__index {
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .activity-entry,
  .activity-entry__title,
  .activity-entry__rule,
  .activity-entry__index,
  .activity-entry__category,
  .activity-entry__meta {
    transition: none;
  }

  .activity-entry:hover .activity-entry__title {
    transform: none;
  }
}
</style>
