<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { RouterLink } from 'vue-router'

import { explorePaths, type ExplorePathId } from '../../content/explore'

const focusedPath = inject<Ref<ExplorePathId | null>>('exploreFocusedPath')
const setFocusedPath = inject<(path: ExplorePathId | null) => void>(
  'setExploreFocusedPath',
)

const build = explorePaths[0]
const understand = explorePaths[1]

function onEnter(path: ExplorePathId) {
  setFocusedPath?.(path)
}

function onLeave() {
  setFocusedPath?.(null)
}
</script>

<template>
  <section
    class="explore-directions"
    :class="{
      'explore-directions--build': focusedPath === 'build',
      'explore-directions--understand': focusedPath === 'understand',
    }"
    aria-labelledby="explore-directions-title"
  >
    <header class="explore-directions__header">
      <p class="explore-directions__eyebrow">选择你的方向</p>
      <h2 id="explore-directions-title" class="explore-directions__title">
        两种技术气质。
      </h2>
    </header>

    <div class="explore-directions__split">
      <RouterLink
        v-if="build"
        class="explore-directions__path explore-directions__path--build"
        :to="build.to"
        @mouseenter="onEnter('build')"
        @mouseleave="onLeave"
        @focus="onEnter('build')"
        @blur="onLeave"
      >
        <p class="explore-directions__path-eyebrow">{{ build.eyebrow }}</p>
        <h3 class="explore-directions__path-title">{{ build.title }}</h3>
        <p class="explore-directions__audience">
          面向：{{ build.audience.join(' · ') }}
        </p>
        <ul class="explore-directions__topics">
          <li v-for="topic in build.topics" :key="topic.id">{{ topic.label }}</li>
        </ul>
        <p class="explore-directions__statement">{{ build.statement }}</p>
        <span class="explore-directions__cta">
          进入路径
          <span aria-hidden="true">→</span>
        </span>
      </RouterLink>

      <div class="explore-directions__spine" aria-hidden="true">
        <span>基础</span>
      </div>

      <RouterLink
        v-if="understand"
        class="explore-directions__path explore-directions__path--understand"
        :to="understand.to"
        @mouseenter="onEnter('understand')"
        @mouseleave="onLeave"
        @focus="onEnter('understand')"
        @blur="onLeave"
      >
        <p class="explore-directions__path-eyebrow">{{ understand.eyebrow }}</p>
        <h3 class="explore-directions__path-title">{{ understand.title }}</h3>
        <p class="explore-directions__audience">
          面向：{{ understand.audience.join(' · ') }}
        </p>
        <ul class="explore-directions__topics">
          <li v-for="topic in understand.topics" :key="topic.id">
            {{ topic.label }}
          </li>
        </ul>
        <p class="explore-directions__statement">{{ understand.statement }}</p>
        <span class="explore-directions__cta">
          进入路径
          <span aria-hidden="true">→</span>
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.explore-directions {
  display: grid;
  gap: var(--space-8);
}

.explore-directions__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.explore-directions__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.explore-directions__split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--space-6) var(--space-5);
  align-items: stretch;
}

.explore-directions__path {
  display: grid;
  gap: var(--space-4);
  align-content: start;
  padding: var(--space-6) var(--space-2);
  color: inherit;
  text-decoration: none;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  transition:
    opacity 200ms var(--ease-out-soft),
    background-color 200ms var(--ease-out-soft);
}

.explore-directions__path:hover,
.explore-directions__path:focus-visible {
  background: color-mix(in srgb, var(--color-frost) 40%, transparent);
}

.explore-directions__path:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.explore-directions--build .explore-directions__path--understand,
.explore-directions--understand .explore-directions__path--build {
  opacity: 0.62;
}

.explore-directions__path-eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.explore-directions__path-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2.2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.explore-directions__audience {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.explore-directions__topics {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
}

.explore-directions__topics li {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.explore-directions__statement {
  margin: 0;
  max-width: 28rem;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.explore-directions__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
}

.explore-directions__spine {
  display: grid;
  place-items: center;
  padding-inline: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  border-inline: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

@media (max-width: 900px) {
  .explore-directions__split {
    grid-template-columns: 1fr;
  }

  .explore-directions__spine {
    writing-mode: horizontal-tb;
    transform: none;
    padding-block: var(--space-3);
    border-inline: 0;
    border-block: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .explore-directions__path {
    transition: none;
  }
}
</style>
