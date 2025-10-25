import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    
     <div style={{ backgroundColor: 'colors.paper', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}