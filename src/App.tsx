/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TrafficCone, ShieldCheck, Info, Phone, Menu, X, Sun, Moon, Github, BookOpen, AlertTriangle, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import FineCalculator from './components/FineCalculator';

const HomeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BotIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <div className={className}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  </div>
);

type Page = 'home' | 'chat' | 'calculator' | 'about' | 'emergency';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    const goToChat = () => setCurrentPage('chat');
    const goToCalc = () => setCurrentPage('calculator');
    
    switch (currentPage) {
      case 'home':
        return <Home onStartChat={goToChat} onStartCalc={goToCalc} />;
      case 'chat':
        return <ChatPage setCurrentPage={setCurrentPage} />;
      case 'calculator':
        return <CalculatorPage />;
      case 'about':
        return <AboutPage />;
      case 'emergency':
        return <EmergencyPage />;
      default:
        return <Home onStartChat={goToChat} onStartCalc={goToCalc} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-brand-light text-emerald-950'}`}>
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-brand-dark flex flex-col p-6 text-emerald-50 border-r border-emerald-800 shrink-0">
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-emerald-500/20">
            <TrafficCone size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase">DriveLegal</span>
        </div>

        <nav className="flex-1 space-y-8">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 px-2">Main Menu</div>
            <NavButton active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={<HomeIcon size={18} />} label="Dashboard" />
            <NavButton active={currentPage === 'chat'} onClick={() => setCurrentPage('chat')} icon={<BotIcon size={18} />} label="AI Chatbot" />
            <NavButton active={currentPage === 'calculator'} onClick={() => setCurrentPage('calculator')} icon={<Award size={18} />} label="Fine Calculator" />
            <NavButton active={currentPage === 'emergency'} onClick={() => setCurrentPage('emergency')} icon={<Phone size={18} />} label="Emergency" />
            <NavButton active={currentPage === 'about'} onClick={() => setCurrentPage('about')} icon={<Info size={18} />} label="About System" />
          </div>

          <div className="hidden md:block">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-4 px-2">System Stats</div>
            <div className="space-y-3 px-2">
              <div className="flex justify-between items-center text-xs opacity-60">
                <span>Laws Indexed</span>
                <span className="font-mono">1.2M+</span>
              </div>
              <div className="flex justify-between items-center text-xs opacity-60">
                <span>States Covered</span>
                <span className="font-mono">28</span>
              </div>
              <div className="flex justify-between items-center text-xs opacity-60">
                <span>Response Time</span>
                <span className="font-mono">0.2s</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-emerald-800">
          <button onClick={toggleTheme} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-emerald-800 rounded-lg transition-colors text-sm font-medium">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden h-screen">
        {/* System Header Card */}
        <section className="mb-6 flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-emerald-800 dark:text-emerald-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
              System Active
            </span>
            <span className="opacity-30">|</span>
            <span className="hidden sm:inline">Road Safety Assistant (v2.1)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-emerald-500 uppercase">Current Session</p>
              <p className="text-xs font-mono dark:text-white">AIS-PRO-DRIVE-2024</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 font-bold">
              DL
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-12 gap-6 min-h-full pb-8"
          >
            {currentPage === 'home' ? (
              <Home onStartChat={() => setCurrentPage('chat')} onStartCalc={() => setCurrentPage('calculator')} />
            ) : (
              <div className="col-span-12 h-full">
                {renderContent()}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

const NavButton = ({ active, label, icon, onClick }: { active: boolean, label: string, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
      active ? 'bg-emerald-800 text-white shadow-inner' : 'text-emerald-400 hover:text-white hover:bg-emerald-800/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

function Home({ onStartChat, onStartCalc }: { onStartChat: () => void, onStartCalc: () => void }) {
  return (
    <>
      {/* Hero Section */}
      <section className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-3xl p-8 shadow-sm flex flex-col justify-center min-h-[360px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-6 w-fit">
          <ShieldCheck size={14} />
          CERTIFIED LEGAL DATABASE
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-emerald-900 dark:text-white leading-tight mb-4">
          Drive Safe.<br />
          Stay Legal.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
          The ultimate AI-powered legal dashboard for Indian road safety regulations, traffic fines, and real-time guidance.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={onStartChat} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
            Launch Assistant
          </button>
          <button onClick={onStartCalc} className="px-6 py-3 border border-emerald-200 dark:border-emerald-800 dark:text-white rounded-xl font-bold hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all">
            Fine Calculator
          </button>
        </div>
      </section>

      {/* Calculator Shortcut Card */}
      <section className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-3xl p-6 shadow-sm overflow-hidden relative group">
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-emerald-950 dark:text-white mb-2">Rule Engine</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Instantly lookup fine amounts based on the Motor Vehicle Act 2019.</p>
          <FineCalculator compact />
        </div>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full group-hover:scale-110 transition-transform"></div>
      </section>

      {/* Safety Card */}
      <section className="col-span-12 md:col-span-6 lg:col-span-4 bg-emerald-600 rounded-3xl p-8 text-emerald-50 shadow-lg shadow-emerald-600/20 flex flex-col justify-between min-h-[280px] relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4">Daily Safety Protocol</h3>
          <p className="text-lg font-medium leading-relaxed opacity-90 italic">
            "Wearing a BIS-certified helmet reduces risk of head injury by 70% in two-wheeler accidents."
          </p>
        </div>
        <div className="flex justify-between items-center relative z-10 mt-8">
          <span className="text-[10px] font-bold px-3 py-1.5 bg-emerald-500/50 rounded-lg text-emerald-50 tracking-widest uppercase">#RoadSafetyWeek</span>
          <Award size={32} />
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full"></div>
      </section>

      {/* Secondary Cards */}
      <section className="col-span-12 lg:col-span-8 bg-emerald-950 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
        <div className="flex flex-wrap items-center gap-8 md:gap-16 relative z-10 mb-6 md:mb-0">
          <div className="text-center">
            <div className="text-3xl font-black mb-1">1.2M+</div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Laws Indexed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black mb-1">28</div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">States Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black mb-1">0.2s</div>
            <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Latency</div>
          </div>
        </div>
        <div className="text-right relative z-10">
          <h2 className="text-2xl font-black italic tracking-tighter text-emerald-300">DRIVE SMART.</h2>
          <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Compliance Hub</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"></div>
      </section>
    </>
  );
}

function ChatPage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-12 lg:col-span-9 h-full min-h-[600px]">
        <Chat />
      </div>
      <div className="hidden lg:block col-span-3">
        <Sidebar currentPage="chat" onPageChange={(page) => setCurrentPage(page as Page)} />
      </div>
    </div>
  );
}

function CalculatorPage() {
  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-12 lg:col-span-8 lg:col-start-3">
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-3xl p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-emerald-900 dark:text-white mb-2">Rule Evaluation</h2>
            <p className="text-slate-500">Calculate penalties based on the specific violation, state, and vehicle class.</p>
          </div>
          <FineCalculator />
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 lg:col-start-3 bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-3xl p-10">
        <h2 className="text-4xl font-black text-emerald-900 dark:text-white mb-8">System Profile</h2>
        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            DriveLegal is a next-generation compliance portal designed to bridges the gap between complex legal statutes and everyday road safety.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 my-10">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-emerald-900 dark:text-white">
                <ShieldCheck className="text-emerald-600" />
                Data Accuracy
              </h3>
              <p className="text-sm opacity-80">Synced directly with the latest Motor Vehicle Act amendments.</p>
            </div>
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-emerald-900 dark:text-white">
                <BotIcon className="text-emerald-600" />
                AI Logic
              </h3>
              <p className="text-sm opacity-80">Using Gemini 1.5 Flash for rapid, context-aware legal reasoning.</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold dark:text-white">Legal Disclaimer</h3>
          <div className="mt-4 p-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-2x rounded-2xl flex gap-4">
            <AlertTriangle className="text-red-500 shrink-0" size={24} />
            <p className="text-sm text-red-900 dark:text-red-200">
              This system is for informational purposes. It does not replace professional legal counsel. Jurisdiction-specific variations may apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmergencyPage() {
  const contacts = [
    { title: "National Emergency", number: "112", color: "bg-red-600" },
    { title: "Ambulance Hub", number: "102", color: "bg-orange-600" },
    { title: "Traffic Police", number: "103", color: "bg-emerald-600" },
    { title: "Highway Assist", number: "1033", color: "bg-brand-dark" },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      {contacts.map((contact, i) => (
        <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[160px] group transition-all hover:border-emerald-500">
          <div>
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">{contact.title}</h3>
            <p className="text-3xl font-black text-emerald-950 dark:text-white">{contact.number}</p>
          </div>
          <a href={`tel:${contact.number}`} className={`self-end w-10 h-10 ${contact.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
            <Phone size={18} />
          </a>
        </div>
      ))}
      <div className="col-span-12 mt-4 bg-emerald-900 p-8 rounded-3xl text-white">
        <h3 className="text-xl font-bold mb-4">Post-Accident Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-4">
               <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs font-bold">01</span>
               <p className="text-sm opacity-80">Secure the scene. Turn on hazard lights and move if safe.</p>
            </div>
            <div className="flex gap-4">
               <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs font-bold">02</span>
               <p className="text-sm opacity-80">Call emergency services immediately (112).</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
               <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs font-bold">03</span>
               <p className="text-sm opacity-80">Document the incident. Take photos of license plates and damages.</p>
            </div>
            <div className="flex gap-4">
               <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs font-bold">04</span>
               <p className="text-sm opacity-80">Exchange information without admitting liability on the spot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


