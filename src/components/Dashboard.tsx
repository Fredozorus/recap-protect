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
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f1e8'
      }}>
        <div style={{ fontSize: '20px', color: '#3a5a7e' }}>Chargement...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      {/* Navbar */}
      <nav style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #ebe7de',
        padding: '16px 32px'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            <span style={{ color: '#3a5a7e' }}>Recap</span>
            <span style={{ color: '#c98550' }}>Protec</span>
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#3a5a7e' }}>
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
              <p style={{ fontSize: '12px', color: '#666666' }}>{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              style={{ 
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#3a5a7e', 
                border: '1px solid #3a5a7e',
                borderRadius: '8px',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
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
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px' }}>
        
        {/* Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#3a5a7e', marginBottom: '8px' }}>
            Bonjour {user.user_metadata?.first_name} ! 👋
          </h2>
          <p style={{ color: '#666666' }}>
            Voici un résumé de votre activité en Protection Civile
          </p>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            border: '1px solid #ebe7de'
          }}>
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
                <Clock size={24} style={{ color: '#3a5a7e' }} />
              </div>
              <TrendingUp size={20} style={{ color: '#c98550' }} />
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3a5a7e', marginBottom: '4px' }}>
              {stats.totalHours}h
            </p>
            <p style={{ fontSize: '14px', color: '#666666' }}>Heures totales</p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            border: '1px solid #ebe7de'
          }}>
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
                <Calendar size={24} style={{ color: '#c98550' }} />
              </div>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3a5a7e', marginBottom: '4px' }}>
              {stats.totalEvents}
            </p>
            <p style={{ fontSize: '14px', color: '#666666' }}>Événements</p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            border: '1px solid #ebe7de'
          }}>
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
                <MapPin size={24} style={{ color: '#3a5a7e' }} />
              </div>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3a5a7e', marginBottom: '4px' }}>
              {stats.upcomingEvents}
            </p>
            <p style={{ fontSize: '14px', color: '#666666' }}>À venir</p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            border: '1px solid #ebe7de'
          }}>
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
                <Award size={24} style={{ color: '#c98550' }} />
              </div>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#3a5a7e', marginBottom: '4px' }}>
              #{stats.rank}
            </p>
            <p style={{ fontSize: '14px', color: '#666666' }}>Classement</p>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Recent Activities */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px',
            border: '1px solid #ebe7de',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #ebe7de' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3a5a7e' }}>
                Activités récentes
              </h3>
            </div>
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                style={{ 
                  padding: '24px',
                  borderBottom: index < recentActivities.length - 1 ? '1px solid #ebe7de' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <h4 style={{ fontWeight: '600', color: '#3a5a7e' }}>
                        {activity.event}
                      </h4>
                      <span style={{ 
                        padding: '2px 8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: 'rgba(201, 133, 80, 0.1)',
                        color: '#c98550',
                        borderRadius: '4px'
                      }}>
                        {activity.type}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666666' }}>
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
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3a5a7e' }}>
                      {activity.hours}h
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px',
            border: '1px solid #ebe7de',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #ebe7de' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#3a5a7e' }}>
                Prochains événements
              </h3>
            </div>
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                style={{ 
                  padding: '24px',
                  borderBottom: index < upcomingEvents.length - 1 ? '1px solid #ebe7de' : 'none'
                }}
              >
                <h4 style={{ fontWeight: '600', color: '#3a5a7e', marginBottom: '8px' }}>
                  {event.event}
                </h4>
                <div style={{ fontSize: '14px', color: '#666666' }}>
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
            <div style={{ padding: '16px', backgroundColor: 'rgba(245, 241, 232, 0.5)', textAlign: 'center' }}>
              <button style={{ 
                fontSize: '14px',
                fontWeight: '500',
                color: '#3a5a7e',
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
        <div style={{
          marginTop: '32px',
          background: 'linear-gradient(to right, #3a5a7e, #4a6a8e)',
          borderRadius: '12px',
          padding: '48px',
          textAlign: 'center'
        }}>
          <Users size={48} style={{ color: '#c98550', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Votre Recap 2025 arrive bientôt !
          </h3>
          <p style={{ color: 'white', opacity: 0.8, marginBottom: '16px' }}>
            Découvrez votre année en Protection Civile dans un format unique et personnalisé
          </p>
          <button style={{ 
            padding: '12px 24px',
            fontWeight: '500',
            backgroundColor: '#c98550',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b97540'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#c98550'
          }}>
            En savoir plus
          </button>
        </div>
      </main>
    </>
  )
}