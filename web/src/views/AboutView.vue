<script setup lang="ts">
import AboutClosing from '../components/about/AboutClosing.vue'
import AboutDualLens from '../components/about/AboutDualLens.vue'
import AboutHero from '../components/about/AboutHero.vue'
import CommunityBoundaries from '../components/about/CommunityBoundaries.vue'
import CommunityPriorities from '../components/about/CommunityPriorities.vue'
import CommunitySystem from '../components/about/CommunitySystem.vue'
import SharedPractice from '../components/about/SharedPractice.vue'
import PageContainer from '../components/layout/PageContainer.vue'
</script>

<template>
  <main class="about-page">
    <PageContainer class="about-page__inner">
      <AboutHero />
      <AboutDualLens />
      <SharedPractice />
      <CommunityPriorities />
      <CommunitySystem />
      <CommunityBoundaries />
      <AboutClosing />
    </PageContainer>
  </main>
</template>

<style scoped>
.about-page {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-glacier) 55%, var(--color-morning)) 42%,
    color-mix(in srgb, var(--color-frost) 22%, var(--color-snow)) 100%
  );
}

.about-page__inner {
  display: grid;
  gap: var(--space-14, var(--space-12));
}

@media (max-width: 720px) {
  .about-page {
    padding-block: var(--space-10) var(--space-16);
  }

  .about-page__inner {
    gap: var(--space-10);
  }
}
</style>
