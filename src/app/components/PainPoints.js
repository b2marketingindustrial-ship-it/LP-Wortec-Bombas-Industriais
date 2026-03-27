'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PainPoints() {
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
            <span className="text-yellow-400 
            font-black 
            tracking-[0.4em] text-[15px] 
            uppercase mb-6 block">Desafios na Operação</span>
            
            <h2 className="text-3xl md:text-4xl font-black 
            text-[#003366] mb-8 leading-[1.1] tracking-tighter uppercase">
              Nem toda bomba industrial <br />
              <span className="text-blue-500 font-black">atende com precisão.</span>
            </h2>
            <div className="space-y-6 text-sm 
            md:text-base text-slate-500 font-medium max-w-xl leading-relaxed">
              <p>
                Quando a especificação não conversa com a aplicação, o resultado pode ser perda de eficiência, desgaste prematuro, falhas no processo e riscos de segurança.
              </p>
              <p className="font-black text-[#003366] border-l-4 border-[#ffd700] pl-6 py-2 bg-slate-50/50">
                A escolha técnica correta impacta diretamente a estabilidade de toda a planta industrial.
              </p>
            </div>
          </motion.div>

          {/* Image Column - Right (40%) */}
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
            border border-slate-50
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <Image 
                src="/heroBg.webp" 
                alt="Falha operacional " 
                width={500}
                height={375}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Subtle decorative dot pattern or background */}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#ffd700] rounded-full -z-10 shadow-xl opacity-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
