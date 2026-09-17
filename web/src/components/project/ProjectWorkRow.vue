<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import {
  formatProjectTech,
} from '../../content/projects'
import {
  getProjectArchiveKindLabel,
  type Project,
} from '../../types/project'

const props = defineProps<{
  project: Project
  index: number
  active?: boolean
}>()

const emit = defineEmits<{
  preview: [slug: string]
}>()

const indexLabel = computed(() => String(props.index).padStart(2, '0'))
const kindLabel = computed(() =>
  getProjectArchiveKindLabel(props.project.category).toUpperCase(),
)
const techLine = computed(() => formatProjectTech(props.project))
const metaRight = computed(
  () => `${kindLabel.value} / ${props.project.year}`,
)
const detailTo = computed(() => `/projects/${props.project.slug}`)

function onPreview() {
  emit('preview', props.project.slug)
}
</script>

<template>
  <RouterLink
    :to="detailTo"
    class="work-row"
    :class="{ 'work-row--active': active }"
    @mouseenter="onPreview"
    @focus="onPreview"
  >
    <div class="work-row__main">
      <p class="work-row__index" aria-hidden="true">{{ indexLabel }}</p>
      <div class="work-row__copy">
        <h3 class="work-row__title">{{ project.title }}</h3>
        <p class="work-row__summary">{{ project.summary }}</p>
        <p v-if="project.placeholder" class="work-row__dev">
          Dev placeholder · not a real deliverable
        </p>
      </div>
    </div>

    <div class="work-row__meta">
      <p class="work-row__kind">{{ metaRight }}</p>
      <p class="work-row__tech">{{ techLine }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.work-row {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(8rem, 0.55fr);
  gap: var(--space-5) var(--space-6);
  align-items: start;
  padding-block: var(--space-6);
  padding-inline: var(--space-2) 0;
  margin-inline: calc(var(--space-2) * -1) 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  color: inherit;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-soft);
}

.work-row:hover,
.work-row:focus-visible,
.work-row--active {
  background: color-mix(in srgb, var(--color-frost) 45%, transparent);
}

.work-row:focus-visible {
  outline: var(--border-focus);
  outline-offset: 2px;
}

.work-row--active .work-row__title {
  color: var(--color-text);
}

.work-row--active .work-row__index {
  color: var(--color-sky);
}

.work-row__main {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
}

.work-row__index {
  margin: 0.2rem 0 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.work-row__copy {
  display: grid;
  gap: var(--space-2);
}

.work-row__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-lg), 1.6vw, var(--text-xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.work-row__summary {
  margin: 0;
  max-width: 36rem;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.work-row__dev {
  margin: var(--space-1) 0 0;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 85%, transparent);
}

.work-row__meta {
  display: grid;
  gap: var(--space-2);
  justify-items: end;
  text-align: right;
  padding-top: 0.15rem;
}

.work-row__kind {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}

.work-row__tech {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  max-width: 14rem;
}

@media (max-width: 1100px) {
  .work-row {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .work-row__meta {
    justify-items: start;
    text-align: left;
    padding-left: calc(2.5rem + var(--space-4));
  }

  .work-row__tech {
    max-width: none;
  }

  .work-row__title {
    font-size: clamp(var(--text-xl), 2vw, var(--text-2xl));
  }
}

@media (prefers-reduced-motion: reduce) {
  .work-row,
  .work-row__index {
    transition: none;
  }
}
</style>
