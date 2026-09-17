<script setup lang="ts">
import {
  joinDirections,
  joinEntryField,
  type JoinDirectionId,
} from '../../content/join-page'

defineProps<{
  committed: JoinDirectionId | null
  focused: JoinDirectionId | null
  effective: JoinDirectionId | null
}>()

const emit = defineEmits<{
  focus: [id: JoinDirectionId | null]
  commit: [id: JoinDirectionId]
}>()

function onFocus(id: JoinDirectionId) {
  emit('focus', id)
}

function onBlur() {
  emit('focus', null)
}

function onCommit(id: JoinDirectionId) {
  emit('commit', id)
}
</script>

<template>
  <section class="entry-field" aria-labelledby="entry-field-title">
    <header class="entry-field__header">
      <p class="entry-field__eyebrow">{{ joinEntryField.eyebrow }}</p>
      <h2 id="entry-field-title" class="entry-field__title">
        <span class="entry-field__title-line">你想从哪里</span>
        <span class="entry-field__title-line">开始？</span>
      </h2>
    </header>

    <div
      class="entry-field__diagram"
      :class="effective ? `entry-field__diagram--${effective}` : null"
      aria-hidden="true"
    >
      <svg class="entry-field__svg" viewBox="0 0 640 320" focusable="false">
        <path
          class="entry-field__path entry-field__path--build"
          d="M320 56 V120 L320 160"
          fill="none"
          stroke-width="1.5"
          pathLength="1"
        />
        <path
          class="entry-field__path entry-field__path--research"
          d="M320 264 V200 L320 160"
          fill="none"
          stroke-width="1.5"
          pathLength="1"
        />
        <path
          class="entry-field__path entry-field__path--hybrid"
          d="M320 148 C360 128 360 192 320 172"
          fill="none"
          stroke-width="1.25"
          pathLength="1"
        />
        <path
          class="entry-field__path entry-field__path--you"
          d="M72 160 H250"
          fill="none"
          stroke-width="1.5"
          pathLength="1"
        />
        <path
          class="entry-field__path entry-field__path--practice"
          d="M390 160 H560"
          fill="none"
          stroke-width="1.5"
          pathLength="1"
        />
        <circle class="entry-field__node" cx="72" cy="160" r="4.5" />
        <circle class="entry-field__hub" cx="320" cy="160" r="22" />
        <circle class="entry-field__hub-dot" cx="320" cy="160" r="4" />
        <circle class="entry-field__node" cx="560" cy="160" r="5" />
        <text class="entry-field__svg-label" x="72" y="144">你</text>
        <text class="entry-field__svg-label entry-field__svg-label--hub" x="320" y="146" text-anchor="middle">
          入口
        </text>
        <text class="entry-field__svg-label" x="560" y="144" text-anchor="middle">实践</text>
      </svg>
    </div>

    <div class="entry-field__choices" role="group" aria-label="实践方向">
      <button
        v-for="direction in joinDirections"
        :key="direction.id"
        type="button"
        class="entry-field__choice"
        :class="{
          'entry-field__choice--focused': focused === direction.id,
          'entry-field__choice--committed': committed === direction.id,
          'entry-field__choice--dimmed':
            effective !== null && effective !== direction.id,
        }"
        :aria-pressed="committed === direction.id"
        @mouseenter="onFocus(direction.id)"
        @mouseleave="onBlur"
        @focus="onFocus(direction.id)"
        @blur="onBlur"
        @click="onCommit(direction.id)"
      >
        <span class="entry-field__choice-index">{{ direction.index }}</span>
        <span class="entry-field__choice-label">{{ direction.label }}</span>
        <span class="entry-field__choice-hint" aria-hidden="true">选择</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.entry-field {
  display: grid;
  gap: var(--space-7);
}

.entry-field__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.entry-field__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.entry-field__title-line {
  display: block;
}

.entry-field__diagram {
  max-width: 36rem;
  margin-inline: auto;
  width: 100%;
}

.entry-field__svg {
  width: 100%;
  height: auto;
  display: block;
}

.entry-field__path {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: color-mix(in srgb, var(--color-sky) 45%, var(--color-line));
  opacity: 0.72;
  transition:
    opacity 380ms var(--ease-out-soft),
    stroke 380ms var(--ease-out-soft),
    stroke-width 380ms var(--ease-out-soft);
}

