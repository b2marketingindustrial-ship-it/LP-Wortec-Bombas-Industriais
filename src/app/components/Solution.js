'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Droplets, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function Solution() {
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
                    conversion_identifier: "[B2]Form Wortec Bombas Industriais",
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

            if (!res.ok) {
                setError(true);
                return;
            }
            
            setsucessMsg(true);
            const whatsMsg = `Olá, gostaria de falar com um especialista da Wortec. Meu nome é ${formData.name} e estou 
            interessado na solução de ${formData.product}. Poderiam me ajudar?`;
            const whatsNumber = '5581992039379'; 

            window.open(`https://wa.me/${whatsNumber}?text=${encodeURIComponent(whatsMsg)}`, '_blank');
            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
                setsucessMsg(false);
                setFormData({
                    name: '',
                    company: '',
                    product: '',
                    email: '',
                    phone: '',
                    finality: '',
                });
            }, 3000);

        } catch (err) {
            console.error("Erro geral:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-padding bg-slate-50 overflow-hidden" id="solution">
            <div className="container-custom text-center mb-16">
                <span className="text-[#004a99] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Especialistas em Fluidos</span>
                <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-10 leading-[1.1] tracking-tighter uppercase whitespace-pre-line">
                    A tecnologia certa {"\n"}
                    <span className="text-blue-500 font-black">para o seu processo.</span>
                </h2>
            </div>

            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
                    {/* Form Column - Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="bg-white rounded-3xl shadow-[0_40px_80px_rgba(0,51,102,0.1)] p-8 md:p-10 border border-slate-100 relative overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]" />
                            
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#003366] mb-4 uppercase tracking-tight">Solicitação Enviada!</h3>
                                    <p className="text-slate-500 font-medium mb-2">Obrigado, <span className="text-blue-600 font-bold">{formData.name}</span>.</p>
                                    <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">Nossa equipe retornará em instantes.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter mb-2">Solicitar Consultoria</h3>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                            Fale com um engenheiro especialista em bombeamento industrial.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">Nome Completo</label>
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Digite seu nome"
                                                    required
                                                    className="w-full bg-slate-50 rounded-lg border-2 border-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">Empresa</label>
                                                <input
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    placeholder="Sua empresa"
                                                    required
                                                    className="w-full bg-slate-50 rounded-lg border-2 border-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">Equipamento de Interesse</label>
                                            <input
                                                name="product"
                                                value={formData.product}
                                                onChange={handleChange}
                                                placeholder="Ex: Bomba Magnética, Selo Mecânico..."
                                                required
                                                className="w-full bg-slate-50 rounded-lg border-2 border-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">E-mail</label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="seu@email.com"
                                                    required
                                                    className="w-full bg-slate-50 rounded-lg border-2 border-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">Telefone/WhatsApp</label>
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="(00) 00000-0000"
                                                    required
                                                    className="w-full bg-slate-50 rounded-lg border-2 border-slate-100 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full group relative flex items-center justify-center gap-3 px-8 py-5 bg-[#ffd700] text-[#003366] font-black text-[11px] tracking-[0.3em] uppercase rounded-lg transition-all duration-300 hover:bg-[#003366] hover:text-white active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                                            >
                                                {loading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        ENVIAR SOLICITAÇÃO
                                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                            
                                            {error && <p className="text-center text-red-500 text-[10px] font-bold uppercase mt-3 tracking-wider">Erro ao enviar. Tente novamente.</p>}
                                            {sucessMsg && <p className="text-center text-green-600 text-[10px] font-bold uppercase mt-3 tracking-wider">Sucesso! Redirecionando...</p>}
                                        </div>

                                        <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest font-bold">
                                            Seus dados estão protegidos sob nossa política de privacidade.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Text Column - Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="flex gap-4 group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="text-[#ffd700] bg-slate-50 p-3 rounded-xl"><ShieldCheck size={32} strokeWidth={2.5} /></div>
                                <div>
                                    <h4 className="font-black text-[#003366] text-[11px] uppercase mb-2 tracking-widest">Precisão Técnica</h4>
                                    <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">Adequação técnica rigorosa para garantir durabilidade extrema.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="text-[#ffd700] bg-slate-50 p-3 rounded-xl"><Droplets size={32} strokeWidth={2.5} /></div>
                                <div>
                                    <h4 className="font-black text-[#003366] text-[11px] uppercase mb-2 tracking-widest">Segurança Total</h4>
                                    <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">Componentes que previnem falhas críticas e vazamentos em plantas.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:col-span-2">
                                <div className="text-[#ffd700] bg-slate-50 p-4 rounded-xl"><Zap size={36} strokeWidth={2.5} /></div>
                                <div>
                                    <h4 className="font-black text-[#003366] text-[12px] uppercase mb-3 tracking-[0.2em]">Alta Eficiência Operacional</h4>
                                    <p className="text-[12px] text-slate-500 font-bold leading-relaxed uppercase max-w-lg">
                                        Menor custo de manutenção e operacional por ciclo com nossa tecnologia de ponta em bombeamento e vedação.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
