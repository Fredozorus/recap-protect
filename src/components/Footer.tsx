import { colors } from '@/app/styles/colors';
import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  footer: {
    borderTop: `2px solid ${colors.paperDark}`,
    marginTop: '80px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px 30px',
  },
  grid: {
    display: 'grid',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: colors.neutralGray,
    marginBottom: '20px',
  },
  socialContainer: {
    display: 'flex',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.warmBlack,
    marginBottom: '16px',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  linkItem: {
    marginBottom: '10px',
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
    paddingTop: '24px',
    borderTop: `1px solid ${colors.paperDark}`,
    display: 'flex',
  },
  copyright: {
    fontSize: '13px',
    color: colors.neutralGray,
    margin: 0,
  },
  legalLinks: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li style={styles.linkItem}>
    <a href={href} style={styles.link}>
      {children}
    </a>
  </li>
);

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

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} style={styles.socialIcon}>
    {children}
  </a>
);

export default function Footer() {
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
        <div style={styles.grid} className="footer-grid-responsive">
          {/* Colonne 1 - Logo & Description */}
          <div>
            <h3 style={styles.logo}>
              <span style={{ color: colors.navy }}>Recap</span>
              <span style={{ color: colors.terracotta }}>Protect</span>
            </h3>
            <p style={styles.description}>
              Protection et sécurité au service de tous. 
              Coordonnez vos équipes efficacement.
            </p>
            
            <div style={styles.socialContainer}>
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
        <div style={styles.bottomBar} className="footer-bottom-responsive">
          <p style={styles.copyright}>
            © 2025 Recap Protect. Tous droits réservés.
          </p>
          <div style={styles.legalLinks}>
            {legalLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                style={{ ...styles.link, fontSize: '13px' }}
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