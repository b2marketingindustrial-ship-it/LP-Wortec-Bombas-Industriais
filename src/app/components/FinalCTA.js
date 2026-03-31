'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-50 border border-slate-100 rounded-3xl p-12 md:p-24 text-center shadow-inner relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd700]/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-8 leading-[1.1] tracking-tighter uppercase max-w-4xl mx-auto">
            Proteja sua operação com a <br /> <span className="text-blue-500 font-black">bomba correta.</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-wide">
            A Wortec ajuda sua empresa a identificar a solução mais adequada para sua planta.
          </p>
          
          <button
            onClick={onOpenModal}
            className="group relative inline-flex items-center justify-center px-9 py-4 md:px-10 md:py-5 font-black text-[11px] tracking-[0.14em] bg-[#004a99] text-white rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#003366] shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-4">
              SOLICITAR CONSULTORIA <ArrowRight size={16} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
