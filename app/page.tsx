'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

// Fuentes personalizadas (asegúrate de que los archivos estén en la carpeta /fonts)
const fontTitulo = localFont({
  src: './fonts/YellowBalloon200-Regular.ttf', // Fuente para títulos
  display: 'swap',
});

const fontCuerpo = localFont({
  src: './fonts/YellowBalloonW00Regular.ttf', // Fuente para el cuerpo del texto
  display: 'swap',
});

export default function LandingPandaDJ() {
  // Estados para el modal, el formulario y el tipo de evento seleccionado
  const [evento, setEvento] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // URL del Webhook de Make para enviar los datos del formulario
  const WEBHOOK_URL = "https://hook.us2.make.com/r30c8wlriemn1hypqgu5v9o7c1ja53zh";

  // Función para abrir el modal con el tipo de evento seleccionado
  const abrirModal = (tipo: string) => {
    setEvento(tipo);
    setIsModalOpen(true);
    setEnviado(false); // Resetea el estado de enviado
  };

  // Función para formatear el número de teléfono (solo dígitos)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhone(input);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.currentTarget);
    // Prepara los datos para enviar
    const data = {
      nombre: formData.get('nombre'),
      whatsapp: `+549${phone}`,
      evento: evento,
      fecha: "'" + new Date().toLocaleString('es-AR'), // Fuerza la fecha como texto para Sheets
    };

    try {
      // Envía los datos al Webhook
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEnviado(true); // Muestra mensaje de éxito
      // Cierra el modal después de 3 segundos
      setTimeout(() => {
        setIsModalOpen(false);
        setPhone("");
      }, 3000);
    } catch (error) {
      alert("Error al enviar.");
    } finally {
      setEnviando(false); // Resetea estado de envío
    }
  };

  return (
    // Contenedor principal con fondo beige, fuente de cuerpo y estructura flex
    <div className={`${fontCuerpo.className} h-screen w-full bg-[#cec1ad] text-black overflow-hidden flex flex-col justify-between`}>
      
      {/* Estilos CSS globales para animaciones */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes bounceSlow { 0%, 100% { transform: translateY(-3%); } 50% { transform: translateY(3%); } }
        .animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
      `}} />

      {/* HEADER / BARRA DE NAVEGACIÓN SUPERIOR */}
      <nav className="w-full px-4 py-4 md:px-8 md:py-6 flex justify-between items-start z-40 shrink-0">
        
        {/* LOGO PANDA DJ (Link Izquierda) */}
        <Link 
          href="https://www.instagram.com/sebasubia/"
          target="_blank"
          className="bg-white border-[2px] border-black px-3 py-1 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 hover:scale-105 transition-all cursor-pointer block"
        >
          <div className="relative h-8 w-24 md:h-12 md:w-36">
            <Image src="/PANDA-DJ-LOGO-NEGRO-2.png" alt="Panda DJ Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* NUEVO LOGO CENTRAL: HACEMOS TU EVENTO */}
        <button 
          className="bg-white border-[2px] border-black px-2 py-1 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[1deg] hover:rotate-0 hover:scale-105 transition-all cursor-default block mx-2 md:mx-4 self-center"
          // Este botón NO tiene onClick ni href, por ahora es solo decorativo.
        >
          <div className="relative h-10 w-24 md:h-14 md:w-36">
            <Image 
              src="/image_4.png" // Ruta a tu nueva imagen de logo central
              alt="Hacemos Tu Evento" 
              fill 
              className="object-contain" 
            />
          </div>
        </button>
        
        {/* LOGO DEBO SEGATTI (Link Derecha) */}
        <Link 
          href="https://www.instagram.com/debosegatti.dj?igsh=MTlkOW1kcXlyNnZtZw%3D%3D" 
          target="_blank"
          className="block rotate-[1deg] hover:rotate-0 hover:scale-105 transition-all cursor-pointer"
        >
          <div className="relative h-10 w-32 md:h-14 md:w-48">
             <Image 
               src="/DEBO SEGATTI LOGO NEGRO PNG.png" 
               alt="Debo Segatti" 
               fill 
               className="object-contain" 
             />
          </div>
        </Link>
      </nav>

      {/* CONTENIDO CENTRAL PRINCIPAL */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto gap-2 md:gap-6">
        
        {/* TÍTULO PRINCIPAL */}
        <h1 className={`${fontTitulo.className} text-center leading-[0.9] text-black shrink-0 flex flex-col items-center mt-2`}>
          <span className="block text-4xl md:text-6xl lg:text-7xl mb-2 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
            DESPREOCUPATE
          </span>
          <span className="whitespace-nowrap relative inline-block bg-black text-[#cec1ad] text-2xl md:text-5xl lg:text-6xl px-4 py-2 md:px-8 md:py-3 -rotate-1 transform border-[3px] border-black shadow-[5px_5px_0px_0px_#9CA3AF]">
            NOSOTROS ARMAMOS TU EVENTO
          </span>
        </h1>

        {/* CONTENEDOR DE BOTONES DE SERVICIOS */}
        <div className="flex flex-col gap-3 w-full max-w-2xl shrink-0 mt-2 px-2">
          
          {/* 1. BOTÓN DESTACADO: SET DE DJ */}
          <button
            onClick={() => abrirModal("SET DE DJ")}
            className="w-full bg-white text-black text-2xl md:text-4xl font-black uppercase py-4 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#cec1ad] transition-all duration-200 text-center leading-none rotate-1"
          >
            SET DE DJ
          </button>

          {/* 2. GRILLA DE 4 BOTONES SECUNDARIOS */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              { label: "EVENTOS PRIVADOS", rotate: "-rotate-1", smallText: false },
              { label: "CUMPLEAÑOS PARA GRUPOS DE 15/30/80 INVITADOS", rotate: "rotate-1", smallText: true },
              { label: "EVENTO SOCIAL-CORPORATIVOS", rotate: "-rotate-1", smallText: false },
              { label: "SONIDO - ILUMINACIÓN", rotate: "rotate-1", smallText: false }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => abrirModal(item.label)}
                className={`
                  ${item.rotate}
                  bg-white text-black 
                  border-[2px] border-black rounded-xl
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                  hover:bg-black hover:text-[#cec1ad]
                  transition-all duration-200
                  flex items-center justify-center text-center
                  p-2 min-h-[80px] md:min-h-[100px]
                `}
              >
                <span className={`font-black uppercase leading-tight ${item.smallText ? 'text-[10px] md:text-sm' : 'text-sm md:text-xl'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* BOTÓN DE SERVICIOS ADICIONALES */}
        <div className="mt-2 text-center max-w-lg">
          <button 
            onClick={() => abrirModal("SERVICIOS ADICIONALES")}
            className="group flex flex-col items-center justify-center hover:opacity-80 transition-opacity"
          >
            <span className="font-black uppercase text-xs md:text-sm border-b-[2px] border-black pb-0.5 mb-1">
              SERVICIOS ADICIONALES QUE OFRECEMOS
            </span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-black/70">
              ( CATERING, STAND DE GLITTER, CABINA 360, FOTOGRAFÍA, STREAMING )
            </span>
          </button>
        </div>

      </main>

      {/* FOOTER / PIE DE PÁGINA */}
      <footer className="w-full py-2 text-center shrink-0">
        <p className={`${fontTitulo.className} text-xl md:text-2xl text-black/30`}>PANDA DJ & DEBO SEGATTI</p>
        <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Buenos Aires • 2026</p>
      </footer>

      {/* MODAL / FORMULARIO EMERGENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Fondo oscuro con desenfoque */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)} />
          
          {/* Contenedor del modal */}
          <div className="relative bg-[#111] text-white w-full max-w-md rounded-3xl border-[4px] border-white shadow-[0px_0px_40px_rgba(255,255,255,0.2)] p-6 md:p-8 overflow-hidden animate-slide-up">
            
            {/* Indicador "REC" (Animación de grabación) */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-[8px] font-mono tracking-widest text-gray-400">REC</span>
            </div>

            {/* Botón de cerrar modal (X) */}
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-6 text-2xl font-bold hover:text-red-500 transition-colors">×</button>

            {/* Contenido del modal: Mensaje de éxito o formulario */}
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
                  {/* Etiqueta con el tipo de evento seleccionado */}
                  <div className="inline-block bg-white text-black px-3 py-1 font-bold text-[10px] uppercase tracking-widest rounded-sm transform -rotate-2">
                    {evento}
                  </div>
                </div>

                {/* Formulario de contacto */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Campo Nombre */}
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
                  
                  {/* Campo WhatsApp con prefijo +54 9 */}
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

                  {/* Botón de Enviar */}
                  <button 
                    type="submit" 
                    disabled={enviando} 
                    className="w-full bg-white text-black py-3 rounded-xl text-base font-black uppercase tracking-widest hover:bg-[#cec1ad] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0px_0px_20px_rgba(255,255,255,0.3)] mt-2"
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