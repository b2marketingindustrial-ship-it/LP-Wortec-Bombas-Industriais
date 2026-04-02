'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ChatForm from './ChatForm';

export default function Hero({ onOpenModal }) {
  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center pt-28 pb-8 overflow-hidden bg-[#003366]">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#003366]/60 to-transparent z-10" />
        <Image 
          src="/lp/bombasindustriais/painImg.png" 
          alt="Industrial Pump" 
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_center] opacity-30 scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="relative 
      z-20 w-full max-w-7xl 
      mx-auto px-6 lg:px-16 text-white">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 
        gap-30 items-center">
          
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 
            py-1 mb-6 text-[10px] 
            font-black tracking-[0.4em] 
            uppercase bg-[#ffd700] text-[#003366] rounded-sm">
              TECNOLOGIA INDUSTRIAL AFIRMADA
            </span>

            <h1 className="text-4xl 
            md:text-5xl lg:text-[45px] 
            font-black leading-[1.1] 
            mb-8 tracking-tighter 
            uppercase whitespace-pre-line">
              Bombas industriais para&nbsp;
              <span className="text-[#ffd700]">todas as aplicações.</span>
            </h1>

            <p className="text-sm md:text-[15px] 
            text-white/70 mb-10 
            leading-relaxed max-w-xl 
            font-medium uppercase tracking-wide">
              Soluções precisas em transferência e dosagem de fluidos para aplicações de alta complexidade. Desempenho onde sua planta mais precisa.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center justify-center px-9 py-4 md:px-10 md:py-5 font-black text-[11px] tracking-[0.14em] bg-[#ffd700] text-[#003366] rounded-sm overflow-hidden transition-all duration-300 hover:bg-white active:scale-95 shadow-xl uppercase border-2 border-transparent"
              >
                <span className="relative z-10">
                  SOLICITAR CONSULTA TÉCNICA
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: ChatBot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
             <div className="absolute -inset-4 
             bg-[#ffd700]/10 blur-3xl 
             rounded-full" />
             <div className="relative 
             bg-white/5 backdrop-blur-md 
             rounded-3xl p-1 border 
             border-white/10 shadow-2xl">
                <ChatForm />
             </div>
          </motion.div>

          {/* Mobile ChatBot (Show below on mobile) */}
          <div className="lg:hidden mt-8">
             <ChatForm />
          </div>

        </div>
      </div>
    </section>
  );
}