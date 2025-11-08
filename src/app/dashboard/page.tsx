'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase/auth'
import type { User } from '@supabase/supabase-js'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/login')
          return
        }
        setUser(currentUser)
      } catch (error) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-navy text-xl">Chargement...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <Dashboard user={user} />
}