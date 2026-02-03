'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';

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
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // REEMPLAZA ESTO CON TU URL DE MAKE.COM
  const WEBHOOK_URL = "https://hook.us2.make.com/r30c8wlriemn1hypqgu5v9o7c1ja53zh";

  const seleccionar = (tipo: string): void => {
    setEvento(tipo);
    setEnviado(false);
    setTimeout(() => {
      const element = document.getElementById('contacto');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre'),
      whatsapp: formData.get('whatsapp'),
      evento: evento,
      fecha: new Date().toLocaleString('es-AR'),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEnviado(true);
        setEvento(""); // Limpia para mostrar mensaje de éxito
      }
    } catch (error) {
      console.error("Error enviando formulario", error);
      alert("Hubo un error. Por favor, intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={`${fontCuerpo.variable} ${fontTitulo.variable} min-h-screen bg-black text-white selection:bg-yellow-500 font-cuerpo`}>
      
      {/* HERO SECTION */}
      <section 
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6 py-20"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/FOTO%20FONDO.avif')` 
        }}
      >
        <div className="text-center w-full max-w-5xl">
          <h1 className="font-titulo text-5xl md:text-7xl mb-4 tracking-tighter uppercase leading-[1.1] pt-4">
            Hacemos realidad tu <br/>
            <span className="text-yellow-500 italic">evento soñado</span>
          </h1>
          
          {enviado ? (
            <div className="mt-10 p-8 border-2 border-yellow-500 rounded-2xl bg-yellow-500 text-black animate-fade-in-up">
              <h2 className="font-titulo text-4xl mb-2 uppercase">¡Recibido!</h2>
              <p className="font-bold text-xl uppercase tracking-widest">En breve nos comunicaremos con vos.</p>
              <button onClick={() => setEnviado(false)} className="mt-6 underline font-black uppercase text-sm">Volver a inicio</button>
            </div>
          ) : (
            <>
              <p className="text-base md:text-lg text-gray-300 mb-10 max-w-xl mx-auto uppercase tracking-widest font-bold">
                Seleccioná el servicio que necesitás:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
                {["EVENTOS PRIVADOS", "CUMPLEAÑOS (15/30/80 INV.)", "SOCIAL - CORPORATIVOS", "DJ - SONIDO - ILUMINACIÓN"].map((item) => (
                  <button
                    key={item}
                    onClick={() => seleccionar(item)}
                    className={`py-5 px-4 border-2 rounded-xl transition-all duration-300 text-xl md:text-2xl tracking-wide leading-tight uppercase font-bold ${
                      evento === item ? 'bg-yellow-500 text-black border-yellow-500 scale-105' : 'border-yellow-500 hover:bg-yellow-500 hover:text-black'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-12 max-w-3xl mx-auto">
                <button 
                  onClick={() => seleccionar("SERVICIOS ADICIONALES")}
                  className={`w-full p-6 border-2 border-dashed rounded-2xl transition-all duration-300 group ${
                    evento === "SERVICIOS ADICIONALES" ? 'bg-yellow-500 text-black border-yellow-500' : 'border-yellow-500/40 hover:border-yellow-500 bg-white/5 backdrop-blur-sm'
                  }`}
                >
                  <h3 className={`font-bold tracking-[0.2em] mb-3 text-sm ${evento === "SERVICIOS ADICIONALES" ? 'text-black' : 'text-yellow-500'}`}>SERVICIOS ADICIONALES</h3>
                  <p className={`text-lg md:text-xl font-bold uppercase tracking-wider mb-4 ${evento === "SERVICIOS ADICIONALES" ? 'text-black' : 'text-gray-300'}`}>CATERING • STAND DE GLITTER • CABINA 360 • FOTOGRAFÍA</p>
                  <span className="inline-block px-8 py-2 rounded-full font-black uppercase tracking-widest bg-yellow-500 text-black group-hover:bg-white transition-colors">CONSULTAR AHORA</span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FORM SECTION */}
      {evento && !enviado && (
        <section id="contacto" className="py-24 bg-white text-black px-6 animate-fade-in-up">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-titulo text-4xl md:text-5xl mb-2 uppercase italic leading-none">¡Excelente!</h2>
              <p className="text-gray-600 font-bold uppercase tracking-widest text-sm">
                {evento === "SERVICIOS ADICIONALES" ? "Contanos qué adicionales te interesan" : `Interés en: ${evento}`}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Nombre completo</label>
                <input name="nombre" type="text" placeholder="Ej: Juan Alberto" className="w-full border-b-2 border-gray-200 p-3 focus:border-yellow-500 outline-none transition-colors text-lg" required />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">WhatsApp</label>
                <input name="whatsapp" type="tel" placeholder="Ej: 54911..." className="w-full border-b-2 border-gray-200 p-3 focus:border-yellow-500 outline-none transition-colors text-lg" required />
              </div>
              
              <button 
                type="submit" 
                disabled={enviando}
                className="w-full bg-black text-white py-5 rounded-full text-xl font-bold hover:bg-yellow-500 hover:text-black transition-all uppercase tracking-widest shadow-xl disabled:opacity-50"
              >
                {enviando ? "ENVIANDO..." : "AGENDAR LLAMADA"}
              </button>
            </form>
          </div>
        </section>
      )}

      <footer className="py-8 text-center text-gray-500 text-xs border-t border-gray-800 bg-black uppercase tracking-[0.2em]">© 2026 - EVENTOS SOÑADOS</footer>
      
      <style jsx global>{`
        :root { --font-titulo: ${fontTitulo.style.fontFamily}; --font-cuerpo: ${fontCuerpo.style.fontFamily}; }
        .font-titulo { font-family: var(--font-titulo); }
        .font-cuerpo { font-family: var(--font-cuerpo); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}