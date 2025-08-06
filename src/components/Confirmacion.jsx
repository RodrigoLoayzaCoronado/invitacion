import React, { useState } from 'react';

const RSVP = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    asistencia: '',
    compania: '',
    numCompania: '1',
    mensaje: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.asistencia) {
      setMessage('Por favor, completa los campos requeridos (Nombre y Asistencia).');
      return;
    }

    if (formData.asistencia === 'si' && formData.compania === 'si' && !formData.numCompania) {
      setMessage('Por favor, selecciona cuántos acompañantes irán.');
      return;
    }

    setIsLoading(true);

    // Preparar mensaje para Telegram
    // Preparar mensaje para Telegram usando variables de entorno
    const token = process.env.REACT_APP_TELEGRAM_TOKEN;
    const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
    const telegramMessage = `
      🎉 Nueva confirmación de asistencia:
      - Nombre: ${formData.nombre}
      - Asistencia: ${formData.asistencia === 'si' ? 'Sí' : 'No'}
      ${formData.asistencia === 'si' && formData.compania === 'si' ? `- Compañía: Sí (${formData.numCompania} acompañante${formData.numCompania > 1 ? 's' : ''})` : ''}
      ${formData.asistencia === 'si' && formData.compania === 'no' ? '- Compañía: No' : ''}
      - Mensaje: ${formData.mensaje || 'Sin mensaje'}
    `.trim();

    try {
      // Enviar a Telegram
      const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage
        })
      });

      const telegramData = await telegramResponse.json();
      if (!telegramData.ok) {
        throw new Error('Error al enviar a Telegram: ' + telegramData.description);
      }

      // Simular retraso para la experiencia de usuario
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (error) {
      setMessage('Error al procesar el formulario. Intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-fade-in">
            <div className="inline-block p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
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
              <span className="text-3xl animate-float">🎉</span>
              <span className="text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎂</span>
              <span className="text-3xl animate-float" style={{ animationDelay: '1s' }}>🍻</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Confirma tu Asistencia
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          ¡Eh! ¡Eh! 
          ¡Eh! ¡Eh! 
        </p>
      </div>

      <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          {message && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-6 text-center">
              {message}
            </div>
          )}

          <div className="space-y-6">
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

            {formData.asistencia === 'si' && (
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

            <div className="pt-4">
              <button
                type="button" // Cambiado a "button" ya que no usamos el formulario de Vercel
                onClick={handleSubmit}
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

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default RSVP;