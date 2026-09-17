<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import MotionSection from '../ui/MotionSection.vue'
import PageContainer from '../layout/PageContainer.vue'
import { getStoryMilestones } from '../../content/story'
import { useMotionPreference } from '../../composables/useMotionPreference'
import { getScrollFocusY, getStickyNavOffset } from '../../lib/layout'

const milestones = getStoryMilestones()
const track = ref<HTMLElement | null>(null)
const progress = ref(0)
const activeId = ref(milestones[0]?.id ?? '')
const { prefersReducedMotion } = useMotionPreference()

let scrollRaf = 0

const progressPercent = computed(() =>
  prefersReducedMotion.value ? 100 : Math.round(progress.value * 1000) / 10,
)

function updateProgress() {
  const el = track.value
  if (!el) return

  if (prefersReducedMotion.value) {
    progress.value = 1
    activeId.value = milestones[milestones.length - 1]?.id ?? activeId.value
    return
  }

  const rect = el.getBoundingClientRect()
  const view = window.innerHeight
  const navOffset = getStickyNavOffset()
  const start = view * 0.72
  const end = Math.max(navOffset + 48, view * 0.28)
  const raw = (start - rect.top) / (rect.height + start - end)
  progress.value = Math.max(0, Math.min(1, raw))

  // Active milestone: closest to reading focus band (below sticky nav)
  const focusY = getScrollFocusY()
  let bestId = activeId.value
  let bestDist = Number.POSITIVE_INFINITY
  el.querySelectorAll<HTMLElement>('[data-milestone-id]').forEach((node) => {
    const id = node.dataset.milestoneId
    if (!id) return
    const r = node.getBoundingClientRect()
    if (r.bottom < navOffset || r.top > view - 40) return
    const mid = r.top + r.height * 0.3
    const dist = Math.abs(mid - focusY)
    if (dist < bestDist) {
      bestDist = dist
      bestId = id
    }
  })
  activeId.value = bestId
}

function onScroll() {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0
    updateProgress()
  })
}

onMounted(async () => {
  await nextTick()
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <MotionSection
    as="section"
    class="story"
    offset-y="16"
    aria-labelledby="story-title"
  >
    <PageContainer class="story__inner">
      <header class="story__header">
        <p class="story__eyebrow">Story</p>
        <h2 id="story-title" class="story__title">From curiosity to practice.</h2>
        <p class="story__lede">
          How this community’s directions took shape — and what still waits ahead.
        </p>
      </header>

      <div ref="track" class="story__track">
        <div class="story__rail" aria-hidden="true">
          <div class="story__rail-track" />
          <div
            class="story__rail-progress"
            :style="{ height: `${progressPercent}%` }"
          />
        </div>

        <ol class="story__list">
          <li
            v-for="(item, index) in milestones"
            :key="item.id"
            class="story__item"
            :class="{
              'story__item--active': item.id === activeId,
              'story__item--passed':
                milestones.findIndex((m) => m.id === activeId) > index,
              'story__item--next': item.id === 'next',
            }"
            :data-milestone-id="item.id"
          >
            <div class="story__mark" aria-hidden="true">
              <span class="story__dot" />
            </div>
            <div class="story__body">
              <p class="story__index">
                <span>{{ item.index }}</span>
                <span class="story__label">{{ item.label }}</span>
              </p>
              <h3 class="story__item-title">{{ item.title }}</h3>
              <p class="story__statement">{{ item.statement }}</p>
              <p v-if="item.placeholder" class="story__dev">
                Dev placeholder · not verified history
              </p>
            </div>
          </li>
        </ol>
      </div>

      <!-- Continuum into Join -->
      <div class="story__continuum" aria-hidden="true">
        <div class="story__continuum-rail" />
        <div class="story__continuum-elbow" />
      </div>
    </PageContainer>
  </MotionSection>
</template>

<style scoped>
.story {
  position: relative;
  padding-block: var(--space-20) 0;
  scroll-margin-top: var(--scroll-padding-top);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-snow) 90%, var(--color-morning)) 0%,
    var(--color-morning) 55%,
    color-mix(in srgb, var(--color-morning) 70%, var(--color-snow)) 100%
  );
}

.story__inner {
  display: grid;
  gap: var(--space-10);
  position: relative;
}

.story__header {
  display: grid;
  gap: var(--space-3);
  max-width: 36rem;
}

