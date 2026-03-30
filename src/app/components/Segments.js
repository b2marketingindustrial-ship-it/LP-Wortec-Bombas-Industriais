'use client';
import { motion } from 'framer-motion';
import { Beaker, Droplets, Utensils, Pill, Sparkles, Fuel } from 'lucide-react';

const segments = [
  { name: "Indústria Química", Icon: Beaker },
  { name: "Tratamento de Água", Icon: Droplets },
  { name: "Alimentos e Bebedas", Icon: Utensils },
  { name: "Farmacêutica", Icon: Pill },
  { name: "Cosmética", Icon: Sparkles },
  { name: "Petroquímica", Icon: Fuel }
];

export default function Segments({ onOpenModal }) {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom text-center mb-16 md:mb-20">
        <span className="text-[#004a99] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Segmentos Atendidos</span>
        <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-8 uppercase tracking-tighter">
          Soluções para <span className="text-blue-500 font-black">cada indústria.</span>
        </h2>
        <p className="text-sm md:text-md text-slate-500 max-w-xl mx-auto font-bold uppercase tracking-wide">
          Tecnologias validadas pelas maiores exigências técnicas de cada setor.
        </p>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4 lg:px-0 mb-16">
          {segments.map((segment, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, type: "spring", stiffness: 300 }}
              className="group bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-slate-100 flex flex-col items-center gap-8 min-h-[220px] justify-center"
            >
              <div className="text-[#004a99] p-5 bg-blue-50/50 rounded-full transition-all duration-500 border border-blue-100/30">
                <segment.Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] leading-tight">
                {segment.name}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
    <button
            onClick={onOpenModal}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-[10px] tracking-[0.4em] bg-[#004a99] text-white rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#003366] active:scale-95 shadow-xl uppercase border-2 border-transparent"
          >
            SOLICITAR CONSULTORIA POR SEGMENTO
          </button>
        </div>
      </div>
    </section>
  );
}
