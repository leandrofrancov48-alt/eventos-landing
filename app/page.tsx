'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';

// 1. CARGA DE FUENTES (Asegurate que el nombre del archivo sea EXACTO)
const fontTitulo = localFont({
  src: './fonts/YellowBalloon200-Regular.ttf', // Chequeá mayúsculas/minúsculas
  display: 'swap',
});

const fontCuerpo = localFont({
  src: './fonts/YellowBalloonW00Regular.ttf', // Chequeá mayúsculas/minúsculas
  display: 'swap',
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
    // APLICAMOS LAS FUENTES DIRECTAMENTE ACÁ EN EL CLASSNAME
    <div className={`${fontCuerpo.className} h-screen w-full bg-[#F2EFE9] text-black overflow-hidden flex flex-col justify-between`}>
      
      {/* HEADER */}
      <nav className="w-full px-4 py-4 flex justify-between items-start z-40">
        {/* Logo Panda Izquierda */}
        <div className="bg-white border-[2px] border-black px-3 py-1 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
          <div className="relative h-8 w-20 md:h-10 md:w-28">
            <Image src="/PANDA-DJ-LOGO-NEGRO-2.png" alt="Panda DJ Logo" fill className="object-contain" />
          </div>
        </div>
        
        {/* Logo Debo Segatti Derecha */}
        <div className="relative h-8 w-28 md:h-10 md:w-36 rotate-[2deg] drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
           <Image src="/DEBO SEGATTI LOGO NEGRO PNG.png" alt="Debo Segatti" fill className="object-contain" />
        </div>
      </nav>

      {/* CONTENIDO CENTRAL */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 -mt-4">
        
        {/* LOGO CENTRAL CON ANIMACIÓN DE GLOBALS.CSS */}
        <div className="mb-2 relative h-28 w-28 md:h-40 md:w-40 animate-bounce-slow hover:scale-105 transition-transform duration-300">
           <div className="absolute inset-0 bg-black rounded-full translate-x-1 translate-y-1 opacity-10"></div>
           <Image src="/PANDA-DJ-LOGO-NEGRO (1).png" alt="Panda Face" fill className="object-contain drop-shadow-md" />
        </div>
        
        {/* TITULO USANDO LA FUENTE IMPORTADA ESPECÍFICA */}
        <h1 className={`${fontTitulo.className} text-5xl md:text-7xl mb-2 uppercase leading-[0.9] tracking-tighter text-black text-center drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]`}>
          Hacemos <br/>
          <span className="relative inline-block px-3 bg-black text-[#F2EFE9] -rotate-1 transform border-[2px] border-black shadow-[3px_3px_0px_0px_#9CA3AF]">
            Realidad
          </span> <br/>
          Tu Evento
        </h1>
        
        <p className="text-black font-bold uppercase tracking-[0.2em] mb-6 text-[10px] md:text-sm bg-white border-[2px] border-black px-4 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-1">
          Experiencia Panda DJ
        </p>

        {/* BOTONES */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-2xl mb-4">
          {[
            { label: "PRIVADOS", rotate: "-rotate-1" },
            { label: "CUMPLEAÑOS", rotate: "rotate-1" },
            { label: "CORPORATIVOS", rotate: "-rotate-1" },
            { label: "TÉCNICA", rotate: "rotate-1" }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => abrirModal(item.label)}
              className={`
                ${item.rotate}
                bg-white text-black text-sm md:text-xl font-bold uppercase py-3 px-2 md:py-4
                border-[2px] border-black rounded-xl
                shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                transition-all duration-200
                flex items-center justify-center text-center leading-none
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => abrirModal("SERVICIOS ADICIONALES")}
          className="font-black uppercase text-[10px] md:text-xs border-b-[2px] border-black pb-0.5 hover:text-gray-600 transition-colors flex items-center gap-1"
        >
          <span className="text-sm">➔</span> Ver Servicios Adicionales
        </button>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-2 text-center">
        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-black/30">Buenos Aires • 2026</p>
      </footer>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-[#111] text-white w-full max-w-md rounded-3xl border-[4px] border-white shadow-[0px_0px_40px_rgba(255,255,255,0.2)] p-6 md:p-8 overflow-hidden animate-slide-up">
            
            <div className="absolute top-6 left-6 flex items-center gap-2">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-[8px] font-mono tracking-widest text-gray-400">REC</span>
            </div>

            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-6 text-2xl font-bold hover:text-red-500 transition-colors">×</button>

            {enviado ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎚️</div>
                <h2 className={`${fontTitulo.className} text-3xl mb-2 text-white`}>¡RECIBIDO!</h2>
                <p className="font-mono text-[10px] text-green-400 uppercase tracking-widest">En breve te contactamos.</p>
              </div>
            ) : (
              <>
                <div className="mt-6 mb-6 text-center">
                  <h2 className={`${fontTitulo.className} text-4xl mb-1 text-white tracking-wide`}>RESERVAR</h2>
                  <div className="inline-block bg-white text-black px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-sm transform -rotate-2">
                    {evento}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500 tracking-[0.2em] uppercase ml-2">Nombre</label>
                    <input 
                      name="nombre" 
                      type="text" 
                      placeholder="TU NOMBRE" 
                      className="w-full bg-[#222] border-[2px] border-[#333] focus:border-white rounded-xl p-3 text-white font-bold outline-none transition-colors placeholder:text-gray-700 font-mono text-sm" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500 tracking-[0.2em] uppercase ml-2">WhatsApp</label>
                    <div className="flex items-center bg-[#222] border-[2px] border-[#333] focus-within:border-white rounded-xl overflow-hidden transition-colors">
                      <div className="bg-[#333] h-full px-3 py-3 flex items-center justify-center border-r border-[#444]">
                         <span className="font-mono text-gray-400 font-bold text-xs">+54 9</span>
                      </div>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        placeholder="11 1234 5678" 
                        className="w-full bg-transparent p-3 text-white font-bold outline-none font-mono text-sm" 
                        required 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={enviando} 
                    className="w-full bg-white text-black py-3 rounded-xl text-base font-black uppercase tracking-widest hover:bg-[#F2EFE9] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0px_0px_20px_rgba(255,255,255,0.3)] mt-2"
                  >
                    {enviando ? "ENVIANDO..." : "CONFIRMAR"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}