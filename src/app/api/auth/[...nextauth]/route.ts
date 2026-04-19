import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabaseAdmin } from '@/lib/supabase'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('Email is required')
        }

        try {
          // If Supabase is configured, use it
          if (supabaseAdmin) {
            const { data: enrollment, error } = await supabaseAdmin
              .from('enrollments')
              .select(`
                id,
                email,
                name,
                enrolled_at,
                payment_status
              `)
              .eq('email', credentials.email.toLowerCase())
              .eq('payment_status', 'completed')
              .single()

            if (error || !enrollment) {
              throw new Error('No active enrollment found. Please contact support if you have already enrolled.')
            }

            await supabaseAdmin
              .from('enrollments')
              .update({ last_accessed_at: new Date().toISOString() })
              .eq('id', enrollment.id)

            return {
              id: enrollment.id,
              email: enrollment.email,
              name: enrollment.name || enrollment.email.split('@')[0]
            }
          }

          // Fallback to Prisma/SQLite if Supabase is not configured
          const enrollment = await db.courseEnrollment.findFirst({
            where: {
              email: credentials.email.toLowerCase(),
              paymentStatus: 'completed'
            }
          })

          if (!enrollment) {
            throw new Error('No active enrollment found. Please contact support if you have already enrolled.')
          }

          // Update last accessed
          await db.courseEnrollment.update({
            where: { id: enrollment.id },
            data: { lastAccessedAt: new Date() }
          })

          return {
            id: enrollment.id,
            email: enrollment.email,
            name: enrollment.name || enrollment.email.split('@')[0]
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  pages: {
    signIn: '/course',
    error: '/course'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
