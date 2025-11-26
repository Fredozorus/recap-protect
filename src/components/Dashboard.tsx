'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/supabase/auth'
import type { User } from '@supabase/supabase-js'
import { Calendar, Clock, MapPin, Award, TrendingUp, Users } from 'lucide-react'
import { colors } from '@/app/styles/colors'
import ThemeToggle from './ThemeToggle'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/')
          return
        }
        setUser(currentUser)
      } catch (error) {
        router.push('/')
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.paper
      }}>
        <div style={{ fontSize: '20px', color: colors.navy }}>Chargement...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      {/* Navbar */}
      <nav className="dashboard-navbar" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
        <div className="dashboard-navbar-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              <span style={{ color: colors.navy }}>Recap</span>
              <span style={{ color: colors.terracotta }}>Protec</span>
            </h1>
          </div>

          <div className="dashboard-user-section">
            <ThemeToggle />
            <div className="dashboard-user-info">
              <p style={{ fontSize: '14px', fontWeight: '500', color: colors.foreground }}>
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p style={{ fontSize: '12px', color: colors.neutralGray }}>{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: colors.navy,
                border: `1px solid ${colors.navy}`,
                borderRadius: '8px',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.navy
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = colors.navy
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: colors.navy, marginBottom: '8px' }}>
            Bonjour {user.user_metadata?.first_name} ! 👋
          </h2>
          <p style={{ color: colors.neutralGray }}>
            Voici un résumé de votre activité en Protection Civile
          </p>
        </div>

        {/* Stats */}
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(58, 90, 126, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={24} style={{ color: colors.navy }} />
              </div>
              <TrendingUp size={20} style={{ color: colors.terracotta }} />
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: colors.navy, marginBottom: '4px' }}>
              {stats.totalHours}h
            </p>
            <p style={{ fontSize: '14px', color: colors.neutralGray }}>Heures totales</p>
          </div>

          <div className="dashboard-stat-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(201, 133, 80, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={24} style={{ color: colors.terracotta }} />
              </div>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: colors.navy, marginBottom: '4px' }}>
              {stats.totalEvents}
            </p>
            <p style={{ fontSize: '14px', color: colors.neutralGray }}>Événements</p>
          </div>

          <div className="dashboard-stat-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(58, 90, 126, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} style={{ color: colors.navy }} />
              </div>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: colors.navy, marginBottom: '4px' }}>
              {stats.upcomingEvents}
            </p>
            <p style={{ fontSize: '14px', color: colors.neutralGray }}>À venir</p>
          </div>

          <div className="dashboard-stat-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(201, 133, 80, 0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={24} style={{ color: colors.terracotta }} />
              </div>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: colors.navy, marginBottom: '4px' }}>
              #{stats.rank}
            </p>
            <p style={{ fontSize: '14px', color: colors.neutralGray }}>Classement</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="dashboard-content-grid">

          {/* Recent Activities */}
          <div className="dashboard-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${colors.paperDark}` }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.navy }}>
                Activités récentes
              </h3>
            </div>
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                style={{
                  padding: '24px',
                  borderBottom: index < recentActivities.length - 1 ? `1px solid ${colors.paperDark}` : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: '600', color: colors.navy }}>
                        {activity.event}
                      </h4>
                      <span style={{
                        padding: '2px 8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: 'rgba(201, 133, 80, 0.1)',
                        color: colors.terracotta,
                        borderRadius: '4px'
                      }}>
                        {activity.type}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: colors.neutralGray }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={16} />
                        {new Date(activity.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={16} />
                        {activity.location}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: colors.navy }}>
                      {activity.hours}h
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="dashboard-card" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${colors.paperDark}` }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: colors.navy }}>
                Prochains événements
              </h3>
            </div>
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                style={{
                  padding: '24px',
                  borderBottom: index < upcomingEvents.length - 1 ? `1px solid ${colors.paperDark}` : 'none'
                }}
              >
                <h4 style={{ fontWeight: '600', color: colors.navy, marginBottom: '8px' }}>
                  {event.event}
                </h4>
                <div style={{ fontSize: '14px', color: colors.neutralGray }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Clock size={16} />
                    {event.time}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} />
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ padding: '16px', backgroundColor: colors.background, borderTop: `1px solid ${colors.cardBorder}`, textAlign: 'center' }}>
              <button style={{
                fontSize: '14px',
                fontWeight: '500',
                color: colors.navy,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}>
                Voir tous les événements →
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="dashboard-cta">
          <Users size={48} style={{ color: colors.terracotta, margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Votre Recap 2025 arrive bientôt !
          </h3>
          <p style={{ color: 'white', opacity: 0.8, marginBottom: '16px' }}>
            Découvrez votre année en Protection Civile dans un format unique et personnalisé
          </p>
          <button style={{
            padding: '12px 24px',
            fontWeight: '500',
            backgroundColor: colors.terracotta,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.terracottaDark
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.terracotta
            }}>
            En savoir plus
          </button>
        </div>
      </main>
    </div>
  )
}