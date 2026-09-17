<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { scheduleState } from '../../content/events'
import AuroraButton from '../ui/AuroraButton.vue'
</script>

<template>
  <section class="schedule-state" aria-labelledby="schedule-state-title">
    <div class="schedule-state__copy">
      <p class="schedule-state__eyebrow">{{ scheduleState.eyebrow }}</p>
      <h2 id="schedule-state-title" class="schedule-state__status">
        {{ scheduleState.status }}
      </h2>
      <p class="schedule-state__body">{{ scheduleState.body }}</p>
      <p class="schedule-state__hint">{{ scheduleState.hint }}</p>
    </div>

    <div class="schedule-state__side">
      <svg
        class="schedule-state__pulse"
        viewBox="0 0 280 64"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M8 32 H160"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-dasharray="4 6"
          stroke-linecap="round"
        />
        <circle cx="168" cy="32" r="4.5" fill="none" stroke="currentColor" stroke-width="1.35" />
        <path
          d="M180 32 H272"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          opacity="0.35"
          stroke-dasharray="2 8"
        />
      </svg>
      <RouterLink v-slot="{ navigate }" to="/join" custom>
        <AuroraButton variant="primary" size="sm" @click="navigate">
          Join the Community
        </AuroraButton>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.schedule-state {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: var(--space-8) var(--space-10);
  align-items: end;
  padding-block: var(--space-6);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
}

.schedule-state__eyebrow {
  margin: 0 0 var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.schedule-state__status {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2.4vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.schedule-state__body,
.schedule-state__hint {
  margin: var(--space-3) 0 0;
  max-width: 34rem;
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.schedule-state__hint {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.schedule-state__side {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
}

.schedule-state__pulse {
  width: min(100%, 16rem);
  color: color-mix(in srgb, var(--color-sky) 55%, var(--color-line));
}

@media (max-width: 900px) {
  .schedule-state {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    align-items: start;
  }
}
</style>