.entry-field__path--research {
  stroke: color-mix(in srgb, var(--color-aurora) 40%, var(--color-mountain));
}

.entry-field__path--hybrid {
  stroke: color-mix(in srgb, var(--color-mountain) 35%, var(--color-line));
}

.entry-field__diagram--build .entry-field__path--build,
.entry-field__diagram--build .entry-field__path--you,
.entry-field__diagram--build .entry-field__path--practice {
  opacity: 1;
  stroke: color-mix(in srgb, var(--color-sky) 70%, var(--color-mountain));
  stroke-width: 2;
}

.entry-field__diagram--build .entry-field__path--research,
.entry-field__diagram--build .entry-field__path--hybrid {
  opacity: 0.55;
}

.entry-field__diagram--research .entry-field__path--research,
.entry-field__diagram--research .entry-field__path--you,
.entry-field__diagram--research .entry-field__path--practice {
  opacity: 1;
  stroke: color-mix(in srgb, var(--color-aurora) 55%, var(--color-mountain));
  stroke-width: 2;
}

.entry-field__diagram--research .entry-field__path--build,
.entry-field__diagram--research .entry-field__path--hybrid {
  opacity: 0.55;
}

.entry-field__diagram--hybrid .entry-field__path {
  opacity: 0.58;
}

.entry-field__diagram--hybrid .entry-field__path--hybrid,
.entry-field__diagram--hybrid .entry-field__path--you,
.entry-field__diagram--hybrid .entry-field__path--practice,
.entry-field__diagram--hybrid .entry-field__path--build,
.entry-field__diagram--hybrid .entry-field__path--research {
  opacity: 1;
  stroke-width: 1.75;
}

.entry-field__hub {
  fill: color-mix(in srgb, var(--color-frost) 58%, var(--color-snow));
  stroke: color-mix(in srgb, var(--color-sky) 48%, var(--color-line));
  stroke-width: 1.25;
}

.entry-field__hub-dot {
  fill: color-mix(in srgb, var(--color-aurora) 55%, var(--color-sky));
}

.entry-field__node {
  fill: color-mix(in srgb, var(--color-sky) 50%, var(--color-mountain));
}

.entry-field__svg-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  fill: var(--color-text-muted);
}

.entry-field__svg-label--hub {
  fill: var(--color-sky);
  font-size: 9px;
}

.entry-field__choices {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.entry-field__choice {
  display: grid;
  gap: var(--space-2);
  justify-items: start;
  padding: var(--space-5) var(--space-4);
  border: 0;
  border-right: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    opacity 380ms var(--ease-out-soft),
    transform 380ms var(--ease-out-soft);
}

.entry-field__choice:last-child {
  border-right: 0;
}

.entry-field__choice:hover .entry-field__choice-label,
.entry-field__choice:focus-visible .entry-field__choice-label {
  color: var(--color-sky);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.28em;
  text-decoration-color: color-mix(in srgb, var(--color-aurora) 70%, transparent);
}

.entry-field__choice:hover .entry-field__choice-hint,
.entry-field__choice:focus-visible .entry-field__choice-hint,
.entry-field__choice--committed .entry-field__choice-hint {
  opacity: 1;
}

.entry-field__choice:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.entry-field__choice--dimmed {
  opacity: 0.58;
}

.entry-field__choice--focused,
.entry-field__choice--committed {
  opacity: 1;
}

.entry-field__choice--committed .entry-field__choice-label {
  color: var(--color-sky);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 0.28em;
  text-decoration-color: color-mix(in srgb, var(--color-sky) 75%, transparent);
}

.entry-field__choice--committed {
  transform: translateY(-1px);
}

.entry-field__choice-index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  color: var(--color-sky);
}

.entry-field__choice-label {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-text);
}

.entry-field__choice-hint {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  opacity: 0.45;
  transition: opacity 320ms var(--ease-out-soft);
}

@media (max-width: 720px) {
  .entry-field__choices {
    grid-template-columns: 1fr;
  }

  .entry-field__choice {
    border-right: 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
  }

  .entry-field__choice:last-child {
    border-bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .entry-field__path,
  .entry-field__choice,
  .entry-field__choice-hint {
    transition: none;
  }

  .entry-field__choice--committed {
    transform: none;
  }
}
</style>
