'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';

const fontTitulo = localFont({
  src: './fonts/YellowBalloon200-Regular.ttf',
  variable: '--font-titulo',
});

const fontCuerpo = localFont({
  src: './fonts/YellowBalloonW00Regular.ttf',
  variable: '--font-cuerpo',
});

export default function LandingPandaDJ() {
  const [evento, setEvento] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // URL DE TU WEBHOOK
  const WEBHOOK_URL = "https://hook.us2.make.com/h4cdq5iw9iiuk2xwulp9zpn9rumku4ye";

  const abrirModal = (tipo: string) => {
    setEvento(tipo);
    setIsModalOpen(true);
    setEnviado(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhone(input);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre'),
      whatsapp: `+549${phone}`,
      evento: evento,
      fecha: new Date().toLocaleString('es-AR'),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEnviado(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setPhone("");
      }, 3000);
    } catch (error) {
      alert("Error al enviar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    // FONDO HUESO CON TEXTURA DE GRANO SUTIL (bg-dot-pattern opcional si querés agregar CSS extra)
    <div className={`${fontCuerpo.variable} ${fontTitulo.variable} min-h-screen bg-[#F2EFE9] text-black font-cuerpo selection:bg-black selection:text-[#F2EFE9] overflow-x-hidden`}>
      
      {/* NAV: ESTILO "RECORTADO" */}
      <nav className="fixed top-4 left-0 right-0 z-40 px-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto bg-white border-[3px] border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-transform">
          <div className="relative h-8 w-24 md:h-10 md:w-32">
            <Image src="/PANDA-DJ-LOGO-NEGRO-2.png" alt="Panda DJ Logo" fill className="object-contain" />
          </div>
        </div>
        <div className="pointer-events-auto bg-black text-white px-3 py-1 rounded-md border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] rotate-[2deg]">
           <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Since 2026</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 text-center">
        
        {/* LOGO CENTRAL "STICKER" */}
        <div className="mb-6 relative h-40 w-40 md:h-52 md:w-52 animate-bounce-slow hover:scale-110 transition-transform duration-300">
           {/* EFECTO DE SOMBRA "PEGATINA" */}
           <div className="absolute inset-0 bg-black rounded-full translate-x-2 translate-y-2 opacity-20 blur-sm"></div>
           <Image src="/PANDA-DJ-LOGO-NEGRO (1).png" alt="Panda Face" fill className="object-contain drop-shadow-xl" />
        </div>
        
        {/* TITULO CON ESTROKE (TEXT-STROKE NO NATIVO EN TAILWIND, USAMOS SOMBRA DURA PARA SIMULAR) */}
        <h1 className="font-titulo text-6xl md:text-9xl mb-4 uppercase leading-[0.9] tracking-tighter text-black drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]">
          Hacemos <br/>
          <span className="relative inline-block px-4 py-1 bg-black text-[#F2EFE9] -rotate-2 transform border-[3px] border-black shadow-[6px_6px_0px_0px_#9CA3AF]">
            Realidad
          </span> <br/>
          Tu Evento
        </h1>
        
        <p className="text-black font-bold uppercase tracking-[0.2em] mb-12 text-sm md:text-lg bg-white border-[2px] border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
          Experiencia Panda DJ
        </p>

        {/* BOTONES TIPO STICKERS DESORDENADOS */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
          {[
            { label: "EVENTOS PRIVADOS", rotate: "-rotate-1" },
            { label: "CUMPLEAÑOS (15/30/80)", rotate: "rotate-2" },
            { label: "SOCIAL & CORPORATIVOS", rotate: "-rotate-2" },
            { label: "SONIDO E ILUMINACIÓN", rotate: "rotate-1" }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => abrirModal(item.label)}
              className={`
                ${item.rotate}
                relative group bg-white text-black text-xl md:text-2xl font-bold uppercase py-6 px-8
                border-[3px] border-black rounded-2xl
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                transition-all duration-200
                flex-grow md:flex-grow-0
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => abrirModal("SERVICIOS ADICIONALES")}
          className="mt-16 font-black uppercase text-sm border-b-[3px] border-black pb-1 hover:text-gray-600 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">➔</span> Ver Servicios Adicionales
        </button>
      </section>

      {/* MODAL "DARK MODE CONSOLA" */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)} />
          
          {/* CONTENEDOR MODAL: TIPO PANTALLA DE VMIX/DJ */}
          <div className="relative bg-[#111] text-white w-full max-w-md rounded-3xl border-[4px] border-white shadow-[0px_0px_40px_rgba(255,255,255,0.2)] p-8 overflow-hidden animate-slide-up">
            
            {/* DETALLE DECORATIVO "REC" */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-mono tracking-widest text-gray-400">LIVE INPUT</span>
            </div>

            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-6 text-3xl font-bold hover:text-red-500 transition-colors">×</button>

            {enviado ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎚️</div>
                <h2 className="font-titulo text-4xl mb-2 text-white">¡CONEXIÓN EXITOSA!</h2>
                <p className="font-mono text-xs text-green-400 uppercase tracking-widest">Datos recibidos correctamente.<br/>Juan Alberto, te contactaremos.</p>
              </div>
            ) : (
              <>
                <div className="mt-8 mb-8 text-center">
                  <h2 className="font-titulo text-5xl mb-1 text-white tracking-wide">RESERVAR</h2>
                  <div className="inline-block bg-white text-black px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-sm transform -rotate-2">
                    {evento}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase ml-2">Nombre</label>
                    <input 
                      name="nombre" 
                      type="text" 
                      placeholder="JUAN ALBERTO" 
                      className="w-full bg-[#222] border-[2px] border-[#333] focus:border-white rounded-xl p-4 text-white font-bold outline-none transition-colors placeholder:text-gray-700 font-mono" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase ml-2">WhatsApp</label>
                    <div className="flex items-center bg-[#222] border-[2px] border-[#333] focus-within:border-white rounded-xl overflow-hidden transition-colors">
                      <div className="bg-[#333] h-full px-4 py-4 flex items-center justify-center border-r border-[#444]">
                         <span className="font-mono text-gray-400 font-bold text-sm">+54 9</span>
                      </div>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        placeholder="11 1234 5678" 
                        className="w-full bg-transparent p-4 text-white font-bold outline-none font-mono" 
                        required 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={enviando} 
                    className="w-full bg-white text-black py-4 rounded-xl text-lg font-black uppercase tracking-widest hover:bg-[#F2EFE9] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0px_0px_20px_rgba(255,255,255,0.3)] mt-4 border-2 border-transparent hover:border-black"
                  >
                    {enviando ? "ENVIANDO..." : "CONFIRMAR"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-12 text-center">
        <p className="font-titulo text-2xl text-black/30">PANDA DJ</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Buenos Aires • 2026</p>
      </footer>

      <style jsx global>{`
        :root {
          --font-titulo: ${fontTitulo.style.fontFamily};
          --font-cuerpo: ${fontCuerpo.style.fontFamily};
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
}