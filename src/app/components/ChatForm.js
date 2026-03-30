"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatForm() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá! Para conectar você com um especialista, preciso de algumas informações. Vamos começar?" }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [formData, setFormData] = useState({ nome: "", empresa: "", telefone: "", aplicacao: "" });
  const [submitted, setSubmitted] = useState(false);

  const numberPattern = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

  const handleSend = () => {
    if (!currentInput.trim()) return;

    if (!formData.nome) {
      setFormData({ ...formData, nome: currentInput });
      setMessages([...messages, { from: "user", text: currentInput }, { from: "bot", text: "Em qual empresa você trabalha?" }]);
      setCurrentInput("");
      return;
    }

    if (!formData.empresa) {
      setFormData({ ...formData, empresa: currentInput });
      setMessages([...messages, { from: "user", text: currentInput }, { from: "bot", text: "Qual o seu WhatsApp?" }]);
      setCurrentInput("");
      return;
    }

    if (!formData.telefone) {
      if (!numberPattern.test(currentInput)) {
        setMessages([...messages, { from: "bot", text: "Esse número não é válido, insira um número de telefone válido." }]);
        return;
      }
      setFormData({ ...formData, telefone: currentInput });
      setMessages([...messages, { from: "user", text: currentInput }, { from: "bot", text: "Qual é a sua necessidade ou aplicação?" }]);
      setCurrentInput("");
      return;
    }

    if (!formData.aplicacao) {
      setFormData({ ...formData, aplicacao: currentInput });
      setMessages([...messages, { from: "user", text: currentInput }, { from: "bot", text: "Perfeito! Nossa equipe técnica entrará em contato em breve. Obrigado!" }]);
      setSubmitted(true);
      setCurrentInput("");
      return;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border flex flex-col h-[480px] overflow-hidden">
      
      <div className="bg-blue-600 px-5 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">B</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Especialista Wortec</p>
          <p className="text-blue-200 text-xs">Responde em minutos</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-200 text-xs">Online</span>
        </div>
      </div>

      {/* Msgs */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "bot" && (
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2">
                  B
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      {!submitted ? (
        <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Digite sua resposta..."
          />
          <button
            onClick={handleSend}
            disabled={!currentInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl px-4 py-2 transition-colors"
          >
            Enviar
          </button>
        </div>
      ) : (
        <div className="p-4 bg-green-50 border-t border-green-100 text-center">
          <p className="text-green-700 text-sm font-medium">✓ Mensagem enviada com sucesso!</p>
          <p className="text-green-600 text-xs mt-0.5">Em breve nossa equipe entrará em contato.</p>
        </div>
      )}
    </div>
  );
}