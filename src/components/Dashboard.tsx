'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/supabase/auth'
import type { User } from '@supabase/supabase-js'
import { Calendar, Clock, MapPin, Award, TrendingUp, Users } from 'lucide-react'

export default function Dashboard() {
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

  // Mock data
  const stats = {
    totalHours: 142,
    totalEvents: 28,
    upcomingEvents: 3,
    rank: 5
  }

  const recentActivities = [
    {
      id: 1,
      event: 'Rolex Paris Masters',
      date: '2025-11-02',
      hours: 8,
      location: 'Paris Bercy',
      type: 'Tournoi'
    },
    {
      id: 2,
      event: 'Marathon de Paris',
      date: '2025-10-15',
      hours: 12,
      location: 'Paris',
      type: 'Course'
    },
    {
      id: 3,
      event: 'Concert Stade de France',
      date: '2025-09-28',
      hours: 10,
      location: 'Saint-Denis',
      type: 'Concert'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      event: 'Match PSG',
      date: '2025-11-15',
      time: '14:00',
      location: 'Parc des Princes'
    },
    {
      id: 2,
      event: 'Semi-Marathon',
      date: '2025-11-23',
      time: '08:00',
      location: 'Bois de Vincennes'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f1e8' }}>
        <div className="text-xl" style={{ color: '#3a5a7e' }}>Chargement...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8' }}>
      {/* Navbar */}
      <nav className="bg-white" style={{ borderBottom: '1px solid #ebe7de' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.02em' }}>
            <span style={{ color: '#3a5a7e' }}>Recap</span>
            <span style={{ color: '#c98550' }}>Protec</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium" style={{ color: '#3a5a7e' }}>
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs" style={{ color: '#666666' }}>{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{ 
                color: '#3a5a7e', 
                border: '1px solid #3a5a7e',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3a5a7e'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#3a5a7e'
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#3a5a7e' }}>
            Bonjour {user.user_metadata?.first_name} ! 👋
          </h2>
          <p style={{ color: '#666666' }}>
            Voici un résumé de votre activité en Protection Civile
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Hours */}
          <div 
            className="bg-white rounded-xl p-6 transition-shadow hover:shadow-md" 
            style={{ border: '1px solid #ebe7de' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(58, 90, 126, 0.1)' }}
              >
                <Clock className="w-6 h-6" style={{ color: '#3a5a7e' }} />
              </div>
              <TrendingUp className="w-5 h-5" style={{ color: '#c98550' }} />
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: '#3a5a7e' }}>
              {stats.totalHours}h
            </p>
            <p className="text-sm" style={{ color: '#666666' }}>Heures totales</p>
          </div>

          {/* Total Events */}
          <div 
            className="bg-white rounded-xl p-6 transition-shadow hover:shadow-md"
            style={{ border: '1px solid #ebe7de' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201, 133, 80, 0.1)' }}
              >
                <Calendar className="w-6 h-6" style={{ color: '#c98550' }} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: '#3a5a7e' }}>
              {stats.totalEvents}
            </p>
            <p className="text-sm" style={{ color: '#666666' }}>Événements</p>
          </div>

          {/* Upcoming Events */}
          <div 
            className="bg-white rounded-xl p-6 transition-shadow hover:shadow-md"
            style={{ border: '1px solid #ebe7de' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(58, 90, 126, 0.1)' }}
              >
                <MapPin className="w-6 h-6" style={{ color: '#3a5a7e' }} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: '#3a5a7e' }}>
              {stats.upcomingEvents}
            </p>
            <p className="text-sm" style={{ color: '#666666' }}>À venir</p>
          </div>

          {/* Rank */}
          <div 
            className="bg-white rounded-xl p-6 transition-shadow hover:shadow-md"
            style={{ border: '1px solid #ebe7de' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201, 133, 80, 0.1)' }}
              >
                <Award className="w-6 h-6" style={{ color: '#c98550' }} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: '#3a5a7e' }}>
              #{stats.rank}
            </p>
            <p className="text-sm" style={{ color: '#666666' }}>Classement</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div 
              className="bg-white rounded-xl overflow-hidden"
              style={{ border: '1px solid #ebe7de' }}
            >
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #ebe7de' }}>
                <h3 className="text-xl font-bold" style={{ color: '#3a5a7e' }}>
                  Activités récentes
                </h3>
              </div>
              <div>
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="px-6 py-4 transition-colors hover:bg-opacity-50"
                    style={{ 
                      borderBottom: index < recentActivities.length - 1 ? '1px solid #ebe7de' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(245, 241, 232, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold" style={{ color: '#3a5a7e' }}>
                            {activity.event}
                          </h4>
                          <span 
                            className="px-2 py-0.5 text-xs font-medium rounded"
                            style={{ 
                              backgroundColor: 'rgba(201, 133, 80, 0.1)',
                              color: '#c98550'
                            }}
                          >
                            {activity.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#666666' }}>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(activity.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold" style={{ color: '#3a5a7e' }}>
                          {activity.hours}h
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-1">
            <div 
              className="bg-white rounded-xl overflow-hidden"
              style={{ border: '1px solid #ebe7de' }}
            >
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #ebe7de' }}>
                <h3 className="text-xl font-bold" style={{ color: '#3a5a7e' }}>
                  Prochains événements
                </h3>
              </div>
              <div>
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="px-6 py-4 transition-colors"
                    style={{ 
                      borderBottom: index < upcomingEvents.length - 1 ? '1px solid #ebe7de' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(245, 241, 232, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <h4 className="font-semibold mb-2" style={{ color: '#3a5a7e' }}>
                      {event.event}
                    </h4>
                    <div className="space-y-1 text-sm" style={{ color: '#666666' }}>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4" style={{ backgroundColor: 'rgba(245, 241, 232, 0.5)' }}>
                <button 
                  className="w-full py-2 text-sm font-medium transition-colors"
                  style={{ color: '#3a5a7e' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c98550'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#3a5a7e'
                  }}
                >
                  Voir tous les événements →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="mt-8 rounded-xl p-8 text-center"
          style={{
            background: 'linear-gradient(to right, #3a5a7e, #4a6a8e)'
          }}
        >
          <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#c98550' }} />
          <h3 className="text-2xl font-bold text-white mb-2">
            Votre Recap 2025 arrive bientôt !
          </h3>
          <p className="text-white mb-4" style={{ opacity: 0.8 }}>
            Découvrez votre année en Protection Civile dans un format unique et personnalisé
          </p>
          <button 
            className="px-6 py-3 font-medium rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#c98550',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b97540'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#c98550'
            }}
          >
            En savoir plus
          </button>
        </div>
      </main>
    </div>
  )
}