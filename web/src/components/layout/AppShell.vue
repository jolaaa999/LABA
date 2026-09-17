<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import SiteFooter from './SiteFooter.vue'
import SiteNavbar from './SiteNavbar.vue'
import { useMotionPreference } from '../../composables/useMotionPreference'

const route = useRoute()
const { prefersReducedMotion } = useMotionPreference()

const showShell = computed(() => route.meta.shell !== false)
const transitionName = computed(() =>
  prefersReducedMotion.value ? '' : 'page',
)
</script>

<template>
  <div class="app-shell" :class="{ 'app-shell--bare': !showShell }">
    <SiteNavbar v-if="showShell" />

    <div class="app-shell__main">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition :name="transitionName" mode="out-in">
          <component
            :is="Component"
            :key="currentRoute.fullPath"
          />
        </Transition>
      </RouterView>
    </div>

    <SiteFooter v-if="showShell" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-shell__main {
  flex: 1 0 auto;
  width: 100%;
}

.app-shell--bare .app-shell__main {
  min-height: 100vh;
}
</style>
