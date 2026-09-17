<script setup lang="ts">
import type { Activity } from '../../types/activity'
import ActivityEntry from './ActivityEntry.vue'

defineProps<{
  activities: Activity[]
  activeId: string
}>()
</script>

<template>
  <div class="activity-stream">
    <ActivityEntry
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      :active="activity.id === activeId"
    />
  </div>
</template>

<style scoped>
.activity-stream {
  display: grid;
  min-width: 0;
}
</style>
