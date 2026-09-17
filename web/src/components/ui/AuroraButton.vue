<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button
    class="aurora-button"
    :class="[`aurora-button--${variant}`, `aurora-button--${size}`]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.aurora-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: var(--tracking-normal);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out-soft),
    border-color var(--duration-fast) var(--ease-out-soft),
    color var(--duration-fast) var(--ease-out-soft),
    box-shadow var(--duration-fast) var(--ease-out-soft),
    transform var(--duration-fast) var(--ease-out-soft);
}

.aurora-button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.aurora-button:focus-visible {
  outline: var(--border-focus);
  outline-offset: 3px;
}

.aurora-button:not(:disabled):active {
  transform: scale(0.98);
}

.aurora-button--sm {
  min-height: 2rem;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
}

.aurora-button--md {
  min-height: 2.5rem;
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-base);
}

.aurora-button--lg {
  min-height: 3rem;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-lg);
}

.aurora-button--primary {
  color: var(--color-text-inverse);
  background-color: color-mix(in srgb, var(--color-sky) 88%, var(--color-mountain));
  border: 1px solid color-mix(in srgb, var(--color-sky) 70%, var(--color-stream));
  box-shadow: var(--shadow-sm);
}

.aurora-button--primary:not(:disabled):hover {
  background-color: color-mix(in srgb, var(--color-mountain) 82%, var(--color-sky));
  border-color: color-mix(in srgb, var(--color-aurora) 45%, var(--color-mountain));
  box-shadow:
    var(--shadow-sm),
    0 0 0 1px color-mix(in srgb, var(--color-aurora) 28%, transparent),
    0 8px 18px rgb(39 111 174 / 0.12);
  transform: translateY(-1px);
}

.aurora-button--secondary {
  color: var(--color-text);
  background-color: var(--color-snow);
  border: var(--border-default);
  box-shadow: var(--shadow-sm);
}

.aurora-button--secondary:not(:disabled):hover {
  background-color: var(--color-frost);
  border-color: var(--color-stream);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.aurora-button--ghost {
  color: var(--color-mountain);
  background-color: transparent;
  border: 1px solid transparent;
}

.aurora-button--ghost:not(:disabled):hover {
  color: var(--color-sky);
  background-color: color-mix(in srgb, var(--color-frost) 72%, transparent);
  border-color: var(--color-mist);
}
</style>
