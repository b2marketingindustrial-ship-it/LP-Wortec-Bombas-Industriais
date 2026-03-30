'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-8 bg-[#003366] text-white border-t border-white/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image 
              src="/wortecLogo.webp" 
              alt="Logo Wortec" 
              width={140} 
              height={40}
              className='object-contain brightness-0 
              invert opacity-70 hover:opacity-100 
              transition-opacity' 
            />
          </div>

          {/* Simple Info Line */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-center">
            <span>Av. Industrial, 1000 - Setor Sul</span>
            <span className="text-[#ffd700]">(81) 3222-2222</span>
            <span className="lowercase tracking-normal font-bold">contato@wortec.com.br</span>
          </div>

          {/* Copyright & B2 */}
          <div className="text-center md:text-right flex 
          flex-col items-center md:items-end">
            <span>© {new Date().getFullYear()} Wortec Bombas Industriais</span>
            <a 
              href="https://b2marketing.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#ffd700] hover:text-white 
              transition-colors"
            >
             Desenvolvido por B2 Marketing Industrial
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
