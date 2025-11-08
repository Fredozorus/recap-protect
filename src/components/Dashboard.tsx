'use client'

import { User } from '@supabase/supabase-js'
import { signOut } from '@/lib/supabase/auth'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, Award, TrendingUp, Users } from 'lucide-react'

interface DashboardProps {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Mock data - à remplacer par de vraies données Supabase plus tard
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

  return (
    <div className="min-h-screen bg-paper">
      {/* Navbar */}
      <nav className="bg-white border-b border-paper-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-navy">Recap</span>
            <span className="text-terracotta">Protec</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-navy">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p className="text-xs text-neutral-gray">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy hover:text-white transition-all duration-200"
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
          <h2 className="text-3xl font-bold text-navy mb-2">
            Bonjour {user.user_metadata?.first_name} ! 👋
          </h2>
          <p className="text-neutral-gray">
            Voici un résumé de votre activité en Protection Civile
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Hours */}
          <div className="bg-white rounded-xl p-6 border border-paper-dark hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-navy" />
              </div>
              <TrendingUp className="w-5 h-5 text-terracotta" />
            </div>
            <p className="text-3xl font-bold text-navy mb-1">{stats.totalHours}h</p>
            <p className="text-sm text-neutral-gray">Heures totales</p>
          </div>

          {/* Total Events */}
          <div className="bg-white rounded-xl p-6 border border-paper-dark hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-terracotta" />
              </div>
            </div>
            <p className="text-3xl font-bold text-navy mb-1">{stats.totalEvents}</p>
            <p className="text-sm text-neutral-gray">Événements</p>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 border border-paper-dark hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-navy" />
              </div>
            </div>
            <p className="text-3xl font-bold text-navy mb-1">{stats.upcomingEvents}</p>
            <p className="text-sm text-neutral-gray">À venir</p>
          </div>

          {/* Rank */}
          <div className="bg-white rounded-xl p-6 border border-paper-dark hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-terracotta" />
              </div>
            </div>
            <p className="text-3xl font-bold text-navy mb-1">#{stats.rank}</p>
            <p className="text-sm text-neutral-gray">Classement</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-paper-dark overflow-hidden">
              <div className="px-6 py-4 border-b border-paper-dark">
                <h3 className="text-xl font-bold text-navy">Activités récentes</h3>
              </div>
              <div className="divide-y divide-paper-dark">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="px-6 py-4 hover:bg-paper/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-navy">{activity.event}</h4>
                          <span className="px-2 py-0.5 bg-terracotta/10 text-terracotta text-xs font-medium rounded">
                            {activity.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-gray">
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
                        <p className="text-2xl font-bold text-navy">{activity.hours}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-paper-dark overflow-hidden">
              <div className="px-6 py-4 border-b border-paper-dark">
                <h3 className="text-xl font-bold text-navy">Prochains événements</h3>
              </div>
              <div className="divide-y divide-paper-dark">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="px-6 py-4 hover:bg-paper/50 transition-colors">
                    <h4 className="font-semibold text-navy mb-2">{event.event}</h4>
                    <div className="space-y-1 text-sm text-neutral-gray">
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
              <div className="px-6 py-4 bg-paper/50">
                <button className="w-full py-2 text-sm font-medium text-navy hover:text-terracotta transition-colors">
                  Voir tous les événements →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-navy to-navy-light rounded-xl p-8 text-center">
          <Users className="w-12 h-12 text-terracotta mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Votre Recap 2025 arrive bientôt !
          </h3>
          <p className="text-white/80 mb-4">
            Découvrez votre année en Protection Civile dans un format unique et personnalisé
          </p>
          <button className="px-6 py-3 bg-terracotta text-white font-medium rounded-lg hover:bg-terracotta-dark transition-colors">
            En savoir plus
          </button>
        </div>
      </main>
    </div>
  )
}