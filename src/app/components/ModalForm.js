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

        let utmData = {}

        try {
            const savedUtm = localStorage.getItem("utmData");
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
                    conversion_identifier: " [B2] MODAL FORM WORTEC",

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
                console.log("Erro HTTP:", res.status);
                console.log("API Error:", result.error || result);
                setError(true);
                return;
            }
            setsucessMsg(true);
            console.log(`Lead enviado com os dados de utm ${utmData}`, result);

            const whatsMsg = `Olá, gostaria de falar com um especialista da Realiza Car. Meu nome 
                é ${formData.name} e estou interessado no produto ${formData.product}. 
                Poderiam me ajudar?.`;

            const whatsNumber = '11984471850';

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
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="fixed bottom-0 right-0 p-4 sm:p-6 z-50">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">

                    {/* Header */}
                    <div className="relative bg-green-600 rounded-t-2xl p-6 shadow-lg">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Entre em contato</h2>
                        <p className="text-white text-sm mt-1">Preencha os campos abaixo para iniciar a conversa no WhatsApp</p>
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl p-2 transition-all duration-300"
                            aria-label="Fechar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h3>
                                <p className="text-slate-500 mb-4">Obrigado pelo contato, <span className="font-semibold text-orange-500">{formData.name}</span>.</p>
                                <p className="text-sm text-slate-400">Nossa equipe retornará em breve.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        value={formData.name}
                                        placeholder="Nome"
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0082ca]"
                                        onChange={handleChange}
                                    />

                                    <input
                                        name="company"
                                        value={formData.company}
                                        placeholder="Empresa"
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0082ca]"
                                        onChange={handleChange}
                                    />

                                    <input
                                        name="product"
                                        value={formData.product}
                                        placeholder="Qual seu equipamento de interesse"
                                        required
                                        className="sm:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0082ca]"
                                        onChange={handleChange}
                                    />

                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        placeholder="Email"
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0082ca]"
                                        onChange={handleChange}
                                    />

                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        placeholder="Telefone"
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0082ca]"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400" />
                                    <label htmlFor="consent" className="text-sm text-slate-500">
                                        Concordo em receber comunicações e estou ciente da{' '}
                                        <a href="#" className="text-green-600">Política de Privacidade</a>
                                    </label>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button type="submit" disabled={loading} className="flex-1 
                    bg-green-600 text-white 
                    font-bold text-lg py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                                        {loading ? "Enviando..." : "Enviar Solicitação"}
                                    </button>
                                    <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                                        {error && <span className="text-red-500">Erro ao enviar formulário</span>}
                                        {sucessMsg && <span className="text-green-500">Formulário enviado com sucesso</span>}
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-2xl">
                        <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Seus dados estão seguros e não serão compartilhados
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}