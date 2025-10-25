import { colors } from '@/app/styles/colors';
import { CSSProperties } from 'react';

// Styles réutilisables
const styles: Record<string, CSSProperties> = {
  footer: {
    borderTop: `2px solid ${colors.paperDark}`,
    marginTop: '120px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '80px 32px 40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '48px',
    marginBottom: '64px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.warmBlack,
    marginBottom: '20px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  linkItem: {
    marginBottom: '12px',
  },
  link: {
    fontSize: '14px',
    color: colors.neutralGray,
    textDecoration: 'none',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: colors.navy,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 600,
  },
  bottomBar: {
    paddingTop: '32px',
    borderTop: `1px solid ${colors.paperDark}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '16px',
  },
};

// Composant pour les liens du footer
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li style={styles.linkItem}>
    <a href={href} style={styles.link}>
      {children}
    </a>
  </li>
);

// Composant pour une section du footer
const FooterSection = ({ 
  title, 
  links 
}: { 
  title: string; 
  links: { href: string; label: string }[] 
}) => (
  <div>
    <h4 style={styles.sectionTitle}>{title}</h4>
    <ul style={styles.linkList}>
      {links.map((link) => (
        <FooterLink key={link.label} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </ul>
  </div>
);

// Composant pour les icônes sociales
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} style={styles.socialIcon}>
    {children}
  </a>
);

export default function Footer() {
  // Données structurées
  const footerSections = [
    {
      title: 'Produit',
      links: [
        { href: '#', label: 'Fonctionnalités' },
        { href: '#', label: 'Tarifs' },
        { href: '#', label: 'Démo' },
        { href: '#', label: 'Mises à jour' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { href: '#', label: 'À propos' },
        { href: '#', label: 'Équipe' },
        { href: '#', label: 'Carrières' },
        { href: '#', label: 'Contact' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Documentation' },
        { href: '#', label: 'Support' },
        { href: '#', label: 'Statut' },
      ],
    },
  ];

  const legalLinks = [
    { href: '#', label: 'Confidentialité' },
    { href: '#', label: 'Mentions légales' },
    { href: '#', label: 'CGU' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Colonne 1 - Logo & Description */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              <span style={{ color: colors.navy }}>Recap</span>
              <span style={{ color: colors.terracotta }}>Protect</span>
            </h3>
            <p style={{ 
              fontSize: '14px', 
              lineHeight: '1.6',
              color: colors.neutralGray,
              marginBottom: '24px'
            }}>
              Protection et sécurité au service de tous. 
              Coordonnez vos équipes efficacement.
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <SocialIcon href="#">f</SocialIcon>
              <SocialIcon href="#">𝕏</SocialIcon>
              <SocialIcon href="#">in</SocialIcon>
            </div>
          </div>

          {/* Sections dynamiques */}
          {footerSections.map((section) => (
            <FooterSection 
              key={section.title} 
              title={section.title} 
              links={section.links} 
            />
          ))}
        </div>

        {/* Footer Bottom */}
        <div style={styles.bottomBar}>
          <p style={{ fontSize: '14px', color: colors.neutralGray, margin: 0 }}>
            © 2025 Recap Protect. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {legalLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                style={styles.link}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}