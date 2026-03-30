'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PainPoints({ onOpenModal }) {
  return (
    <section className="section-padding bg-slate-200 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] 
        gap-12 lg:gap-24 items-center">
          {/* Text Column - Left (60%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 
            font-black 
            tracking-[0.4em] text-[10px] 
            uppercase mb-6 block">Desafios na Operação</span>
            
            <h2 className="text-3xl md:text-5xl font-black 
            text-[#003366] mb-8 leading-[1.1] tracking-tighter uppercase whitespace-pre-line">
              Nem toda bomba industrial {"\n"}
              <span className="text-blue-500 font-black">atende com precisão.</span>
            </h2>
            <div className="space-y-6 text-sm 
            md:text-base text-slate-500 font-medium max-w-xl leading-relaxed">
              <p className="uppercase tracking-wide font-bold">
                Quando a especificação não conversa com a aplicação, o resultado pode ser perda de eficiência, desgaste prematuro, falhas no processo e riscos de segurança.
              </p>
              <p className="font-black text-[#003366] border-l-4 border-[#ffd700] pl-6 py-4 bg-white/50 shadow-sm uppercase tracking-wider text-[11px]">
                A escolha técnica correta impacta diretamente a estabilidade de toda a planta industrial. Aproveite nossa consultoria gratuita.
              </p>
            </div>

            <div className="mt-10">
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-[10px] tracking-[0.4em] bg-[#004a99] text-white rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#003366] active:scale-95 shadow-xl uppercase"
              >
                CONSULTAR ESPECIALISTA
              </button>
            </div>
          </motion.div>

          {/* Image(40%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl 
            z-10 overflow-hidden transform 
            hover:scale-[1.03] transition-all duration-500 
            border-4 border-white
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <Image 
                src="/painImg.png" 
                alt="Falha operacional " 
                width={500}
                height={375}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto object-cover opacity-90"
              />
            </div>
            {/* Subtle decorative dot pattern or background */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ffd700] rounded-full -z-10 shadow-xl opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
