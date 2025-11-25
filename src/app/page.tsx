import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
      }}
    >
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
};