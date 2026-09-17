<script setup lang="ts">
import type { Project, ProjectCaseStudy } from '../../types/project'
import type { CaseSectionPlan } from '../../lib/projectCaseStudy'

defineProps<{
  project: Project
  study: ProjectCaseStudy
  sections: CaseSectionPlan[]
}>()
</script>

<template>
  <div class="case-study">
    <section
      v-for="section in sections"
      :id="`case-${section.id}`"
      :key="section.id"
      class="case-study__section"
    >
      <header class="case-study__header">
        <p class="case-study__eyebrow">
          <span>{{ section.eyebrow }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ section.title }}</span>
        </p>
      </header>

      <!-- Prose blocks -->
      <p
        v-if="section.id === 'overview' && study.overview"
        class="case-study__prose"
      >
        {{ study.overview }}
      </p>
      <p
        v-else-if="section.id === 'problem' && study.problem"
        class="case-study__prose"
      >
        {{ study.problem }}
      </p>
      <p
        v-else-if="section.id === 'question' && study.question"
        class="case-study__prose"
      >
        {{ study.question }}
      </p>
      <p
        v-else-if="section.id === 'approach' && study.approach"
        class="case-study__prose"
      >
        {{ study.approach }}
      </p>

      <!-- Architecture -->
      <div
        v-else-if="section.id === 'architecture' && study.architecture"
        class="case-study__block"
      >
        <p v-if="study.architecture.summary" class="case-study__prose">
          {{ study.architecture.summary }}
        </p>
        <ol v-if="study.architecture.nodes?.length" class="case-study__nodes">
          <li
            v-for="node in study.architecture.nodes"
            :key="node.id"
            class="case-study__node"
          >
            <p class="case-study__node-label">{{ node.label }}</p>
            <p v-if="node.detail" class="case-study__node-detail">
              {{ node.detail }}
            </p>
          </li>
        </ol>
      </div>

      <!-- Workflow / Usage steps -->
      <ol
        v-else-if="section.id === 'workflow' && study.workflow?.length"
        class="case-study__steps"
      >
        <li v-for="(step, i) in study.workflow" :key="i" class="case-study__step">
          <p class="case-study__step-title">{{ step.title }}</p>
          <p class="case-study__step-detail">{{ step.detail }}</p>
        </li>
      </ol>

      <ol
        v-else-if="section.id === 'usage' && study.usage?.length"
        class="case-study__steps"
      >
        <li v-for="(step, i) in study.usage" :key="i" class="case-study__step">
          <p class="case-study__step-title">{{ step.title }}</p>
          <p class="case-study__step-detail">{{ step.detail }}</p>
        </li>
      </ol>

      <!-- Experiment -->
      <div
        v-else-if="section.id === 'experiment' && study.experiment"
        class="case-study__block"
      >
        <p v-if="study.experiment.summary" class="case-study__prose">
          {{ study.experiment.summary }}
        </p>
        <p v-if="study.experiment.setup" class="case-study__prose">
          {{ study.experiment.setup }}
        </p>
        <div v-if="study.experiment.metrics?.length" class="case-study__chips">
          <p class="case-study__chips-label">Metrics</p>
          <ul>
            <li v-for="m in study.experiment.metrics" :key="m">{{ m }}</li>
          </ul>
        </div>
        <div v-if="study.experiment.controls?.length" class="case-study__chips">
          <p class="case-study__chips-label">Controls</p>
          <ul>
            <li v-for="c in study.experiment.controls" :key="c">{{ c }}</li>
          </ul>
        </div>
      </div>

      <!-- Observations / Limitations / Next -->
      <ul
        v-else-if="section.id === 'observations' && study.observations?.length"
        class="case-study__list"
      >
        <li v-for="(item, i) in study.observations" :key="i">{{ item }}</li>
      </ul>

      <ul
        v-else-if="section.id === 'limitations' && study.limitations?.length"
        class="case-study__list"
      >
        <li v-for="(item, i) in study.limitations" :key="i">{{ item }}</li>
      </ul>

      <ul
        v-else-if="section.id === 'nextSteps' && study.nextSteps?.length"
        class="case-study__list"
      >
        <li v-for="(item, i) in study.nextSteps" :key="i">{{ item }}</li>
      </ul>

      <!-- Results -->
      <ul
        v-else-if="section.id === 'results' && study.results?.length"
        class="case-study__results"
      >
        <li v-for="(item, i) in study.results" :key="i" class="case-study__result">
          <p class="case-study__result-label">{{ item.label }}</p>
          <p class="case-study__result-detail">{{ item.detail }}</p>
        </li>
      </ul>

      <!-- Artifacts -->
      <ul
        v-else-if="section.id === 'artifacts' && study.artifacts?.length"
        class="case-study__artifacts"
      >
        <li
          v-for="(item, i) in study.artifacts"
          :key="i"
          class="case-study__artifact"
        >
          <template v-if="item.href">
            <a
              class="case-study__artifact-label"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.label }} ↗
            </a>
          </template>
          <p v-else class="case-study__artifact-label">{{ item.label }}</p>
          <p class="case-study__artifact-meta">
            {{ item.kind.toUpperCase() }}
            <span v-if="item.note"> · {{ item.note }}</span>
          </p>
        </li>
      </ul>

      <!-- Collaborators -->
      <ul
        v-else-if="section.id === 'collaborators' && study.collaborators?.length"
        class="case-study__people"
      >
        <li
          v-for="(person, i) in study.collaborators"
          :key="i"
          class="case-study__person"
        >
          <p class="case-study__person-name">{{ person.name }}</p>
          <p v-if="person.role" class="case-study__person-role">{{ person.role }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.case-study {
  display: grid;
  gap: var(--space-12);
}

.case-study__section {
  display: grid;
  gap: var(--space-5);
  scroll-margin-top: var(--scroll-padding-top);
  padding-top: var(--space-2);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
}

.case-study__section:first-child {
  border-top: 0;
  padding-top: 0;
}

.case-study__header {
  display: grid;
}

.case-study__eyebrow {
  margin: 0;
  display: inline-flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.case-study__prose {
  margin: 0;
  max-width: 42rem;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.case-study__block {
  display: grid;
  gap: var(--space-5);
}

.case-study__nodes,
.case-study__steps,
.case-study__list,
.case-study__results,
.case-study__artifacts,
.case-study__people {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-4);
}

.case-study__nodes {
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: var(--space-4);
}

.case-study__node {
  padding: var(--space-4) 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.case-study__node-label {
  margin: 0 0 var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
}

.case-study__node-detail {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.case-study__step {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
  gap: var(--space-4);
  padding-block: var(--space-3);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
}

.case-study__step-title {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-text);
}

.case-study__step-detail {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.case-study__list li {
  position: relative;
  padding-left: var(--space-5);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.case-study__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-aurora) 70%, var(--color-sky));
}

.case-study__chips {
  display: grid;
  gap: var(--space-2);
}

.case-study__chips-label {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.case-study__chips ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
}

.case-study__chips li {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

.case-study__result-label,
.case-study__artifact-label,
.case-study__person-name {
  margin: 0 0 var(--space-2);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-text);
}

.case-study__result-detail,
.case-study__person-role {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.case-study__artifact-label {
  display: inline-block;
  text-decoration: none;
  color: var(--color-text);
}

a.case-study__artifact-label:hover,
a.case-study__artifact-label:focus-visible {
  color: var(--color-sky);
}

a.case-study__artifact-label:focus-visible {
  outline: var(--border-focus);
  outline-offset: 3px;
}

.case-study__artifact-meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

@media (max-width: 720px) {
  .case-study__step {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
</style>
