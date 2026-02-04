'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';

// Carga de fuentes
const fontTitulo = localFont({
  src: './fonts/YellowBalloon200-Regular.ttf',
  display: 'swap',
});

const fontCuerpo = localFont({
  src: './fonts/YellowBalloonW00Regular.ttf',
  display: 'swap',
});

export default function LandingPandaDJ() {
  const [evento, setEvento] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

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
    <div className={`${fontCuerpo.className} h-screen w-full bg-[#F2EFE9] text-black overflow-hidden flex flex-col justify-between`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes bounceSlow { 0%, 100% { transform: translateY(-3%); } 50% { transform: translateY(3%); } }
        .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
      `}} />

      {/* HEADER: Un poco más grande en desktop */}
      <nav className="w-full px-6 py-6 flex justify-between items-start z-40">
        <div className="bg-white border-[3px] border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
          <div className="relative h-8 w-24 md:h-12 md:w-32 lg:h-14 lg:w-40">
            <Image src="/PANDA-DJ-LOGO-NEGRO-2.png" alt="Panda DJ Logo" fill className="object-contain" />
          </div>
        </div>
        
        <div className="relative h-10 w-32 md:h-14 md:w-44 lg:h-16 lg:w-52 rotate-[2deg] drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]">
           <Image src="/DEBO SEGATTI LOGO NEGRO PNG.png" alt="Debo Segatti" fill className="object-contain" />
        </div>
      </nav>

      {/* CONTENIDO CENTRAL: Más grande y expandido */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-4 pb-8">
        
        {/* LOGO CENTRAL MUCHO MÁS GRANDE */}
        <div className="mb-4 relative h-36 w-36 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72 animate-bounce-slow hover:scale-105 transition-transform duration-300">
           <div className="absolute inset-0 bg-black rounded-full translate-x-2 translate-y-2 opacity-10"></div>
           <Image src="/PANDA-DJ-LOGO-NEGRO (1).png" alt="Panda Face" fill className="object-contain drop-shadow-lg" />
        </div>
        
        {/* TITULO GIGANTE */}
        <h1 className={`${fontTitulo.className} text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-6 uppercase leading-[0.85] tracking-tighter text-black text-center drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]`}>
          Hacemos <br/>
          <span className="relative inline-block px-4 lg:px-6 bg-black text-[#F2EFE9] -rotate-1 transform border-[3px] border-black shadow-[5px_5px_0px_0px_#9CA3AF]">
            Realidad
          </span> <br/>
          Tu Evento
        </h1>
        
        {/* PILL MÁS GRANDE */}
        <p className="text-black font-bold uppercase tracking-[0.25em] mb-10 text-xs md:text-base lg:text-xl bg-white border-[3px] border-black px-6 py-2 md:px-8 md:py-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
          Experiencia Panda DJ
        </p>

        {/* BOTONES MÁS CHUNKIES Y SEPARADOS */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full max-w-xl md:max-w-3xl lg:max-w-4xl mb-8">
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
                bg-white text-black text-sm md:text-2xl lg:text-3xl font-black uppercase 
                py-4 px-2 md:py-6 lg:py-8
                border-[3px] md:border-[4px] border-black rounded-2xl
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
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
          className="font-black uppercase text-xs md:text-base border-b-[3px] border-black pb-1 hover:text-gray-600 transition-colors flex items-center gap-2"
        >
          <span className="text-xl md:text-2xl">➔</span> Ver Servicios Adicionales
        </button>
      </main>

      {/* FOOTER MÁS VISIBLE */}
      <footer className="w-full py-6 text-center">
        <p className={`${fontTitulo.className} text-3xl md:text-4xl text-black/40 mb-2`}>PANDA DJ</p>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40">Buenos Aires • 2026</p>
      </footer>

      {/* MODAL (Sin cambios, ya estaba bien) */}
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