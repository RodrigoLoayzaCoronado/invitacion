import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import PDFDownload from './components/PdfDownload';
import RSVP from './components/Confirmacion';
import ParticlesBackground from './components/ParticlesBackground'; // Importamos ParticlesBackground

function App() {
  return (
    <div className="min-h-screen relative bg-gray-900 overflow-x-hidden">
      {/* Fondo animado principal (ParticlesBackground) */}
      {/* Lo colocamos aquí para que cubra todo el sitio */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Capas de fondo adicionales (gradientes, blurs) */}
      {/* Asegúrate de que estas capas tengan un z-index adecuado si quieres que estén sobre las partículas */}
      <div className="absolute inset-0 z-[1]"> {/* Cambiado a z-[1] para estar sobre las partículas pero debajo del contenido principal */}
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Contenido principal del sitio web */}
      {/* Este div contendrá todo el contenido visible (Header, Cards, etc.) y debe tener un z-index más alto */}
      <div className="relative z-10"> {/* Aseguramos que el contenido principal esté por encima de los fondos */}
        {/* Header */}
        <Header />
        
        {/* Sección de Cards de información */}
        <section className="flex justify-around p-4 relative overflow-auto max-w-screen-lg mx-auto flex-wrap gap-4">
          <Card image="img/edit2.png" rarityScore="Imbox si quieres previa" subtitle="Buho bar" title="LUGAR" />
          <Card image="img/edit5.png" rarityScore="20:00 hora Boliviana" subtitle="aqui algo mas" title="HORA" />
          <Card image="img/edit3.png" rarityScore="calle aniceto arce" subtitle="algo mas aqui" title="UBICACIÓN" />
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

        {/* Sección de confirmación de asistencia */}
        <section>
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
              © 2025 - ¡La mejor fiesta del año te está esperando!
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
