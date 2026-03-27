'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero({ onOpenModal }) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 overflow-hidden bg-[#003366]">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#003366]/40 to-transparent z-10" />
        <Image 
          src="/hero-pump.png" 
          alt="Industrial Pump" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_center] opacity-40 scale-105"
        />
      </div>

      {/* CONTENT (sem container-custom) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 text-white">
        
        <div className="max-w-[85%] lg:max-w-[65%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <span className="inline-block px-4 py-1 mb-6 text-[10px] font-black tracking-[0.4em] uppercase bg-[#ffd700] text-[#003366] rounded-sm">
              TECNOLOGIA INDUSTRIAL AFIRMADA
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 tracking-tighter uppercase whitespace-pre-line">
              Bombas que {"\n"}
              <span className="text-[#ffd700]">impulsionam</span> seu{"\n"}
              processo operacional.
            </h1>

            <p className="text-sm md:text-lg text-white/70 mb-10 leading-relaxed max-w-xl font-medium">
              Soluções precisas em transferência e dosagem de fluidos para aplicações de alta complexidade. Desempenho onde sua planta mais precisa.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-xs tracking-[0.2em] bg-[#ffd700] text-[#003366] rounded-sm overflow-hidden transition-all duration-300 hover:bg-white active:scale-95 shadow-xl"
              >
                <span className="relative z-10 uppercase">
                  SOLICITAR CONSULTA TÉCNICA
                </span>
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}