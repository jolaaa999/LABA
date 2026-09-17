<script setup lang="ts">
import MotionSection from '../ui/MotionSection.vue'
import PageContainer from '../layout/PageContainer.vue'
import DirectionPanel from './DirectionPanel.vue'

const directions = [
  {
    index: '01',
    label: 'AI × Productivity',
    title: 'Build with AI.',
    statement:
      '创造人们可用的东西——由现代 AI 工具塑造的系统、工作流与产品。',
    audience: '职业 · 实习 · 毕业',
    keywords: ['AI Coding', 'Agent', 'RAG', 'MCP', 'Workflow'] as const,
    ctaLabel: '探索方向',
    to: '/explore/ai',
    tone: 'build' as const,
  },
  {
    index: '02',
    label: 'Deep Learning × Research',
    title: 'Understand AI deeply.',
    statement:
      '仔细研读、复现结果、设计实验——并理解模型为何有效。',
    audience: '科研 · 推荐 · 竞赛',
    keywords: ['PyTorch', 'Transformer', 'CV', 'NLP', 'Reproduction'] as const,
    ctaLabel: '探索方向',
    to: '/explore/deep-learning',
    tone: 'research' as const,
  },
] as const
</script>

<template>
  <MotionSection as="section" class="direction-section" offset-y="16">
    <PageContainer class="direction-section__inner">
      <header class="direction-section__header">
        <div class="direction-section__heading">
          <p class="direction-section__eyebrow">方向</p>
          <h2 class="direction-section__title">我们探索什么</h2>
        </div>
        <p class="direction-section__lede">
          一个社区，两种技术气质——用 AI 构建，并深入理解它。
        </p>
      </header>

      <div class="direction-canvas" role="group" aria-label="社区方向">
        <DirectionPanel v-bind="directions[0]" />
        <div class="direction-canvas__divider" aria-hidden="true" />
        <DirectionPanel v-bind="directions[1]" />
      </div>
    </PageContainer>
  </MotionSection>
</template>

<style scoped>
.direction-section {
  padding-block: var(--space-8) var(--space-16);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-morning) 35%, transparent) 0%,
    var(--color-snow) 18%,
    var(--color-snow) 100%
  );
}

.direction-section__inner {
  display: grid;
  gap: var(--space-8);
}

.direction-section__header {
  display: grid;
  /* 右列给足宽度，保证 lede 单行不断句 */
  grid-template-columns: minmax(0, 0.95fr) minmax(30rem, 1.05fr);
  gap: var(--space-6) var(--space-10);
  align-items: end;
}

.direction-section__eyebrow {
  margin-bottom: var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.direction-section__title {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 3.2vw, var(--text-4xl));
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.direction-section__lede {
  max-width: 30rem;
  justify-self: end;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.direction-canvas {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) 1px minmax(0, 0.98fr);
  align-items: stretch;
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-white) 70%, var(--color-morning));
  overflow: hidden;
}

.direction-canvas__divider {
  width: 1px;
  background: color-mix(in srgb, var(--color-line) 80%, transparent);
  align-self: stretch;
}

@media (max-width: 960px) {
  .direction-section {
    padding-block: var(--space-8) var(--space-12);
  }

  .direction-section__inner {
    gap: var(--space-6);
  }

  .direction-section__header {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    align-items: start;
  }

  .direction-section__lede {
    justify-self: start;
    max-width: none;
    font-size: var(--text-base);
  }

  .direction-canvas {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1px auto;
  }

  .direction-canvas__divider {
    width: auto;
    height: 1px;
  }
}
</style>
