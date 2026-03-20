/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  Home, 
  Zap, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Instagram, 
  ArrowRight,
  ShieldAlert,
  Clock,
  ExternalLink,
  User,
  ShoppingCart,
  ChevronDown,
  Terminal,
  Lock,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none opacity-10 z-0"
    />
  );
};

const DataParticles = () => {
  const particles = ["ROI", "CONVERSION_RATE", "SCALE++", "HACK_ACTIVE", "ENCRYPTED", "0x8F2A"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: ["-10%", "110%"],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-[10px] font-mono text-neon-green"
        >
          {p}
        </motion.div>
      ))}
    </div>
  );
};

const HackerTerminal = () => {
  const [sales, setSales] = useState<{id: number, name: string, action: string, time: string}[]>([
    { id: 1, name: "Gabriel S.", action: "Acesso Liberado", time: "agora" },
    { id: 2, name: "Mariana C.", action: "Vaga Garantida", time: "1 min atrás" },
    { id: 3, name: "Lucas M.", action: "Comprado", time: "2 min atrás" }
  ]);
  
  const names = ["Gabriel S.", "Mariana C.", "Lucas M.", "Ana O.", "Rafael S.", "Juliana L.", "Bruno R.", "Carla S.", "Diego F.", "Beatriz A.", "Ricardo T.", "Fernanda M."];
  const actions = ["Comprado", "Acesso Liberado", "Inscrição Confirmada", "Vaga Garantida"];

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(new Intl.DateTimeFormat('pt-BR', options).format(now));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const newSale = {
        id: Date.now(),
        name,
        action,
        time: "agora"
      };
      
      setSales((prev) => {
        const next = [newSale, ...prev];
        return next.slice(0, 4);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 w-full max-w-md mx-auto lg:mx-0">
      <div className="flex flex-col items-center mb-6 text-center">
        <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-[0.3em] mb-1">Atividade em Tempo Real</span>
        <div className="flex items-center gap-2 text-white/40 font-mono text-[9px] uppercase tracking-widest">
          <Clock size={10} className="text-neon-green/50" />
          {currentTime}
        </div>
      </div>
      
      <AnimatePresence mode="popLayout">
        {sales.map((sale) => (
          <motion.div 
            key={sale.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="bg-black/60 border border-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 hover:border-neon-green/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/20 group-hover:bg-neon-green/20 transition-colors">
              <User size={18} className="text-neon-green" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-white">{sale.name}</h4>
                <span className="text-[10px] text-white/30 font-mono">{sale.time}</span>
              </div>
              <p className="text-xs text-neon-green font-medium flex items-center gap-1 mt-0.5">
                <ShoppingCart size={12} />
                {sale.action}
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#00ff41]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-mono font-bold text-neon-green glow-text-green tracking-tighter">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className="text-[10px] font-mono text-neon-green/60 mt-2 uppercase tracking-widest">
        O acesso expira em breve
      </p>
    </div>
  );
};

const ProfitFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const profits = [
    { name: "Gabriel Silva", value: 450.00 }, { name: "Mariana Costa", value: 1200.00 }, { name: "Lucas Mendes", value: 850.50 },
    { name: "Ana Oliveira", value: 320.00 }, { name: "Rafael Santos", value: 2100.00 }, { name: "Juliana Lima", value: 540.75 },
    { name: "Bruno Rocha", value: 980.00 }, { name: "Carla Souza", value: 150.20 }, { name: "Diego Ferreira", value: 3200.00 },
    { name: "Beatriz Alves", value: 720.00 }, { name: "Felipe Nascimento", value: 430.00 }, { name: "Larissa Gomes", value: 110.50 },
    { name: "Gustavo Pereira", value: 2500.00 }, { name: "Camila Martins", value: 670.00 }, { name: "Rodrigo Barbosa", value: 890.00 },
    { name: "Fernanda Cardoso", value: 1500.00 }, { name: "Thiago Ribeiro", value: 220.00 }, { name: "Amanda Carvalho", value: 3400.00 },
    { name: "Ricardo Araujo", value: 760.00 }, { name: "Vanessa Correia", value: 510.00 }, { name: "Marcelo Teixeira", value: 120.00 },
    { name: "Patrícia Nunes", value: 1800.00 }, { name: "André Vieira", value: 940.00 }, { name: "Letícia Machado", value: 410.00 },
    { name: "Eduardo Cunha", value: 2700.00 }, { name: "Sabrina Freitas", value: 630.00 }, { name: "Vinícius Castro", value: 820.00 },
    { name: "Daniela Borges", value: 1300.00 }, { name: "Igor Cavalcanti", value: 290.00 }, { name: "Renata Moreira", value: 4200.00 },
    { name: "Hugo Duarte", value: 580.00 }, { name: "Tatiana Lopes", value: 710.00 }, { name: "Leonardo Pires", value: 140.00 },
    { name: "Priscila Ramos", value: 1900.00 }, { name: "Alexandre Guimarães", value: 860.00 }, { name: "Bianca Viana", value: 330.00 },
    { name: "Sérgio Antunes", value: 2400.00 }, { name: "Mônica Meireles", value: 610.00 }, { name: "Caio Figueiredo", value: 790.00 },
    { name: "Débora Farias", value: 1100.00 }, { name: "Leandro Paiva", value: 250.00 }, { name: "Cláudia Rezende", value: 3800.00 },
    { name: "Fábio Neves", value: 520.00 }, { name: "Gisele Monteiro", value: 690.00 }, { name: "Otávio Bragança", value: 160.00 },
    { name: "Bárbara Fontes", value: 1700.00 }, { name: "Murilo Sampaio", value: 910.00 }, { name: "Natália Peixoto", value: 440.00 },
    { name: "Victor Guedes", value: 2600.00 }, { name: "Jéssica Lins", value: 650.00 }, { name: "Arthur Valente", value: 840.00 },
    { name: "Elaine Sobral", value: 1400.00 }, { name: "Matheus Dantas", value: 280.00 }, { name: "Raquel Taveira", value: 4500.00 },
    { name: "Samuel Bittencourt", value: 570.00 }, { name: "Viviane Caldas", value: 730.00 }, { name: "Pedro Holanda", value: 180.00 },
    { name: "Cíntia Marinho", value: 1600.00 }, { name: "Ronaldo Assis", value: 930.00 }, { name: "Talita Bezerra", value: 470.00 },
    { name: "Heitor Arantes", value: 2300.00 }, { name: "Luana Porto", value: 620.00 }, { name: "Marcos Sales", value: 770.00 },
    { name: "Sônia Malta", value: 1200.00 }, { name: "Jorge Pontes", value: 310.00 }, { name: "Adriana Veloso", value: 3900.00 },
    { name: "Cássio Junqueira", value: 550.00 }, { name: "Lúcia Dornelles", value: 680.00 }, { name: "Erick Gusmão", value: 190.00 },
    { name: "Tânia Mendonça", value: 1500.00 }, { name: "Davi Ximenes", value: 960.00 }, { name: "Suelen Padilha", value: 490.00 },
    { name: "Nilo Cerqueira", value: 2800.00 }, { name: "Joana Beltrão", value: 640.00 }, { name: "Elias Quintela", value: 810.00 },
    { name: "Milena Fogaça", value: 1350.00 }, { name: "Alanis Coimbra", value: 340.00 }, { name: "Yuri Malafaia", value: 4800.00 },
    { name: "Zeca Camargo", value: 590.00 }, { name: "Lara Vasconcelos", value: 750.00 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profits.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black/80 border-2 border-neon-green rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,65,0.2)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
          <span className="text-[8px] font-mono text-neon-green uppercase tracking-tighter">LIVE_FEED</span>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="flex flex-col items-center text-center py-2"
        >
          <p className="text-white/60 font-mono text-[10px] uppercase tracking-widest mb-2">Novo Lucro Detectado</p>
          <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">
            {profits[currentIndex].name}
          </h3>
          <div className="text-3xl font-mono font-black text-neon-green glow-text-green">
            R$ {profits[currentIndex].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 pt-4 border-t border-neon-green/10 flex justify-between items-center">
        <div className="text-[9px] font-mono text-white/30 uppercase">Protocolo: 0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</div>
        <div className="text-[9px] font-mono text-neon-green uppercase font-bold">Acesso Liberado</div>
      </div>
    </div>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "💻 O que você realmente vai me ensinar?",
      a: "Vou te mostrar, na prática, como pessoas comuns estão fazendo dinheiro no digital todos os dias. Você vai aprender a usar serviços digitais + tráfego pra gerar renda, mesmo começando do zero."
    },
    {
      q: "📱 Dá pra fazer só pelo celular mesmo ou é enrolação?",
      a: "Dá sim. Tudo foi estruturado pra funcionar direto do seu celular, sem precisar de computador ou estrutura complicada."
    },
    {
      q: "🚫 Preciso aparecer ou virar “influencer”?",
      a: "Não. Você não precisa mostrar o rosto, gravar vídeos ou ficar se expondo na internet."
    },
    {
      q: "💸 Preciso investir dinheiro?",
      a: "Não obrigatoriamente. Você pode começar com o que já tem e evoluir depois, conforme for tendo resultado."
    },
    {
      q: "⚡ Isso funciona ou é mais uma promessa?",
      a: "Funciona — mas não é mágica. Você precisa aplicar. Quem executa, vê resultado. Quem só assiste, continua no mesmo lugar."
    },
    {
      q: "⏳ Em quanto tempo vou ganhar dinheiro?",
      a: "Depende de você. Tem gente que faz rápido, outros demoram mais. O método existe — o resultado vem da execução."
    },
    {
      q: "🔒 Isso é confiável?",
      a: "Sim. São estratégias usadas no mercado digital todos os dias, de forma prática e direta."
    },
    {
      q: "📊 O que são “tráfego” e “serviços digitais”?",
      a: "Você vai aprender:\n\n• Como atrair pessoas (tráfego)\n• Como transformar atenção em dinheiro\n• Como vender serviços digitais sem complicação"
    },
    {
      q: "🧠 Serve pra iniciantes mesmo?",
      a: "Sim. Mesmo que você não saiba nada, você vai ter um caminho claro pra seguir."
    },
    {
      q: "🧾 Vou ter suporte ou vou ficar perdido?",
      a: "Você não vai ficar sozinho. Vai ter direcionamento pra conseguir aplicar o método do jeito certo."
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center gap-2 mb-12 text-center">
        <div className="flex items-center gap-2 px-3 py-1 bg-neon-green/10 border border-neon-green/20 rounded-full mb-2">
          <Lock className="text-neon-green" size={14} />
          <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-widest">Acesso Restrito</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">Perguntas Frequentes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i}
            className={`border transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-sm ${
              openIndex === i 
                ? "border-neon-green/40 bg-neon-green/5 shadow-[0_0_20px_rgba(0,255,65,0.05)]" 
                : "border-white/10 bg-black/60 hover:border-white/20"
            }`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-5 flex items-center justify-center text-center group"
            >
              <span className={`text-sm md:text-base font-bold uppercase transition-colors ${
                openIndex === i ? "text-neon-green" : "text-white group-hover:text-neon-green"
              }`}>
                {faq.q}
              </span>
            </button>
            
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-[1px] w-full bg-white/5 mb-4" />
                    <p className="text-sm md:text-base text-white/70 leading-relaxed whitespace-pre-line font-medium">
                      {faq.a}
                    </p>
                    <div className="mt-4 flex items-center gap-2 opacity-20">
                      <div className="h-[1px] flex-1 bg-neon-green" />
                      <span className="text-[7px] font-mono text-neon-green uppercase tracking-[0.3em]">Verified</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-neon-green selection:text-black overflow-x-hidden">
      <MatrixRain />
      <DataParticles />

      {/* Rail Text (Recipe 11) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:block z-50">
        <p className="writing-mode-vertical-rl rotate-180 text-[10px] font-mono font-bold text-neon-green/30 uppercase tracking-[0.5em]">
          PROTOCOL_HACK_BLACK_DIGITAL_2026
        </p>
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden xl:block z-50">
        <p className="writing-mode-vertical-rl text-[10px] font-mono font-bold text-neon-green/30 uppercase tracking-[0.5em]">
          ENCRYPTED_DATA_STREAM_ACTIVE
        </p>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] bg-black/95 backdrop-blur-lg border-b border-neon-green/20 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#00ff41]" />
          <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-widest">LIVE_SYSTEM</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
            <span>Status: Operational</span>
            <span>Uptime: 99.9%</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('faq');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-neon-green text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter"
          >
            Acesso VIP
          </motion.button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Hero Section (Split Layout - Recipe 11) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 min-h-[70vh]">
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-[1px] w-8 bg-neon-green" />
              <span className="text-[10px] font-mono font-bold text-neon-green uppercase tracking-[0.3em]">Protocolo Hack Black</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] mb-8 uppercase tracking-tighter"
            >
              Você ainda está preso na <span className="text-alert-red">CLT</span> enquanto outros <span className="text-neon-green glow-text-green">lucram no digital.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-white/60 mb-10 max-w-md leading-relaxed"
            >
              O treinamento definitivo que revela os bastidores do mercado digital para você construir sua própria máquina de imprimir dinheiro. Aprenda do zero, passo a passo, como dominar as estratégias que os grandes players escondem.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md"
            >
              <ProfitFeed />
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-20"
            >
              <HackerTerminal />
            </motion.div>

            {/* Floating Image Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-20 -right-20 w-80 h-80 z-10 pointer-events-none"
            >
              <img 
                src="https://picsum.photos/seed/hacker-mask/400/400" 
                alt="Hacker Mask" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full grayscale blur-sm"
                style={{ maskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}
              />
            </motion.div>
          </div>
        </section>

        {/* Pain Section */}
        <section className="mb-24">
          <div className="flex items-center gap-2 mb-12 justify-center">
            <ShieldAlert className="text-alert-red" size={20} />
            <h2 className="text-xs font-mono font-bold text-alert-red uppercase tracking-widest">Protocolo de Alerta</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { title: "Escravidão Moderna", desc: "Trocar 8h do seu dia por um salário que mal paga as contas." },
              { title: "Falta de Tempo", desc: "Ver a vida passar sem tempo para o que realmente importa." },
              { title: "Insegurança Financeira", desc: "Depender de uma única fonte de renda que pode sumir amanhã." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-alert-red/5 border border-alert-red/20 p-8 rounded-2xl text-center hover:bg-alert-red/10 transition-colors"
              >
                <h3 className="text-alert-red font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Transformation Section */}
        <section className="mb-24 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-12 justify-center">
            <Zap className="text-neon-green" size={20} />
            <h2 className="text-xs font-mono font-bold text-neon-green uppercase tracking-widest">Acesso à Liberdade</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { icon: Home, title: "Liberdade Geográfica", desc: "Trabalhe de onde quiser, apenas com um celular." },
              { icon: TrendingUp, title: "Escala Infinita", desc: "Seus ganhos não dependem mais do seu tempo." },
              { icon: Zap, title: "Renda Online", desc: "Sistema automatizado rodando 24/7 para você." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4 bg-neon-green/5 border border-neon-green/20 p-8 rounded-2xl hover:bg-neon-green/10 transition-colors"
              >
                <div className="bg-neon-green/10 p-4 rounded-xl">
                  <item.icon className="text-neon-green" size={28} />
                </div>
                <div>
                  <h3 className="text-neon-green font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Checklist Section */}
        <section className="mb-24 bg-neon-green p-12 rounded-[2rem] flex flex-col items-center shadow-[0_0_50px_rgba(0,255,65,0.15)]">
          <h2 className="text-black text-2xl md:text-3xl font-black uppercase mb-12 tracking-tight text-center">Sistema Aprovado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {[
              "Método validado por +5.000 alunos",
              "Suporte 24h via comunidade secreta",
              "Acesso vitalício ao protocolo",
              "Garantia de satisfação total"
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 text-center">
                <div className="bg-black/10 p-2 rounded-full">
                  <CheckCircle2 size={28} className="text-black shrink-0" />
                </div>
                <span className="text-black font-black text-xs uppercase tracking-tight leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Urgency Section */}
        <section className="mb-16 text-center">
          <div className="bg-alert-red/10 border border-alert-red/30 py-8 px-4 rounded-3xl relative overflow-hidden">
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-alert-red/5"
            />
            <div className="relative z-10">
              <h2 className="text-alert-red font-mono text-xs font-bold uppercase tracking-[0.3em] mb-6">
                Acesso Limitado
              </h2>
              <Countdown />
              <motion.p 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-alert-red font-bold text-sm mt-6 uppercase italic"
              >
                Acesso pode expirar a qualquer momento!
              </motion.p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-24">
          <FAQAccordion />
        </section>

        {/* Final CTA */}
        <section className="mb-16">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-neon-green text-black font-black py-6 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.5)] text-xl uppercase tracking-tighter flex items-center justify-center gap-3"
          >
            Quero Acesso Agora
            <Zap size={24} fill="currentColor" />
          </motion.button>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-12 pb-8 px-6 text-center">
        <div className="mb-8">
          <img 
            src="https://picsum.photos/seed/hacker-mask/100/100" 
            alt="Logo" 
            referrerPolicy="no-referrer"
            className="w-12 h-12 mx-auto grayscale opacity-30 mb-4 rounded-full"
          />
          <h3 className="font-mono text-xs font-bold text-white/40 tracking-widest uppercase mb-6">
            © 2026 HACK BLACK DIGITAL
          </h3>
          
          <a 
            href="https://instagram.com/hackblackdigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-neon-green hover:scale-110 transition-transform p-4 border border-neon-green/30 rounded-full bg-neon-green/5 shadow-[0_0_20px_rgba(0,255,65,0.15)] hover:shadow-[0_0_30px_rgba(0,255,65,0.3)]"
          >
            <Instagram size={32} />
          </a>
        </div>

        <div className="grid gap-4 max-w-xs mx-auto">
          <p className="text-[9px] text-white/20 leading-relaxed">
            Este site não faz parte do Google ou do Facebook. Além disso, este site NÃO é endossado pelo Google ou Facebook de nenhuma maneira.
          </p>
          <p className="text-[9px] text-white/20 leading-relaxed">
            AVISO LEGAL: Os resultados podem variar de pessoa para pessoa. Todos os depoimentos e exemplos são reais, mas não garantem que você terá os mesmos resultados.
          </p>
        </div>
      </footer>
    </div>
  );
}
