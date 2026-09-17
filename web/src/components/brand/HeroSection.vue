<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AuroraButton from '../ui/AuroraButton.vue'
import GradientText from '../ui/GradientText.vue'
import PageContainer from '../layout/PageContainer.vue'
import HeroVisual from './HeroVisual.vue'
import { useMotionPreference } from '../../composables/useMotionPreference'

const { prefersReducedMotion } = useMotionPreference()

const keywords = [
  'AI CODING',
  'AGENT SYSTEMS',
  'DEEP LEARNING',
  'RESEARCH',
] as const
</script>

<template>
  <section
    class="hero"
    :class="{ 'hero--static': prefersReducedMotion }"
    aria-labelledby="hero-title"
  >
    <div class="hero__atmosphere" aria-hidden="true" />

    <PageContainer class="hero__grid">
      <div class="hero__copy">
        <p class="hero__eyebrow hero__reveal" style="--reveal-delay: 0ms">
          University AI × Deep Learning Community
        </p>

        <h1 id="hero-title" class="hero__title hero__reveal" style="--reveal-delay: 80ms">
          <span class="hero__title-line">We Learn AI.</span>
          <span class="hero__title-line">
            We
            <GradientText as="span">Build</GradientText>
            with AI.
          </span>
        </h1>

        <p class="hero__support hero__reveal" style="--reveal-delay: 160ms">
          面向大学生的技术社区——一边用 AI 创造与交付，一边深入理解 Deep Learning 与科研方法。
        </p>

        <div class="hero__actions hero__reveal" style="--reveal-delay: 220ms">
          <RouterLink v-slot="{ navigate }" to="/projects" custom>
            <AuroraButton variant="primary" size="lg" @click="navigate">
              探索作品
            </AuroraButton>
          </RouterLink>
          <RouterLink v-slot="{ navigate }" to="/join" custom>
            <AuroraButton variant="secondary" size="lg" @click="navigate">
              加入社区
            </AuroraButton>
          </RouterLink>
        </div>

        <p
          class="hero__keywords hero__reveal"
          style="--reveal-delay: 280ms"
          aria-label="Focus areas"
        >
          <template v-for="(keyword, index) in keywords" :key="keyword">
            <span v-if="index > 0" class="hero__keywords-sep" aria-hidden="true">·</span>
            <span class="hero__keywords-item">{{ keyword }}</span>
          </template>
        </p>
      </div>

      <div class="hero__visual hero__reveal" style="--reveal-delay: 160ms">
        <HeroVisual />
      </div>
    </PageContainer>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  min-height: calc(68svh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-block: var(--space-6) var(--space-4);
  overflow: clip;
}

.hero__atmosphere {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      50% 40% at 80% 28%,
      color-mix(in srgb, var(--color-glacier) 48%, transparent) 0%,
      transparent 72%
    ),
    radial-gradient(
      36% 30% at 16% 72%,
      color-mix(in srgb, var(--color-frost) 62%, transparent) 0%,
      transparent 75%
    ),
    linear-gradient(
      180deg,
      var(--color-snow) 0%,
      color-mix(in srgb, var(--color-morning) 80%, var(--color-snow)) 58%,
      var(--color-morning) 100%
    );
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: var(--space-8) var(--space-8);
  align-items: start;
  width: 100%;
  padding-top: var(--space-6);
}

.hero__copy {
  display: grid;
  gap: var(--space-5);
  max-width: 36rem;
  padding-top: var(--space-4);
}

.hero__eyebrow {
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: 500;
}

.hero__title {
  display: grid;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4.6vw, 3.5rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.hero__title-line {
  display: block;
}

.hero__support {
  max-width: 32rem;
  font-size: var(--text-lg);
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__keywords {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.hero__keywords-sep {
  color: color-mix(in srgb, var(--color-text-muted) 55%, transparent);
}

.hero__keywords-item {
  white-space: nowrap;
}

.hero__visual {
  justify-self: end;
  width: min(100%, 32rem);
  margin-top: var(--space-2);
}

.hero__reveal {
  animation: hero-reveal var(--duration-slow) var(--ease-out-soft) both;
  animation-delay: var(--reveal-delay, 0ms);
}

.hero--static .hero__reveal {
  animation: none;
}

@keyframes hero-reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding-block: var(--space-5) var(--space-5);
  }

  .hero__grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-top: var(--space-1);
    align-items: stretch;
  }

  .hero__copy {
    order: 1;
    max-width: none;
    gap: var(--space-3);
    padding-top: 0;
  }

  .hero__visual {
    order: 2;
    justify-self: center;
    width: min(100%, 19rem);
    margin-top: 0;
  }

  .hero__title {
    font-size: clamp(2rem, 8vw, 2.75rem);
  }

  .hero__support {
    max-width: 36rem;
    font-size: var(--text-base);
    line-height: 1.65;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-block: var(--space-4) var(--space-4);
  }

  .hero__grid {
    gap: var(--space-3);
  }

  .hero__copy {
    gap: var(--space-3);
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
  }

  .hero__actions :deep(.aurora-button) {
    width: 100%;
  }

  .hero__visual {
    width: min(100%, 16.5rem);
  }

  .hero__keywords {
    gap: var(--space-1) var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__reveal {
    animation: none;
  }
}
</style>
