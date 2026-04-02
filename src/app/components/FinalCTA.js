'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function FinalCTA({ onOpenModal }) {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ffd700]/10 rounded-full blur-3xl" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 lg:p-14 text-center lg:text-left shadow-inner relative overflow-hidden"
        >
            <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-6 leading-[1.1] tracking-tighter uppercase">
              Proteja sua operação com&nbsp;{"\n"}
              <span className="text-blue-500 font-black">a bomba correta.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 mb-10 max-w-xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed font-bold uppercase tracking-wide">
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[1.8rem] bg-gradient-to-br from-[#003366]/20 via-[#004a99]/10 to-[#ffd700]/20 blur-md" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#ffd700]/20 rounded-full blur-2xl" />
            <div className="relative rounded-[1.6rem] overflow-hidden border border-white/70 
            bg-white shadow-[0_30px_70px_rgba(0,51,102,0.25),0_10px_25px_rgba(0,0,0,0.15)] transition-transform 
            duration-500 hover:-translate-y-1">
              <Image
                src="/painImg.png"
                alt="Bomba Industrial"
                width={920}
                height={620}
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
