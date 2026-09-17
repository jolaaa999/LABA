<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { joinClosing } from '../../content/join-page'

const titleLines = joinClosing.title.split('\n')
const ledeBlocks = joinClosing.lede.split('\n\n')
const echoLines = joinClosing.echo.split('\n')
</script>

<template>
  <section class="join-closing" aria-labelledby="join-closing-title">
    <p class="join-closing__eyebrow">{{ joinClosing.eyebrow }}</p>
    <h2 id="join-closing-title" class="join-closing__title">
      <span v-for="(line, i) in titleLines" :key="i" class="join-closing__title-line">
        {{ line }}
      </span>
    </h2>
    <div class="join-closing__lede">
      <p v-for="(block, i) in ledeBlocks" :key="i">{{ block }}</p>
    </div>

    <ul class="join-closing__exits">
      <li v-for="exit in joinClosing.exits" :key="exit.to">
        <RouterLink class="join-closing__exit" :to="exit.to">
          <span class="join-closing__exit-eyebrow">{{ exit.eyebrow }}</span>
          <span class="join-closing__exit-title">{{ exit.title }}</span>
        </RouterLink>
      </li>
    </ul>

    <p class="join-closing__echo">
      <span v-for="(line, i) in echoLines" :key="i" class="join-closing__echo-line">
        {{ line }}
      </span>
    </p>
  </section>
</template>

<style scoped>
.join-closing {
  display: grid;
  gap: var(--space-4);
}

.join-closing__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.join-closing__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.join-closing__title-line {
  display: block;
}

.join-closing__lede {
  max-width: 34rem;
  display: grid;
  gap: var(--space-3);
}

.join-closing__lede p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.join-closing__exits {
  list-style: none;
  margin: var(--space-4) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-5);
}

.join-closing__exit {
  display: grid;
  gap: var(--space-2);
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  color: inherit;
  text-decoration: none;
}

.join-closing__exit:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.join-closing__exit-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.join-closing__exit-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
}

.join-closing__exit:hover .join-closing__exit-title,
.join-closing__exit:focus-visible .join-closing__exit-title {
  color: var(--color-sky);
}

.join-closing__echo {
  margin: var(--space-6) 0 0;
  display: grid;
  gap: 0.2rem;
  max-width: 28rem;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-muted);
}

.join-closing__echo-line {
  display: block;
}

@media (max-width: 720px) {
  .join-closing__exits {
    grid-template-columns: 1fr;
  }
}
</style>
