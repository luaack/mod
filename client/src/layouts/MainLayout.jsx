import React from "react";
import Logo from "../components/Logo";

const MainLayout = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-16 md:h-20 border-b-2 border-black bg-white/90 backdrop-blur-md z-[100]">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-12">
            <button
              onClick={scrollToTop}
              className="hover:opacity-70 transition-opacity flex items-center"
            >
              <Logo
                className="w-5 h-5 md:w-6 md:h-6"
                textClassName="text-[10px] md:text-sm font-black tracking-tighter uppercase"
              />
            </button>
            <div className="hidden lg:flex gap-8">
              {[
                { name: "Recursos", id: "features" },
                { name: "Processo", id: "process" },
                { name: "Preços", id: "pricing" },
                { name: "FAQ", id: "faq" }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <button className="hidden sm:block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
              Entrar
            </button>
            <button
              onClick={scrollToTop}
              className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              Começar
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      {/* FOOTER WITH LEGAL DISCLAIMER */}
      <footer className="py-16 md:py-24 border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <button
              onClick={scrollToTop}
              className="mb-6 hover:opacity-70 transition-opacity"
            >
              <Logo
                className="w-5 h-5"
                textClassName="text-[12px] font-black tracking-tighter uppercase"
              />
            </button>
            <p className="text-xs font-medium text-neutral-400 leading-relaxed">
              Arquitetando o futuro do gerenciamento de links através de engenharia minimalista e design brutalista.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:gap-20 w-full md:w-auto">
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-black">
                Legal
              </span>
              <span className="text-[11px] md:text-xs font-medium text-neutral-400">
                Privacidade
              </span>
              <span className="text-[11px] md:text-xs font-medium text-neutral-400">
                Termos
              </span>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-black">
                Connect
              </span>
              <span className="text-[11px] md:text-xs font-medium text-neutral-400">
                Twitter
              </span>
              <span className="text-[11px] md:text-xs font-medium text-neutral-400">
                GitHub
              </span>
            </div>
          </div>
        </div>

        {/* LEGAL LIMITATION OF LIABILITY */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12">
          <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-neutral-400 leading-relaxed border-l-2 border-black pl-4">
            AVISO: Os resultados demonstrados nas simulações são estimativas baseadas em médias históricas do mercado de tráfego pago e não constituem garantia de faturamento ou lucros futuros. O retorno real depende da oferta do produto, precificação, atendimento comercial e fatores externos do mercado.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300">
            © 2026 MAKELINK STUDIOS
          </p>
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-300">
            EST. NO NORTE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
