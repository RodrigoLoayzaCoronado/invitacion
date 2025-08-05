import React from 'react';

const PDFDownload = () => {
  const handleDownloadPDF = () => {
    // Lógica para descargar el PDF
    const link = document.createElement('a');
    link.href = '/permiso-cumpleanos.pdf'; // Cambia por la ruta de tu PDF
    link.download = 'permiso-cumpleanos.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      <div className="text-center">
        {/* Título principal con efectos */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Si tu señora no te deja
          </span>
        </h2>
        
        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Descarga el siguiente PDF
        </p>
        
        {/* Contenedor del botón con efectos */}
        <div className="relative inline-block animate-fade-in" style={{ animationDelay: '1s' }}>
          {/* Efecto de resplandor detrás del botón */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          
          {/* Botón de descarga */}
          <button
            onClick={handleDownloadPDF}
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-glow-pulse group"
          >
            <div className="flex items-center space-x-3">
              {/* Icono de descarga */}
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-lg">Descargar Permiso</span>
            </div>
          </button>
        </div>
        
        {/* Texto adicional divertido */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
            📋 Documento oficial para negociar tu libertad temporal
          </p>
          <div className="flex justify-center items-center mt-4 space-x-2">
            <span className="text-2xl animate-float">🎉</span>
            
            <span className="text-2xl animate-float" style={{ animationDelay: '1s' }}>🍻</span>
          </div>
        </div>
      </div>

      {/* Decoración adicional */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default PDFDownload;