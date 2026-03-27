'use client';

export default function Footer() {
  return (
    <footer className="py-16 bg-[#003366] text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          {/* Logo & Info */}
          <div>
            <div className="text-3xl font-black tracking-tighter mb-6">
              WORTEC<span className="text-[#ffd700]">.</span>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Soluções avançadas em bombas industriais para processos de alta exigência técnica e operacional.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-black text-[#ffd700] tracking-widest text-xs uppercase">Contato</h4>
            <p className="text-sm">Av. Industrial, 1000 - Setor Sul</p>
            <p className="text-sm font-bold">(81) 3222-2222</p>
            <p className="text-sm italic">contato@wortec.com.br</p>
          </div>

          {/* Copyright & B2 */}
          <div className="text-center md:text-right">
            <p className="text-xs text-blue-100/40 mb-4 font-bold tracking-widest uppercase">
              © {new Date().getFullYear()} Wortec Bombas Industriais.
            </p>
            <p className="text-xs text-blue-100/60">
              Desenvolvido por{' '}
              <a 
                href="https://b2marketing.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#ffd700] hover:text-white transition-colors font-black underline underline-offset-4"
              >
                B2 Marketing Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
