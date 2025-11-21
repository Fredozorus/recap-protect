import { colors } from '@/app/styles/colors'
import AuthForm from './AuthForm'

const Stat = ({
  number,
  label,
  color,
}: {
  number: string
  label: string
  color: string
}) => (
  <div>
    <div className="hero-stat-number" style={{ color }}>{number}</div>
    <div className="hero-stat-label">{label}</div>
  </div>
)

export default function Hero() {
  const stats = [
    { number: '2,400+', label: 'Interventions', color: colors.navy },
    { number: '150+', label: 'Équipes actives', color: colors.terracotta },
    { number: '99.9%', label: 'Disponibilité', color: colors.navy },
  ]

  return (
    <main className="hero-container">
      {/* Colonne gauche - Contenu */}
      <div className="hero-content">
        <h2 className="hero-title">
          Protection et sécurité{' '}
          <span style={{ color: colors.navy }}>au service</span>{' '}
          <span style={{ color: colors.terracotta }}>de tous</span>
        </h2>

        <p className="hero-description">
          Recap Protec vous accompagne dans la gestion de vos antennes et la
          coordination de vos équipes pour une protection civile efficace et
          moderne.
        </p>

        {/* Stats */}
        <div className="hero-stats-container">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Colonne droite - Formulaire Auth */}
      <AuthForm />
    </main>
  )
}