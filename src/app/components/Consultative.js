'use client';
import { motion } from 'framer-motion';
import { Activity, Thermometer, ShieldAlert, Zap } from 'lucide-react';

export default function Consultative({ onOpenModal }) {
  return (
    <section className="section-padding bg-[#003366] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 skew-x-[-15deg] translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#ffd700]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#ffd700] font-black tracking-[0.4em] text-[10px] uppercase mb-10 block">Suporte Consultivo Especializado</span>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter uppercase max-w-4xl mx-auto whitespace-pre-line">
              Cada fluido exige uma {"\n"} <span className="text-[#ffd700]">solução técnica única.</span>
            </h2>
            <p className="text-sm md:text-lg text-blue-100/60 mb-16 leading-relaxed max-w-2xl mx-auto font-bold uppercase tracking-widest">
              Viscosidade, corrosividade, pureza e pressão são variáveis críticas. A Wortec oferece <span className="text-white font-black">apoio técnico especializado</span> para garantir a tecnologia ideal para sua planta.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-white/40 mb-20">
              <div className="flex flex-col items-center gap-4 group cursor-help transition-all duration-300">
                <div className="text-[#ffd700] group-hover:scale-125 transition-transform duration-500"><Activity size={32} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors duration-300">Viscosidade</span>
              </div>
              <div className="flex flex-col items-center gap-4 group cursor-help transition-all duration-300">
                <div className="text-[#ffd700] group-hover:scale-125 transition-transform duration-500"><ShieldAlert size={32} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors duration-300">Corrosividade</span>
              </div>
              <div className="flex flex-col items-center gap-4 group cursor-help transition-all duration-300">
                <div className="text-[#ffd700] group-hover:scale-125 transition-transform duration-500"><Thermometer size={32} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors duration-300">Temperatura</span>
              </div>
              <div className="flex flex-col items-center gap-4 group cursor-help transition-all duration-300">
                <div className="text-[#ffd700] group-hover:scale-125 transition-transform duration-500"><Zap size={32} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors duration-300">Pressão</span>
              </div>
            </div>

            <div className="mt-12">
               <button
                  onClick={onOpenModal}
                  className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-[10px] tracking-[0.5em] bg-[#ffd700] text-[#003366] rounded-sm overflow-hidden transition-all duration-300 hover:bg-white active:scale-95 shadow-2xl uppercase border-2 border-transparent"
               >
                  AGENDAR ANÁLISE TÉCNICA
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
