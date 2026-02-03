'use client';
import React, { useState } from 'react';

export default function LandingEventos() {
  // Definimos que el estado puede ser un string
  const [evento, setEvento] = useState<string>("");

  // Especificamos el tipo string para evitar el error de 'any' implícito
  const seleccionar = (tipo: string): void => {
    setEvento(tipo);
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 font-sans">
      
      {/* HERO SECTION - Ajustada para el archivo .avif con espacio en el nombre */}
      <section 
        className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/FOTO%20FONDO.avif')` 
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">
            Hacemos realidad tu <br/>
            <span className="text-yellow-500 italic">evento soñado</span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Seleccioná el tipo de evento y nosotros nos encargamos de toda la organización.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {['CUMPLEAÑOS', 'DESPEDIDA DE SOLTERO', 'FIN DE AÑO'].map((item) => (
              <button
                key={item}
                onClick={() => seleccionar(item)}
                className="py-5 px-4 border-2 border-yellow-500 font-bold rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="contacto" className="py-24 bg-white text-black px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-black mb-2 text-center">¡Hablemos!</h2>
          <p className="text-center text-gray-600 mb-10">
            {evento ? `Contanos sobre tu ${evento}` : "Completá tus datos para una llamada"}
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">NOMBRE COMPLETO</label>
              <input 
                type="text" 
                placeholder="Ej: Leandro Franco" 
                className="w-full border-b-2 border-gray-300 p-3 focus:border-yellow-500 outline-none transition-colors" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-400">WHATSAPP</label>
              <input 
                type="tel" 
                placeholder="Ej: 5491138102208" 
                className="w-full border-b-2 border-gray-300 p-3 focus:border-yellow-500 outline-none transition-colors" 
                required 
              />
            </div>
            
            {/* Input oculto para enviar el tipo de evento seleccionado */}
            <input type="hidden" value={evento} />

            <button 
              type="submit" 
              className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-colors shadow-2xl"
            >
              AGENDAR LLAMADA
            </button>
          </form>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-800 bg-black">
        © 2026 - Expertos en Eventos Soñados
      </footer>
    </div>
  );
}