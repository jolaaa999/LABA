import { computed, ref } from 'vue'

import { apiGet, apiPost, githubLoginUrl } from '../lib/api'

export type GithubUser = {
  login: string
  name?: string
  avatarUrl: string
  htmlUrl: string
}

export type DiscussionAuthor = {
  login: string
  avatarUrl: string
}

export type DiscussionItem = {
  id: string
  number: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
  url: string
  author: DiscussionAuthor | null
  categoryName: string
  categorySlug: string
  commentCount: number
  answered: boolean
}

export type DiscussionComment = {
  id: string
  body: string
  createdAt: string
  author: DiscussionAuthor | null
  isAnswer: boolean
}

export type DiscussionDetail = DiscussionItem & {
  comments: DiscussionComment[]
}

const user = ref<GithubUser | null>(null)
const authenticated = ref(false)
const authReady = ref(false)
const authError = ref<string | null>(null)

export function useGithubSession() {
  const displayName = computed(() => user.value?.name || user.value?.login || '')

  async function refreshMe() {
    authError.value = null
    try {
      const data = await apiGet<{ authenticated: boolean; user: GithubUser | null }>('/api/v1/auth/me')
      authenticated.value = Boolean(data.authenticated)
      user.value = data.user
    } catch (err) {
      authenticated.value = false
      user.value = null
      authError.value = err instanceof Error ? err.message : '无法读取登录状态'
    } finally {
      authReady.value = true
    }
  }

  function login() {
    window.location.href = githubLoginUrl(window.location.href)
  }

  async function logout() {
    await apiPost('/api/v1/auth/logout')
    authenticated.value = false
    user.value = null
  }

  return {
    user,
    authenticated,
    authReady,
    authError,
    displayName,
    refreshMe,
    login,
    logout,
  }
}
