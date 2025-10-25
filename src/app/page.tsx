export default function Home() {
  return (
    <div style={{ backgroundColor: '#F5F1E8', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ padding: '24px 32px', borderBottom: '1px solid #EBE7DE' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600 }}>
          <span style={{ color: '#3A5A7E' }}>Recap</span>
          <span style={{ color: '#C98550' }}>Protect</span>
        </h1>
      </nav>

      {/* Hero Section */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '80px 32px' 
      }}>
        {/* Badge */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '12px 20px',
          backgroundColor: 'white',
          borderRadius: '999px',
          marginBottom: '32px'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#C98550',
            borderRadius: '50%'
          }}></span>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#3A5A7E' 
          }}>
            Protection Civile Modernisée
          </span>
        </div>

        {/* Titre Principal */}
        <h2 style={{ 
          fontSize: '56px', 
          fontWeight: 600, 
          lineHeight: '1.1',
          color: '#1A1A1A',
          marginBottom: '32px',
          maxWidth: '900px'
        }}>
          Protection et sécurité{' '}
          <span style={{ color: '#3A5A7E' }}>au service</span>{' '}
          <span style={{ color: '#C98550' }}>de tous</span>
        </h2>

        {/* Description */}
        <p style={{ 
          fontSize: '20px', 
          lineHeight: '1.6',
          color: '#666666',
          marginBottom: '48px',
          maxWidth: '700px'
        }}>
          Recap Protect vous accompagne dans la gestion de vos interventions et 
          la coordination de vos équipes pour une protection civile efficace et moderne.
        </p>

        {/* Boutons */}
        <div style={{ 
          display: 'flex', 
          gap: '16px',
          marginBottom: '80px',
          flexWrap: 'wrap'
        }}>
          <button style={{ 
            padding: '16px 32px',
            backgroundColor: '#3A5A7E',
            color: 'white',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            Commencer maintenant
          </button>
          
          <button style={{ 
            padding: '16px 32px',
            backgroundColor: 'white',
            color: '#3A5A7E',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 600,
            border: '2px solid #3A5A7E',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            En savoir plus
          </button>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px',
          paddingTop: '48px',
          borderTop: '2px solid #EBE7DE',
          maxWidth: '800px'
        }}>
          <div>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 600, 
              color: '#3A5A7E',
              marginBottom: '8px'
            }}>
              2,400+
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              Interventions
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 600, 
              color: '#C98550',
              marginBottom: '8px'
            }}>
              150+
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              Équipes actives
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 600, 
              color: '#3A5A7E',
              marginBottom: '8px'
            }}>
              99.9%
            </div>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              Disponibilité
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}