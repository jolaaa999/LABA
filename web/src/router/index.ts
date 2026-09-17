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
      meta: { title: 'Home' },
    },
    {
      path: '/style-guide',
      name: 'style-guide',
      component: StyleGuideView,
      meta: { title: 'Style Guide', shell: false },
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
      meta: {
        title: 'Explore',
        description:
          'A learning map with two paths: Build with AI, and Understand AI.',
      },
    },
    {
      path: '/explore/ai',
      name: 'explore-ai',
      component: ExploreAiView,
      meta: {
        title: 'AI Engineering',
        description:
          'Learn to build with AI — a linear path from foundations to shipping.',
      },
    },
    {
      path: '/explore/deep-learning',
      name: 'explore-deep-learning',
      component: ExploreDeepLearningView,
      meta: {
        title: 'Deep Learning & Research',
        description:
          'A field guide for understanding models — question, reproduce, experiment, evidence.',
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: 'Work Archive',
        description:
          'AI engineering, deep learning research, and tools built inside the community.',
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
        title: 'Project',
        description: 'Technical project case study.',
      },
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
      meta: {
        title: 'Events',
        description:
          'Community Pulse — workshops, paper reading, building, and research sharing.',
      },
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
      meta: {
        title: 'Community',
        description:
          'People & Work — how people contribute, collaborate, and leave inspectable practice.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About',
        description:
          'Why this community exists — Build with AI and Understand AI in the same practice.',
      },
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView,
      meta: {
        title: 'Join',
        description:
          'Entry Field — choose Build, Research, or Hybrid, and begin the practice.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Not Found' },
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
      : `Project — ${SITE_DOCUMENT_TITLE}`
    return
  }
  document.title = resolveDocumentTitle(to)
})
