<script setup lang="ts">
import CommunitySection from '../components/brand/CommunitySection.vue'
import DirectionSection from '../components/brand/DirectionSection.vue'
import HeroSection from '../components/brand/HeroSection.vue'
import IntelligenceSection from '../components/brand/IntelligenceSection.vue'
import JoinSection from '../components/brand/JoinSection.vue'
import SelectedWorksSection from '../components/brand/SelectedWorksSection.vue'
import StorySection from '../components/brand/StorySection.vue'
import WhatHappensSection from '../components/brand/WhatHappensSection.vue'
</script>

<template>
  <main class="home-page">
    <HeroSection />
    <DirectionSection />
    <SelectedWorksSection />
    <IntelligenceSection />
    <WhatHappensSection />
    <CommunitySection />
    <StorySection />
    <JoinSection />
  </main>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}
</style>
