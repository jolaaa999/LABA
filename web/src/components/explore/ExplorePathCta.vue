<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { RouterLink } from 'vue-router'

import { explorePaths, type ExplorePathId } from '../../content/explore'

const setFocusedPath = inject<(path: ExplorePathId | null) => void>(
  'setExploreFocusedPath',
)
const focusedPath = inject<Ref<ExplorePathId | null>>('exploreFocusedPath')
</script>

<template>
  <section
    class="explore-cta"
    :class="{
      'explore-cta--build': focusedPath === 'build',
      'explore-cta--understand': focusedPath === 'understand',
    }"
    aria-labelledby="explore-cta-title"
  >
    <header class="explore-cta__header">
      <p class="explore-cta__eyebrow">Continue into a path</p>
      <h2 id="explore-cta-title" class="explore-cta__title">Choose a path.</h2>
      <p class="explore-cta__lede">
        The hub orients you. The next pages go deeper into one direction.
      </p>
    </header>

    <div class="explore-cta__actions">
      <RouterLink
        v-for="path in explorePaths"
        :key="path.id"
        class="explore-cta__link"
        :class="`explore-cta__link--${path.id}`"
        :to="path.to"
        @mouseenter="setFocusedPath?.(path.id)"
        @mouseleave="setFocusedPath?.(null)"
        @focus="setFocusedPath?.(path.id)"
        @blur="setFocusedPath?.(null)"
      >
        <span class="explore-cta__link-eyebrow">{{ path.eyebrow }}</span>
        <span class="explore-cta__link-title">{{ path.ctaLabel }}</span>
        <span class="explore-cta__link-arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.explore-cta {
  display: grid;
  gap: var(--space-8);
  padding-top: var(--space-2);
}

.explore-cta__eyebrow {
  margin: 0 0 var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.explore-cta__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.explore-cta__lede {
  margin: var(--space-3) 0 0;
  max-width: 32rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.explore-cta__actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4) var(--space-8);
}

.explore-cta__link {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  align-items: end;
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  color: inherit;
  text-decoration: none;
  transition: opacity 200ms var(--ease-out-soft);
}

.explore-cta__link:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.explore-cta--build .explore-cta__link--understand,
.explore-cta--understand .explore-cta__link--build {
  opacity: 0.6;
}

.explore-cta__link-eyebrow {
  grid-column: 1;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.explore-cta__link-title {
  grid-column: 1;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
}

.explore-cta__link-arrow {
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;
  font-weight: 600;
  color: var(--color-mountain);
}

.explore-cta__link:hover .explore-cta__link-title,
.explore-cta__link:focus-visible .explore-cta__link-title {
  color: var(--color-sky);
}

@media (max-width: 720px) {
  .explore-cta__actions {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .explore-cta__link {
    transition: none;
  }
}
</style>