.story__eyebrow {
  margin: 0;
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.story__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 3.2vw, var(--text-4xl));
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.story__lede {
  margin: 0;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.story__track {
  position: relative;
  display: grid;
  padding-left: 0;
  min-height: 28rem;
}

.story__rail {
  position: absolute;
  left: 0.85rem;
  top: 0.35rem;
  bottom: 0;
  width: 2px;
  pointer-events: none;
}

.story__rail-track {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--color-line) 75%, transparent);
}

.story__rail-progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-aurora) 55%, var(--color-sky)),
    color-mix(in srgb, var(--color-sky) 70%, var(--color-mountain))
  );
  transition: height 80ms linear;
}

.story__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-10);
}

.story__item {
  position: relative;
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: var(--space-5);
  padding-left: 0;
  opacity: 0.78;
  transition:
    opacity var(--duration-normal) var(--ease-out-soft),
    transform var(--duration-normal) var(--ease-out-soft);
}

.story__item--passed {
  opacity: 0.88;
}

.story__item--active {
  opacity: 1;
}

.story__item:not(.story__item--active) .story__item-title {
  color: var(--color-text-secondary);
}

.story__item:not(.story__item--active) .story__statement {
  color: color-mix(in srgb, var(--color-text-secondary) 88%, var(--color-text-muted));
}

.story__item--active .story__item-title {
  color: var(--color-text);
}

.story__item--active .story__statement {
  color: var(--color-text-secondary);
}

.story__mark {
  position: relative;
  display: grid;
  place-items: start center;
  padding-top: 0.35rem;
}

.story__dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: var(--color-mist);
  border: 2px solid var(--color-line);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-snow) 80%, transparent);
  transition:
    background var(--duration-normal) var(--ease-out-soft),
    border-color var(--duration-normal) var(--ease-out-soft),
    box-shadow var(--duration-normal) var(--ease-out-soft);
}

.story__item--passed .story__dot {
  background: var(--color-mountain);
  border-color: var(--color-mountain);
}

.story__item--active .story__dot {
  background: var(--color-aurora);
  border-color: var(--color-sky);
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--color-snow) 70%, transparent),
    0 0 12px color-mix(in srgb, var(--color-aurora) 35%, transparent);
}

.story__body {
  display: grid;
  gap: var(--space-2);
  max-width: 34rem;
  padding-bottom: var(--space-2);
}

.story__index {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.story__item--active .story__index {
  color: var(--color-sky);
}

.story__item--passed .story__index {
  color: var(--color-mountain);
}

.story__label {
  letter-spacing: 0.12em;
}

.story__item-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.story__statement {
  margin: 0;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.story__dev {
  margin: var(--space-2) 0 0;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 85%, transparent);
}

.story__item--next .story__item-title {
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-mountain));
}

.story__continuum {
  position: relative;
  height: var(--space-16);
  margin-top: calc(var(--space-4) * -1);
}

.story__continuum-rail {
  position: absolute;
  left: 0.85rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-sky) 55%, var(--color-mountain)),
    color-mix(in srgb, var(--color-aurora) 45%, transparent)
  );
}

/* Desktop: gentle elbow toward Join “NEXT” */
.story__continuum-elbow {
  display: none;
}

@media (min-width: 901px) {
  .story__list {
    gap: var(--space-12);
  }

  .story__item:nth-child(even) .story__body {
    margin-left: clamp(0rem, 4vw, 3rem);
  }

  .story__continuum {
    height: var(--space-20);
  }

  .story__continuum-rail {
    bottom: 42%;
  }

  .story__continuum-elbow {
    display: block;
    position: absolute;
    left: 0.85rem;
    bottom: 28%;
    width: min(11rem, 22vw);
    height: 2px;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-aurora) 50%, var(--color-sky)),
      color-mix(in srgb, var(--color-aurora) 18%, transparent)
    );
    transform-origin: left center;
    border-radius: 1px;
  }

  .story__continuum-elbow::after {
    content: '';
    position: absolute;
    right: -1px;
    top: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--color-aurora) 55%, var(--color-sky));
    transform: translate(50%, -50%);
    opacity: 0.7;
  }
}

@media (max-width: 720px) {
  .story {
    padding-block: var(--space-12) 0;
  }

  .story__list {
    gap: var(--space-8);
  }

  .story__rail,
  .story__continuum-rail {
    left: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .story__rail-progress,
  .story__item,
  .story__dot {
    transition: none;
  }

  .story__item {
    opacity: 1;
  }
}
</style>
