'use client'

import { colors } from '@/app/styles/colors';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  footer: {
    borderTop: `1px solid ${colors.cardBorder}`,
    marginTop: 'auto',
    backgroundColor: colors.cardBg,
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  description: {
    fontSize: '12px',
    lineHeight: '1.4',
    color: colors.neutralGray,
    marginBottom: '16px',
    maxWidth: '400px',
  },
  socialContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  socialIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: colors.navy,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.cardBg,
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 600,
    transition: 'transform 0.2s',
  },
  bottomBar: {
    paddingTop: '16px',
    borderTop: `1px solid ${colors.cardBorder}`,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  copyright: {
    fontSize: '11px',
    color: colors.neutralGray,
    margin: 0,
  },
  legalLinks: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  link: {
    fontSize: '11px',
    color: colors.neutralGray,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
};


export default function Footer() {
  const legalLinks = [
    { href: '#', label: 'Confidentialité' },
    { href: '#', label: 'Mentions légales' },
    { href: '#', label: 'CGU' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Logo & Description */}
        <h3 style={styles.logo}>
          <span style={{ color: colors.navy }}>Recap</span>
          <span style={{ color: colors.terracotta }}>Protec</span>
        </h3>

        <p style={styles.description}>
          Protection et sécurité au service de tous.
          Coordonnez vos équipes efficacement avec notre solution moderne.
        </p>

        {/* Footer Bottom */}
        <div style={styles.bottomBar}>
          <div style={styles.legalLinks}>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.navy}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.neutralGray}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p style={styles.copyright}>
            © 2025 Recap Protec. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}