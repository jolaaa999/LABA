<script setup lang="ts">
import { provide, ref } from 'vue'

import CommunityRhythm from '../components/events/CommunityRhythm.vue'
import EventFormatStream from '../components/events/EventFormatStream.vue'
import EventsClosing from '../components/events/EventsClosing.vue'
import EventsHero from '../components/events/EventsHero.vue'
import EventsScheduleState from '../components/events/EventsScheduleState.vue'
import SessionFlow from '../components/events/SessionFlow.vue'
import PageContainer from '../components/layout/PageContainer.vue'

const activeFormatId = ref<string | null>(null)

function setActiveFormat(id: string | null) {
  activeFormatId.value = id
}

provide('eventsActiveFormatId', activeFormatId)
provide('setEventsActiveFormat', setActiveFormat)
</script>

<template>
  <main class="events-page">
    <PageContainer class="events-page__inner">
      <EventsHero
        :active-format-id="activeFormatId"
        @pulse-focus="setActiveFormat"
      />
      <CommunityRhythm
        :active-format-id="activeFormatId"
        @focus="setActiveFormat"
      />
      <EventFormatStream
        :active-format-id="activeFormatId"
        @focus="setActiveFormat"
      />
      <SessionFlow />
      <EventsScheduleState />
      <EventsClosing />
    </PageContainer>
  </main>
</template>

<style scoped>
.events-page {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 72%, var(--color-ivory)) 42%,
    color-mix(in srgb, var(--color-frost) 30%, var(--color-snow)) 100%
  );
}

.events-page__inner {
  display: grid;
  gap: var(--space-14, var(--space-12));
}

@media (max-width: 720px) {
  .events-page {
    padding-block: var(--space-10) var(--space-16);
  }

  .events-page__inner {
    gap: var(--space-10);
  }
}
</style>
