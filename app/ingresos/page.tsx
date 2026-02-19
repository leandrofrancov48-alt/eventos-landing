'use client';
import React, { useState } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';

// Fuentes (nota el ../ para volver a la carpeta principal)
const fontTitulo = localFont({
  src: '../fonts/YellowBalloon200-Regular.ttf',
  display: 'swap',
});

const fontCuerpo = localFont({
  src: '../fonts/YellowBalloonW00Regular.ttf',
  display: 'swap',
});

export default function RegistroIngreso() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // ACÁ VAS A PONER EL LINK DEL NUEVO WEBHOOK DE MAKE
  const WEBHOOK_URL = "ACA_PONE_EL_NUEVO_LINK_DE_MAKE"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      dni: formData.get('dni'),
      fechaNacimiento: formData.get('fechaNacimiento'),
      celular: formData.get('celular'),
      email: formData.get('email'),
      fechaRegistro: "'" + new Date().toLocaleString('es-AR'), // Hora exacta en la que entró
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEnviado(true);
      // Recarga la página a los 3 segundos para que escanee el siguiente
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      alert("Hubo un error al registrar el ingreso.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={`${fontCuerpo.className} min-h-screen w-full bg-[#cec1ad] text-black flex flex-col items-center py-6 px-4`}>
      
      {/* HEADER SIMPLE (Logos) */}
      <div className="flex justify-center items-center gap-4 mb-6 md:mb-10 w-full max-w-2xl">
        <div className="relative h-10 w-28 md:h-14 md:w-36 rotate-[-2deg]">
          <Image src="/PANDA-DJ-LOGO-NEGRO-2.png" alt="Panda DJ" fill className="object-contain" />
        </div>
        <div className="relative h-14 w-28 md:h-20 md:w-40 scale-110">
          <Image src="/image_4.png" alt="Hacemos Tu Evento" fill className="object-contain" />
        </div>
        <div className="relative h-12 w-32 md:h-16 md:w-44 rotate-[2deg]">
          <Image src="/DEBO SEGATTI LOGO NEGRO PNG.png" alt="Debo Segatti" fill className="object-contain" />
        </div>
      </div>

      {/* CONTENEDOR DEL FORMULARIO */}
      <main className="w-full max-w-lg bg-white border-[4px] border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
        
        {enviado ? (
           <div className="text-center py-16 animate-fade-in">
             <div className="text-6xl mb-4">✅</div>
             <h2 className={`${fontTitulo.className} text-4xl mb-2 text-black`}>¡INGRESO REGISTRADO!</h2>
             <p className="font-mono text-xs text-black/60 uppercase tracking-widest font-bold">¡Que disfrutes el evento!</p>
             <p className="text-[10px] text-gray-400 mt-8">Actualizando para el próximo invitado...</p>
           </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className={`${fontTitulo.className} text-4xl md:text-5xl text-black leading-none mb-1`}>
                REGISTRO DE<br/>INGRESO
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-black/60">Por favor completá tus datos</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">Nombre</label>
                  <input name="nombre" type="text" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">Apellido</label>
                  <input name="apellido" type="text" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">DNI / Pasaporte</label>
                <input name="dni" type="number" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">Fecha de Nacimiento</label>
                <input name="fechaNacimiento" type="date" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">Celular</label>
                <input name="celular" type="tel" placeholder="Ej: 11 1234 5678" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">E-mail</label>
                <input name="email" type="email" placeholder="tu@email.com" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              </div>

              <button 
                type="submit" 
                disabled={enviando} 
                className="w-full bg-black text-[#cec1ad] py-4 rounded-xl text-lg font-black uppercase tracking-widest hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[4px_4px_0px_0px_#cec1ad] border-[2px] border-black mt-4"
              >
                {enviando ? "PROCESANDO..." : "REGISTRAR INGRESO"}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}