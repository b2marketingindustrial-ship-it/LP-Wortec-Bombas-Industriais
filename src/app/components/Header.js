'use client';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ onOpenModal }) {
  return (
    <header className="fixed top-0 left-0 w-full z-[80] bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container-custom h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-black text-[#003366] tracking-tighter">
          WORTEC<span className="text-[#ffd700]">.</span>
        </div>

        {/* Contact info - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-600 font-bold text-xs tracking-widest">
            <Phone size={16} className="text-[#ffd700]" />
            (81) 3222-2222
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-bold text-xs tracking-widest">
            <Mail size={16} className="text-[#ffd700]" />
            contato@wortec.com.br
          </div>
          <button
            onClick={onOpenModal}
            className="bg-[#004a99] text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest hover:bg-[#003366] transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <MessageSquare size={14} /> FALE AGORA
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={onOpenModal}
          className="lg:hidden bg-[#ffd700] p-3 rounded-xl text-[#003366] shadow-md"
        >
          <MessageSquare size={20} />
        </button>
      </div>
    </header>
  );
}
