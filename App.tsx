import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Menu,
  X,
  Phone,
  GraduationCap,
  Sparkles,
  BookOpen,
  Cpu,
  Globe,
  School,
  Download,
  User,
  Terminal,
  Layers
} from 'lucide-react';
import { PROJECTS, EXPERIENCES, SKILLS, ICON_MAP } from './constants';

const PROFILE_IMAGE_SRC = "https://lh3.googleusercontent.com/d/1eQRCGkVABlw82173ZWZ55kAd29jWUMf4"; 

// --- LOADING SCREEN COMPONENT ---
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "INITIALIZING CORE...",
    "ESTABLISHING NEURAL LINK...",
    "FETCHING RESEARCH MODULES...",
    "SYNCING ROBOTICS HEURISTICS...",
    "SYSTEMS 100% OPERATIONAL"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] bg-[#0A0F14] flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-md w-full">
        <div className="flex items-center gap-3 mb-8">
          <Terminal className="text-teal-400 animate-pulse" size={24} />
          <span className="font-mono text-teal-400 text-sm tracking-widest uppercase">MARUTHI.OS // BOOT_SEQUENCE</span>
        </div>
        
        <div className="h-1 w-full bg-[#1E293B] rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <AnimatePresence mode="wait">
            <motion.span 
              key={messageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              {messages[messageIndex]}
            </motion.span>
          </AnimatePresence>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- INTERACTIVE GRID COMPONENT ---
const InteractiveGrid: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const gridX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), { stiffness: 50, damping: 20 });
  const gridY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), { stiffness: 50, damping: 20 });

  return (
    <motion.div 
      style={{ x: gridX, y: gridY }}
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
    >
      <div className="absolute inset-0" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, #94A3B8 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
    </motion.div>
  );
};

