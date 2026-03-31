'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Magnet, Activity, Droplets, FlaskConical, Gauge, Workflow, ArrowRight } from 'lucide-react';

const productTypes = [
  {
    title: "Bombas Magnéticas",
    desc: "Indicadas para líquidos perigosos ou corrosivos, eliminam selos mecânicos e ajudam a prevenir vazamentos.",
    image: "/bombasMag.webp",
    Icon: Magnet
  },
  {
    title: "Bombas Centrífugas",
    desc: "Convertem energia mecânica em cinética e pressão. Amplamente utilizadas para movimentação contínua.",
    image: "/bombasCentrifugas.webp",
    Icon: Workflow 
  },
  {
    title: "Bombas Dosadoras",
    desc: "Projetadas para dosagem precisa e repetível, entregam quantidades exatas de fluido.",
    image: "/bombasDosadoras.webp",
    Icon: Gauge 
  },
  {
    title: "Bombas Sanitárias",
    desc: "Construídas em aço inoxidável com superfícies lisas para fácil limpeza (CIP). Alimentos e farmacêutica.",
    image: "/bombasSanitarias.webp",
    Icon: Droplets
  },
  {
    title: "Bombas de Engrenagem",
    desc: "Trabalham com deslocamento positivo para fluidos viscosos. Adequadas para óleos e polímeros.",
    image: "/bombasEngrenagem.webp",
    Icon: Activity
  },
  {
    title: "Bombas Químicas",
    desc: "Resistentes a líquidos tóxicos ou corrosivos com máxima segurança operacional.",
    image: "/bombasQuimicas.webp",
    Icon: FlaskConical
  }
];

export default function ProductCards({ onOpenModal }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom text-center mb-16 md:mb-24">
        <span className="text-[#004a99] font-black tracking-[0.4em] 
        text-[10px] uppercase mb-4 block">Portfólio Industrial</span>
        <h2 className="text-3xl md:text-5xl 
        font-black text-[#003366] mb-8 uppercase tracking-tighter">
          Tipos de <span className="text-blue-500 font-black">Bombas.</span>
        </h2>
        <p className="text-sm md:text-[12px] text-slate-500 
        max-w-xl mx-auto font-bold uppercase 
        tracking-wide leading-relaxed">
          Equipamentos de alta precisão 
          adequados às exigências de cada aplicação.
        </p>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productTypes.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,74,153,0.15)] transition-all duration-500 flex flex-col h-full"
            >
              <div className="h-56 overflow-hidden relative bg-slate-50/50 p-6">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain group-hover:scale-110 
                  transition-all duration-700 p-4" 
                />
                <div className="absolute inset-0 bg-[#003366]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2.5 bg-slate-50 rounded-lg text-[#003366] group-hover:bg-[#ffd700] transition-colors duration-300">
                    <product.Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-black text-[#003366] uppercase tracking-tight">{product.title}</h3>
                </div>
                <p className="text-[12px] text-slate-500 leading-relaxed font-bold uppercase mb-8 tracking-wide">
                  {product.desc}
                </p>
                
                <div className="mt-auto">
                   <button
                    onClick={onOpenModal}
                    className="flex items-center gap-2 text-[#004a99] font-black text-[11px] tracking-[0.08em] uppercase group-hover:text-blue-600 transition-colors"
                   >
                     Solicitar Cotação <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="h-1 w-6 bg-[#ffd700] group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
