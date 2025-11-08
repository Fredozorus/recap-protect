import { colors } from '@/app/styles/colors'
import { CSSProperties } from 'react'
import AuthForm from './AuthForm'

const styles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
    padding: '80px 20px',
  },
  title: {
    fontWeight: 600,
    lineHeight: '1.1',
    color: colors.warmBlack,
    fontSize: '48px',
    marginBottom: '24px',
  },
  description: {
    lineHeight: '1.6',
    color: colors.neutralGray,
    fontSize: '18px',
    marginBottom: '48px',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
    marginTop: '60px',
    paddingTop: '40px',
    borderTop: `2px solid ${colors.paperDark}`,
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  statLabel: {
    color: colors.neutralGray,
    fontSize: '14px',
  },
}

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
    <div style={{ ...styles.statNumber, color }}>{number}</div>
    <div style={styles.statLabel}>{label}</div>
  </div>
)

export default function Hero() {
  const stats = [
    { number: '2,400+', label: 'Interventions', color: colors.navy },
    { number: '150+', label: 'Équipes actives', color: colors.terracotta },
    { number: '99.9%', label: 'Disponibilité', color: colors.navy },
  ]

  return (
    <main style={styles.container}>
      {/* Colonne gauche - Contenu */}
      <div>
        <h2 style={styles.title}>
          Protection et sécurité{' '}
          <span style={{ color: colors.navy }}>au service</span>{' '}
          <span style={{ color: colors.terracotta }}>de tous</span>
        </h2>

        <p style={styles.description}>
          Recap Protec vous accompagne dans la gestion de vos antennes et la
          coordination de vos équipes pour une protection civile efficace et
          moderne.
        </p>

        {/* Stats */}
        <div style={styles.statsContainer}>
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