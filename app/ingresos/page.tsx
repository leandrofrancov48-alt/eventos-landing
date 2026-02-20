'use client';
import React, { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';

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
  const [listaEventos, setListaEventos] = useState<string[]>([]);

  // 1. LINK DEL CSV DE GOOGLE SHEETS (Eventos Activos)
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLN-9vjKE1GGSfwG3lpMG843nt-dOg61OIpBWUnJjyzwgfHW2tw5MhTfnAqYyhmZXrzmtH_RYjAbkF/pub?gid=1882702651&single=true&output=csv"; 
  
  // 2. LINK DEL WEBHOOK DE MAKE (Ingresos)
  const WEBHOOK_URL = "https://hook.us2.make.com/wibmwo5tmoml0je1w9pe4ixecat8ja2w"; 

  // Esta función lee el Excel apenas carga la página
  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await fetch(CSV_URL);
        const text = await response.text();
        // Separa por filas y saca los espacios vacíos
        const eventos = text.split('\n').map(e => e.trim()).filter(e => e.length > 0);
        setListaEventos(eventos);
      } catch (error) {
        console.error("Error cargando eventos", error);
        setListaEventos(["Evento General"]); // Fallback por si falla el Excel
      }
    };
    cargarEventos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      eventoSeleccionado: formData.get('evento'), // Capturamos qué evento eligió
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      dni: formData.get('dni'),
      fechaNacimiento: formData.get('fechaNacimiento'),
      celular: formData.get('celular'),
      email: formData.get('email'),
      fechaRegistro: "'" + new Date().toLocaleString('es-AR'),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEnviado(true);
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

      <main className="w-full max-w-lg bg-white border-[4px] border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
        
        {enviado ? (
           <div className="text-center py-16 animate-fade-in">
             <div className="text-6xl mb-4">✅</div>
             <h2 className={`${fontTitulo.className} text-4xl mb-2 text-black`}>¡INGRESO REGISTRADO!</h2>
             <p className="font-mono text-xs text-black/60 uppercase tracking-widest font-bold">¡Que disfrutes el evento!</p>
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
              
              {/* CAMPO: SELECCIÓN DE EVENTO */}
              <div className="space-y-1 mb-2">
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">¿A qué evento asistís?</label>
                <div className="relative">
                  <select 
                    name="evento" 
                    required 
                    className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] appearance-none cursor-pointer"
                  >
                    <option value="">Seleccioná de la lista...</option>
                    {listaEventos.map((ev, index) => (
                      <option key={index} value={ev}>{ev}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

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
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">DNI</label>
                <input name="dni" type="number" required className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-black tracking-[0.1em] uppercase ml-1">Fecha de Nacimiento</label>
                <input 
                  name="fechaNacimiento" 
                  type="date" 
                  required 
                  onClick={(e) => { if ('showPicker' in e.currentTarget) e.currentTarget.showPicker(); }}
                  className="w-full bg-[#f4f0ea] border-[2px] border-black focus:border-black focus:bg-white rounded-xl p-3 text-black font-bold outline-none transition-colors font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer" 
                />
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