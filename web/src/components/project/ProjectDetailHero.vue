<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import {
  formatProjectMeta,
  formatProjectTech,
} from '../../content/projects'
import {
  getPersonaLabel,
  type CaseSectionId,
  type CaseSectionPlan,
} from '../../lib/projectCaseStudy'
import {
  getProjectDetailPersona,
  type Project,
} from '../../types/project'
import ProjectVisual from './ProjectVisual.vue'

const props = defineProps<{
  project: Project
  sections: CaseSectionPlan[]
}>()

const metaLine = computed(() => formatProjectMeta(props.project))
const techLine = computed(() => formatProjectTech(props.project))
const personaLabel = computed(() =>
  getPersonaLabel(getProjectDetailPersona(props.project.category)),
)

const activeId = ref<CaseSectionId | ''>(props.sections[0]?.id ?? '')
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  if (!props.sections.length) return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const top = visible[0]
      if (!top?.target.id) return
      const id = top.target.id.replace(/^case-/, '') as CaseSectionId
      activeId.value = id
    },
    {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.1, 0.25, 0.5],
    },
  )

  props.sections.forEach((section) => {
    const el = document.getElementById(`case-${section.id}`)
    if (el) observer?.observe(el)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <header class="detail-hero">
    <div class="detail-hero__nav">
      <RouterLink class="detail-hero__back" to="/projects">
        ← 作品档案
      </RouterLink>
      <p class="detail-hero__persona">{{ personaLabel }}</p>
    </div>

    <div class="detail-hero__stage">
      <div class="detail-hero__copy">
        <p class="detail-hero__meta">{{ metaLine }}</p>
        <h1 class="detail-hero__title">{{ project.title }}</h1>
        <p class="detail-hero__summary">{{ project.summary }}</p>
        <p class="detail-hero__tech">{{ techLine }}</p>
        <p v-if="project.placeholder" class="detail-hero__dev">
          开发占位 · 非真实交付物
        </p>

        <div class="detail-hero__links">
          <a
            v-if="project.githubUrl"
            class="detail-hero__link"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            仓库 ↗
          </a>
          <a
            v-if="project.demoUrl"
            class="detail-hero__link"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Demo ↗
          </a>
        </div>
      </div>

      <div class="detail-hero__visual">
        <ProjectVisual :kind="project.visualKind" featured />
      </div>
    </div>

    <nav
      v-if="sections.length"
      class="detail-hero__toc"
      aria-label="案例研究章节"
    >
      <a
        v-for="section in sections"
        :key="section.id"
        class="detail-hero__toc-item"
        :class="{ 'detail-hero__toc-item--active': activeId === section.id }"
        :href="`#case-${section.id}`"
        :aria-current="activeId === section.id ? 'true' : undefined"
      >
        <span class="detail-hero__toc-index">{{ section.eyebrow }}</span>
        <span>{{ section.title }}</span>
      </a>
    </nav>
  </header>
</template>

<style scoped>
.detail-hero {
  display: grid;
  gap: var(--space-10);
}

.detail-hero__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.detail-hero__back {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  text-decoration: none;
}

.detail-hero__back:hover,
.detail-hero__back:focus-visible {
  color: var(--color-sky);
}

.detail-hero__back:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.detail-hero__persona {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.detail-hero__stage {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.95fr);
  gap: var(--space-8) var(--space-12);
  align-items: center;
}

.detail-hero__copy {
  display: grid;
  gap: var(--space-4);
}

.detail-hero__meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.detail-hero__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.detail-hero__summary {
  margin: 0;
  max-width: 38rem;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.detail-hero__tech {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.detail-hero__dev {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 85%, transparent);
}

.detail-hero__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.detail-hero__link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  text-decoration: none;
}

.detail-hero__link:hover,
.detail-hero__link:focus-visible {
  color: var(--color-sky);
}

.detail-hero__link:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.detail-hero__toc {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-5);
  padding-top: var(--space-6);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.detail-hero__toc-item {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2);
  flex: 0 0 auto;
  padding-bottom: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  white-space: nowrap;
}

.detail-hero__toc-item:hover,
.detail-hero__toc-item:focus-visible {
  color: var(--color-text);
}

.detail-hero__toc-item--active {
  color: var(--color-text);
}

.detail-hero__toc-item--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-aurora),
    color-mix(in srgb, var(--color-sky) 65%, transparent)
  );
}

.detail-hero__toc-item:focus-visible {
  outline: var(--border-focus);
  outline-offset: 3px;
}

.detail-hero__toc-index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .detail-hero__stage {
    grid-template-columns: 1fr;
  }

  /* Single-line horizontal Case Index */
  .detail-hero__toc {
    flex-wrap: nowrap;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    gap: var(--space-4);
    padding-bottom: var(--space-3);
  }

  .detail-hero__toc::-webkit-scrollbar {
    height: 4px;
  }

  .detail-hero__toc::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--color-line) 70%, transparent);
  }
}
</style>
