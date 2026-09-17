<script setup lang="ts">
import { onKeyStroke, useScrollLock, useWindowScroll } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import AuroraButton from '../ui/AuroraButton.vue'
import PageContainer from './PageContainer.vue'
import { primaryNav, SITE_NAME, type NavItem } from '../../content/site'
import { useMotionPreference } from '../../composables/useMotionPreference'

const route = useRoute()
const { y } = useWindowScroll()
const { prefersReducedMotion } = useMotionPreference()

const isScrolled = computed(() => y.value > 16)
const isMobileOpen = ref(false)
const isJoinCurrent = computed(() => route.path === '/join')
const bodyLock = useScrollLock(document.body)

watch(isMobileOpen, (open) => {
  bodyLock.value = open
})

watch(
  () => route.fullPath,
  () => {
    isMobileOpen.value = false
  },
)

onKeyStroke('Escape', () => {
  if (isMobileOpen.value) {
    isMobileOpen.value = false
  }
})

function isActive(item: NavItem): boolean {
  if (item.exact) {
    return route.path === item.to
  }
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

function toggleMobile(): void {
  isMobileOpen.value = !isMobileOpen.value
}

function closeMobile(): void {
  isMobileOpen.value = false
}
</script>

<template>
  <header
    class="site-navbar"
    :class="{
      'site-navbar--scrolled': isScrolled,
      'site-navbar--instant': prefersReducedMotion,
      'site-navbar--menu-open': isMobileOpen,
    }"
  >
    <PageContainer class="site-navbar__inner">
      <RouterLink class="site-navbar__brand" to="/" @click="closeMobile">
        <span class="site-navbar__mark" aria-hidden="true" />
        <span class="site-navbar__name">{{ SITE_NAME }}</span>
      </RouterLink>

      <nav class="site-navbar__desktop" aria-label="主导航">
        <RouterLink
          v-for="item in primaryNav"
          :key="item.to"
          class="site-navbar__link"
          :class="{ 'site-navbar__link--active': isActive(item) }"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="site-navbar__actions">
        <RouterLink
          v-slot="{ navigate }"
          class="site-navbar__join"
          :class="{ 'site-navbar__join--current': isJoinCurrent }"
          to="/join"
          custom
        >
          <AuroraButton
            variant="primary"
            size="sm"
            :aria-current="isJoinCurrent ? 'page' : undefined"
            @click="navigate"
          >
            加入
          </AuroraButton>
        </RouterLink>

        <button
          class="site-navbar__menu-btn"
          type="button"
          :aria-expanded="isMobileOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="isMobileOpen ? '关闭菜单' : '打开菜单'"
          @click="toggleMobile"
        >
          <span class="site-navbar__menu-icon" aria-hidden="true" />
        </button>
      </div>
    </PageContainer>

    <div
      id="mobile-nav-panel"
      class="site-navbar__mobile"
      :class="{ 'site-navbar__mobile--open': isMobileOpen }"
      :aria-hidden="!isMobileOpen"
    >
      <PageContainer>
        <nav class="site-navbar__mobile-nav" aria-label="移动端导航">
          <RouterLink
            v-for="item in primaryNav"
            :key="item.to"
            class="site-navbar__mobile-link"
            :class="{ 'site-navbar__mobile-link--active': isActive(item) }"
            :to="item.to"
            :tabindex="isMobileOpen ? 0 : -1"
            @click="closeMobile"
          >
            {{ item.label }}
          </RouterLink>
          <RouterLink
            v-slot="{ navigate }"
            class="site-navbar__mobile-join"
            :class="{ 'site-navbar__mobile-join--current': isJoinCurrent }"
            to="/join"
            custom
          >
            <AuroraButton
              variant="primary"
              size="md"
              :aria-current="isJoinCurrent ? 'page' : undefined"
              @click="
                () => {
                  closeMobile()
                  navigate()
                }
              "
            >
              加入
            </AuroraButton>
          </RouterLink>
        </nav>
      </PageContainer>
    </div>
  </header>
</template>

<style scoped>
.site-navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  height: var(--nav-height);
  border-bottom: 1px solid transparent;
  background: color-mix(in srgb, var(--color-snow) 42%, transparent);
  transition:
    background-color var(--duration-normal) var(--ease-out-soft),
    border-color var(--duration-normal) var(--ease-out-soft),
    box-shadow var(--duration-normal) var(--ease-out-soft),
    height var(--duration-normal) var(--ease-out-soft),
    backdrop-filter var(--duration-normal) var(--ease-out-soft);
}

