import { colors } from '@/app/styles/colors';

export default function Navbar() {
  return (
    <nav 
      className="navbar-responsive"
      style={{ borderBottom: `1px solid ${colors.paperDark}` }}
    >
      <h1>
        <span style={{ color: colors.navy }}>Recap</span>
        <span style={{ color: colors.terracotta }}>Protec</span>
      </h1>
    </nav>
  );
}