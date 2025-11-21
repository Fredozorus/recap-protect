'use client'

import { colors } from '@/app/styles/colors';

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: 'white',
        borderBottom: `1px solid ${colors.paperDark}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="navbar-responsive"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <h1 style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ color: colors.navy }}>Recap</span>
          <span style={{ color: colors.terracotta }}>Protec</span>
        </h1>
      </div>
    </nav>
  );
}