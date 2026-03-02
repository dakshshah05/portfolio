import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { triggerAchievement } from '../components/AchievementSystem';

gsap.registerPlugin(ScrollTrigger);

const WELCOME_TEXT = `> SECURE COMMUNICATION LINK ESTABLISHED
> Encryption: AES-256 | Protocol: QUANTUM-SSH
> 
> Welcome, Visitor.
> Type 'help' to see available commands.
`;

const COMMANDS: Record<string, string> = {
  help: `
> Available Commands:
>   contact    — Open secure messaging channel
>   whoami     — Display visitor profile
>   projects   — List mission database
>   skills     — Show attribute matrix
>   resume     — View Daksh's resume
>   education  — Show academic records
>   sudo       — Attempt root access
>   hack       — Initiate breach protocol
>   matrix     — Enter the matrix
>   secret     — ???
>   clear      — Reset terminal buffer
>   exit       — Close terminal session`,
  whoami: `
> VISITOR PROFILE
> ━━━━━━━━━━━━━━━━━━
> Access Level: GUEST
> Location: DETECTED
> Session: ENCRYPTED
> Status: AUTHENTICATED`,
  contact: `
> ━━━━━━━━━━━━━━━━━━━━━━━━━
> SECURE COMM LINK ACTIVE
> ━━━━━━━━━━━━━━━━━━━━━━━━━
> Email:  dakshshah215@gmail.com
> GitHub: @dakshshah05
> LinkedIn: /in/daksh-kumar-shah
> Signal: ████████████ 100%`,
  projects: `
> MISSION DATABASE
> ━━━━━━━━━━━━━━━━
> [01] Planigo           — IN PROGRESS ◌
> [02] SDG Registration  — COMPLETE ✓
> [03] Gamified Portfolio — COMPLETE ✓`,
  skills: `
> ATTRIBUTE MATRIX
> ━━━━━━━━━━━━━━━━
> Python/Django   ████████████████████ 90
> React/Next.js   ████████████████████ 90
> Node/Express    █████████████████░░░ 85
> Java/C++        █████████████████░░░ 85
> AI/ML           ███████████████░░░░░ 75`,
  resume: `
> ╔═══════════════════════════════════╗
> ║       DAKSH KUMAR SHAH           ║
> ║    Full-Stack Developer & COO    ║
> ╠═══════════════════════════════════╣
> ║ COO @ Planigo         2026-Now   ║
> ║ Board Director        2025-Now   ║
> ║ Exec Board @ SPOTON   2025-Now   ║
> ║ SDE @ LaraPush        2024       ║
> ╠═══════════════════════════════════╣
> ║ BCA @ Christ University          ║
> ║ Bengaluru, India                 ║
> ╠═══════════════════════════════════╣
> ║ Python | Java | C++ | React      ║
> ║ Node.js | Django | Flask | SQL   ║
> ║ AI/ML | Git | Figma | Tailwind   ║
> ╚═══════════════════════════════════╝`,
  education: `
> ACADEMIC RECORDS
> ━━━━━━━━━━━━━━━━
> Institution: Christ University
> Location:    Bengaluru, Karnataka
> Degree:      Bachelor of Computer Applications (BCA)
> Status:      IN PROGRESS
> Focus:       Full Stack Development, AI/ML
> GPA:         ████████████░░ CLASSIFIED`,
  sudo: `
> ⚠ PERMISSION DENIED
> 
> Nice try, hacker. 😏
> Root access is reserved for DKS-05 only.
> Your attempt has been logged.
> 
> Incident ID: #${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
  hack: `
> ⚠ BREACH PROTOCOL INITIATED
> 
> Scanning firewalls... ████████░░ 80%
> Bypassing encryption... ██████░░░░ 60%
> Accessing mainframe... 
> 
> ▓▓▓▓ ACCESS DENIED ▓▓▓▓
> 
> Just kidding. This is a portfolio, not the Pentagon. 😂
> But you get +200 XP for trying.`,
  matrix: `
> ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
> ░ Wake up, Neo...                  ░
> ░ The Matrix has you...            ░
> ░ Follow the white rabbit.         ░
> ░                                  ░
> ░ Knock, knock.                    ░
> ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
> 
> (Daksh actually built this entire
>  portfolio in the Matrix. True story.)`,
  secret: `
> ██████████████████████████████████
> ██ EASTER EGG FOUND!            ██
> ██ You are a true hacker.       ██
> ██ +500 XP BONUS                ██
> ██████████████████████████████████
>
> Congratulations. Few find this.
> Try clicking my avatar 7 times... 👀`,
  exit: `
> Closing session...
> Connection terminated.
> Thanks for visiting. 
> See you in the matrix, friend.`,
};

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const columns = Math.floor(canvas.width / 14);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '11px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const brightness = Math.random();
        ctx.fillStyle = `rgba(0, 245, 255, ${brightness * 0.12})`;
        ctx.fillText(char, i * 14, drops[i] * 14);

        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);
    window.addEventListener('resize', resize);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
}

export default function Contact() {
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [commandTimestamps, setCommandTimestamps] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        if (welcomeShown) return;
        setWelcomeShown(true);
        triggerAchievement('terminal');
        typeText(WELCOME_TEXT);
      },
      once: true,
    });
  }, [welcomeShown]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [terminalText]);

  const typeText = (text: string) => {
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) { clearInterval(interval); setIsTyping(false); }
    }, 10);
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || isTyping) return;
    const val = inputRef.current?.value.trim().toLowerCase();
    if (!val || !inputRef.current) return;
    inputRef.current.value = '';
    setTerminalText(prev => prev + `\n$ ${val}\n`);
    if (val === 'clear') { setTerminalText(''); return; }

    // Speed typing achievement
    const now = Date.now();
    const newTimestamps = [...commandTimestamps, now].filter(t => now - t < 5000);
    setCommandTimestamps(newTimestamps);
    if (newTimestamps.length >= 3) {
      triggerAchievement('speed_typer');
    }

    const response = COMMANDS[val] || `\n> Command not found: '${val}'\n> Type 'help' for available commands.`;
    setTimeout(() => typeText(response), 150);
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-24 flex items-center justify-center z-10 px-4 md:px-8">
      <div className="w-full max-w-3xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-green)]" />
            <span className="font-mono text-[9px] tracking-[0.5em] text-gray-600 uppercase">Secure Channel</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-green)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-wider">
            Contact <span className="neon-text">Terminal</span>
          </h2>
        </div>

        {/* CRT Terminal */}
        <div className="relative">
          <div className="glass-panel overflow-hidden relative" style={{ borderColor: 'rgba(0,245,255,0.08)' }}>
            {/* Header bar */}
            <div className="bg-[#0c0c16] p-2.5 flex items-center justify-between border-b border-white/[0.04]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors interactive" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors interactive" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors interactive" />
              </div>
              <span className="font-mono text-[8px] text-gray-700 tracking-widest">quantum-ssh@daksh.dev — 80×24</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-[var(--color-green)] animate-pulse" />
                <span className="font-mono text-[7px] text-[var(--color-green)] tracking-wider">LIVE</span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="relative bg-[#060610] h-[45vh] md:h-[420px]">
              <MatrixRain />

              {/* Scanlines */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)' }}
              />

              {/* Output */}
              <div ref={outputRef} className="relative z-10 p-5 h-[calc(100%-48px)] overflow-y-auto font-mono text-xs">
                <pre className="whitespace-pre-wrap" style={{ color: '#00f5ff90' }}>
                  {terminalText}
                  {isTyping && <span className="inline-block w-2 h-3.5 bg-[var(--color-neon)] ml-0.5 align-middle" style={{ animation: 'blink-caret 0.7s infinite' }} />}
                </pre>
              </div>

              {/* Input */}
              <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/[0.04] flex items-center gap-2 bg-[#060610]/90 backdrop-blur-sm z-20">
                <span className="text-[var(--color-green)] font-mono text-sm font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="interactive bg-transparent border-none outline-none flex-1 text-[var(--color-neon)] placeholder-gray-800 font-mono text-xs"
                  placeholder="type a command..."
                  onKeyDown={handleCommand}
                  disabled={isTyping}
                />
              </div>
            </div>
          </div>

          {/* Monitor stand */}
          <div className="mx-auto w-24 h-4 bg-gradient-to-b from-white/[0.02] to-transparent rounded-b-lg" />
          <div className="mx-auto w-16 h-1 bg-white/[0.01] rounded-b-lg" />
        </div>

        {/* Quick contact links below terminal */}
        <div className="flex justify-center gap-6 mt-8 font-mono text-[9px] text-gray-600 tracking-widest">
          <a href="mailto:dakshshah215@gmail.com" className="interactive hover:text-[var(--color-neon)] transition-colors">EMAIL</a>
          <span className="text-gray-800">|</span>
          <a href="https://github.com/dakshshah05" target="_blank" rel="noopener noreferrer" className="interactive hover:text-[var(--color-neon)] transition-colors">GITHUB</a>
          <span className="text-gray-800">|</span>
          <a href="https://www.linkedin.com/in/daksh-kumar-shah/" target="_blank" rel="noopener noreferrer" className="interactive hover:text-[var(--color-neon)] transition-colors">LINKEDIN</a>
          <span className="text-gray-800">|</span>
          <a href="https://instagram.com/dakshshah.05" target="_blank" rel="noopener noreferrer" className="interactive hover:text-[var(--color-neon)] transition-colors">INSTAGRAM</a>
        </div>
      </div>
    </section>
  );
}