// --- SPOTLIGHT CARD COMPONENT ---
const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group interactive-card ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(45, 212, 191, 0.1), transparent 40%)`
          ),
        }}
      />
      {children}
    </div>
  );
};

// --- ENHANCED CODING BACKGROUND ---
const CodingBackground: React.FC = () => {
  const [elements, setElements] = useState<{ id: number; x: number; y: number; text: string; duration: number; delay: number; size: number }[]>([]);
  const [binaryStreams, setBinaryStreams] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  
  const codeFragments = useMemo(() => ['const', 'function', '=>', '{}', '[]', 'if', 'while', '01', 'return', 'async', 'await', '<div />', 'props', 'useEffect', 'map', 'filter'], []);
  const systemMessages = useMemo(() => [
    "> INITIALIZING AI CORE...",
    "> LOADING ROBOTICS SIMULATION...",
    "> FETCHING RESEARCH DATA...",
    "> NEURAL NETWORK ONLINE",
    "> COMPILING INNOVATION...",
    "> SYNCING GLOBAL STANDARDS...",
    "> STATUS: 100% OPERATIONAL",
    "> EXECUTING HEURISTICS..."
  ], []);

  useEffect(() => {
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      text: codeFragments[Math.floor(Math.random() * codeFragments.length)],
      duration: 20 + Math.random() * 30,
      delay: Math.random() * -30,
      size: 10 + Math.random() * 6
    }));
    setElements(newElements);

    const streams = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * -20,
      duration: 10 + Math.random() * 15
    }));
    setBinaryStreams(streams);

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), systemMessages[currentLogIndex]]);
      currentLogIndex = (currentLogIndex + 1) % systemMessages.length;
    }, 4000);

    return () => clearInterval(interval);
  }, [codeFragments, systemMessages]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {binaryStreams.map((stream) => (
        <motion.div
          key={`stream-${stream.id}`}
          initial={{ y: '-20%', opacity: 0 }}
          animate={{ y: '120%', opacity: [0, 0.03, 0.03, 0] }}
          transition={{ duration: stream.duration, repeat: Infinity, delay: stream.delay, ease: "linear" }}
          className="absolute text-[8px] md:text-[10px] text-teal-400 font-mono flex flex-col items-center"
          style={{ left: `${stream.x}%` }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i}>{Math.round(Math.random())}</span>
          ))}
        </motion.div>
      ))}

      {elements.map((el) => (
        <motion.div
          key={`snippet-${el.id}`}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ 
            y: '-10%', 
            opacity: [0, 0.05, 0.05, 0],
            x: [`${el.x}%`, `${el.x + (Math.sin(el.id) * 5)}%`, `${el.x}%`]
          }}
          transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "linear" }}
          className="absolute font-mono text-slate-400 font-bold"
          style={{ left: `${el.x}%`, fontSize: `${el.size}px` }}
        >
          {el.text}
        </motion.div>
      ))}

      <div className="absolute bottom-10 right-10 text-left opacity-[0.05] font-mono text-[10px] md:text-xs text-teal-300 hidden md:block">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={log + i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];
    let animationFrameId: number;
    let mouse = { x: -100, y: -100 };

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string; baseSize: number;
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = 'rgba(45, 212, 191, 0.25)';
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > (canvas?.width || 0)) this.x = 0; else if (this.x < 0) this.x = (canvas?.width || 0);
        if (this.y > (canvas?.height || 0)) this.y = 0; else if (this.y < 0) this.y = (canvas?.height || 0);
        
        const dx = mouse.x - this.x; const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= (dx / distance) * force * 1.2;
          this.y -= (dy / distance) * force * 1.2;
          this.size = this.baseSize * (1 + force * 2);
        } else {
          this.size = this.baseSize;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color; 
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(45, 212, 191, 0.4)';
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = [];
      const count = (window.innerWidth * window.innerHeight) / 10000;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      
      particles.forEach((p1, i) => {
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 * (1 - distMouse / 180)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x; const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(45, 212, 191, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.4; ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
      init(); 
    };
    const handleMouseMove = (e: MouseEvent) => { 
      mouse.x = e.clientX; 
      mouse.y = e.clientY; 
    };
    window.addEventListener('resize', handleResize); 
    window.addEventListener('mousemove', handleMouseMove);
    handleResize(); animate();
    return () => { 
      window.removeEventListener('resize', handleResize); 
      window.removeEventListener('mousemove', handleMouseMove); 
      cancelAnimationFrame(animationFrameId); 
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40 z-0" />;
};

const TypewriterText: React.FC = () => {
  const phrases = ["AI & Robotics Enthusiast", "Aspiring Entrepreneur", "Constant Explorer"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullText = phrases[currentPhraseIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <div className="text-lg md:text-xl text-teal-400 font-mono h-8 text-center">
      {currentText}
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-5 bg-teal-400 ml-1 align-middle" />
    </div>
  );
};

const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start center", "end center"] 
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const active1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const active2 = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const active3 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  const educationData = [
    { range: '2015-2023', score: '78.6% (CBSE)', title: 'Matriculation (10th)', school: 'Kendriya Vidyalaya, Kadapa', state: 'ANDHRA PRADESH', active: active1, icon: <BookOpen size={18} /> },
    { range: '2023-2025', score: '97.6%', title: 'Intermediate (11th & 12th)', school: 'Narayana Junior College, Tirupati', state: 'ANDHRA PRADESH', active: active2, icon: <School size={18} /> },
    { range: '2025 - PRESENT', title: 'B.Tech INDO-GERMAN EXCHANGE', school: 'Christ University, Bangalore', state: 'KARNATAKA', active: active3, icon: <GraduationCap size={18} /> }
  ];

  return (
    <section id="education" ref={containerRef} className="py-24 px-6 relative overflow-hidden scroll-mt-24 bg-[#0A0F14]">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">Academic <span className="text-teal-400">Ascent</span></h2>
          <p className="text-slate-400 text-lg">My educational path across India, illuminated as you explore.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-800" />
          <motion.div 
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500 via-sky-500 to-indigo-500 origin-top z-10 shadow-[0_0_15px_rgba(45,212,191,0.5)]" 
            style={{ scaleY }} 
          />

          <div className="space-y-16 md:space-y-24 relative z-20">
            {educationData.map((m, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-start md:items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div 
                    style={{ opacity: m.active, scale: m.active }} 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-teal-400 border border-teal-500/30 bg-[#0A0F14] z-30 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                  >
                    {m.icon}
                  </motion.div>
                </div>

                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-24' : 'md:pl-24'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="glass-premium p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 hover:border-teal-500/20 hover:-translate-y-2"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] text-teal-400 font-mono font-bold tracking-widest bg-teal-500/10 px-2 py-0.5 rounded">{m.range}</span>
                      {m.score && <span className="text-xs font-bold text-slate-400">{m.score}</span>}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">{m.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">{m.school}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{m.state}, INDIA</p>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);

  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: entranceProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "center center"]
  });

  const entranceY = useTransform(entranceProgress, [0, 1], [200, 0]);
  const entranceScale = useTransform(entranceProgress, [0, 1], [0.8, 1]);
  const entranceOpacity = useTransform(entranceProgress, [0, 0.8], [0, 1]);
  const entranceRotateX = useTransform(entranceProgress, [0, 1], [15, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    heroMouseX.set((clientX - innerWidth / 2) / 25);
    heroMouseY.set((clientY - innerHeight / 2) / 25);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const offset = 80;
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const sectionHeaderVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" as any }
  };

  return (
    <div className="relative text-slate-200 selection:bg-teal-500/30 font-['Inter']">
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ background: 'linear-gradient(180deg, #0A0F14 0%, #0F172A 45%, #020617 100%)' }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-900/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-40"></div>
        <ParticlesBackground />
        <CodingBackground />
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-teal-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight cursor-pointer text-white" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            VVSSM
          </motion.div>
          <div className="hidden md:flex gap-8 items-center uppercase tracking-widest text-[10px] font-semibold">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)} 
                className="hover:text-teal-400 transition-colors relative group text-slate-400"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-400 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
          <button className="md:hidden z-50 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="fixed inset-0 z-40 md:hidden bg-[#0A0F14]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-2xl uppercase tracking-widest text-white"
          >
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)} 
                className="hover:text-teal-400"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <section 
          className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden"
          onMouseMove={handleHeroMouseMove}
        >
          <InteractiveGrid />
          
          <div className="relative z-10 max-w-6xl w-full text-center">
            <motion.div 
              style={{ x: heroMouseX, y: heroMouseY }}
              className="flex flex-col items-center"
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="inline-block px-4 py-1.5 glass rounded-full text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400 mb-8 border-teal-500/20"
              >
                Researcher • Innovator • Student
              </motion.span>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                animate={!isLoading ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.4, duration: 1, type: 'spring' }}
                className="relative mb-8 shrink-0 group"
              >
                <div className="absolute inset-0 bg-teal-500/10 blur-3xl rounded-full group-hover:bg-teal-500/20 transition-colors duration-500"></div>
                <div className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border border-white/10 p-1.5 bg-[#0A0F14]/40 backdrop-blur-sm relative z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.03]">
                  <img 
                    src={PROFILE_IMAGE_SRC} 
                    alt="Maruthi Vandadi" 
                    className="w-full h-full rounded-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Maruthi+Vandadi&background=0A0F14&color=2dd4bf&size=512';
                    }}
                  />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute -bottom-2 -right-2 w-12 h-12 glass rounded-full flex items-center justify-center border border-teal-500/30 shadow-lg z-20 bg-black/50"
                >
                  <Sparkles size={20} className="text-teal-400" />
                </motion.div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20, letterSpacing: '-0.05em' }}
                animate={!isLoading ? { opacity: 1, y: 0, letterSpacing: '0em' } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4 text-white"
              >
                Maruthi <span className="text-gradient">Vandadi</span>
              </motion.h1>

              {!isLoading && <TypewriterText />}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-5 mt-10 w-full justify-center"
              >
                <motion.a 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects" 
                  onClick={(e) => scrollToSection(e, '#projects')} 
                  className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-2xl transition-all transform flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(45,212,191,0.2)]"
                >
                  View Projects <ChevronRight size={18} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')} 
                  className="px-10 py-4 glass hover:bg-white/5 text-white font-bold rounded-2xl transition-all text-center min-w-[180px] border-white/5"
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section 
          id="about" 
          ref={aboutRef} 
          className="py-24 px-6 scroll-mt-24 relative overflow-hidden bg-[#0A0F14] flex items-center justify-center min-h-[80vh]"
          style={{ perspective: '1000px' }}
        >
          <motion.div 
            style={{ 
              y: entranceY, 
              scale: entranceScale, 
              opacity: entranceOpacity,
              rotateX: entranceRotateX
            }}
            className="max-w-4xl mx-auto relative z-10 text-center"
          >
            <div>
              <motion.h2 
                {...sectionHeaderVariants}
                className="text-3xl md:text-5xl font-bold mb-10 flex items-center justify-center gap-4 text-white"
              >
                <span className="text-teal-400 font-mono text-xl">01.</span> About Me
              </motion.h2>
              <div className="space-y-8 text-slate-400 leading-relaxed text-lg md:text-2xl font-light max-w-3xl mx-auto">
                <p>
                  I am a first-year B.Tech student at <span className="text-white font-medium">Christ University, Bangalore</span>, 
                  proudly enrolled in the prestigious <span className="text-teal-400 font-medium italic">Indo-German exchange program</span>. 
                  This cross-cultural academic path allows me to bridge global engineering standards with local innovation.
                </p>
                <p>
                  My core interests lie at the heart of <span className="text-teal-400">Robotics</span> and 
                  <span className="text-teal-400"> Artificial Intelligence</span>. I am fascinated by the potential of 
                  autonomous systems to augment human capability and solve complex socio-economic challenges.
                </p>
              </div>
              
              <div className="mt-16 flex justify-center gap-12">
                {[
                  { val: 'R&D', label: 'Focus Area', color: 'text-teal-400' },
                  { val: 'AI', label: 'Specialization', color: 'text-white' },
                  { val: 'GLOBAL', label: 'Perspective', color: 'text-sky-400' }
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                      <span className={`text-3xl md:text-4xl font-bold ${item.color}`}>{item.val}</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-2 font-semibold">{item.label}</span>
                    </div>
                    {i < 2 && <div className="w-px h-16 bg-slate-800" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <EducationSection />

        <section 
          id="experience" 
          className="py-24 px-6 scroll-mt-24 relative bg-[#020617]" 
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h2 
              {...sectionHeaderVariants}
              className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight text-white"
            >
              Professional <span className="text-teal-400">Journey</span>
            </motion.h2>
            <div className="relative pl-8 border-l border-slate-800 space-y-16">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-teal-500 rounded-full border-4 border-[#020617] shadow-[0_0_15px_rgba(45,212,191,0.5)]"></div>
                  <div className="glass-premium p-10 rounded-[2.5rem] hover:border-teal-500/30 transition-all duration-500 group">
                    <div className="flex flex-col md:flex-row justify-between mb-6 gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{exp.role}</h3>
                        <p className="text-teal-400/80 font-medium text-xs uppercase tracking-widest font-mono">@ {exp.company}</p>
                      </div>
                      <span className="text-slate-500 text-xs font-mono bg-white/5 px-4 py-1.5 rounded-full h-fit border border-white/5">{exp.period}</span>
                    </div>
                    <ul className="space-y-4">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-4 text-slate-300 font-light leading-relaxed">
                          <ChevronRight size={18} className="text-teal-500 mt-1 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
        </section>

        <section id="projects" className="py-24 px-6 scroll-mt-24 bg-[#0A0F14]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <motion.h2 
                {...sectionHeaderVariants}
                className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white"
              >
                Innovation <span className="text-teal-400">Lab</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 font-light italic mb-6 text-lg"
              >
                A selection of tools and applications built to explore specific technical challenges.
              </motion.p>
              <motion.a 
                whileHover={{ scale: 1.05, gap: '1.5rem' }}
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-3 transition-all"
              >
                View GitHub <ExternalLink size={16} />
              </motion.a>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((project, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.1 }}
                >
                  <SpotlightCard className="glass-premium p-12 rounded-[3rem] h-full border-white/5 transition-all duration-700 hover:-translate-y-3">
                    <div className="p-4 bg-teal-500/10 rounded-2xl text-teal-400 w-fit mb-8 transition-all group-hover:bg-teal-500 group-hover:text-black shadow-[0_10px_30px_rgba(45,212,191,0.1)]">
                      {ICON_MAP[project.icon] || <Sparkles />}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-teal-400 transition-colors text-white">{project.title}</h3>
                    <p className="text-slate-400 font-light mb-10 leading-relaxed line-clamp-3 text-lg">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full text-slate-500 group-hover:text-teal-300 transition-colors border border-transparent font-bold">{t}</span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 px-6 scroll-mt-24 bg-[#0A0F14]">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
                <motion.h2 
                  {...sectionHeaderVariants}
                  className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white"
                >
                  Technical <span className="text-teal-400">Prowess</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-400 font-light text-lg"
                >
                  Building a foundation in engineering and research excellence.
                </motion.p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {SKILLS.map((skill, idx) => (
                 <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: idx * 0.05, type: 'spring' }} 
                    whileHover={{ y: -5, borderColor: 'rgba(45, 212, 191, 0.3)' }}
                    className="glass p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-6 group transition-all"
                 >
                   <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all shadow-xl">
                      <Cpu size={28} />
                   </div>
                   <div>
                     <p className="font-bold text-xl text-white group-hover:text-teal-400 transition-colors">{skill.name}</p>
                     <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 mt-2 font-bold">{skill.category}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 pb-40 scroll-mt-24 relative overflow-hidden bg-[#0A0F14]">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div>
              <motion.h2 
                {...sectionHeaderVariants}
                className="text-4xl md:text-8xl font-bold mb-8 tracking-tight text-white"
              >
                Get In <span className="text-gradient">Touch</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-xl md:text-2xl font-light mb-16 max-w-2xl mx-auto leading-relaxed"
              >
                Whether it's a research opportunity or just a chat about robotics and AI, my inbox is always open.
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-24">
                 <motion.a 
                  whileHover={{ scale: 1.05, y: -5 }}
                  href="mailto:maruthi8807@gmail.com" 
                  className="glass px-10 py-5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all group text-lg text-white"
                >
                  <Mail size={24} className="text-teal-400" /> maruthi8807@gmail.com
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, y: -5 }}
                  href="tel:+919963913785" 
                  className="glass px-10 py-5 rounded-2xl border border-white/5 flex items-center gap-4 transition-all group text-lg text-white"
                >
                  <Phone size={24} className="text-teal-400" /> +91 9963913785
                </motion.a>
              </div>

              <div className="flex justify-center gap-12">
                {[
                  { icon: <Linkedin size={32} />, href: "#" },
                  { icon: <Github size={32} />, href: "https://github.com" },
                  { icon: <Globe size={32} />, href: "#" }
                ].map((social, i) => (
                  <motion.a 
                    key={i} 
                    href={social.href} 
                    whileHover={{ scale: 1.2, y: -10 }} 
                    className="p-6 glass rounded-full text-slate-500 hover:text-teal-400 transition-all border-white/5 shadow-2xl"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-[#0A0F14] text-center px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-slate-500 text-xs font-mono uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} Maruthi Vandadi. Handcrafted Excellence.</div>
          <div className="flex gap-16 text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Legal</a>
            <motion.a 
              whileHover={{ scale: 1.1, y: -2 }}
              href="#" 
              className="bg-white hover:bg-teal-400 text-black px-6 py-2 rounded-full transition-all font-bold tracking-widest"
            >
              Resume
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;