.site-navbar--scrolled {
  height: var(--nav-height-scrolled);
  background: var(--glass-bg);
  border-bottom-color: color-mix(in srgb, var(--color-line) 70%, transparent);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.site-navbar--instant,
.site-navbar--instant .site-navbar__mobile {
  transition: none;
}

.site-navbar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  height: 100%;
}

.site-navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text);
  flex-shrink: 0;
}

.site-navbar__mark {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: var(--radius-pill);
  background: linear-gradient(
    135deg,
    var(--color-aurora),
    var(--color-sky) 55%,
    var(--color-mountain)
  );
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-glacier) 70%, transparent);
}

.site-navbar__name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
}

.site-navbar__desktop {
  display: none;
  align-items: center;
  gap: var(--space-1);
  margin-inline: auto;
}

.site-navbar__link {
  position: relative;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition:
    color var(--duration-fast) var(--ease-out-soft),
    background-color var(--duration-fast) var(--ease-out-soft);
}

.site-navbar__link:hover {
  color: var(--color-text);
  background-color: color-mix(in srgb, var(--color-frost) 70%, transparent);
}

.site-navbar__link--active {
  color: var(--color-mountain);
}

.site-navbar__link--active::after {
  content: '';
  position: absolute;
  left: var(--space-3);
  right: var(--space-3);
  bottom: 0.2rem;
  height: 2px;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-aurora) 80%, var(--color-sky));
}

.site-navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}

.site-navbar__join {
  display: none;
}

.site-navbar__join--current :deep(.aurora-button) {
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--color-aurora) 70%, var(--color-white));
}

.site-navbar__mobile-join--current :deep(.aurora-button) {
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--color-aurora) 70%, var(--color-white));
}

.site-navbar__menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-sm);
  border: var(--border-subtle);
  background: color-mix(in srgb, var(--color-white) 70%, transparent);
  color: var(--color-text);
}

.site-navbar__menu-btn:focus-visible {
  outline: var(--border-focus);
  outline-offset: 3px;
}

.site-navbar__menu-icon,
.site-navbar__menu-icon::before,
.site-navbar__menu-icon::after {
  display: block;
  width: 1rem;
  height: 1.5px;
  border-radius: var(--radius-pill);
  background: currentColor;
  transition:
    transform var(--duration-fast) var(--ease-out-soft),
    opacity var(--duration-fast) var(--ease-out-soft);
}

.site-navbar__menu-icon {
  position: relative;
}

.site-navbar__menu-icon::before,
.site-navbar__menu-icon::after {
  content: '';
  position: absolute;
  left: 0;
}

.site-navbar__menu-icon::before {
  top: -5px;
}

.site-navbar__menu-icon::after {
  top: 5px;
}

.site-navbar--menu-open .site-navbar__menu-icon {
  background: transparent;
}

.site-navbar--menu-open .site-navbar__menu-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.site-navbar--menu-open .site-navbar__menu-icon::after {
  top: 0;
  transform: rotate(-45deg);
}

.site-navbar__mobile {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  padding-block: var(--space-4) var(--space-6);
  background: var(--glass-bg);
  border-bottom: var(--border-subtle);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  opacity: 0;
  transform: translateY(-0.5rem);
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity var(--duration-normal) var(--ease-out-soft),
    transform var(--duration-normal) var(--ease-out-soft),
    visibility var(--duration-normal) var(--ease-out-soft);
}

.site-navbar__mobile--open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
}

.site-navbar__mobile-nav {
  display: grid;
  gap: var(--space-1);
}

.site-navbar__mobile-link {
  padding: var(--space-3) var(--space-2);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
}

.site-navbar__mobile-link--active {
  color: var(--color-mountain);
  background: color-mix(in srgb, var(--color-frost) 80%, transparent);
}

.site-navbar__mobile-join {
  margin-top: var(--space-3);
}

.site-navbar__mobile-join :deep(.aurora-button) {
  width: 100%;
}

@media (min-width: 900px) {
  .site-navbar__desktop {
    display: flex;
  }

  .site-navbar__join {
    display: inline-flex;
  }

  .site-navbar__menu-btn,
  .site-navbar__mobile {
    display: none;
  }

  .site-navbar__actions {
    margin-left: 0;
  }
}
</style>
