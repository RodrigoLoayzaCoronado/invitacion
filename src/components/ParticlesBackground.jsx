import React from 'react';

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ maxWidth: '100vw', maxHeight: '100vh' }}>
      {/* Partículas pequeñas brillantes */}
      {[...Array(100)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            boxShadow: `0 0 ${2 + Math.random() * 4}px rgba(255, 255, 255, 0.8)` // Reducido el radio de sombra
          }}
        />
      ))}
      
      {/* Partículas de colores */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`color-particle-${i}`}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: `hsl(${200 + Math.random() * 100}, 70%, 60%)`,
            opacity: Math.random() * 0.6 + 0.2,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            boxShadow: `0 0 ${5 + Math.random() * 5}px hsla(${200 + Math.random() * 100}, 70%, 60%, 0.6)` // Reducido el radio de sombra
          }}
        />
      ))}
      
      {/* Círculos flotantes grandes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`circle-${i}`}
          className="absolute rounded-full border animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 50}px`, // Reducido el tamaño máximo
            height: `${30 + Math.random() * 50}px`, // Reducido el tamaño máximo
            borderColor: `hsla(${220 + Math.random() * 60}, 70%, 60%, ${0.1 + Math.random() * 0.3})`,
            borderWidth: '1px',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Líneas de conexión animadas */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse"
          style={{
            width: `${50 + Math.random() * 100}px`, // Reducido el tamaño máximo
            height: '1px',
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.4)' // Reducido el radio de sombra
          }}
        />
      ))}
      
      {/* Efectos de destello */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(59,130,246,0.8) 50%, transparent 100%)',
            borderRadius: '50%',
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' // Reducido el radio de sombra
          }}
        />
      ))}
      
      {/* Ondas de energía */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute border border-blue-400/10 rounded-full animate-ping"
            style={{
              left: '50%',
              top: '50%',
              width: `${100 + i * 50}px`, // Reducido el tamaño máximo
              height: `${100 + i * 50}px`, // Reducido el tamaño máximo
              marginLeft: `${-50 - i * 25}px`,
              marginTop: `${-50 - i * 25}px`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '6s',
              borderWidth: '2px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticlesBackground;