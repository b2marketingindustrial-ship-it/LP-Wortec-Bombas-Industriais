'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Droplets } from 'lucide-react';

export default function Solution() {
  return (
    <section className="section-padding bg-slate-50 overflow-hidden">
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
            shadow-[0_20px_60px_rgba(0,0,0,0.45)] 
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
          </motion.div>

          {/* Text Column - Right (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#004a99] font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">Especialistas em Fluidos</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-10 leading-[1.1] tracking-tighter uppercase">
              A tecnologia certa <br /> para o seu processo.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 group">
                <div className="text-[#ffd700]"><ShieldCheck size={24} strokeWidth={2.5} /></div>
                <div>
                  <h4 className="font-black text-[#003366] text-xs uppercase mb-1">Precisão Técnica</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-normal">Adequação técnica rigorosa para garantir durabilidade.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="text-[#ffd700]"><Droplets size={24} strokeWidth={2.5} /></div>
                <div>
                  <h4 className="font-black text-[#003366] text-xs uppercase mb-1">Segurança Total</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-normal">Componentes de ponta que previnem falhas críticas.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="text-[#ffd700]"><Zap size={24} strokeWidth={2.5} /></div>
                <div>
                  <h4 className="font-black text-[#003366] text-xs uppercase mb-1">Alta Eficiência</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-normal">Menor custo de manutenção e operacional por ciclo.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
