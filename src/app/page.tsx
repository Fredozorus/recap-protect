import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#f5f1e8', // colors.paper 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}