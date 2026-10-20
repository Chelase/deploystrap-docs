import { defineConfig } from 'vitepress'

const repo = 'https://github.com/Chelase/deploystrap-docs'
const base = process.env.DOCS_BASE || '/deploystrap/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Deploystrap',
  description: '部署器：带着自己的上下文，在陌生机器上进入 AI 开发状态。',
  base,
  head: [['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }]],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Deploystrap 文档',
    nav: [
      { text: '使用指南', link: '/guide/', activeMatch: '/guide/' },
      { text: 'CLI 参考', link: '/reference/cli', activeMatch: '/reference/' },
      { text: '项目进展', link: '/project/progress', activeMatch: '/project/' },
      { text: '参与开发', link: '/development/docs', activeMatch: '/development/' }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '认识 Deploystrap', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '安装 AI 工具链', link: '/guide/toolchain' },
          { text: '备份与恢复', link: '/guide/migration' },
          { text: '凭证与加密', link: '/guide/security' }
        ]
      },
      { text: '命令参考', items: [{ text: 'CLI 命令与引擎', link: '/reference/cli' }] },
      {
        text: '产品与进展',
        items: [
          { text: '最终愿景', link: '/project/vision' },
          { text: '当前能力与验证', link: '/project/progress' },
          { text: '开发路线', link: '/project/roadmap' }
        ]
      },
      { text: '参与开发', items: [{ text: '维护与发布文档', link: '/development/docs' }] }
    ],
    socialLinks: [{ icon: 'github', link: repo }],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除搜索',
                backButtonTitle: '返回',
                noResultsText: '没有找到相关内容',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    },
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium' } },
    editLink: { pattern: `${repo}/edit/master/docs/:path`, text: '在 GitHub 上编辑此页' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳至正文',
    footer: { message: 'Deploystrap / 部署器 · MIT License', copyright: 'Copyright © Chelsea' }
  }
})
