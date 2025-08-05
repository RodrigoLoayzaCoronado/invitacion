import React, { useState } from 'react';

const RSVP = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    asistencia: '',
    compania: '', // Nuevo campo: ¿Irás con compañía? ('si' o 'no')
    numCompania: '1', // Nuevo campo: Número de acompañantes (por defecto 1)
    mensaje: ''
  });
  // Estado para controlar si el formulario ha sido enviado
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Estado para controlar el estado de carga al enviar el formulario
  const [isLoading, setIsLoading] = useState(false);
  // Estado para mostrar mensajes de validación o error
  const [message, setMessage] = useState('');

  // Maneja los cambios en los campos de entrada del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el mensaje si el usuario empieza a escribir después de un error
    setMessage(''); 
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    // Prevenir el comportamiento por defecto del formulario para que Vercel lo capture
    e.preventDefault(); 

    // Validar campos requeridos
    if (!formData.nombre || !formData.asistencia) {
      setMessage('Por favor, completa los campos requeridos (Nombre y Asistencia).');
      return;
    }

    // Validar número de compañía si la asistencia es 'si' y va con compañía
    if (formData.asistencia === 'si' && formData.compania === 'si' && !formData.numCompania) {
      setMessage('Por favor, selecciona cuántos acompañantes irán.');
      return;
    }
    
    setIsLoading(true); // Activa el estado de carga

    // Para Vercel Forms, no necesitas una llamada fetch explícita aquí.
    // Vercel intercepta el envío del formulario si está configurado correctamente.
    // Simplemente simulamos un pequeño retraso para la experiencia de usuario.
    setTimeout(() => {
      setIsSubmitted(true); // Marca el formulario como enviado
      setIsLoading(false); // Desactiva el estado de carga
      // Los datos ahora serán enviados a Vercel automáticamente.
      console.log('Formulario enviado a Vercel:', formData);
    }, 1500); // Un pequeño retraso para que el usuario vea el estado de "Enviando..."
  };

  // Renderizado condicional: si el formulario ha sido enviado, muestra el mensaje de confirmación
  if (isSubmitted) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-fade-in">
            <div className="inline-block p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
              {/* Icono de verificación SVG */}
              <svg className="w-16 h-16 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                ¡Confirmación Enviada!
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              ¡Gracias por confirmar tu asistencia! Tu respuesta ha sido registrada.
               ¡Te esperamos para la fiesta!
            </p>
            <div className="flex justify-center items-center space-x-4">
              {/* Emojis animados */}
              <span className="text-3xl animate-float">🎉</span>
              <span className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎂</span>
              <span className="text-3xl animate-float" style={{ animationDelay: '1s' }}>🍻</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado del formulario si no ha sido enviado
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Confirma tu Asistencia
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          ¡No te pierdas la fiesta del año!
        </p>
      </div>

      {/* Formulario */}
      <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
        {/* Agregamos la etiqueta <form> con el atributo method y name para Vercel Forms */}
        <form name="rsvp" method="POST" data-netlify="true" onSubmit={handleSubmit}>
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            {/* Mensaje de error/validación */}
            {message && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-6 text-center">
                {message}
              </div>
            )}

            <div className="space-y-6">
              {/* Campo oculto requerido por Vercel para identificar el formulario */}
              <input type="hidden" name="form-name" value="rsvp" />

              {/* Nombre */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Escribe tu nombre completo"
                />
              </div>

              {/* Asistencia */}
              <div>
                <label className="block text-white text-sm font-medium mb-3">
                  ¿Vas a asistir? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="asistencia"
                      value="si"
                      checked={formData.asistencia === 'si'}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                      formData.asistencia === 'si' 
                        ? 'border-green-500 bg-green-500/20 text-green-400' 
                        : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-green-500/50'
                    }`}>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">✅</span>
                        <span className="font-medium">¡Sí, estaré ahí!</span>
                      </div>
                    </div>
                  </label>

                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="asistencia"
                      value="no"
                      checked={formData.asistencia === 'no'}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                      formData.asistencia === 'no' 
                        ? 'border-red-500 bg-red-500/20 text-red-400' 
                        : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-red-500/50'
                    }`}>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">❌</span>
                        <span className="font-medium">No podré ir</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Nuevo campo: ¿Irás con compañía? */}
              {formData.asistencia === 'si' && ( // Solo muestra si va a asistir
                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    ¿Irás con compañía? 😉
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="compania"
                        value="si"
                        checked={formData.compania === 'si'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                        formData.compania === 'si' 
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                          : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-blue-500/50'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl">🥳</span>
                          <span className="font-medium">Sí, iré con compañía</span>
                        </div>
                      </div>
                    </label>

                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="compania"
                        value="no"
                        checked={formData.compania === 'no'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                        formData.compania === 'no' 
                          ? 'border-gray-500 bg-gray-500/20 text-gray-400' 
                          : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500/50'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl">🚶‍♂️</span>
                          <span className="font-medium">No, iré solo/a</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Nuevo campo: Cuántos acompañantes? (solo si va con compañía) */}
              {formData.asistencia === 'si' && formData.compania === 'si' && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    ¿Cuántos acompañantes?
                  </label>
                  <select
                    name="numCompania"
                    value={formData.numCompania}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="1">1 👍🏻</option>
                    <option value="2">2 😳</option>
                    <option value="3">3 😨</option>
                  </select>
                </div>
              )}

              {/* Mensaje */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Deja un mensaje al cumpleañero..."
                />
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit" // Importante: el tipo debe ser "submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      <span>Confirmar Asistencia</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form> {/* Cierre de la etiqueta <form> */}
      </div>

      {/* Decoración */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default RSVP;
