'use client';
import React, { useState } from 'react';

export default function LandingEventos() {
  const [evento, setEvento] = useState<string>("");

  const seleccionar = (tipo: string): void => {
    setEvento(tipo);
    setTimeout(() => {
      const element = document.getElementById('contacto');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 font-sans">
      
      {/* HERO SECTION */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
            {['CUMPLEAÑOS', 'DESPEDIDA DE SOLTERO', 'FIN DE AÑO', 'ARMA TU PROPIA FIESTA'].map((item) => (
              <button
                key={item}
                onClick={() => seleccionar(item)}
                className={`py-5 px-4 border-2 font-bold rounded-xl transition-all duration-300 ${
                  evento === item 
                  ? 'bg-yellow-500 text-black border-yellow-500' 
                  : 'border-yellow-500 hover:bg-yellow-500 hover:text-black'
                } ${item === 'ARMA TU PROPIA FIESTA' ? 'lg:scale-105 border-dashed' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      {evento && (
        <section id="contacto" className="py-24 bg-white text-black px-6 animate-fade-in-up">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-black mb-2 text-center uppercase italic">¡Manos a la obra!</h2>
            <p className="text-center text-gray-600 mb-10">
              {evento === 'ARMA TU PROPIA FIESTA' 
                ? "Contanos tu idea y nosotros la hacemos realidad." 
                : `Contanos sobre tu ${evento} para agendar la llamada.`}
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-400 tracking-widest">NOMBRE COMPLETO</label>
                <input 
                  type="text" 
                  placeholder="Ej: Leandro Franco" 
                  className="w-full border-b-2 border-gray-300 p-3 focus:border-yellow-500 outline-none transition-colors" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-400 tracking-widest">WHATSAPP</label>
                <input 
                  type="tel" 
                  placeholder="Ej: 5491138102208" 
                  className="w-full border-b-2 border-gray-300 p-3 focus:border-yellow-500 outline-none transition-colors" 
                  required 
                />
              </div>
              
              <input type="hidden" value={evento} />

              <button 
                type="submit" 
                className="w-full bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all shadow-2xl"
              >
                AGENDAR LLAMADA
              </button>
            </form>
          </div>
        </section>
      )}

      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-800 bg-black">
        © 2026 - Expertos en Eventos Soñados
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}