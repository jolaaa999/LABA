<script setup lang="ts">
import type { IntelligenceMode } from '../../../lib/intelligence/types'

defineProps<{
  mode: IntelligenceMode
}>()
</script>

<template>
  <div class="intel-fallback" aria-hidden="true">
    <svg
      v-if="mode === 'build'"
      class="intel-fallback__svg"
      viewBox="0 0 640 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fb-line" x1="40" y1="160" x2="600" y2="160" gradientUnits="userSpaceOnUse">
          <stop stop-color="#79BEFF" stop-opacity="0.15" />
          <stop offset="0.5" stop-color="#4EA5F5" stop-opacity="0.55" />
          <stop offset="1" stop-color="#276FAE" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M72 168 C140 120, 200 120, 250 150 C300 180, 340 200, 390 176 C440 152, 500 120, 568 148"
        stroke="url(#fb-line)"
        stroke-width="1.5"
      />
      <g fill="#4EA5F5">
        <circle cx="72" cy="168" r="7" opacity="0.85" />
        <circle cx="210" cy="138" r="8" opacity="0.9" />
        <circle cx="330" cy="186" r="9" opacity="1" />
        <circle cx="450" cy="158" r="7.5" opacity="0.85" />
        <circle cx="568" cy="148" r="7" opacity="0.8" />
      </g>
      <g fill="#8A9AAB" font-family="Segoe UI, sans-serif" font-size="11" letter-spacing="1.5">
        <text x="52" y="198">任务</text>
        <text x="188" y="118">计划</text>
        <text x="308" y="216">工具</text>
        <text x="422" y="138">观察</text>
        <text x="538" y="128">结果</text>
      </g>
    </svg>

    <svg
      v-else
      class="intel-fallback__svg"
      viewBox="0 0 640 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M180 90 C260 70, 340 70, 420 100"
        stroke="#79BEFF"
        stroke-opacity="0.35"
        stroke-width="1.25"
      />
      <path
        d="M200 210 C280 150, 360 150, 450 190"
        stroke="#4EA5F5"
        stroke-opacity="0.4"
        stroke-width="1.25"
      />
      <path
        d="M250 120 C300 160, 320 200, 360 240"
        stroke="#276FAE"
        stroke-opacity="0.28"
        stroke-width="1.25"
      />
      <g fill="#4EA5F5">
        <circle cx="180" cy="90" r="7" />
        <circle cx="320" cy="78" r="9" />
        <circle cx="280" cy="160" r="10" />
        <circle cx="430" cy="150" r="8" />
        <circle cx="360" cy="240" r="7" />
      </g>
      <g fill="#8A9AAB" font-family="Segoe UI, sans-serif" font-size="11" letter-spacing="1.5">
        <text x="146" y="72">Token</text>
        <text x="286" y="58">Attention</text>
        <text x="228" y="188">表示</text>
        <text x="404" y="136">实验</text>
        <text x="336" y="268">输出</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.intel-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background:
    radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--color-glacier) 55%, transparent), transparent 55%),
    radial-gradient(ellipse at 70% 60%, color-mix(in srgb, var(--color-stream) 28%, transparent), transparent 50%);
}

.intel-fallback__svg {
  width: min(92%, 40rem);
  height: auto;
  opacity: 0.95;
}
</style>
