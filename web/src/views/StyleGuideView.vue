<script setup lang="ts">
import AuroraButton from '../components/ui/AuroraButton.vue'
import GlassCard from '../components/ui/GlassCard.vue'
import GlowBorder from '../components/ui/GlowBorder.vue'
import GradientText from '../components/ui/GradientText.vue'
import MotionSection from '../components/ui/MotionSection.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
import { useMotionPreference } from '../composables/useMotionPreference'

const { prefersReducedMotion, motionEnabled } = useMotionPreference()

const colorTokens = [
  { name: 'Snow', token: '--color-snow', value: '#FCFDFE' },
  { name: 'Morning', token: '--color-morning', value: '#F7FAFC' },
  { name: 'Ivory', token: '--color-ivory', value: '#FAFAF7' },
  { name: 'Frost', token: '--color-frost', value: '#EDF4F8' },
  { name: 'Glacier', token: '--color-glacier', value: '#DDEEFF' },
  { name: 'Stream', token: '--color-stream', value: '#B8DEFF' },
  { name: 'Aurora', token: '--color-aurora', value: '#79BEFF' },
  { name: 'Sky', token: '--color-sky', value: '#4EA5F5' },
  { name: 'Mountain', token: '--color-mountain', value: '#276FAE' },
] as const

const textTokens = [
  { name: 'Text', token: '--color-text', value: '#10243A' },
  { name: 'Secondary', token: '--color-text-secondary', value: '#64778A' },
  { name: 'Muted', token: '--color-text-muted', value: '#8A9AAB' },
] as const
</script>

<template>
  <main class="style-guide">
    <header class="style-guide__intro">
      <p class="style-guide__label">Aurora Design System</p>
      <h1 class="style-guide__title">
        Snow × Aurora ×
        <GradientText>Sky</GradientText>
        × Glass
      </h1>
      <p class="style-guide__lead">
        Phase 2 视觉契约预览页。后续 Homepage / Projects / Community 必须消费这些
        Token 与 Primitive，而不是另起一套视觉规则。
      </p>
    </header>

    <section class="style-guide__section" aria-labelledby="colors-heading">
      <SectionHeader
        id="colors-heading"
        eyebrow="Tokens"
        title="Colors"
        description="约 85% 白/中性，约 10% 浅蓝氛围，约 5% Aurora / Sky 强调。"
      />
      <div class="swatch-grid">
        <div
          v-for="item in colorTokens"
          :key="item.token"
          class="swatch"
        >
          <div
            class="swatch__chip"
            :style="{ background: `var(${item.token})` }"
          />
          <div class="swatch__meta">
            <strong>{{ item.name }}</strong>
            <code>{{ item.token }}</code>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="swatch-grid swatch-grid--text">
        <div
          v-for="item in textTokens"
          :key="item.token"
          class="swatch swatch--text"
        >
          <div
            class="swatch__chip swatch__chip--text"
            :style="{ background: `var(${item.token})` }"
          />
          <div class="swatch__meta">
            <strong>{{ item.name }}</strong>
            <code>{{ item.token }}</code>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="type-heading">
      <SectionHeader
        id="type-heading"
        eyebrow="Tokens"
        title="Typography"
        description="Display 有品牌感，Body 保证中文可读。避免超大标题滥用于正文。"
      />
      <GlassCard variant="plain" class="type-panel">
        <p class="type-display">Display — We Learn AI. We Build with AI.</p>
        <h3 class="type-heading">Heading — Deep Learning × Research</h3>
        <p class="type-body">
          Body — 这是一个属于大学生的 AI × Deep Learning 技术社区。正文需要清晰、安静、可持续阅读。
        </p>
        <p class="type-secondary">Secondary — 元信息、说明文字与辅助描述。</p>
        <p class="type-mono">Mono — Agent · RAG · MCP · Transformer</p>
      </GlassCard>
    </section>

    <section class="style-guide__section" aria-labelledby="buttons-heading">
      <SectionHeader
        id="buttons-heading"
        eyebrow="Primitives"
        title="Buttons"
        description="Primary / Secondary / Ghost，以及 sm / md / lg。Hover 克制，Press scale(0.98)。"
      />
      <div class="stack">
        <div class="row">
          <AuroraButton variant="primary">Primary</AuroraButton>
          <AuroraButton variant="secondary">Secondary</AuroraButton>
          <AuroraButton variant="ghost">Ghost</AuroraButton>
          <AuroraButton variant="primary" disabled>Disabled</AuroraButton>
        </div>
        <div class="row">
          <AuroraButton size="sm">Small</AuroraButton>
          <AuroraButton size="md">Medium</AuroraButton>
          <AuroraButton size="lg">Large</AuroraButton>
        </div>
        <p class="hint">使用 Tab 键检查 focus-visible 边框。</p>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="surfaces-heading">
      <SectionHeader
        id="surfaces-heading"
        eyebrow="Primitives"
        title="Surfaces"
        description="Plain / Elevated / Glass / Glow。Glass 仅限少量表面，不作满屏毛玻璃。"
      />
      <div class="surface-grid">
        <GlassCard variant="plain">
          <h3 class="card-title">Plain</h3>
          <p class="card-copy">默认轻量容器，适合大多数内容块。</p>
        </GlassCard>
        <GlassCard variant="elevated">
          <h3 class="card-title">Elevated</h3>
          <p class="card-copy">冷色低对比阴影，避免浓重黑色 drop shadow。</p>
        </GlassCard>
        <GlassCard variant="glass">
          <h3 class="card-title">Glass</h3>
          <p class="card-copy">有限模糊与半透明，留给 Navbar / Modal / Featured。</p>
        </GlassCard>
        <GlowBorder focusable>
          <div class="glow-inner">
            <h3 class="card-title">Glow Border</h3>
            <p class="card-copy">默认几乎不可感知；Hover / Focus 时出现柔和 Aurora 边光。</p>
          </div>
        </GlowBorder>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="headers-heading">
      <SectionHeader
        id="headers-heading"
        eyebrow="Primitives"
        title="Section Header"
        description="统一 Eyebrow / Title / Description，避免每页重写标题样式。"
      />
      <div class="stack">
        <GlassCard variant="plain">
          <SectionHeader
            eyebrow="Explore"
            title="AI × Productivity"
            description="用 AI 创造东西：Coding、Agent、RAG、MCP 与工作流。"
            align="left"
          />
        </GlassCard>
        <GlassCard variant="plain">
          <SectionHeader
            eyebrow="Community"
            title="People who build here"
            description="重点不是人数，而是这个社区里有什么样的人。"
            align="center"
          />
        </GlassCard>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="motion-heading">
      <SectionHeader
        id="motion-heading"
        eyebrow="Motion"
        title="Motion Section"
        description="进入视口一次后保持最终态；Reduced Motion 下直接显示。"
      />
      <p class="hint">
        当前系统：
        <strong>{{ prefersReducedMotion ? 'prefers-reduced-motion: reduce' : 'motion enabled' }}</strong>
        · motionEnabled = {{ motionEnabled }}
      </p>
      <div class="motion-demo">
        <MotionSection offset-y="16">
          <GlassCard variant="elevated">
            <h3 class="card-title">Reveal A</h3>
            <p class="card-copy">滚动进入时以 opacity + translateY 显现。</p>
          </GlassCard>
        </MotionSection>
        <MotionSection offset-y="20">
          <GlassCard variant="elevated">
            <h3 class="card-title">Reveal B</h3>
            <p class="card-copy">不循环；滚出后不会反复消失。</p>
          </GlassCard>
        </MotionSection>
      </div>
    </section>

    <footer class="style-guide__footer">
      <p>开发预览路由 · 非正式站点导航 · Phase 2</p>
    </footer>
  </main>
