<script setup>
import { withBase } from 'vitepress'

const steps = [
  { number: '01', title: '装齐工具链', detail: 'Node · Git · AI CLI', status: '已有实现', link: '/guide/toolchain.html' },
  { number: '02', title: '带上自己的上下文', detail: '从 OpenClaw 加密备份起步', status: '已有子能力', link: '/guide/migration.html' },
  { number: '03', title: '接入 Agent 协作', detail: 'AOC 本地体验与设备接入', status: '规划中', link: '/project/roadmap.html', planned: true }
]
</script>

<template>
  <section class="journey" aria-label="从当前能力到产品愿景">
    <div class="journey-heading"><span>YOUR NEXT WORKSPACE</span><span>v0.1.0</span></div>
    <a v-for="step in steps" :key="step.number" :href="withBase(step.link)" class="journey-step">
      <span class="journey-number">{{ step.number }}</span>
      <span class="journey-copy"><strong>{{ step.title }}</strong><span>{{ step.detail }}</span></span>
      <span class="journey-status" :class="{ planned: step.planned }">{{ step.status }}</span>
    </a>
    <p class="journey-note">从一台陌生机器，回到熟悉的工作状态。</p>
  </section>
</template>
