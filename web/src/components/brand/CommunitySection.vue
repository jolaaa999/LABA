<script setup lang="ts">
import { computed, ref } from 'vue'

import MotionSection from '../ui/MotionSection.vue'
import PageContainer from '../layout/PageContainer.vue'
import MemberRoster from '../community/MemberRoster.vue'
import MemberSpotlight from '../community/MemberSpotlight.vue'
import {
  getDefaultSpotlightMember,
  getHomepageMembers,
} from '../../content/members'
import { useMotionPreference } from '../../composables/useMotionPreference'
import type { Member } from '../../types/member'

const members = getHomepageMembers()
const selectedId = ref(getDefaultSpotlightMember(members)?.id ?? members[0]?.id ?? '')
const { prefersReducedMotion } = useMotionPreference()

const selectedMember = computed<Member | undefined>(() =>
  members.find((member) => member.id === selectedId.value),
)

function selectMember(id: string) {
  selectedId.value = id
}
</script>

<template>
  <MotionSection
    as="section"
    class="community"
    offset-y="16"
    aria-labelledby="community-title"
  >
    <PageContainer class="community__inner">
      <header class="community__header">
          <div class="community__heading">
            <p class="community__eyebrow">社区</p>
            <h2 id="community-title" class="community__title">
              作品背后的人。
            </h2>
          </div>
          <p class="community__lede">
            工程、科研与混合实践——塑造文化的人，而不只是做页面的人。
          </p>
      </header>

      <div class="community__stage">
        <div class="community__spotlight" aria-live="polite">
          <MemberSpotlight
            v-if="selectedMember"
            :member="selectedMember"
            :reduced-motion="prefersReducedMotion"
          />
        </div>

        <aside class="community__roster">
          <MemberRoster
            :members="members"
            :selected-id="selectedId"
            @select="selectMember"
          />
        </aside>
      </div>
    </PageContainer>
  </MotionSection>
</template>

<style scoped>
.community {
  padding-block: var(--space-20) var(--space-24);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-snow) 92%, var(--color-ivory)) 0%,
    color-mix(in srgb, var(--color-morning) 55%, var(--color-glacier)) 48%,
    color-mix(in srgb, var(--color-snow) 88%, var(--color-morning)) 100%
  );
}

.community__inner {
  display: grid;
  gap: var(--space-10);
}

.community__header {
  display: grid;
  /* 右列给足宽度，保证 lede 单行不断句 */
  grid-template-columns: minmax(0, 0.95fr) minmax(30rem, 1.05fr);
  gap: var(--space-6) var(--space-10);
  align-items: end;
}

.community__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.community__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 3.2vw, var(--text-4xl));
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.community__lede {
  margin: 0;
  max-width: 30rem;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.community__stage {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(14rem, 0.7fr);
  gap: var(--space-10) var(--space-12);
  align-items: start;
  padding-top: var(--space-6);
}

.community__spotlight {
  min-width: 0;
  padding-top: var(--space-4);
}

.community__roster {
  min-width: 0;
  padding-top: var(--space-2);
}

@media (max-width: 1024px) {
  .community__stage {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .community__header {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

@media (max-width: 720px) {
  .community {
    padding-block: var(--space-12) var(--space-16);
  }

  .community__inner {
    gap: var(--space-8);
  }
}
</style>
