'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/supabase/auth'
import type { User } from '@supabase/supabase-js'

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

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-[#2C3E50] text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-[#2C3E50]">Recap</span>
            <span className="text-[#E67E50]">Protec</span>
          </h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-[#2C3E50] border border-[#2C3E50] rounded-lg hover:bg-[#2C3E50] hover:text-white transition"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
            Bienvenue sur votre tableau de bord !
          </h2>
          <p className="text-gray-600 mb-4">
            Bonjour {user?.user_metadata?.first_name} {user?.user_metadata?.last_name} !
          </p>
          <p className="text-gray-500 text-sm">
            Email: {user?.email}
          </p>
          <div className="mt-8 p-6 bg-[#F5F1E8] rounded-xl">
            <p className="text-gray-600">
              🚧 Votre récap annuel sera bientôt disponible ici...
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}