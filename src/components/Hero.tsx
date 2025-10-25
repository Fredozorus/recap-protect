import { colors } from '@/app/styles/colors';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 32px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: colors.white,
    borderRadius: '999px',
    marginBottom: '32px',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    backgroundColor: colors.terracotta,
    borderRadius: '50%',
  },
  badgeText: {
    fontSize: '14px',
    fontWeight: 600,
    color: colors.navy,
  },
  title: {
    fontSize: '56px',
    fontWeight: 600,
    lineHeight: '1.1',
    color: colors.warmBlack,
    marginBottom: '32px',
    maxWidth: '900px',
  },
  description: {
    fontSize: '20px',
    lineHeight: '1.6',
    color: colors.neutralGray,
    marginBottom: '48px',
    maxWidth: '700px',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '80px',
    flexWrap: 'wrap' as const,
  },
  buttonPrimary: {
    padding: '16px 32px',
    backgroundColor: colors.navy,
    color: colors.white,
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  buttonSecondary: {
    padding: '16px 32px',
    backgroundColor: colors.white,
    color: colors.navy,
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 600,
    border: `2px solid ${colors.navy}`,
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '48px',
    paddingTop: '48px',
    borderTop: `2px solid ${colors.paperDark}`,
    maxWidth: '800px',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: colors.neutralGray,
  },
};

// Composant Stat
const Stat = ({ 
  number, 
  label, 
  color 
}: { 
  number: string; 
  label: string; 
  color: string;
}) => (
  <div>
    <div style={{ ...styles.statNumber, color }}>{number}</div>
    <div style={styles.statLabel}>{label}</div>
  </div>
);

export default function Hero() {
  const stats = [
    { number: '2,400+', label: 'Interventions', color: colors.navy },
    { number: '150+', label: 'Équipes actives', color: colors.terracotta },
    { number: '99.9%', label: 'Disponibilité', color: colors.navy },
  ];

  return (
    <main style={styles.main}>
      {/* Badge */}
      <div style={styles.badge}>
        <span style={styles.badgeDot}></span>
        <span style={styles.badgeText}>Protection Civile Modernisée</span>
      </div>

      {/* Titre Principal */}
      <h2 style={styles.title}>
        Protection et sécurité{' '}
        <span style={{ color: colors.navy }}>au service</span>{' '}
        <span style={{ color: colors.terracotta }}>de tous</span>
      </h2>

      {/* Description */}
      <p style={styles.description}>
        Recap Protect vous accompagne dans la gestion de vos interventions et 
        la coordination de vos équipes pour une protection civile efficace et moderne.
      </p>

      {/* Boutons */}
      <div style={styles.buttonsContainer}>
        <button style={styles.buttonPrimary}>Commencer maintenant</button>
        <button style={styles.buttonSecondary}>En savoir plus</button>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </main>
  );
}