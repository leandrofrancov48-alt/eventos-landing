'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';

// Configuración de las fuentes locales
const fontTitulo = localFont({
  src: './fonts/YellowBalloon200-Regular.ttf',
  variable: '--font-titulo',
});

const fontCuerpo = localFont({
  src: './fonts/YellowBalloonW00Regular.ttf',
  variable: '--font-cuerpo',
});

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
    <div className={`${fontCuerpo.variable} ${fontTitulo.variable} min-h-screen bg-black text-white selection:bg-yellow-500 font-cuerpo`}>
      
      {/* HERO SECTION */}
      <section 
        className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 pt-10"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/FOTO%20FONDO.avif')` 
        }}
      >
        <div className="text-center w-full max-w-5xl">
          {/* Título ajustado para que no se corte en mobile */}
          <h1 className="font-titulo text-5xl md:text-7xl mb-4 tracking-tighter uppercase leading-[1.1] pt-4">
            Hacemos realidad tu <br/>
            <span className="text-yellow-500 italic">evento soñado</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Seleccioná el tipo de evento y nosotros nos encargamos de toda la organización.
          </p>
          
          {/* GRILLA DE BOTONES: Tamaños moderados para legibilidad y mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-4xl mx-auto">
            {['CUMPLEAÑOS', 'DESPEDIDA DE SOLTERO', 'FIN DE AÑO'].map((item) => (
              <button
                key={item}
                onClick={() => seleccionar(item)}
                className={`py-4 px-3 border-2 rounded-xl transition-all duration-300 text-xl md:text-2xl tracking-wide leading-tight uppercase font-bold ${
                  evento === item 
                  ? 'bg-yellow-500 text-black border-yellow-500' 
                  : 'border-yellow-500 hover:bg-yellow-500 hover:text-black'
                }`}
              >
                {item}
              </button>
            ))}
            
            <div className="md:col-start-2">
              <button
                onClick={() => seleccionar('ARMA TU PROPIA FIESTA')}
                className={`w-full py-4 px-3 border-2 rounded-xl transition-all duration-300 border-dashed text-xl md:text-2xl tracking-wide leading-tight uppercase font-bold ${
                  evento === 'ARMA TU PROPIA FIESTA' 
                  ? 'bg-yellow-500 text-black border-yellow-500' 
                  : 'border-yellow-500 hover:bg-yellow-500 hover:text-black'
                }`}
              >
                ARMA TU PROPIA FIESTA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      {evento && (
        <section id="contacto" className="py-20 bg-white text-black px-6 animate-fade-in-up">
          <div className="max-w-md mx-auto">
            <h2 className="font-titulo text-4xl md:text-5xl mb-2 text-center uppercase italic">¡Excelente!</h2>
            <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
              {evento === 'ARMA TU PROPIA FIESTA' 
                ? "Contanos tu idea y nosotros la hacemos realidad." 
                : `Contanos sobre tu ${evento} para agendar la llamada.`}
            </p>

            <form className="space-y-5 font-bold">
              <div>
                <label className="block text-[10px] mb-1 text-gray-400 tracking-widest uppercase text-left">Nombre completo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Leandro Franco" 
                  className="w-full border-b border-gray-300 p-2 focus:border-yellow-500 outline-none transition-colors text-base font-normal" 
                  required 
                />
              </div>
              <div>
                <label className="block text-[10px] mb-1 text-gray-400 tracking-widest uppercase text-left">WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="Ej: 5491138102208" 
                  className="w-full border-b border-gray-300 p-2 focus:border-yellow-500 outline-none transition-colors text-base font-normal" 
                  required 
                />
              </div>
              
              <input type="hidden" value={evento} />

              <button 
                type="submit" 
                className="w-full bg-black text-white py-4 rounded-full text-lg hover:bg-yellow-500 hover:text-black transition-all uppercase tracking-wider"
              >
                AGENDAR LLAMADA
              </button>
            </form>
          </div>
        </section>
      )}

      <footer className="py-8 text-center text-gray-500 text-xs border-t border-gray-800 bg-black">
        © 2026 - Expertos en Eventos Soñados
      </footer>

      <style jsx global>{`
        :root {
          --font-titulo: ${fontTitulo.style.fontFamily};
          --font-cuerpo: ${fontCuerpo.style.fontFamily};
        }
        .font-titulo { font-family: var(--font-titulo); }
        .font-cuerpo { font-family: var(--font-cuerpo); }
        
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