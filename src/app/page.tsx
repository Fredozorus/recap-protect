export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1E8' }}>
      {/* Navigation Simple */}
      <nav className="px-8 py-6">
        <h1 className="text-3xl font-semibold">
          <span style={{ color: '#3A5A7E' }}>Recap</span>
          <span style={{ color: '#C98550' }}>Protect</span>
        </h1>
      </nav>

      {/* Hero Simple */}
      <main className="max-w-4xl mx-auto px-8 py-20">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C98550' }}></span>
            <span className="text-sm font-semibold" style={{ color: '#3A5A7E' }}>
              Protection Civile Modernisée
            </span>
          </div>

          {/* Titre */}
          <h2 className="text-5xl font-semibold leading-tight" style={{ color: '#1A1A1A' }}>
            Protection et sécurité{' '}
            <span style={{ color: '#3A5A7E' }}>au service</span>{' '}
            <span style={{ color: '#C98550' }}>de tous</span>
          </h2>

          {/* Description */}
          <p className="text-xl" style={{ color: '#666666' }}>
            Recap Protect vous accompagne dans la gestion de vos interventions et 
            la coordination de vos équipes pour une protection civile efficace et moderne.
          </p>

          {/* Boutons */}
          <div className="flex gap-4">
            <button 
              className="px-8 py-4 text-white rounded-xl font-semibold text-lg"
              style={{ backgroundColor: '#3A5A7E' }}
            >
              Commencer maintenant
            </button>
            
            <button 
              className="px-8 py-4 bg-white rounded-xl font-semibold text-lg"
              style={{ color: '#3A5A7E' }}
            >
              En savoir plus
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div>
              <div className="text-4xl font-semibold" style={{ color: '#3A5A7E' }}>2,400+</div>
              <div className="text-sm" style={{ color: '#666666' }}>Interventions</div>
            </div>
            <div>
              <div className="text-4xl font-semibold" style={{ color: '#C98550' }}>150+</div>
              <div className="text-sm" style={{ color: '#666666' }}>Équipes actives</div>
            </div>
            <div>
              <div className="text-4xl font-semibold" style={{ color: '#3A5A7E' }}>99.9%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Disponibilité</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}