<script setup lang="ts">
import { inject, type Ref } from 'vue'

import {
  researchPathIntro,
  researchStages,
  type ResearchStageId,
} from '../../content/explore-research'

const activeStage = inject<Ref<ResearchStageId | null>>('researchActiveStage')
const focusedStage = inject<Ref<ResearchStageId | null>>('researchFocusedStage')
const setFocusedStage = inject<(id: ResearchStageId | null) => void>(
  'setResearchFocusedStage',
)

function isActive(id: ResearchStageId) {
  return activeStage?.value === id
}

function isFocused(id: ResearchStageId) {
  return focusedStage?.value === id
}
</script>

<template>
  <nav class="research-spine" aria-labelledby="research-path-title">
    <header class="research-spine__header">
      <p class="research-spine__eyebrow">{{ researchPathIntro.eyebrow }}</p>
      <h2 id="research-path-title" class="research-spine__title">
        {{ researchPathIntro.title }}
      </h2>
      <p class="research-spine__lede">{{ researchPathIntro.lede }}</p>
    </header>

    <ol class="research-spine__list" aria-label="Research stages">
      <li
        v-for="(stage, index) in researchStages"
        :key="stage.id"
        class="research-spine__item"
        :class="{
          'research-spine__item--active': isActive(stage.id),
          'research-spine__item--focused': isFocused(stage.id),
        }"
      >
        <a
          class="research-spine__link"
          :href="`#${stage.id}`"
          :aria-current="isActive(stage.id) ? 'true' : undefined"
          @mouseenter="setFocusedStage?.(stage.id)"
          @mouseleave="setFocusedStage?.(null)"
          @focus="setFocusedStage?.(stage.id)"
          @blur="setFocusedStage?.(null)"
        >
          <span class="research-spine__rail" aria-hidden="true">
            <span class="research-spine__node" />
            <span
              v-if="index < researchStages.length - 1"
              class="research-spine__segment"
            />
          </span>
          <span class="research-spine__meta">
            <span class="research-spine__index">{{ stage.index }}</span>
            <span class="research-spine__name">{{ stage.shortLabel }}</span>
          </span>
        </a>
      </li>
    </ol>

    <p class="research-spine__feedback" aria-hidden="true">
      Evidence → new Question
    </p>
  </nav>
</template>

<style scoped>
.research-spine {
  display: grid;
  gap: var(--space-6);
}

.research-spine__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.research-spine__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.research-spine__lede {
  margin: var(--space-3) 0 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.research-spine__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.research-spine__link {
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  gap: var(--space-3);
  align-items: start;
  padding-block: var(--space-2);
  color: inherit;
  text-decoration: none;
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.research-spine__link:focus-visible {
  outline: var(--border-focus);
  outline-offset: 3px;
}

/* Reading state stays visible; preview focus does not steal active. */
.research-spine__item:not(.research-spine__item--active):not(
    .research-spine__item--focused
  )
  .research-spine__link {
  opacity: 0.62;
}

.research-spine__rail {
  display: grid;
  justify-items: center;
  min-height: 2.75rem;
}

.research-spine__node {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.45rem;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--color-sky) 50%, var(--color-line));
  background: var(--color-snow);
  transition:
    background var(--duration-normal) var(--ease-out-soft),
    border-color var(--duration-normal) var(--ease-out-soft),
    box-shadow var(--duration-normal) var(--ease-out-soft);
}

.research-spine__segment {
  width: 1px;
  flex: 1;
  min-height: 1.6rem;
  margin-top: 0.35rem;
  background: color-mix(in srgb, var(--color-line) 70%, transparent);
}

/* Scroll / reading active — filled node + ring */
.research-spine__item--active .research-spine__node {
  background: color-mix(in srgb, var(--color-aurora) 55%, var(--color-snow));
  border-color: var(--color-sky);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-aurora) 22%, transparent);
}

.research-spine__item--active .research-spine__segment {
  background: color-mix(in srgb, var(--color-sky) 45%, var(--color-line));
}

.research-spine__item--active .research-spine__name {
  color: var(--color-text);
}

/* Hover / keyboard preview — edge only, never replaces active fill */
.research-spine__item--focused:not(.research-spine__item--active) .research-spine__node {
  border-color: var(--color-sky);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-aurora) 18%, transparent);
  background: var(--color-snow);
}

.research-spine__item--focused:not(.research-spine__item--active) .research-spine__name {
  color: var(--color-mountain);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-sky) 45%, transparent);
  text-underline-offset: 0.2em;
}

.research-spine__meta {
  display: grid;
  gap: 0.15rem;
}

.research-spine__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.research-spine__name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
}

.research-spine__feedback {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .research-spine__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
  }

  .research-spine__item {
    flex: 0 0 auto;
  }

  .research-spine__link {
    grid-template-columns: auto;
    padding-block: var(--space-1);
  }

  .research-spine__rail,
  .research-spine__feedback {
    display: none;
  }

  .research-spine__meta {
    grid-auto-flow: column;
    align-items: baseline;
    gap: var(--space-2);
  }

  .research-spine__item--active .research-spine__name {
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--color-sky) 55%, transparent);
    text-underline-offset: 0.18em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .research-spine__link,
  .research-spine__node {
    transition: none;
  }
}
</style>
