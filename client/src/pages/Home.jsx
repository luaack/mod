import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineCurrencyDollar,
  HiOutlineArrowTrendingUp,
  HiOutlineUserGroup,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b-2 border-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex justify-between items-center text-left hover:bg-neutral-50 px-2 md:px-4"
      >
        <span className="text-base md:text-xl font-black uppercase tracking-tight pr-4">
          {question}
        </span>
        {isOpen ? (
          <HiOutlineMinus className="flex-shrink-0" />
        ) : (
          <HiOutlinePlus className="flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 px-2 md:px-4 text-neutral-500 font-medium text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  // Configuração do WhatsApp do profissional
  const WHATSAPP_PHONE = "5511999999999"; // Substitua pelo seu número com DDD (apenas números)

  const [businessName, setBusinessName] = useState("");
  const [adBudget, setAdBudget] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!businessName || !adBudget) return;

    setLoading(true);
    setResult(null);

    // Simula processamento/análise de tráfego (1.5 segundos)
    setTimeout(() => {
      const budget = parseFloat(adBudget);
      
      // Métricas simuladas realistas
      // CPC médio estimado de R$ 1.00 a R$ 1.80
      const minClicks = Math.round(budget / 1.6);
      const maxClicks = Math.round(budget / 0.9);

      // Taxa de conversão estimada em leads/vendas de 1.5% a 3.5%
      const minLeads = Math.round(minClicks * 0.015);
      const maxLeads = Math.round(maxClicks * 0.035);

      // ROI estimado entre 3.2x e 5.8x
      const minRevenue = Math.round(budget * 3.2);
      const maxRevenue = Math.round(budget * 5.8);

      setResult({
        minClicks,
        maxClicks,
        minLeads,
        maxLeads,
        minRevenue,
        maxRevenue,
        minROI: "3.2x",
        maxROI: "5.8x"
      });
      setLoading(false);
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    if (!result) return;
    const message = `Olá! Fiz uma simulação de tráfego pago para minha empresa (${businessName}) com verba de R$ ${adBudget}/mês.\n\nResultados estimados:\n- Cliques: ${result.minClicks} a ${result.maxClicks}\n- Conversões: ${result.minLeads} a ${result.maxLeads}\n- Faturamento Simulado: R$ ${result.minRevenue} a R$ ${result.maxRevenue}\n\nGostaria de agendar meu diagnóstico de tráfego gratuito!`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section
        id="shorten"
        className="section-padding pt-32 md:pt-48 border-b-2 border-black min-h-screen flex items-center bg-white overflow-hidden"
      >
        <div className="max-width w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-24 items-center">
          <div className="z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 md:mb-6"
            >
              <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                Assessoria de Performance v2.0
              </span>
            </motion.div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-[6rem] font-black tracking-tighter leading-[0.85] uppercase mb-8 md:mb-10"
            >
              Engenharia <br /> de Tráfego.
            </motion.h1>
            <div className="flex flex-col gap-4">
              <p className="text-lg md:text-xl text-neutral-400 font-medium max-w-sm">
                Transformamos verba de anúncios em faturamento previsível e escalável. Sem achismos, apenas performance extrema.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  Foco absoluto em ROI e conversão
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 md:p-8 border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] z-20"
          >
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 md:mb-8 border-b border-neutral-100 pb-4">
              Calculadora de ROI & Tráfego
            </h3>
            <form
              onSubmit={handleCalculate}
              className="flex flex-col gap-5 md:gap-6"
            >
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  Nome da sua Empresa / Site
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Minha Loja Virtual"
                  className="input-brutalist"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  Verba Mensal de Anúncios (R$)
                </label>
                <input
                  type="number"
                  required
                  placeholder="ex: 2000"
                  className="input-brutalist"
                  value={adBudget}
                  onChange={(e) => setAdBudget(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-brutalist w-full"
              >
                {loading ? (
                  "Processando Cenário..."
                ) : (
                  <>
                    <HiOutlineArrowRight /> Analisar Potencial
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-black space-y-4"
                >
                  <div className="border-2 border-black p-4 bg-neutral-50 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-400 uppercase">Cliques Estimados</span>
                      <span className="font-black text-black">{result.minClicks} - {result.maxClicks}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-400 uppercase">Conversões/Leads</span>
                      <span className="font-black text-black">{result.minLeads} - {result.maxLeads}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-400 uppercase">ROI Esperado</span>
                      <span className="font-black text-green-600">{result.minROI} a {result.maxROI}</span>
                    </div>
                    <div className="border-t border-dashed border-black pt-3 flex justify-between items-center">
                      <span className="text-[10px] font-black text-black uppercase">Faturamento Simulado</span>
                      <span className="text-base md:text-lg font-black text-black">
                        R$ {result.minRevenue} - R$ {result.maxRevenue}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full py-4 bg-green-500 text-black border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-green-600 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                  >
                    Agendar Diagnóstico Gratuito
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-black py-6 md:py-8 border-b-2 border-black overflow-hidden flex">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/80 mx-6 md:mx-10"
            >
              GOOGLE ADS • META ADS • OTIMIZAÇÃO DE ROI • ESCALA DE VENDAS • TIKTOK ADS • ANALYTICS AVANÇADO • FUNIL DE CONVERSÃO • ROI DE ELITE
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section
        id="features"
        className="section-padding border-b-2 border-black bg-neutral-50"
      >
        <div className="max-width">
          <header className="mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Capacidade <br /> Superior.
            </h2>
            <p className="text-neutral-500 font-medium max-w-xs text-sm md:text-base">
              Livre de excessos. Projetado para performance bruta, dados reais e clareza nos investimentos.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-black">
            {[
              {
                icon: <HiOutlineArrowTrendingUp />,
                title: "Tráfego de Elite",
                desc: "Anúncios cirúrgicos voltados apenas para públicos compradores, eliminando qualquer desperdício de verba.",
              },
              {
                icon: <HiOutlinePresentationChartLine />,
                title: "Dados Absolutos",
                desc: "Rastreamento completo do Pixel e APIs de conversão. Você sabe exatamente o retorno de cada centavo.",
              },
              {
                icon: <HiOutlineShieldCheck />,
                title: "Otimização de CRO",
                desc: "Estruturamos e sugerimos melhorias nas suas páginas de destino para garantir a máxima conversão do tráfego enviado.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-10 md:p-16 bg-white flex flex-col items-start border-black border-b-2 md:border-b-0 ${i !== 2 ? "md:border-r-2" : ""} hover:bg-black hover:text-white transition-all group`}
              >
                <div className="text-4xl md:text-5xl mb-6 md:mb-10 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase mb-3 md:mb-4 tracking-tighter">
                  {f.title}
                </h3>
                <p className="font-medium opacity-50 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="section-padding border-b-2 border-black bg-white"
      >
        <div className="max-width grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="order-2 lg:order-1 aspect-square border-4 border-black bg-neutral-50 flex items-center justify-center p-12 md:p-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]">
            <HiOutlineChartBar className="text-[8rem] sm:text-[12rem] text-black" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-8 md:mb-12">
              O Protocolo.
            </h2>
            <div className="space-y-10 md:space-y-16">
              {[
                {
                  n: "01",
                  t: "Diagnóstico Inicial",
                  d: "Análise minuciosa de contas existentes e identificação de falhas de rastreamento e público.",
                },
                {
                  n: "02",
                  t: "Engenharia Técnica",
                  d: "Instalação da infraestrutura de dados (Pixel, CAPI), pesquisa de público e criação de funis de anúncios.",
                },
                {
                  n: "03",
                  t: "Otimização & Escala",
                  d: "Análise diária das campanhas, testes constantes de criativos e escala de orçamento segura.",
                },
              ].map((s, i) => (
                <div key={i} className="flex gap-6 md:gap-10">
                  <span className="text-xl md:text-2xl font-black text-neutral-200">
                    {s.n}
                  </span>
                  <div>
                    <h4 className="text-base md:text-lg font-black uppercase mb-1 md:mb-2">
                      {s.t}
                    </h4>
                    <p className="text-neutral-500 text-xs md:text-sm font-medium leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="section-padding border-b-2 border-black bg-neutral-50"
      >
        <div className="max-width">
          <h2 className="text-center text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-12 md:mb-20">
            Modelos de Parceria.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-black">
            {[
              {
                name: "Start",
                price: "R$ 1.200",
                f: ["Foco local / Leads", "Campanhas WhatsApp & Insta", "Relatórios Mensais"],
              },
              {
                name: "Scale",
                price: "R$ 2.500",
                f: ["E-commerce / Infoprodutos", "Otimização Avançada", "Dashboard em Tempo Real", "+ Taxa de Performance"],
              },
              {
                name: "Elite",
                price: "Personalizado",
                f: ["Estratégia Omnichannel", "Integração CRM / BI", "Assessoria Estratégica", "Suporte VIP dedicado"],
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`p-8 md:p-12 bg-white flex flex-col items-center text-center border-black border-b-2 md:border-b-0 ${i !== 2 ? "md:border-r-2" : ""} hover:bg-neutral-100 transition-colors`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400">
                  {p.name}
                </span>
                <span className="text-4xl md:text-5xl font-black mb-8">
                  {p.price}
                </span>
                <ul className="space-y-3 mb-10">
                  {p.f.map((feat, idx) => (
                    <li
                      key={idx}
                      className="text-[10px] font-black uppercase tracking-widest text-neutral-500"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#shorten"
                  className="w-full py-4 text-center border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all block"
                >
                  Começar Agora
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="section-padding border-b-2 border-black bg-white"
      >
        <div className="max-width max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 md:mb-16 text-center">
            Perguntas Frequentes.
          </h2>
          <div className="border-t-2 border-black">
            <FAQItem
              question="Qual o orçamento mínimo recomendado em anúncios?"
              answer="Recomendamos começar com pelo menos R$ 1.000 a R$ 1.500 mensais de verba de mídia para as plataformas (Google Ads/Meta Ads), além da nossa taxa de gestão, para garantir a coleta de dados suficientes para otimizações."
            />
            <FAQItem
              question="Em quanto tempo começo a ver resultados?"
              answer="Campanhas de leads locais costumam gerar contatos nas primeiras semanas. Para e-commerces e lançamentos de escala, o processo de validação de públicos e testes de criativos costuma levar entre 30 e 60 dias para atingir maturidade máxima de ROI."
            />
            <FAQItem
              question="Existe garantia de vendas?"
              answer="A assessoria de tráfego garante que o público ideal e qualificado seja extraído das redes e direcionado para a sua página. A venda final depende da força da sua oferta, velocidade do site, qualidade do produto e atendimento comercial."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-black text-white text-center">
        <div className="max-width py-12 md:py-20">
          <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-10">
            A <br /> Escala.
          </h2>
          <p className="text-sm md:text-lg font-medium text-neutral-400 mb-12 max-w-xl mx-auto px-4">
            Entre para o grupo de empresas que não contam com a sorte. Tenha uma máquina previsível e disciplinada de captação de clientes.
          </p>
          <a
            href="#shorten"
            className="inline-block bg-white text-black px-8 md:px-12 py-5 md:py-6 font-black uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors text-xs md:text-sm"
          >
            Fazer Simulação Gratuita
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
