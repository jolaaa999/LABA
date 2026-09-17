<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AuroraButton from '../ui/AuroraButton.vue'
</script>

<template>
  <section class="archive-cta" aria-labelledby="archive-cta-title">
    <p class="archive-cta__eyebrow">Next</p>
    <h2 id="archive-cta-title" class="archive-cta__title">
      Have something worth building?
    </h2>
    <p class="archive-cta__copy">
      The archive grows with people who ship, read, and share —
      not with empty cards.
    </p>
    <div class="archive-cta__actions">
      <RouterLink v-slot="{ navigate }" to="/join" custom>
        <AuroraButton variant="primary" size="md" @click="navigate">
          Join the Community
        </AuroraButton>
      </RouterLink>
      <RouterLink class="archive-cta__secondary" to="/community">
        Meet the people
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.archive-cta {
  display: grid;
  gap: var(--space-4);
  max-width: 36rem;
  padding-block: var(--space-4) 0;
}

.archive-cta__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.archive-cta__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.archive-cta__copy {
  margin: 0;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.archive-cta__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-6);
  margin-top: var(--space-3);
}

.archive-cta__secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.archive-cta__secondary:hover,
.archive-cta__secondary:focus-visible {
  color: var(--color-sky);
}

.archive-cta__secondary:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}
</style>
