"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const calendarUrl = typeof window !== "undefined" ? `${window.location.origin}/api/calendar` : "https://SUA-URL.vercel.app/api/calendar";

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(calendarUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-blue-500/30 font-sans">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Header Section */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Copa do Mundo FIFA 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            O Calendário Definitivo <br className="hidden md:block" /> da Copa 2026 🏆
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Sincronize todos os jogos automaticamente no seu calendário.
            Não perca um segundo da maior Copa da história.
          </p>
        </header>

        {/* Subscription Card */}
        <section className="mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#121216] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                    <span className="p-2 bg-blue-500/10 rounded-lg">🔗</span>
                    Link de Assinatura
                  </h3>
                  <p className="text-slate-400">Cole este link nas configurações do seu app de calendário.</p>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <input
                      readOnly
                      value={calendarUrl}
                      className="w-full md:w-[400px] bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm font-mono text-blue-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
                    >
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <a
                    href="/api/calendar"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                  >
                    ⬇️ Baixar .ics
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          {/* Card 1: Google */}
          <div className="bg-[#121216]/50 border border-white/5 p-8 rounded-2xl hover:bg-[#16161c]/80 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📅</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Google Calendar</h4>
            <ol className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3"><span className="text-blue-500 font-bold">01.</span> Acesse o Google Agenda no seu computador.</li>
              <li className="flex gap-3"><span className="text-blue-500 font-bold">02.</span> Clique no "+" em "Outras agendas".</li>
              <li className="flex gap-3"><span className="text-blue-500 font-bold">03.</span> Selecione "Do URL" e cole o link acima.</li>
            </ol>
          </div>

          {/* Card 2: Outlook */}
          <div className="bg-[#121216]/50 border border-white/5 p-8 rounded-2xl hover:bg-[#16161c]/80 transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📧</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Outlook / Hotmail</h4>
            <ol className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3"><span className="text-purple-500 font-bold">01.</span> Vá em "Adicionar calendário".</li>
              <li className="flex gap-3"><span className="text-purple-500 font-bold">02.</span> Escolha "Assinar da Web".</li>
              <li className="flex gap-3"><span className="text-purple-500 font-bold">03.</span> Cole o link e clique em Importar.</li>
            </ol>
          </div>

          {/* Card 3: Apple */}
          <div className="bg-[#121216]/50 border border-white/5 p-8 rounded-2xl hover:bg-[#16161c]/80 transition-all group">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🍎</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">iPhone / Mac</h4>
            <ol className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3"><span className="text-pink-500 font-bold">01.</span> Ajustes &gt; Calendário &gt; Contas.</li>
              <li className="flex gap-3"><span className="text-pink-500 font-bold">02.</span> Adicionar Conta &gt; Outra.</li>
              <li className="flex gap-3"><span className="text-pink-500 font-bold">03.</span> "Adicionar Assinatura de Calendário".</li>
            </ol>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© 2026 Copa do Mundo Calendar. Dados por <a href="https://www.football-data.org/" className="text-blue-500 hover:underline">football-data.org</a></p>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .duration-1000 {
          animation-duration: 1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .slide-in-from-bottom-4 {
          animation-name: fade-in, slide-in-from-bottom;
        }
      `}</style>
    </div>
  );
}
