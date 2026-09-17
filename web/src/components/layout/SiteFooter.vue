<script setup lang="ts">
import { RouterLink } from 'vue-router'

import PageContainer from './PageContainer.vue'
import { footerNav, SITE_NAME, SITE_TAGLINE } from '../../content/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <PageContainer class="site-footer__inner">
      <div class="site-footer__brand">
        <p class="site-footer__name">{{ SITE_NAME }}</p>
        <p class="site-footer__tagline">{{ SITE_TAGLINE }}</p>
      </div>

      <nav class="site-footer__nav" aria-label="Footer">
        <RouterLink
          v-for="item in footerNav"
          :key="item.to"
          class="site-footer__link"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <p class="site-footer__copy">© {{ year }} {{ SITE_NAME }}</p>
    </PageContainer>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 0;
  border-top: var(--border-subtle);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-frost) 40%, var(--color-snow)) 0%,
    var(--color-frost) 100%
  );
}

.site-footer__inner {
  display: grid;
  gap: var(--space-8);
  padding-block: var(--space-12) var(--space-10);
}

.site-footer__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.site-footer__tagline {
  max-width: 28rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-5);
}

.site-footer__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.site-footer__link:hover {
  color: var(--color-mountain);
}

.site-footer__copy {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
</style>
