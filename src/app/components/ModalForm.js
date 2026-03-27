import { useState } from 'react';

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-[101]">
                <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl transform transition-all overflow-hidden">

                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-[#004a99] to-[#003366] p-8 shadow-lg">
                        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Fale com um Especialista</h2>
                        <p className="text-white/80 text-sm mt-2">Soluções personalizadas em bombas industriais</p>
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-300"
                            aria-label="Fechar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-[#004a99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h3>
                                <p className="text-slate-500 mb-4">Obrigado pelo contato, <span className="font-semibold text-[#004a99]">{formData.name}</span>.</p>
                                <p className="text-sm text-slate-400">Nossa equipe retornará em breve.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1">NOME</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            placeholder="Seu nome"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-all"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1">EMPRESA</label>
                                        <input
                                            name="company"
                                            value={formData.company}
                                            placeholder="Nome da empresa"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-all"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="sm:col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1">PRODUTO OU APLICAÇÃO</label>
                                        <input
                                            name="product"
                                            value={formData.product}
                                            placeholder="Qual tipo de bomba ou processo?"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-all"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1">EMAIL</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            placeholder="email@empresa.com"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-all"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 ml-1">WHATSAPP</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            placeholder="(00) 00000-0000"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-all"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 pt-2">
                                    <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 text-[#004a99] border-gray-300 rounded focus:ring-[#ffd700]" />
                                    <label htmlFor="consent" className="text-[10px] text-slate-500 leading-tight uppercase font-bold tracking-wider">
                                        Concordo em receber comunicações e estou ciente da{' '}
                                        <a href="#" className="underline hover:text-[#004a99]">Política de Privacidade</a>
                                    </label>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" disabled={loading} className="w-full 
                    bg-[#ffd700] hover:bg-[#e6c200] text-[#003366] 
                    font-extrabold text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl">
                                        {loading ? "Processando..." : "SOLICITAR CONSULTA TÉCNICA"}
                                    </button>
                                    <div className="mt-4 text-center">
                                        {error && <span className="text-red-500 text-sm">Erro ao enviar formulário.</span>}
                                        {sucessMsg && <span className="text-green-600 text-sm font-bold">Enviado com sucesso!</span>}
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="border-t border-gray-100 p-4 bg-gray-50 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                            Privacidade Garantida • Conexão Segura
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}