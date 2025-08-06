import React, { Suspense, lazy, useRef } from 'react'; // Importamos useRef
import Header from './components/Header';
import Card from './components/Card';
import PDFDownload from './components/PdfDownload';
import RSVP from './components/Confirmacion';
import ParticlesBackground from './components/ParticlesBackground';

// Carga perezosa del ModelViewer
const LazyModelViewer = lazy(() => import('./components/ModelViewer'));

function App() {
  // Creamos referencias para las secciones a las que queremos desplazarnos
  const rsvpRef = useRef(null);
  const cardsRef = useRef(null);

  return (
    <div className="min-h-screen relative bg-gray-900 overflow-x-hidden">
      {/* Capas de fondo adicionales (gradientes, blurs) y ParticlesBackground */}
      <div className="absolute inset-0 z-[1]">
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <ParticlesBackground /> {/* Añadido aquí para cubrir toda la pantalla */}
      </div>

      {/* Contenido principal del sitio web */}
      <div className="relative z-10">
        {/* Pasamos las referencias a Header como props */}
        <Header rsvpRef={rsvpRef} cardsRef={cardsRef} />
        
        {/* Sección de Cards de información - Adjuntamos la referencia 'cardsRef' */}
        <section ref={cardsRef} className="flex justify-around p-4 relative overflow-auto max-w-screen-lg mx-auto flex-wrap gap-4">
          <Card image="img/edit2.png" rarityScore="Sabado 9 de agosto" subtitle="Imbox para la Previa" title="DÍA" />
          <Card image="img/edit5.png" rarityScore="20:00 para los puntuales" subtitle="21:30 maximo hora Boliviana" title="HORA" />
          <Card image="img/edit3.png" rarityScore="Todos conocen Buho" subtitle="Donde Siempre" title="UBICACIÓN" />
        </section>

        {/* Separador visual */}
        <div className="relative z-10 flex justify-center my-16">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        {/* Sección de descarga de PDF */}
        <section>
          <PDFDownload />
        </section>

        {/* Separador visual */}
        <div className="relative z-10 flex justify-center my-16">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        </div>

        {/* Sección de confirmación de asistencia - Adjuntamos la referencia 'rsvpRef' */}
        <section ref={rsvpRef}>
          <RSVP />
        </section>

        {/* Footer con decoración adicional */}
        <footer className="relative z-10 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <span className="text-4xl animate-float">🎂</span>
              <span className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🎉</span>
              <span className="text-4xl animate-float" style={{ animationDelay: '1s' }}>🎁</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 - ¡Para la Anecdota!
            </p>
          </div>
        </footer>
      </div> {/* Cierre del div de contenido principal */}

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-10px); } 
        }
        @keyframes glow-pulse { 
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); } 
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); } 
        }
        .animate-fade-in { animation: fade-in 2s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

export default App;