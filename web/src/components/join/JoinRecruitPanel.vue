<script setup lang="ts">
import { computed } from 'vue'

import { joinRecruit } from '../../content/join-page'

const assetBase = import.meta.env.BASE_URL || '/'

const posterSrc = computed(() => `${assetBase}${joinRecruit.poster.replace(/^\//, '')}`)
const qrSrc = computed(() => `${assetBase}${joinRecruit.qrCode.replace(/^\//, '')}`)
</script>

<template>
  <section class="recruit" aria-labelledby="recruit-title">
    <header class="recruit__header">
      <p class="recruit__eyebrow">{{ joinRecruit.eyebrow }}</p>
      <h2 id="recruit-title" class="recruit__title">{{ joinRecruit.title }}</h2>
      <p class="recruit__lede">{{ joinRecruit.lede }}</p>
    </header>

    <div class="recruit__grid">
      <figure class="recruit__poster">
        <img
          class="recruit__poster-img"
          :src="posterSrc"
          :alt="joinRecruit.posterAlt"
          loading="lazy"
          decoding="async"
        />
        <figcaption class="recruit__caption">{{ joinRecruit.posterCaption }}</figcaption>
      </figure>

      <div class="recruit__contact">
        <p class="recruit__contact-label">{{ joinRecruit.contactLabel }}</p>
        <p class="recruit__group">
          群号
          <span class="recruit__group-num">{{ joinRecruit.qqGroup }}</span>
        </p>
        <p class="recruit__contact-note">{{ joinRecruit.contactNote }}</p>
        <img
          class="recruit__qr"
          :src="qrSrc"
          :alt="joinRecruit.qrAlt"
          width="200"
          height="200"
          loading="lazy"
          decoding="async"
        />
        <p class="recruit__scan">{{ joinRecruit.scanHint }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.recruit {
  display: grid;
  gap: var(--space-7);
  padding-block: var(--space-6);
  border-block: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.recruit__header {
  display: grid;
  gap: var(--space-3);
  max-width: 36rem;
}

.recruit__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.recruit__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.recruit__lede {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.recruit__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(14rem, 0.8fr);
  gap: var(--space-8);
  align-items: start;
}

.recruit__poster {
  margin: 0;
  display: grid;
  gap: var(--space-3);
}

.recruit__poster-img {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  background: var(--color-snow);
}

.recruit__caption {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.recruit__contact {
  display: grid;
  gap: var(--space-3);
  justify-items: start;
  padding: var(--space-5);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  background:
    linear-gradient(
      165deg,
      color-mix(in srgb, var(--color-morning) 55%, var(--color-snow)),
      color-mix(in srgb, var(--color-frost) 30%, var(--color-snow))
    );
}

.recruit__contact-label {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.recruit__group {
  margin: 0;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.recruit__group-num {
  margin-left: var(--space-2);
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text);
  user-select: all;
}

.recruit__contact-note {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

.recruit__qr {
  width: min(200px, 100%);
  height: auto;
  display: block;
  background: var(--color-snow);
  border: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
}

.recruit__scan {
  margin: 0;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
}

@media (max-width: 840px) {
  .recruit__grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .recruit__contact {
    justify-items: center;
    text-align: center;
  }
}
</style>
