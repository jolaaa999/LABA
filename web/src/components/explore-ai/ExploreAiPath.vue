<script setup lang="ts">
import { inject, type Ref } from 'vue'

import { aiStages, type AiStageId } from '../../content/explore-ai'

const focusedStage = inject<Ref<AiStageId | null>>('aiFocusedStage')
const setFocusedStage = inject<(id: AiStageId | null) => void>('setAiFocusedStage')

function onEnter(id: AiStageId) {
  setFocusedStage?.(id)
}

function onLeave() {
  setFocusedStage?.(null)
}
</script>

<template>
  <nav
    class="ai-path"
    :class="{ 'ai-path--focused': Boolean(focusedStage) }"
    aria-labelledby="ai-path-title"
  >
    <header class="ai-path__header">
      <p class="ai-path__eyebrow">路径</p>
      <h2 id="ai-path-title" class="ai-path__title">
        输入 → 工具 → 系统 → 交付。
      </h2>
      <p class="ai-path__lede">
        六个定向阶段。不是解锁，也不是必须按顺序完成的课纲。
      </p>
    </header>

    <ol class="ai-path__list">
      <li v-for="stage in aiStages" :key="stage.id">
        <a
          class="ai-path__link"
          :class="{ 'ai-path__link--focused': focusedStage === stage.id }"
          :href="`#stage-${stage.id}`"
          @mouseenter="onEnter(stage.id)"
          @mouseleave="onLeave"
          @focus="onEnter(stage.id)"
          @blur="onLeave"
        >
          <span class="ai-path__index">{{ stage.index }}</span>
          <span class="ai-path__name">{{ stage.title }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.ai-path {
  display: grid;
  gap: var(--space-8);
}

.ai-path__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.ai-path__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.ai-path__lede {
  margin: var(--space-4) 0 0;
  max-width: 36rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.ai-path__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.ai-path__link {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-3) var(--space-5) 0;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.ai-path__link:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.ai-path--focused .ai-path__link:not(.ai-path__link--focused) {
  opacity: 0.58;
}

.ai-path__link--focused .ai-path__name {
  color: var(--color-mountain);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--color-sky) 40%, transparent);
  text-underline-offset: 0.18em;
}

.ai-path__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.ai-path__name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
}

@media (max-width: 1024px) {
  .ai-path__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .ai-path__list {
    grid-template-columns: 1fr;
  }

  .ai-path__link {
    grid-template-columns: 2.5rem 1fr;
    align-items: baseline;
    padding-block: var(--space-4);
    border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ai-path__link {
    transition: none;
  }
}
</style>
