import { colors } from '@/app/styles/colors';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: colors.white,
    borderRadius: '999px',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    backgroundColor: colors.terracotta,
    borderRadius: '50%',
  },
  badgeText: {
    fontWeight: 600,
    color: colors.navy,
  },
  title: {
    fontWeight: 600,
    lineHeight: '1.1',
    color: colors.warmBlack,
    maxWidth: '900px',
  },
  description: {
    lineHeight: '1.6',
    color: colors.neutralGray,
    maxWidth: '700px',
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
      <div style={styles.badge} className="badge-responsive">
        <span style={styles.badgeDot}></span>
        <span style={styles.badgeText} className="badge-text-responsive">
          Protection Civile Modernisée
        </span>
      </div>

      <h2 style={styles.title} className="title-responsive">
        Protection et sécurité{' '}
        <span style={{ color: colors.navy }}>au service</span>{' '}
        <span style={{ color: colors.terracotta }}>de tous</span>
      </h2>

      <p style={styles.description} className="description-responsive">
        Recap Protect vous accompagne dans la gestion de vos interventions et 
        la coordination de vos équipes pour une protection civile efficace et moderne.
      </p>

      <div style={styles.buttonsContainer} className="buttons-responsive">
        <button style={styles.buttonPrimary} className="button-responsive">
          Commencer maintenant
        </button>
        <button style={styles.buttonSecondary} className="button-responsive">
          En savoir plus
        </button>
      </div>

      <div style={styles.statsContainer} className="stats-responsive">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </main>
  );
}