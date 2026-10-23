"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatForm() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Olá! Para iniciar o atendimento, informe o produto ou serviço de interesse.",
    },
  ]);

  const [currentInput, setCurrentInput] = useState("");

  const [formData, setFormData] = useState({
    produto: "",
    finalidade: "",
    empresa: "",
    nome: "",
    telefone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const messagesEndRef = useRef(null);

  const numberPattern = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const conversionUrl = `${window.location.origin}${window.location.pathname}`;

    const utmData = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      ad_id: params.get("ad_id") || "",
      conversion_url: conversionUrl,
    };

    const hasUtm = Object.values(utmData).some(Boolean);

    if (hasUtm) {
      localStorage.setItem("utmData", JSON.stringify(utmData));
      console.log("UTMs salvas no localStorage:", utmData);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const normalizarFinalidadeRD = (valor) => {
    if (!valor) return "";

    const valorTratado = String(valor).trim();

    const mapa = {
      "Para Consumo": "Para Consumo",
      "Para consumo": "Para Consumo",
      "para consumo": "Para Consumo",
      consumo: "Para Consumo",

      "Para Revenda": "Para Revenda",
      "Para revenda": "Para Revenda",
      "para revenda": "Para Revenda",
      revenda: "Para Revenda",
    };

    return mapa[valorTratado] || "";
  };

  const getUtmData = () => {
    let utmData = {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      ad_id: "",
      conversion_url: "",
    };

    if (typeof window === "undefined") return utmData;

    const params = new URLSearchParams(window.location.search);

    let savedUtm = {};

    try {
      savedUtm = JSON.parse(localStorage.getItem("utmData") || "{}");
    } catch (error) {
      console.warn("Erro ao ler UTMs do localStorage:", error);
      savedUtm = {};
    }

    const conversionUrl = `${window.location.origin}${window.location.pathname}`;

    utmData = {
      utm_source: params.get("utm_source") || savedUtm.utm_source || "",
      utm_medium: params.get("utm_medium") || savedUtm.utm_medium || "",
      utm_campaign: params.get("utm_campaign") || savedUtm.utm_campaign || "",
      utm_content: params.get("utm_content") || savedUtm.utm_content || "",
      utm_term: params.get("utm_term") || savedUtm.utm_term || "",
      ad_id: params.get("ad_id") || savedUtm.ad_id || "",
      conversion_url: conversionUrl,
    };

    localStorage.setItem("utmData", JSON.stringify(utmData));

    return utmData;
  };

  const handleSend = async () => {
    if (!currentInput.trim()) return;

    // 1. Produto ou serviço
    if (!formData.produto) {
      setFormData({ ...formData, produto: currentInput });

      setMessages([
        ...messages,
        { from: "user", text: currentInput },
        {
          from: "bot",
          text: "Qual a finalidade da compra?",
        },
      ]);

      setCurrentInput("");
      return;
    }

    // 2. Finalidade
    if (!formData.finalidade) {
      const finalidadeRD = normalizarFinalidadeRD(currentInput);

      if (!finalidadeRD) {
        setMessages([
          ...messages,
          {
            from: "bot",
            text: "Selecione uma finalidade válida: Para Consumo ou Para Revenda.",
          },
        ]);
        return;
      }

      setFormData({ ...formData, finalidade: finalidadeRD });

      setMessages([
        ...messages,
        { from: "user", text: finalidadeRD },
        {
          from: "bot",
          text: "Qual o nome da sua empresa?",
        },
      ]);

      setCurrentInput("");
      return;
    }

    // 3. Empresa
    if (!formData.empresa) {
      setFormData({ ...formData, empresa: currentInput });

      setMessages([
        ...messages,
        { from: "user", text: currentInput },
        {
          from: "bot",
          text: "Agora, informe seu nome:",
        },
      ]);

      setCurrentInput("");
      return;
    }

    // 4. Nome
    if (!formData.nome) {
      setFormData({ ...formData, nome: currentInput });

      setMessages([
        ...messages,
        { from: "user", text: currentInput },
        {
          from: "bot",
          text: `Obrigado, ${currentInput}! Qual o seu WhatsApp/Telefone com DDD para contato?`,
        },
      ]);

      setCurrentInput("");
      return;
    }

    // 5. Telefone
    if (!formData.telefone) {
      if (!numberPattern.test(currentInput)) {
        setMessages([
          ...messages,
          {
            from: "bot",
            text: "Número inválido. Use o formato (11) 91234-5678 ou 11912345678.",
          },
        ]);
        return;
      }

      setFormData({ ...formData, telefone: currentInput });

      setMessages([
        ...messages,
        { from: "user", text: currentInput },
        {
          from: "bot",
          text: "Por favor, informe seu melhor e-mail:",
        },
      ]);

      setCurrentInput("");
      return;
    }

    // 6. E-mail / Submit final
    if (!formData.email) {
      if (!emailPattern.test(currentInput)) {
        setMessages([
          ...messages,
          {
            from: "bot",
            text: "E-mail inválido. Por favor, informe um e-mail válido.",
          },
        ]);
        return;
      }

      const updatedFormData = {
        ...formData,
        email: currentInput,
        finalidade: normalizarFinalidadeRD(formData.finalidade),
      };

      setFormData(updatedFormData);

      setMessages([
        ...messages,
        { from: "user", text: currentInput },
        {
          from: "bot",
          text: "Obrigado pelas informações! Agora vamos direcionar você para o WhatsApp dos nossos especialistas, que darão continuidade ao seu atendimento.",
        },
      ]);

      setSubmitted(true);
      setCurrentInput("");

      try {
        const utmData = getUtmData();

        const payload = {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: "[B2] ATENDIMENTO CHAT",

            // Campo padrão da RD Station
            conversion_url: utmData.conversion_url || "",

            name: updatedFormData.nome,
            email: updatedFormData.email,
            mobile_phone: updatedFormData.telefone,
            company_name: updatedFormData.empresa,

            // Campos personalizados RD Station
            cf_produto_ou_servico: updatedFormData.produto,
            cf_finalidade: updatedFormData.finalidade,

            // Campos padrão de tráfego do RD Station
            traffic_source: utmData.utm_source || "",
            traffic_medium: utmData.utm_medium || "",
            traffic_campaign: utmData.utm_campaign || "",
            traffic_content: utmData.utm_content || "",
            traffic_term: utmData.utm_term || "",

            // Campos personalizados UTM do RD Station
            cf_utm_campanha: utmData.utm_campaign || "",
            cf_utm_palavra_chave: utmData.utm_term || "",
            cf_utm_grupo_anuncio: utmData.utm_content || "",
            cf_utm_anuncio_id: utmData.ad_id || "",
          },
        };

        console.log("UTMs enviadas:", utmData);
        console.log("URL de conversão enviada:", payload.payload.conversion_url);
        console.log("AD ID capturado:", utmData.ad_id);
        console.log(
          "Campo RD cf_utm_anuncio_id:",
          payload.payload.cf_utm_anuncio_id
        );
        console.log("Payload enviado para RD:", payload);
        console.log("Produto/Serviço enviado ao RD:", updatedFormData.produto);
        console.log("Finalidade enviada ao RD:", updatedFormData.finalidade);

        const res = await fetch(
          "https://api.rd.services/platform/conversions?api_key=eab5c92b8f554a6d80045e01a13a4d8b",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const responseText = await res.text();

        let result = null;

        try {
          result = responseText ? JSON.parse(responseText) : null;
        } catch {
          result = responseText;
        }

        if (!res.ok) {
          console.log("Erro HTTP:", res.status);
          console.log("API Error:", result);
          return;
        }

        console.log("Lead enviado com sucesso:", result);

        // DataLayer - Submit final do chat
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];

          window.dataLayer.push({
            event: "chat_lead_submit",

            produto: updatedFormData.produto,
            finalidade: updatedFormData.finalidade,
            empresa: updatedFormData.empresa,
            nome: updatedFormData.nome,
            telefone: updatedFormData.telefone,
            email: updatedFormData.email,

            conversion_url: utmData.conversion_url || "",
            utm_source: utmData.utm_source || "",
            utm_medium: utmData.utm_medium || "",
            utm_campaign: utmData.utm_campaign || "",
            utm_content: utmData.utm_content || "",
            utm_term: utmData.utm_term || "",
            ad_id: utmData.ad_id || "",
          });

          console.log("DataLayer chat_lead_submit disparado:", {
            event: "chat_lead_submit",
            conversion_url: utmData.conversion_url || "",
            ad_id: utmData.ad_id || "",
          });
        }
      } catch (err) {
        console.error("Erro ao enviar para o RD", err);
      }

      const message = `Olá! Gostaria de solicitar uma cotação.

Produto/Serviço: ${updatedFormData.produto}
Finalidade: ${updatedFormData.finalidade}
Nome: ${updatedFormData.nome}
Empresa: ${updatedFormData.empresa}
Telefone: ${updatedFormData.telefone}
E-mail: ${updatedFormData.email}`;

      setTimeout(() => {
        window.open(
          `https://wa.me/5511984471850?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      }, 1200);
    }
  };

  const isFinalidadeStep = formData.produto && !formData.finalidade;

  const isEmailStep =
    formData.produto &&
    formData.finalidade &&
    formData.empresa &&
    formData.nome &&
    formData.telefone &&
    !formData.email;

  const isTelefoneStep =
    formData.produto &&
    formData.finalidade &&
    formData.empresa &&
    formData.nome &&
    !formData.telefone;

  return (
    <div
      className="
        bg-white rounded-2xl
        shadow-xl border flex flex-col
        h-[480px] overflow-hidden
      "
    >
      {/* Chat Header */}
      <div className="bg-[#62aeff] px-5 py-4 flex items-center gap-3">
        <div
          className="
            w-9 h-9 rounded-full
            bg-[#4f9eea] flex items-center justify-center
            flex-shrink-0
          "
        >
          <span className="text-black font-bold text-sm">N</span>
        </div>

        <div>
          <p className="text-black font-semibold text-sm">
            Especialista Wortec
          </p>
          <p className="text-black text-xs font-medium">Responde em minutos</p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-800 text-xs font-bold">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from === "bot" && (
                <div
                  className="
                    w-7 h-7 rounded-full
                    bg-[#62aeff]
                    flex items-center justify-center
                    text-black text-xs font-bold
                    mr-2
                    flex-shrink-0
                  "
                >
                  N
                </div>
              )}

              <div
                className={`
                  max-w-[75%] px-4 py-2
                  rounded-2xl text-sm leading-relaxed
                  ${
                    msg.from === "user"
                      ? "bg-[#62aeff] text-black rounded-br-sm font-medium"
                      : "bg-white text-black shadow-sm border border-gray-200 rounded-bl-sm"
                  }
                `}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!submitted ? (
        <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
          {isFinalidadeStep ? (
            <select
              className="
                flex-1 border border-gray-300
                rounded-xl px-3 py-2
                text-sm
                focus:outline-none focus:ring-2 focus:ring-[#62aeff]
                text-black bg-white
              "
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
            >
              <option value="">Selecione a finalidade</option>
              <option value="Para Consumo">Para Consumo</option>
              <option value="Para Revenda">Para Revenda</option>
            </select>
          ) : (
            <input
              type={isEmailStep ? "email" : isTelefoneStep ? "tel" : "text"}
              className="
                flex-1 border border-gray-300
                rounded-xl px-3 py-2
                text-sm
                focus:outline-none focus:ring-2 focus:ring-[#62aeff]
                text-black placeholder-gray-400
              "
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua resposta..."
            />
          )}

          <button
            type="button"
            onClick={handleSend}
            disabled={!currentInput.trim()}
            className="
              bg-[#62aeff] hover:bg-[#4f9eea]
              disabled:opacity-40
              text-black rounded-xl px-4 py-2
              transition-colors font-semibold text-sm
            "
          >
            Enviar
          </button>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border-t border-green-100 text-center">
          <p className="text-green-700 text-sm font-medium">
            ✓ Redirecionando para o WhatsApp...
          </p>
          <p className="text-green-600 text-xs mt-0.5">
            Nossa equipe dará continuidade ao seu atendimento.
          </p>
        </div>
      )}
    </div>
  );
}