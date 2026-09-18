/** Browser → backend API (OAuth cookie lives on this origin). */
export const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, '')
  || 'http://localhost:8080'

export type ApiError = {
  code: string
  message: string
}

async function parseEnvelope<T>(res: Response): Promise<T> {
  const json = await res.json().catch(() => null) as
    | { data?: T; error?: ApiError }
    | null
  if (!res.ok) {
    const message = json?.error?.message || `Request failed (${res.status})`
    const err = new Error(message) as Error & { code?: string; status?: number }
    err.code = json?.error?.code
    err.status = res.status
    throw err
  }
  return json?.data as T
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  return parseEnvelope<T>(res)
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  return parseEnvelope<T>(res)
}

export function githubLoginUrl(returnTo = window.location.href): string {
  const q = new URLSearchParams({ return_to: returnTo })
  return `${API_BASE}/api/v1/auth/github/login?${q.toString()}`
}
