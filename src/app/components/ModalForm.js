import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModalForm({ isOpen, onClose }) {

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        product: '',
        email: '',
        phone: '',
        finality: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sucessMsg, setsucessMsg] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let utmData = {
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            utm_content: "",
            utm_term: ""
        };

        try {
            const savedUtm = localStorage.getItem("utm");
            if (savedUtm) {
                utmData = JSON.parse(savedUtm);
            }
        } catch (e) {
            console.error("Erro ao buscar UTMs do localStorage", e);
        }
        try {
            const payload = {
                event_type: "CONVERSION",
                event_family: "CDP",
                payload: {
                    conversion_identifier: "[B2] Form Wortec Bombas",

                    name: formData.name,
                    email: formData.email,
                    mobile_phone: formData.phone || "",
                    company_name: formData.company || "",

                    cf_product: formData.product || "",
                    cf_finality: formData.finality || "",

                    traffic_source: utmData.utm_source || "",
                    traffic_medium: utmData.utm_medium || "",
                    traffic_campaign: utmData.utm_campaign || "",
                    traffic_content: utmData.utm_content || "",
                    traffic_term: utmData.utm_term || "",

                },
            };

            let res = await fetch(
                "https://api.rd.services/platform/conversions?api_key=eJBjsYwIdDVXDPsSXgzXbIJXMBoszARFmOQw",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                console.error("Erro ao enviar para o RD:", result);
                setError(true);
                return;
            }
            setsucessMsg(true);
            console.log("Lead enviado com sucesso:", result);

            const whatsMsg = `Olá, gostaria de falar com um especialista da Wortec. Meu nome 
                é ${formData.name} e estou interessado na solução: ${formData.product}. 
                Poderiam me ajudar?.`;

            const whatsNumber = '558192039379';

            window.open(`https://wa.me/${whatsNumber}?text=${encodeURIComponent(whatsMsg)}`, '_blank');

            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    company: '',
                    product: '',
                    email: '',
                    phone: '',
                    finality: '',
                });
                onClose();
            }, 3000);

        } catch (err) {
            console.error("Erro geral:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative bg-white shadow-2xl w-full max-w-lg h-full flex flex-col z-[101] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-[#004a99] to-[#003366] p-8 md:p-10 shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Fale com um Especialista</h2>
                            <p className="text-white/80 text-[10px] md:text-xs mt-2 font-bold uppercase tracking-widest">Soluções personalizadas em bombas industriais</p>
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-300"
                                aria-label="Fechar"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 md:p-10 flex-1">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-[#004a99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Solicitação Enviada!</h3>
                                    <p className="text-slate-500 mb-4 font-bold uppercase text-xs">Obrigado pelo contato, <span className="text-[#004a99]">{formData.name}</span>.</p>
                                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Nossa equipe retornará em breve.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 tracking-widest uppercase">NOME COMPLETO</label>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                placeholder="Como podemos te chamar?"
                                                required
                                                className="w-full rounded-sm border-b-2 border-slate-100 bg-slate-50/50 px-4 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-all font-bold"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 tracking-widest uppercase">EMPRESA</label>
                                            <input
                                                name="company"
                                                value={formData.company}
                                                placeholder="Nome da sua organização"
                                                required
                                                className="w-full rounded-sm border-b-2 border-slate-100 bg-slate-50/50 px-4 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-all font-bold"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-900 tracking-widest uppercase">PRODUTO OU APLICAÇÃO</label>
                                            <input
                                                name="product"
                                                value={formData.product}
                                                placeholder="Qual tipo de bomba ou processo?"
                                                required
                                                className="w-full rounded-sm border-b-2 border-slate-100 bg-slate-50/50 px-4 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-all font-bold"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-900 tracking-widest uppercase">EMAIL CORPORATIVO</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    placeholder="seu@email.com"
                                                    required
                                                    className="w-full rounded-sm border-b-2 border-slate-100 bg-slate-50/50 px-4 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-all font-bold"
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-900 tracking-widest uppercase">WHATSAPP</label>
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    placeholder="(00) 00000-0000"
                                                    required
                                                    className="w-full rounded-sm border-b-2 border-slate-100 bg-slate-50/50 px-4 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#ffd700] transition-all font-bold"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 pt-2">
                                        <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 text-[#004a99] border-gray-300 rounded focus:ring-[#ffd700]" />
                                        <label htmlFor="consent" className="text-[9px] text-slate-400 leading-tight uppercase font-black tracking-widest">
                                            Concordo em receber comunicações e estou ciente da{' '}
                                            <a href="#" className="underline hover:text-[#004a99]">Política de Privacidade</a>
                                        </label>
                                    </div>

                                    <div className="pt-6">
                                        <button type="submit" disabled={loading} className="w-full 
                        bg-[#ffd700] hover:bg-[#003366] hover:text-white text-[#003366] 
                        font-black text-[11px] tracking-[0.3em] py-5 rounded-sm transition-all duration-300 transform active:scale-95 shadow-xl uppercase">
                                            {loading ? "Processando..." : "ENVIAR SOLICITAÇÃO TÉCNICA"}
                                        </button>
                                        <div className="mt-4 text-center">
                                            {error && <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Erro ao enviar formulário.</span>}
                                            {sucessMsg && <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest">Enviado com sucesso!</span>}
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-slate-100 p-6 bg-slate-50/50 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black">
                                Privacidade Garantida • Conexão Segura
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}