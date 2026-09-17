import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'

import { SITE_DOCUMENT_TITLE } from '../content/site'
import { getProjectBySlug } from '../content/projects'
import AboutView from '../views/AboutView.vue'
import ExploreAiView from '../views/ExploreAiView.vue'
import ExploreDeepLearningView from '../views/ExploreDeepLearningView.vue'
import ExploreView from '../views/ExploreView.vue'
import EventsView from '../views/EventsView.vue'
import CommunityView from '../views/CommunityView.vue'
import HomeView from '../views/HomeView.vue'
import JoinView from '../views/JoinView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import StyleGuideView from '../views/StyleGuideView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    /** When false, hide Navbar / Footer (dev pages). */
    shell?: boolean
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' },
    },
    {
      path: '/style-guide',
      name: 'style-guide',
      component: StyleGuideView,
      meta: { title: '样式指南', shell: false },
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
      meta: {
        title: '探索',
        description: '一张学习地图，两条路径：Build with AI 与 Understand AI。',
      },
    },
    {
      path: '/explore/ai',
      name: 'explore-ai',
      component: ExploreAiView,
      meta: {
        title: 'AI 工程',
        description: '学习如何用 AI 构建——从基础到交付的一条线性路径。',
      },
    },
    {
      path: '/explore/deep-learning',
      name: 'explore-deep-learning',
      component: ExploreDeepLearningView,
      meta: {
        title: 'Deep Learning 与科研',
        description: '理解模型的一份现场指南——提问、复现、实验、证据。',
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: '作品档案',
        description: '社团内部构建的 AI 工程、深度学习科研与工具。',
      },
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectDetailView,
      beforeEnter(to) {
        const slug = String(to.params.slug ?? '')
        if (!getProjectBySlug(slug)) {
          return {
            name: 'not-found',
            params: { pathMatch: to.path.substring(1).split('/') },
          }
        }
      },
      meta: {
        title: '作品',
        description: '技术作品案例研究。',
      },
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
      meta: {
        title: '活动',
        description: '社区节奏——工作坊、论文精读、动手构建与科研分享。',
      },
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
      meta: {
        title: '社区',
        description: '人与实践——大家如何贡献、协作，并留下可检视的实践成果。',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: '关于',
        description: '这个社区为何存在——把 Build with AI 与 Understand AI 放进同一套实践。',
      },
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView,
      meta: {
        title: '加入',
        description: '入口——选择构建、科研或混合，然后开始实践。',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '页面不存在' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, left: 0 }
  },
})

function resolveDocumentTitle(route: RouteLocationNormalized): string {
  // Home tab title is the brand line itself.
  if (route.name === 'home') {
    return SITE_DOCUMENT_TITLE
  }
  const pageTitle = typeof route.meta.title === 'string' ? route.meta.title : undefined
  return pageTitle ? `${pageTitle} — ${SITE_DOCUMENT_TITLE}` : SITE_DOCUMENT_TITLE
}

router.afterEach((to) => {
  if (to.name === 'project-detail') {
    const project = getProjectBySlug(String(to.params.slug ?? ''))
    document.title = project
      ? `${project.title} — ${SITE_DOCUMENT_TITLE}`
      : `作品 — ${SITE_DOCUMENT_TITLE}`
    return
  }
  document.title = resolveDocumentTitle(to)
})
