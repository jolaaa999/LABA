<script setup lang="ts">
import type { IntelligenceMode } from '../../../lib/intelligence/types'

defineProps<{
  mode: IntelligenceMode
}>()
</script>

<template>
  <div class="intel-fallback" aria-hidden="true">
    <svg class="intel-fallback__svg" viewBox="0 0 720 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bridge" x1="215" y1="160" x2="505" y2="160" gradientUnits="userSpaceOnUse">
          <stop stop-color="#79BEFF" stop-opacity="0.7" />
          <stop offset="0.5" stop-color="#4EA5F5" stop-opacity="1" />
          <stop offset="1" stop-color="#79BEFF" stop-opacity="0.7" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <g class="intel-fallback__links">
        <path d="M215 160 L110 82 M215 160 L98 236 M215 160 L214 58 M215 160 L330 104 M215 160 L326 240" />
        <path d="M505 160 L610 82 M505 160 L622 236 M505 160 L506 58 M505 160 L390 104 M505 160 L394 240 M505 160 L506 270" />
      </g>
      <path d="M215 160 C305 130 415 130 505 160" stroke="url(#bridge)" stroke-width="2" />
      <path d="M215 160 C305 130 415 130 505 160" stroke="#79BEFF" stroke-opacity="0.3" stroke-width="8" filter="url(#glow)" />
      <g class="intel-fallback__satellites">
        <circle cx="110" cy="82" r="5" /><circle cx="98" cy="236" r="5" /><circle cx="214" cy="58" r="5" /><circle cx="330" cy="104" r="5" /><circle cx="326" cy="240" r="5" />
        <circle cx="610" cy="82" r="5" /><circle cx="622" cy="236" r="5" /><circle cx="506" cy="58" r="5" /><circle cx="390" cy="104" r="5" /><circle cx="394" cy="240" r="5" /><circle cx="506" cy="270" r="5" />
      </g>
      <g class="intel-fallback__cores"><circle cx="215" cy="160" r="13" /><circle cx="505" cy="160" r="13" /></g>
      <g class="intel-fallback__labels">
        <text x="215" y="140" text-anchor="middle">深度学习</text><text x="505" y="140" text-anchor="middle">AI AGENT</text>
        <text x="83" y="70">NLP</text><text x="72" y="258">CNN</text><text x="180" y="42">Transformer</text><text x="325" y="90">扩散模型</text><text x="320" y="262">强化学习</text>
        <text x="590" y="70">Harness</text><text x="592" y="258">上下文</text><text x="480" y="42">工具调用</text><text x="370" y="90">RAG</text><text x="374" y="262">工作流</text><text x="490" y="292">评测</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.intel-fallback { position: absolute; inset: 0; display: grid; place-items: center; background: radial-gradient(ellipse at 30% 50%, color-mix(in srgb, var(--color-glacier) 55%, transparent), transparent 48%), radial-gradient(ellipse at 70% 50%, color-mix(in srgb, var(--color-stream) 32%, transparent), transparent 48%); }
.intel-fallback__svg { width: min(96%, 48rem); height: auto; opacity: 0.95; }
.intel-fallback__links { stroke: #79beff; stroke-opacity: 0.38; stroke-width: 1.2; }
.intel-fallback__satellites { fill: #79beff; opacity: 0.85; }
.intel-fallback__cores { fill: #4ea5f5; stroke: #ddecff; stroke-width: 4; }
.intel-fallback__labels { fill: #6d8496; font-family: Segoe UI, sans-serif; font-size: 11px; letter-spacing: 0.6px; }
.intel-fallback__labels text:nth-child(-n + 2) { fill: #276fae; font-size: 13px; font-weight: 700; }
</style>
