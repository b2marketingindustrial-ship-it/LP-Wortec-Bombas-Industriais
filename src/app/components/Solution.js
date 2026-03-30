'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Droplets } from 'lucide-react';

export default function Solution({ onOpenModal }) {
  return (
    <section className="section-padding bg-slate-50 overflow-hidden">
      <div className="container-custom text-center mb-16">
         <span className="text-[#004a99] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Especialistas em Fluidos</span>
         <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-10 leading-[1.1] tracking-tighter uppercase whitespace-pre-line">
            A tecnologia certa {"\n"} 
            <span className="text-blue-500 font-black">para o seu processo.</span>
         </h2>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-24 items-center text-left">
          {/* Image Column - Left (40%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-2xl 
            shadow-[0_40px_80px_rgba(0,0,0,0.1)] 
            z-10 overflow-hidden border-4 border-white">
              <Image 
                src="/magnetic-pump.png" 
                alt="Wortec Solution" 
                width={500}
                height={375}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full -z-10 blur-2xl opacity-50" />
          </motion.div>

          {/* Text Column - Right (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 group bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="text-[#ffd700]"><ShieldCheck size={28} strokeWidth={2.5} /></div>
                <div>
                  <h4 className="font-black text-[#003366] text-[10px] uppercase mb-2 tracking-widest">Precisão Técnica</h4>
                  <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">Adequação técnica rigorosa para garantir durabilidade.</p>
                </div>
              </div>
              <div className="flex gap-4 group bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="text-[#ffd700]"><Droplets size={28} strokeWidth={2.5} /></div>
                <div>
                  <h4 className="font-black text-[#003366] text-[10px] uppercase mb-2 tracking-widest">Segurança Total</h4>
                  <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">Componentes que previnem falhas críticas em plantas.</p>
                </div>
              </div>
              <div className="flex gap-4 group bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md md:col-span-2">
                <div className="text-[#ffd700]"><Zap size={28} strokeWidth={2.5} /></div>
                <div>
                  <h4 className="font-black text-[#003366] text-[10px] uppercase mb-2 tracking-widest">Alta Eficiência Operacional</h4>
                  <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">Menor custo de manutenção e operacional por ciclo com nossa tecnologia.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-start">
               <button
                  onClick={onOpenModal}
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-[10px] tracking-[0.4em] bg-[#ffd700] text-[#003366] rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#003366] hover:text-white active:scale-95 shadow-xl uppercase border-2 border-transparent"
               >
                  SOLICITAR CONSULTA
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
