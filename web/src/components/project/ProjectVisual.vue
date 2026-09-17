<script setup lang="ts">
import { useMotionPreference } from '../../composables/useMotionPreference'
import type { ProjectVisualKind } from '../../types/project'

const props = defineProps<{
  kind: ProjectVisualKind
  featured?: boolean
}>()

const { prefersReducedMotion } = useMotionPreference()
</script>

<template>
  <div
    class="project-visual"
    :class="[
      `project-visual--${props.kind}`,
      { 'project-visual--featured': featured, 'project-visual--static': prefersReducedMotion },
    ]"
    aria-hidden="true"
  >
    <!-- Agent: task → plan → tool → result -->
    <svg
      v-if="kind === 'agent'"
      class="project-visual__svg"
      viewBox="0 0 320 200"
      role="presentation"
      focusable="false"
    >
      <g class="project-visual__flow">
        <rect class="node" x="18" y="78" width="58" height="36" rx="6" />
        <text x="47" y="100" text-anchor="middle">任务</text>
        <path class="edge" d="M82 96 H112" />
        <rect class="node node--accent" x="112" y="78" width="58" height="36" rx="6" />
        <text x="141" y="100" text-anchor="middle">计划</text>
        <path class="edge" d="M176 96 H206" />
        <rect class="node" x="206" y="42" width="58" height="36" rx="6" />
        <text x="235" y="64" text-anchor="middle">工具</text>
        <path class="edge edge--branch" d="M235 78 V96 H264" />
        <rect class="node node--result" x="264" y="78" width="40" height="36" rx="6" />
        <text x="284" y="100" text-anchor="middle">通过</text>
        <path class="edge edge--soft" d="M141 114 V148 H235 V78" />
      </g>
    </svg>

    <!-- Research: model → experiment → metric -->
    <svg
      v-else-if="kind === 'research'"
      class="project-visual__svg"
      viewBox="0 0 320 200"
      role="presentation"
      focusable="false"
    >
      <g class="project-visual__research">
        <circle class="dot" cx="48" cy="92" r="10" />
        <circle class="dot dot--mid" cx="108" cy="58" r="7" />
        <circle class="dot" cx="108" cy="126" r="7" />
        <circle class="dot dot--accent" cx="176" cy="92" r="12" />
        <circle class="dot" cx="236" cy="64" r="6" />
        <circle class="dot" cx="236" cy="120" r="6" />
        <circle class="dot dot--result" cx="286" cy="92" r="9" />
        <path class="edge" d="M58 92 H96" />
        <path class="edge" d="M115 64 L164 86" />
        <path class="edge" d="M115 120 L164 98" />
        <path class="edge" d="M188 92 H224" />
        <path class="edge edge--soft" d="M242 70 L277 88" />
        <path class="edge edge--soft" d="M242 114 L277 96" />
        <polyline
          class="metric"
          points="40,168 90,150 140,156 190,132 240,138 290,118"
        />
      </g>
    </svg>

    <!-- Tool: command / workflow graph -->
    <svg
      v-else
      class="project-visual__svg"
      viewBox="0 0 320 200"
      role="presentation"
      focusable="false"
    >
      <g class="project-visual__tool">
        <rect class="shell" x="24" y="36" width="272" height="128" rx="10" />
        <text class="prompt" x="42" y="68">$ paper pipeline run --from notes</text>
        <path class="edge" d="M48 92 H140" />
        <rect class="chip" x="48" y="104" width="72" height="28" rx="5" />
        <text class="chip-label" x="84" y="122" text-anchor="middle">解析</text>
        <rect class="chip chip--accent" x="136" y="104" width="72" height="28" rx="5" />
        <text class="chip-label" x="172" y="122" text-anchor="middle">校验</text>
        <rect class="chip" x="224" y="104" width="56" height="28" rx="5" />
        <text class="chip-label" x="252" y="122" text-anchor="middle">日志</text>
        <path class="edge" d="M120 118 H136" />
        <path class="edge" d="M208 118 H224" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.project-visual {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-sm);
  background:
    linear-gradient(
      160deg,
      color-mix(in srgb, var(--color-frost) 55%, transparent) 0%,
      color-mix(in srgb, var(--color-morning) 70%, transparent) 55%,
      transparent 100%
    );
  overflow: hidden;
}

.project-visual--featured {
  aspect-ratio: 16 / 11;
  background:
    radial-gradient(
      60% 50% at 78% 28%,
      color-mix(in srgb, var(--color-glacier) 45%, transparent) 0%,
      transparent 70%
    ),
    linear-gradient(
      165deg,
      color-mix(in srgb, var(--color-frost) 65%, transparent) 0%,
      var(--color-morning) 100%
    );
}

.project-visual__svg {
  width: 100%;
  height: 100%;
  display: block;
}

.node,
.shell,
.chip {
  fill: color-mix(in srgb, var(--color-white) 78%, transparent);
  stroke: color-mix(in srgb, var(--color-line) 80%, transparent);
  stroke-width: 1.2;
}

.node--accent,
.chip--accent {
  fill: color-mix(in srgb, var(--color-glacier) 55%, var(--color-white));
  stroke: color-mix(in srgb, var(--color-stream) 55%, var(--color-line));
}

.node--result {
  fill: color-mix(in srgb, var(--color-stream) 35%, var(--color-white));
}

text,
.chip-label,
.prompt {
  fill: var(--color-text-secondary);
  font-size: 9px;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

.prompt {
  font-size: 10px;
  fill: var(--color-mountain);
}

.edge {
  fill: none;
  stroke: color-mix(in srgb, var(--color-mountain) 28%, var(--color-mist));
  stroke-width: 1.3;
  stroke-linecap: round;
}

.edge--soft {
  stroke-opacity: 0.45;
  stroke-dasharray: 3 4;
}

.edge--branch {
  stroke-opacity: 0.7;
}

.dot {
  fill: color-mix(in srgb, var(--color-stream) 55%, var(--color-white));
  stroke: color-mix(in srgb, var(--color-sky) 30%, transparent);
  stroke-width: 1;
}

.dot--mid {
  fill: color-mix(in srgb, var(--color-glacier) 70%, transparent);
}

.dot--accent {
  fill: color-mix(in srgb, var(--color-aurora) 55%, var(--color-white));
}

.dot--result {
  fill: color-mix(in srgb, var(--color-sky) 35%, var(--color-white));
}

.metric {
  fill: none;
  stroke: color-mix(in srgb, var(--color-mountain) 35%, var(--color-stream));
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.shell {
  fill: color-mix(in srgb, var(--color-white) 82%, transparent);
}

.project-visual:not(.project-visual--static) .edge,
.project-visual:not(.project-visual--static) .metric {
  transition: stroke-opacity var(--duration-normal) var(--ease-out-soft);
}

:global(.project-preview:hover) .project-visual:not(.project-visual--static) .edge,
:global(.project-preview:focus-visible) .project-visual:not(.project-visual--static) .edge,
:global(.project-preview:hover) .project-visual:not(.project-visual--static) .metric,
:global(.project-preview:focus-visible) .project-visual:not(.project-visual--static) .metric {
  stroke-opacity: 0.95;
}

@media (max-width: 720px) {
  .project-visual,
  .project-visual--featured {
    aspect-ratio: 16 / 9;
  }
}
</style>
