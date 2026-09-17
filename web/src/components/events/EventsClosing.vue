<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { eventsClosing } from '../../content/events'
import AuroraButton from '../ui/AuroraButton.vue'
</script>

<template>
  <section class="events-closing" aria-labelledby="events-closing-title">
    <p class="events-closing__eyebrow">{{ eventsClosing.eyebrow }}</p>
    <h2 id="events-closing-title" class="events-closing__title">
      {{ eventsClosing.title }}
    </h2>
    <p class="events-closing__lede">{{ eventsClosing.lede }}</p>

    <div class="events-closing__links">
      <RouterLink class="events-closing__primary" to="/explore">
        <span class="events-closing__link-eyebrow">Learn a direction</span>
        <span class="events-closing__link-title">Explore the learning map</span>
      </RouterLink>
      <RouterLink class="events-closing__secondary" to="/projects">
        <span class="events-closing__link-eyebrow">See the work</span>
        <span class="events-closing__link-title">Work Archive</span>
      </RouterLink>
    </div>

    <div class="events-closing__join">
      <RouterLink v-slot="{ navigate }" to="/join" custom>
        <AuroraButton variant="secondary" size="sm" @click="navigate">
          Join the Community
        </AuroraButton>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.events-closing {
  display: grid;
  gap: var(--space-4);
}

.events-closing__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.events-closing__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.events-closing__lede {
  margin: 0;
  max-width: 32rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.events-closing__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-4);
}

.events-closing__primary,
.events-closing__secondary {
  display: grid;
  gap: var(--space-2);
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  color: inherit;
  text-decoration: none;
}

.events-closing__primary:focus-visible,
.events-closing__secondary:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.events-closing__link-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.events-closing__link-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
}

.events-closing__primary .events-closing__link-title {
  font-size: var(--text-2xl);
}

.events-closing__primary:hover .events-closing__link-title,
.events-closing__primary:focus-visible .events-closing__link-title,
.events-closing__secondary:hover .events-closing__link-title,
.events-closing__secondary:focus-visible .events-closing__link-title {
  color: var(--color-sky);
}

.events-closing__join {
  margin-top: var(--space-2);
}

@media (max-width: 720px) {
  .events-closing__links {
    grid-template-columns: 1fr;
  }

  .events-closing__primary .events-closing__link-title {
    font-size: var(--text-xl);
  }
}
</style>
