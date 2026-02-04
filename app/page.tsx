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

  // Validación de solo números y formateo básico
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Elimina todo lo que no sea número
    setPhone(input);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre'),
      whatsapp: `+549${phone}`, // Prefijo Argentina por defecto como pidió el amigo
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
        setTimeout(() => {
          setIsModalOpen(false);
          setPhone("");
        }, 2500);
      }
    } catch (error) {
      alert("Error al enviar. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={`${fontCuerpo.variable} ${fontTitulo.variable} min-h-screen bg-white text-black font-cuerpo selection:bg-black selection:text-white`}>
      
      {/* HEADER / NAV */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="relative h-12 w-32">
          <Image 
            src="/PANDA-DJ-LOGO-NEGRO-2.png" 
            alt="Panda DJ Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <div className="hidden md:block uppercase tracking-[0.3em] text-[10px] font-bold">
          High Quality Events
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 relative h-32 w-32 animate-fade-in">
          <Image 
            src="/PANDA-DJ-LOGO-NEGRO (1).png" 
            alt="Panda Face" 
            fill 
            className="object-contain"
          />
        </div>
        
        <h1 className="font-titulo text-6xl md:text-8xl mb-6 uppercase leading-none tracking-tighter">
          Hacemos realidad tu <br/>
          <span className="bg-black text-white px-4 italic">evento soñado</span>
        </h1>
        
        <p className="text-gray-500 max-w-lg mx-auto mb-12 uppercase tracking-[0.2em] font-medium text-sm md:text-base">
          Seleccioná un servicio para comenzar la experiencia Panda DJ
        </p>

        {/* CATEGORÍAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {[
            "EVENTOS PRIVADOS",
            "CUMPLEAÑOS (15/30/80 INV.)",
            "SOCIAL - CORPORATIVOS",
            "DJ - SONIDO - ILUMINACIÓN"
          ].map((item) => (
            <button
              key={item}
              onClick={() => abrirModal(item)}
              className="group relative py-6 px-4 border-2 border-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white"
            >
              <span className="relative z-10 text-xl md:text-2xl font-bold uppercase tracking-tight">{item}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => abrirModal("SERVICIOS ADICIONALES")}
          className="mt-10 uppercase tracking-[0.4em] text-xs font-black border-b-2 border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
        >
          + Ver Servicios Adicionales
        </button>
      </section>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-modal-in">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-8 text-2xl hover:rotate-90 transition-transform"
            >✕</button>

            {enviado ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="text-6xl mb-4">🐼</div>
                <h2 className="font-titulo text-5xl mb-2 uppercase">¡RECIBIDO!</h2>
                <p className="font-bold uppercase tracking-widest text-gray-400">Juan Alberto, nos hablamos pronto.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-titulo text-5xl mb-1 uppercase leading-none">RESERVAR</h2>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{evento}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-2">Nombre completo</label>
                    <input 
                      name="nombre" 
                      type="text" 
                      placeholder="Juan Alberto" 
                      className="w-full border-b-2 border-black p-3 text-lg focus:bg-gray-50 outline-none transition-all" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-2">WhatsApp</label>
                    <div className="flex items-center border-b-2 border-black">
                      <span className="pr-2 font-bold text-lg">+54 9</span>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="11 1234 5678" 
                        className="w-full p-3 text-lg focus:bg-gray-50 outline-none transition-all" 
                        required 
                      />
                    </div>
                    <p className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-tighter">Solo números • Sin el 0 ni el 15</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={enviando}
                    className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold hover:bg-gray-800 transition-all uppercase tracking-widest shadow-lg disabled:opacity-50"
                  >
                    {enviando ? "ENVIANDO..." : "AGENDAR LLAMADA"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.5em]">
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
        .animate-modal-in {
          animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}