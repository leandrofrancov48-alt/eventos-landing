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
      }, 2500);
    } catch (error) {
      alert("Error al enviar.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    // CAMBIO: bg-[#F5F2EB] es el color "hueso" de la imagen que te gustó
    <div className={`${fontCuerpo.variable} ${fontTitulo.variable} min-h-screen bg-[#F5F2EB] text-[#1A1A1A] font-cuerpo selection:bg-black selection:text-white`}>
      
      {/* NAV SUAVIZADO */}
      <nav className="fixed top-0 w-full z-40 bg-[#F5F2EB]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-black/5">
        <div className="relative h-12 w-32">
          <Image src="/PANDA-DJ-LOGO-NEGRO-2.png" alt="Panda DJ Logo" fill className="object-contain" />
        </div>
        <div className="hidden md:block uppercase tracking-[0.3em] text-[10px] font-bold opacity-60">
          High Quality Events
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 relative h-32 w-32 animate-fade-in grayscale">
          <Image src="/PANDA-DJ-LOGO-NEGRO (1).png" alt="Panda Face" fill className="object-contain" />
        </div>
        
        <h1 className="font-titulo text-6xl md:text-8xl mb-6 uppercase leading-none tracking-tighter text-[#1A1A1A]">
          Hacemos realidad tu <br/>
          <span className="bg-[#1A1A1A] text-[#F5F2EB] px-4 italic">evento soñado</span>
        </h1>
        
        <p className="text-[#1A1A1A]/60 max-w-lg mx-auto mb-12 uppercase tracking-[0.2em] font-medium text-sm">
          Seleccioná un servicio para comenzar la experiencia Panda DJ
        </p>

        {/* CATEGORÍAS CON NEGRO "MATTE" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {["EVENTOS PRIVADOS", "CUMPLEAÑOS (15/30/80 INV.)", "SOCIAL - CORPORATIVOS", "DJ - SONIDO - ILUMINACIÓN"].map((item) => (
            <button
              key={item}
              onClick={() => abrirModal(item)}
              className="group relative py-6 px-4 border-2 border-[#1A1A1A] rounded-2xl transition-all duration-300 hover:bg-[#1A1A1A] hover:text-[#F5F2EB] shadow-sm"
            >
              <span className="relative z-10 text-xl md:text-2xl font-bold uppercase tracking-tight">{item}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => abrirModal("SERVICIOS ADICIONALES")}
          className="mt-10 uppercase tracking-[0.4em] text-xs font-black border-b-2 border-[#1A1A1A] pb-1 hover:opacity-50 transition-all"
        >
          + Ver Servicios Adicionales
        </button>
      </section>

      {/* MODAL CON FONDO CREMA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-md animate-fade-in" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-[#F5F2EB] w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 md:p-12 animate-modal-in border border-black/5">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-8 text-2xl opacity-40 hover:opacity-100 transition-opacity">✕</button>

            {enviado ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="text-6xl mb-4 grayscale">🐼</div>
                <h2 className="font-titulo text-5xl mb-2 uppercase">¡RECIBIDO!</h2>
                <p className="font-bold uppercase tracking-widest text-black/40">Juan Alberto, nos hablamos pronto.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-titulo text-5xl mb-1 uppercase leading-none">RESERVAR</h2>
                  <p className="text-black/40 font-bold uppercase tracking-widest text-[10px]">{evento}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-black/40 tracking-[0.2em] uppercase mb-2">Nombre completo</label>
                    <input name="nombre" type="text" placeholder="Juan Alberto" className="w-full bg-black/5 border-b-2 border-black p-4 text-lg focus:bg-black/10 outline-none transition-all rounded-t-lg" required />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-black/40 tracking-[0.2em] uppercase mb-2">WhatsApp</label>
                    <div className="flex items-center bg-black/5 border-b-2 border-black rounded-t-lg">
                      <span className="pl-4 pr-2 font-bold text-lg opacity-60">+54 9</span>
                      <input type="tel" value={phone} onChange={handlePhoneChange} placeholder="11 1234 5678" className="w-full bg-transparent p-4 text-lg outline-none" required />
                    </div>
                  </div>

                  <button type="submit" disabled={enviando} className="w-full bg-[#1A1A1A] text-[#F5F2EB] py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest shadow-lg disabled:opacity-50">
                    {enviando ? "ENVIANDO..." : "AGENDAR LLAMADA"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-black/20 text-[10px] font-bold uppercase tracking-[0.5em]">
        © 2026 PANDA DJ • Buenos Aires
      </footer>

      <style jsx global>{`
        :root {
          --font-titulo: ${fontTitulo.style.fontFamily};
          --font-cuerpo: ${fontCuerpo.style.fontFamily};
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal-in { animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}