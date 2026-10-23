'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Droplets,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function Solution() {
  const FORM_IDENTIFIER = '[B2] FORM LP | BOMBAS INDUSTRIAIS';

  const [formData, setFormData] = useState({
    cf_produto_ou_servico: '',
    cf_finalidade: '',
    company_name: '',
    name: '',
    mobile_phone: '',
    email: '',

    identificador: FORM_IDENTIFIER,

    cf_utm_campanha: '',
    cf_utm_palavra_chave: '',
    cf_utm_grupo_anuncio: '',
    cf_utm_anuncio_id: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);

    let savedUtm = {};

    try {
      savedUtm =
        JSON.parse(localStorage.getItem('utmData') || '{}') ||
        JSON.parse(localStorage.getItem('utm') || '{}') ||
        {};
    } catch {
      savedUtm = {};
    }

    setFormData((prev) => ({
      ...prev,
      cf_utm_campanha:
        params.get('utm_campaign') || savedUtm.utm_campaign || '',
      cf_utm_palavra_chave:
        params.get('utm_term') || savedUtm.utm_term || '',
      cf_utm_grupo_anuncio:
        params.get('utm_content') || savedUtm.utm_content || '',
      cf_utm_anuncio_id:
        params.get('ad_id') || savedUtm.ad_id || '',
    }));
  }, []);

  const inputClass = `
    w-full bg-slate-50
    rounded-lg border border-slate-200
    px-3.5 py-3
    text-sm text-slate-900
    placeholder:text-slate-400
    focus:outline-none focus:border-blue-500 focus:bg-white
    transition-all duration-300
    font-medium
  `;

  const hiddenInputClass = `
    absolute -left-[9999px]
    top-auto
    w-px h-px
    overflow-hidden
    opacity-0
    pointer-events-none
  `;

  const radioClass = `
    flex items-center gap-2
    rounded-lg border border-slate-200
    bg-slate-50 px-3.5 py-3
    text-sm font-bold text-slate-900
    cursor-pointer
    transition-all duration-300
    hover:border-blue-500
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
          event: 'submit_form_success',
          form_name: FORM_IDENTIFIER,
          identificador: FORM_IDENTIFIER,

          cf_produto_ou_servico: formData.cf_produto_ou_servico,
          cf_finalidade: formData.cf_finalidade,
          company_name: formData.company_name,
          name: formData.name,
          mobile_phone: formData.mobile_phone,
          email: formData.email,

          cf_utm_campanha: formData.cf_utm_campanha,
          cf_utm_palavra_chave: formData.cf_utm_palavra_chave,
          cf_utm_grupo_anuncio: formData.cf_utm_grupo_anuncio,
          cf_utm_anuncio_id: formData.cf_utm_anuncio_id,
        });
      }

      const whatsappMessage = `Olá! Gostaria de solicitar uma cotação.

