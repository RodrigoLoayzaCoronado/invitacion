import React from 'react';
import ModelViewer from './ModelViewer';
// Eliminamos la importación de ParticlesBackground aquí, ya que se moverá a App.jsx
// import ParticlesBackground from './ParticlesBackground'; 

const Header = () => {
  return (
    <header className="w-screen h-screen relative overflow-hidden">
      {/* La capa de partículas de fondo se ha movido a App.jsx para que se vea en todo el sitio.
        Eliminamos este div que contenía ParticlesBackground.
      */}
      {/* <div className="absolute inset-0 z-[2]">
        <ParticlesBackground />
      </div> */}
      
      {/* Layout principal - Desktop: lado a lado, Mobile: vertical */}
      <div className="absolute inset-0 z-10 flex flex-col lg:flex-row">
        {/* Sección de texto - Izquierda en desktop, arriba en mobile */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center lg:justify-center p-6 lg:p-12">
          <div className="text-left space-y-6 max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold animate-fade-in leading-tight">
              <span className="bg-gradient-to-r from-blue-800 via-purple-400 to-pink-800 bg-clip-text text-transparent block">
                SI LOGRAS 
              </span>
              <span className="bg-gradient-to-r from-pink-800 via-purple-400 to-blue-800 bg-clip-text text-transparent block">
                LEER ESTO
              </span>
              <span className="text-white font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl block mt-2">
                ESTAS INVITADO@
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 opacity-90 leading-relaxed animate-fade-in max-w-md" style={{ animationDelay: '0.5s' }}>
              Para acompañarme en mi fiesta de cumpleaños.
            </p>
            
            {/* Botones opcionales */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
              <button className="pointer-events-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-glow-pulse">
                DE UNA
              </button>
              <button className="pointer-events-auto px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Mas info no me convence
              </button>
            </div>
          </div>
        </div>
        
        {/* Sección del modelo 3D - Derecha en desktop, abajo en mobile */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
          <ModelViewer />
          
          {/* Overlay sutil para el modelo en mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden pointer-events-none"></div>
        </div>
      </div>
      
      {/* Elementos decorativos adicionales */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Separador visual en desktop */}
        <div className="hidden lg:block absolute top-1/4 left-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2"></div>
        
        {/* Indicador de scroll en mobile */}
        <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="text-white/60 text-xs text-center">
            Toca para interactuar
          </div>
          <div className="w-4 h-6 border border-white/30 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-white/60 rounded-full mt-1 animate-bounce"></div>
          </div>
        </div>
        
      </div>
      
      {/* Efectos de borde */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Borde superior */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        {/* Borde inferior */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        {/* Bordes laterales */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>
    </header>
  );
};

export default Header;
