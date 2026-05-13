import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Copy, Check, Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { chatWithGemini } from '../services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Hello! I am DriveLegal, your AI assistant for road safety and traffic regulations. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await chatWithGemini(input, messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (isListening) {
      setIsListening(false);
      recognition.stop();
    } else {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };

  return (
    <div className="flex flex-col h-full mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-emerald-100 dark:border-emerald-800 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 group",
                message.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                message.role === 'user' ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"
              )}>
                {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              
              <div className={cn(
                "max-w-[80%] rounded-2xl p-4 relative shadow-sm",
                message.role === 'user' 
                  ? "bg-emerald-50 text-emerald-950 rounded-tr-none border border-emerald-100" 
                  : "bg-emerald-900 text-emerald-50 rounded-tl-none shadow-md"
              )}>
                <div className="markdown-body">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                
                {message.role === 'model' && (
                  <button 
                    onClick={() => copyToClipboard(message.text, message.id)}
                    className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-emerald-50 rounded-lg text-emerald-400 hover:text-emerald-600"
                  >
                    {copiedId === message.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
              <Bot size={18} />
            </div>
            <div className="bg-emerald-50 rounded-2xl rounded-tl-none p-4 px-6 border border-emerald-100 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-white border border-emerald-200 rounded-xl p-2 px-4 shadow-inner">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your traffic law question..."
            className="flex-1 bg-transparent text-sm outline-none resize-none pt-2"
          />
          <button
            onClick={toggleListening}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isListening 
                ? "bg-red-100 text-red-600 animate-pulse" 
                : "text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
            )}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-emerald-600 text-white p-2 px-6 rounded-lg font-bold text-sm hover:bg-emerald-700 disabled:opacity-50 transition-all shrink-0 flex items-center justify-center"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "SEND"}
          </button>
        </div>
        <p className="text-[9px] text-center text-emerald-500 font-medium tracking-wide uppercase">
          Disclaimer: This is informational and not official legal advice.
        </p>
      </div>
    </div>
  );
}
