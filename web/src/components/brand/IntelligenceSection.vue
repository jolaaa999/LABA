<script setup lang="ts">
import { computed, ref } from 'vue'

import PageContainer from '../layout/PageContainer.vue'
import MotionSection from '../ui/MotionSection.vue'
import type { IntelligenceMode } from '../../lib/intelligence/types'
import IntelligenceCanvas from './intelligence/IntelligenceCanvas.vue'
import IntelligenceModeSwitch from './intelligence/IntelligenceModeSwitch.vue'

const mode = ref<IntelligenceMode>('build')
const hotspotLabel = ref<string | null>(null)
const hotspotCopy = ref<string | null>(null)

const summary = computed(() =>
  mode.value === 'build'
    ? 'BUILD shows how intent becomes a working system: task, plan, tools, observation, result.'
    : 'UNDERSTAND shows the same intelligence from inside: tokens, attention, representation, experiment.',
)

const micro = computed(() => {
  if (hotspotLabel.value && hotspotCopy.value) {
    return { label: hotspotLabel.value, copy: hotspotCopy.value }
  }
  return mode.value === 'build'
    ? { label: 'Flow', copy: 'From intent to something people can use.' }
    : { label: 'Field', copy: 'Same intelligence. Different perspective.' }
})
</script>

<template>
  <MotionSection as="section" class="intelligence" offset-y="16" aria-labelledby="intelligence-title">
    <PageContainer class="intelligence__inner">
      <header class="intelligence__header">
        <div class="intelligence__heading">
          <p class="intelligence__eyebrow">Intelligence in Motion</p>
          <h2 id="intelligence-title" class="intelligence__title">
            One intelligence.<br />
            Two ways of seeing it.
          </h2>
          <p class="intelligence__lede">
            We build with AI — and we look beneath the models that make it work.
          </p>
        </div>

        <div class="intelligence__controls">
          <IntelligenceModeSwitch v-model="mode" />
          <p class="intelligence__micro" aria-live="polite">
            <span class="intelligence__micro-label">{{ micro.label }}</span>
            {{ micro.copy }}
          </p>
        </div>
      </header>

      <div class="intelligence__field">
        <div class="intelligence__haze" aria-hidden="true" />
        <div class="intelligence__grid" aria-hidden="true" />
        <IntelligenceCanvas
          class="intelligence__canvas"
          :mode="mode"
          @update:hotspot-label="hotspotLabel = $event"
          @update:hotspot-copy="hotspotCopy = $event"
        />
      </div>

      <p class="intelligence__sr-only">
        {{ summary }}
      </p>
    </PageContainer>
  </MotionSection>
</template>

<style scoped>
.intelligence {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-frost) 70%, var(--color-glacier)) 42%,
    color-mix(in srgb, var(--color-morning) 55%, var(--color-ivory)) 100%
  );
}

.intelligence__inner {
  display: grid;
  gap: var(--space-8);
}

.intelligence__header {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(16rem, 0.8fr);
  gap: var(--space-6) var(--space-10);
  align-items: end;
}

.intelligence__eyebrow {
  margin-bottom: var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.intelligence__title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 3.5vw, var(--text-4xl));
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.intelligence__lede {
  margin-top: var(--space-4);
  max-width: 34rem;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.intelligence__controls {
  display: grid;
  gap: var(--space-4);
  justify-items: stretch;
}

.intelligence__micro {
  margin: 0;
  min-height: 2.75rem;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.intelligence__micro-label {
  display: inline-block;
  margin-right: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-mountain);
}

.intelligence__field {
  position: relative;
  min-height: clamp(20rem, 48svh, 28rem);
  overflow: hidden;
  border-radius: 0;
  isolation: isolate;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 3%,
    #000 97%,
    transparent 100%
  );
}

.intelligence__haze {
  position: absolute;
  inset: -8% -4%;
  background:
    radial-gradient(ellipse at 28% 45%, color-mix(in srgb, var(--color-aurora) 22%, transparent), transparent 52%),
    radial-gradient(ellipse at 72% 55%, color-mix(in srgb, var(--color-glacier) 50%, transparent), transparent 58%),
    radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-stream) 18%, transparent), transparent 45%);
  pointer-events: none;
  z-index: 0;
}

.intelligence__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--color-line) 28%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--color-line) 28%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.18;
  mask-image: radial-gradient(ellipse at center, #000 35%, transparent 78%);
  pointer-events: none;
  z-index: 0;
}

.intelligence__canvas {
  position: relative;
  z-index: 1;
  min-height: inherit;
}

.intelligence__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .intelligence__header {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .intelligence__controls {
    justify-items: start;
  }

  .intelligence__field {
    min-height: clamp(16.5rem, 44svh, 22rem);
    mask-image: none;
  }
}
</style>
