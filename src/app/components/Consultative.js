'use client';
import { motion } from 'framer-motion';
import { Activity, Thermometer, ShieldAlert, Zap } from 'lucide-react';

export default function Consultative() {
  return (
    <section className="section-padding bg-[#003366] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 skew-x-[-15deg] translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#ffd700]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#ffd700] font-black tracking-[0.4em] text-[10px] uppercase mb-10 block">Suporte Consultivo</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-[1.1] tracking-tighter uppercase max-w-3xl mx-auto">
              Cada fluido exige uma <br /> <span className="text-[#ffd700]">solução específica.</span>
            </h2>
            <p className="text-sm md:text-base text-blue-100/60 mb-16 leading-relaxed max-w-2xl mx-auto font-semibold uppercase tracking-wide">
              Viscosidade, corrosividade, pureza e pressão são variáveis críticas. A Wortec oferece <span className="text-white font-black">apoio técnico especializado</span> para garantir a tecnologia ideal.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-white/40">
              <div className="flex flex-col items-center gap-4 group">
                <div className="text-[#ffd700] group-hover:scale-110 transition-transform"><Activity size={28} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors">Viscosidade</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="text-[#ffd700] group-hover:scale-110 transition-transform"><ShieldAlert size={28} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors">Corrosividade</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="text-[#ffd700] group-hover:scale-110 transition-transform"><Thermometer size={28} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors">Temperatura</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="text-[#ffd700] group-hover:scale-110 transition-transform"><Zap size={28} strokeWidth={1.5} /></div>
                <span className="font-black tracking-[0.3em] text-[10px] uppercase group-hover:text-white transition-colors">Pressão</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
