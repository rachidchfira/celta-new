'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

interface UseAuthReturn {
  user: {
    id: string
    email: string
    name: string
  } | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession()

  const login = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signIn('credentials', {
        email,
        redirect: false
      })

      if (result?.error) {
        return { success: false, error: result.error }
      }

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const logout = async (): Promise<void> => {
    await signOut({ redirect: false })
  }

  return {
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name
    } : null,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout
  }
}
