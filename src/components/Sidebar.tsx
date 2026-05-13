import { ShieldAlert, Phone, Info, Home as HomeIcon, MessageSquare, Award, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SAFETY_TIPS = [
  "Always wear a helmet while riding a two-wheeler.",
  "Never use a mobile phone while driving.",
  "Keep your documents up to date (RC, Insurance, PUC).",
  "Overspeeding is a major cause of road accidents.",
  "Always give way to emergency vehicles like ambulances."
];

const RECENT_SEARCHES = [
  "Drunken driving fine",
  "Section 185 penalties",
  "No helmet challan 2024",
  "Seat belt rules Delhi"
];

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="w-full space-y-6">
      {/* Navigation for mobile/tablet */}
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
        <NavButton 
          active={currentPage === 'home'} 
          onClick={() => onPageChange('home')}
          icon={<HomeIcon size={18} />}
          label="Home"
        />
        <NavButton 
          active={currentPage === 'chat'} 
          onClick={() => onPageChange('chat')}
          icon={<MessageSquare size={18} />}
          label="AI Assistant"
        />
        <NavButton 
          active={currentPage === 'calculator'} 
          onClick={() => onPageChange('calculator')}
          icon={<Award size={18} />}
          label="Rules Lookup"
        />
        <NavButton 
          active={currentPage === 'emergency'} 
          onClick={() => onPageChange('emergency')}
          icon={<Phone size={18} />}
          label="Emergency"
        />
      </div>

      {/* Safety Tips Card */}
      <div className="bg-brand-primary rounded-2xl p-5 text-white shadow-lg shadow-brand-primary/20 relative overflow-hidden group">
        <ShieldAlert className="absolute -right-2 -bottom-2 text-white/10 w-24 h-24 rotate-12 transition-transform group-hover:scale-110" />
        <h4 className="font-bold mb-3 flex items-center gap-2 relative z-10">
          <Award size={18} />
          Safety Tip of the Day
        </h4>
        <p className="text-sm text-white/90 leading-relaxed mb-4 relative z-10 italic">
          "{SAFETY_TIPS[Math.floor(Math.random() * SAFETY_TIPS.length)]}"
        </p>
        <button 
          onClick={() => onPageChange('chat')}
          className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors relative z-10 font-medium"
        >
          Learn More
        </button>
      </div>

      {/* Recent Searches */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Clock size={14} />
          Recent Searches
        </h4>
        <div className="space-y-3">
          {RECENT_SEARCHES.map((search, i) => (
            <button 
              key={i} 
              className="block w-full text-left text-sm text-slate-600 hover:text-brand-primary hover:translate-x-1 transition-all"
            >
              • {search}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Links Shortcut */}
      <button 
        onClick={() => onPageChange('emergency')}
        className="w-full bg-red-50 hover:bg-red-100 text-red-600 p-4 rounded-2xl flex items-center justify-between group transition-colors border border-red-100"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone size={18} />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-wider">Quick Access</p>
            <p className="font-semibold text-slate-800">Emergency Contacts</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function NavButton({ active, label, icon, onClick }: { active: boolean, label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full font-medium",
        active 
          ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10" 
          : "bg-transparent text-slate-600 hover:bg-slate-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
