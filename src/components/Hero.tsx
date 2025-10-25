import { colors } from '@/app/styles/colors';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontWeight: 600,
    lineHeight: '1.1',
    color: colors.warmBlack,
    maxWidth: '900px',
    marginBottom: '32px', // AJOUTÉ ICI
  },
  description: {
    lineHeight: '1.6',
    color: colors.neutralGray,
    maxWidth: '700px',
    marginBottom: '48px', // AJOUTÉ ICI
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
  },
  buttonPrimary: {
    backgroundColor: colors.navy,
    color: colors.white,
    borderRadius: '12px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    color: colors.navy,
    borderRadius: '12px',
    fontWeight: 600,
    border: `2px solid ${colors.navy}`,
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  statsContainer: {
    display: 'grid',
    borderTop: `2px solid ${colors.paperDark}`,
    maxWidth: '800px',
  },
  statNumber: {
    fontWeight: 600,
    marginBottom: '8px',
  },
  statLabel: {
    color: colors.neutralGray,
  },
};

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
    <main style={styles.main} className="hero-responsive">
      {/* Titre Principal */}
      <h2 style={styles.title} className="title-responsive">
        Protection et sécurité{' '}
        <span style={{ color: colors.navy }}>au service</span>{' '}
        <span style={{ color: colors.terracotta }}>de tous</span>
      </h2>

      {/* Description */}
      <p style={styles.description} className="description-responsive">
        Recap Protect vous accompagne dans la gestion de vos antennes et 
        la coordination de vos équipes pour une protection civile efficace et moderne.
      </p>

      {/* Boutons */}
      <div style={styles.buttonsContainer} className="buttons-responsive">
        <button style={styles.buttonPrimary} className="button-responsive">
          Commencer maintenant
        </button>
        <button style={styles.buttonSecondary} className="button-responsive">
          En savoir plus
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer} className="stats-responsive">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </main>
  );
}