</template>

<style scoped>
.style-guide {
  max-width: 68rem;
  margin: 0 auto;
  padding: var(--space-12) var(--space-6) var(--space-20);
  display: grid;
  gap: var(--space-16);
}

.style-guide__intro {
  display: grid;
  gap: var(--space-4);
  max-width: 44rem;
}

.style-guide__label {
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.style-guide__title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-5xl));
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.style-guide__lead {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.style-guide__section {
  display: grid;
  gap: var(--space-8);
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  gap: var(--space-4);
}

.swatch-grid--text {
  margin-top: var(--space-2);
}

.swatch {
  display: grid;
  gap: var(--space-3);
}

.swatch__chip {
  height: 4.5rem;
  border-radius: var(--radius-md);
  border: var(--border-subtle);
  box-shadow: var(--shadow-sm);
}

.swatch__chip--text {
  height: 2.75rem;
}

.swatch__meta {
  display: grid;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.swatch__meta strong {
  color: var(--color-text);
  font-weight: 600;
}

.swatch__meta code {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-mountain);
}

.type-panel {
  display: grid;
  gap: var(--space-4);
}

.type-display {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
}

.type-heading {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
}

.type-body {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.type-secondary {
  color: var(--color-text-secondary);
}

.type-mono {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-mountain);
}

.stack {
  display: grid;
  gap: var(--space-6);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}

.hint {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.surface-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.card-copy {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.glow-inner {
  padding: var(--space-6);
}

.motion-demo {
  display: grid;
  gap: var(--space-16);
  padding-block: var(--space-8);
}

.style-guide__footer {
  padding-top: var(--space-8);
  border-top: var(--border-subtle);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (max-width: 720px) {
  .style-guide {
    padding-inline: var(--space-4);
    gap: var(--space-12);
  }

  .surface-grid {
    grid-template-columns: 1fr;
  }
}
</style>
