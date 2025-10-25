import { colors } from '@/app/styles/colors';

export default function Navbar() {
  return (
    <nav style={{ 
      padding: '24px 32px', 
      borderBottom: `1px solid ${colors.paperDark}` 
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: 600 }}>
        <span style={{ color: colors.navy }}>Recap</span>
        <span style={{ color: colors.terracotta }}>Protect</span>
      </h1>
    </nav>
  );
}