Produto/Serviço: ${formData.cf_produto_ou_servico}
Finalidade: ${formData.cf_finalidade}
Nome: ${formData.name}
Empresa: ${formData.company_name}
Telefone: ${formData.mobile_phone}
E-mail: ${formData.email}`;

      setSuccessMsg(true);
      setSubmitted(true);

      window.open(
        `https://wa.me/5511984471850?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        '_blank'
      );

      setTimeout(() => {
        setSubmitted(false);
        setSuccessMsg(false);

        setFormData((prev) => ({
          ...prev,
          cf_produto_ou_servico: '',
          cf_finalidade: '',
          company_name: '',
          name: '',
          mobile_phone: '',
          email: '',
        }));
      }, 3000);
    } catch (err) {
      console.error('Erro geral:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-slate-50 overflow-hidden" id="solution">
      <div className="container-custom text-center mb-16">
        <span className="text-[#004a99] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">
          Especialistas em Fluidos
        </span>

        <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-10 leading-[1.1] tracking-tighter uppercase whitespace-pre-line">
          A tecnologia certa {'\n'}
          <span className="text-blue-500 font-black">
            para o seu processo.
          </span>
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
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-[0_40px_80px_rgba(0,51,102,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffd700]" />

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9 text-green-500" />
                  </div>

                  <h3 className="text-xl font-black text-[#003366] mb-3 uppercase tracking-tight">
                    Solicitação enviada!
                  </h3>

                  <p className="text-neutral-900 font-medium mb-2">
                    Obrigado,{' '}
                    <span className="text-blue-600 font-bold">
                      {formData.name}
                    </span>
                    .
                  </p>

                  <p className="text-xs text-black/60 uppercase tracking-widest font-bold">
                    Redirecionando para o WhatsApp.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter mb-2">
                      Solicitar Consultoria
                    </h3>

                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                      Fale com um engenheiro especialista em bombeamento industrial.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="hidden"
                      name="identificador"
                      value={FORM_IDENTIFIER}
                      readOnly
                    />

                    <input
                      type="text"
                      name="cf_utm_campanha"
                      value={formData.cf_utm_campanha}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className={hiddenInputClass}
                    />

                    <input
                      type="text"
                      name="cf_utm_palavra_chave"
                      value={formData.cf_utm_palavra_chave}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className={hiddenInputClass}
                    />

                    <input
                      type="text"
                      name="cf_utm_grupo_anuncio"
                      value={formData.cf_utm_grupo_anuncio}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className={hiddenInputClass}
                    />

                    <input
                      type="text"
                      name="cf_utm_anuncio_id"
                      value={formData.cf_utm_anuncio_id}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className={hiddenInputClass}
                    />

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">
                        Produto/Serviço
                      </label>

                      <input
                        name="cf_produto_ou_servico"
                        value={formData.cf_produto_ou_servico}
                        onChange={handleChange}
                        placeholder="Ex: Bomba Magnética, Selo Mecânico..."
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">
                        Finalidade
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className={radioClass}>
                          <input
                            type="radio"
                            name="cf_finalidade"
                            value="Para Consumo"
                            checked={formData.cf_finalidade === 'Para Consumo'}
                            onChange={handleChange}
                            required
                            className="accent-[#ffd700]"
                          />
                          Para Consumo
                        </label>

                        <label className={radioClass}>
                          <input
                            type="radio"
                            name="cf_finalidade"
                            value="Para Revenda"
                            checked={formData.cf_finalidade === 'Para Revenda'}
                            onChange={handleChange}
                            required
                            className="accent-[#ffd700]"
                          />
                          Para Revenda
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">
                          Empresa
                        </label>

                        <input
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder="Sua empresa"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">
                          Nome
                        </label>

                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">
                          Telefone/WhatsApp
                        </label>

                        <input
                          name="mobile_phone"
                          value={formData.mobile_phone}
                          onChange={handleChange}
                          placeholder="(00) 00000-0000"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-[#003366] uppercase tracking-widest ml-1">
                          E-mail
                        </label>

                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="
                          w-full flex items-center justify-center gap-3
                          px-7 py-3.5
                          bg-[#ffd700] text-[#003366]
                          font-black text-[12px]
                          tracking-[0.12em] uppercase
                          rounded-xl
                          transition-all duration-300
                          hover:bg-[#003366] hover:text-white
                          active:scale-[0.98]
                          disabled:opacity-70 disabled:cursor-not-allowed
                        "
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Solicitar cotação
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {error && (
                        <p className="text-center text-red-500 text-xs font-bold uppercase mt-3 tracking-wider">
                          Erro ao enviar. Tente novamente.
                        </p>
                      )}

                      {successMsg && (
                        <p className="text-center text-green-600 text-xs font-bold uppercase mt-3 tracking-wider">
                          Sucesso! Redirecionando...
                        </p>
                      )}
                    </div>

                    <p className="text-[9px] text-slate-500 text-center uppercase tracking-widest font-bold">
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
                <div className="text-[#ffd700] bg-slate-50 p-3 rounded-xl">
                  <ShieldCheck size={32} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="font-black text-[#003366] text-[11px] uppercase mb-2 tracking-widest">
                    Precisão Técnica
                  </h4>

                  <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">
                    Adequação técnica rigorosa para garantir durabilidade extrema.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="text-[#ffd700] bg-slate-50 p-3 rounded-xl">
                  <Droplets size={32} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="font-black text-[#003366] text-[11px] uppercase mb-2 tracking-widest">
                    Segurança Total
                  </h4>

                  <p className="text-[11px] text-slate-500 font-bold leading-normal uppercase">
                    Componentes que previnem falhas críticas e vazamentos em plantas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:col-span-2">
                <div className="text-[#ffd700] bg-slate-50 p-4 rounded-xl">
                  <Zap size={36} strokeWidth={2.5} />
                </div>

                <div>
                  <h4 className="font-black text-[#003366] text-[12px] uppercase mb-3 tracking-[0.2em]">
                    Alta Eficiência Operacional
                  </h4>

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