import React from 'react';

// Recibimos rsvpRef y cardsRef como props
const Header = ({ rsvpRef, cardsRef }) => { 
  // Función para desplazarse al formulario RSVP
  const scrollToRSVP = () => {
    if (rsvpRef.current) {
      rsvpRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Función para desplazarse a la sección de Cards
  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="w-screen h-screen relative overflow-hidden">
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
            
            {/* Botones con onClick handlers */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
              <button 
                onClick={scrollToRSVP} // Llama a la función de scroll
                className="pointer-events-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-glow-pulse"
              >
                DE UNA
              </button>
              <button 
                onClick={scrollToCards} // Llama a la función de scroll
                className="pointer-events-auto px-6 py-3 bg-gray-800/50 border-2 border-white/50 text-gray-800 font-semibold rounded-full hover:bg-gray-700/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                Mas info no me convence
              </button>
            </div>
          </div>
        </div>
        
        {/* Sección de la imagen - Derecha en desktop, abajo en mobile */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative flex flex-col items-center justify-center p-4 lg:p-5">
          {/* Texto "CUMPLE DE RODRI!" - Encima de la imagen con espacio adecuado */}
          <div className="text-center mb-5 lg:mb-5 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-x2 sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              CUMPLE DE RODRI!
            </h2>
            <div className="flex justify-center space-x-2">
              <span className="text-xl sm:text-2xl md:text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎉</span>
              <span className="text-xl sm:text-2xl md:text-3xl animate-float" style={{ animationDelay: '1s' }}>🎁</span>
            </div>
          </div>
          
          {/* Contenedor de la imagen - Con espacio calculado */}
          <div className="flex-1 flex items-center justify-center max-w-full max-h-full">
            <img
              src="/img/funjo1.png"
              alt="Invitación visual"
              className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain rounded-lg shadow-lg animate-float transition-all duration-300"
              loading="lazy"
              style={{
                animation: 'float 3s ease-in-out infinite',
                maxHeight: 'calc(100% - 60px)' // Reserva espacio para el texto superior
              }}
            />
          </div>
          
          {/* Overlay sutil para la imagen en mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden pointer-events-none"></div>
        </div>
      </div>
      
      {/* Elementos decorativos adicionales */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Separador visual en desktop */}
        <div className="hidden lg:block absolute top-1/4 left-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2"></div>
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