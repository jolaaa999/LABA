<script setup lang="ts">
import type { IntelligenceMode } from '../../../lib/intelligence/types'

const props = defineProps<{
  modelValue: IntelligenceMode
}>()

const emit = defineEmits<{
  'update:modelValue': [IntelligenceMode]
}>()

const modes: { id: IntelligenceMode; label: string }[] = [
  { id: 'build', label: 'BUILD' },
  { id: 'understand', label: 'UNDERSTAND' },
]

function select(id: IntelligenceMode) {
  if (id === props.modelValue) return
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="mode-switch" role="group" aria-label="Intelligence perspective">
    <button
      v-for="item in modes"
      :key="item.id"
      type="button"
      class="mode-switch__btn"
      :class="{ 'mode-switch__btn--active': modelValue === item.id }"
      :aria-pressed="modelValue === item.id"
      @click="select(item.id)"
    >
      <span class="mode-switch__label">{{ item.label }}</span>
      <span
        class="mode-switch__rule"
        :class="{ 'mode-switch__rule--active': modelValue === item.id }"
        aria-hidden="true"
      />
    </button>
    <span class="mode-switch__divider" aria-hidden="true">/</span>
  </div>
</template>

<style scoped>
.mode-switch {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  gap: 0;
  min-width: min(100%, 17rem);
  padding: 0.15rem 0;
  background: transparent;
  border: 0;
}

.mode-switch__btn {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  appearance: none;
  border: 0;
  background: transparent;
  min-height: 2.75rem;
  padding: 0.55rem 0.85rem 0.7rem;
  font-family: var(--font-sans);
  cursor: pointer;
  text-align: left;
}

.mode-switch__btn:first-child {
  padding-left: 0.15rem;
}

.mode-switch__btn:last-of-type {
  text-align: right;
  padding-right: 0.15rem;
}

.mode-switch__label {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.mode-switch__btn--active .mode-switch__label {
  color: var(--color-mountain);
  font-weight: 600;
}

.mode-switch__rule {
  display: block;
  margin-top: 0.45rem;
  height: 1px;
  width: 100%;
  background: color-mix(in srgb, var(--color-line) 55%, transparent);
  transform: scaleX(0.35);
  transform-origin: left center;
  opacity: 0.35;
  transition:
    transform var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft),
    background var(--duration-fast) var(--ease-out-soft);
}

.mode-switch__btn:last-of-type .mode-switch__rule {
  transform-origin: right center;
}

.mode-switch__rule--active {
  transform: scaleX(1);
  opacity: 1;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-aurora) 75%, transparent),
    color-mix(in srgb, var(--color-sky) 55%, transparent)
  );
  box-shadow: 0 0 12px color-mix(in srgb, var(--color-aurora) 28%, transparent);
}

.mode-switch__divider {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: color-mix(in srgb, var(--color-text-muted) 55%, transparent);
  pointer-events: none;
  user-select: none;
}

.mode-switch__btn:focus-visible {
  outline: none;
}

.mode-switch__btn:focus-visible .mode-switch__label {
  color: var(--color-sky);
}

.mode-switch__btn:focus-visible .mode-switch__rule {
  opacity: 1;
  background: var(--color-aurora);
}

/* Extremely subtle wash behind active label only */
.mode-switch__btn--active::before {
  content: '';
  position: absolute;
  inset: 0.2rem 0.1rem 0.55rem;
  border-radius: 2px;
  background: color-mix(in srgb, var(--color-glacier) 22%, transparent);
  pointer-events: none;
  z-index: -1;
}

@media (max-width: 720px) {
  .mode-switch {
    width: 100%;
    min-width: 0;
  }

  .mode-switch__btn {
    min-height: 2.85rem;
    padding-block: 0.65rem 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mode-switch__rule,
  .mode-switch__label {
    transition: none;
  }
}
</style>
