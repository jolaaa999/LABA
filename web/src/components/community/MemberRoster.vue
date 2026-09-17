<script setup lang="ts">
import {
  formatMemberDirection,
  formatMemberSkills,
} from '../../content/members'
import type { Member } from '../../types/member'

defineProps<{
  members: Member[]
  selectedId: string
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <div class="member-roster" role="listbox" aria-label="Community members">
    <p class="member-roster__label">Roster</p>
    <button
      v-for="member in members"
      :key="member.id"
      type="button"
      class="member-roster__row"
      :class="{ 'member-roster__row--active': member.id === selectedId }"
      role="option"
      :aria-selected="member.id === selectedId"
      :aria-pressed="member.id === selectedId"
      @click="emit('select', member.id)"
    >
      <span class="member-roster__index">{{ member.index }}</span>
      <span class="member-roster__body">
        <span class="member-roster__name">{{ member.name }}</span>
        <span class="member-roster__direction">
          {{ formatMemberDirection(member.direction) }}
        </span>
        <span v-if="member.skills.length" class="member-roster__skills">
          {{ formatMemberSkills(member.skills.slice(0, 3)) }}
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.member-roster {
  display: grid;
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.member-roster__label {
  margin: 0 0 var(--space-3);
  padding-top: var(--space-2);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.member-roster__row {
  appearance: none;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
  background: transparent;
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
  width: 100%;
  padding: var(--space-4) 0;
  text-align: left;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out-soft);
}

.member-roster__row:hover .member-roster__name,
.member-roster__row:focus-visible .member-roster__name {
  color: var(--color-mountain);
}

.member-roster__row:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--color-aurora) 45%, transparent);
}

.member-roster__row--active .member-roster__index {
  color: var(--color-sky);
}

.member-roster__row--active .member-roster__name {
  color: var(--color-text);
  font-weight: 600;
}

.member-roster__row--active .member-roster__direction {
  color: var(--color-mountain);
}

.member-roster__index {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  padding-top: 0.15rem;
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.member-roster__body {
  display: grid;
  gap: 0.2rem;
  min-width: 0;
}

.member-roster__name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.member-roster__direction {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.member-roster__skills {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

@media (max-width: 720px) {
  .member-roster__row {
    padding-block: var(--space-3);
  }
}
</style>
