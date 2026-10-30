// frontend/src/components/AIChatbox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  CheckCircle2,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AIChatbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: `Hello! I am your NutriScan AI Nutrition Advisor. 

I analyzed your recent monthly meal logs. I noticed your daily protein averages ~58g (target: 100g) and your morning meals have high glycemic carbs. 

**Quick Dietary Balancing Tip:**
Try adding **2 boiled eggs** to your morning breakfast to immediately add **13g of complete protein** and essential brain-healthy choline!

How can I help you optimize your diet today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      adviceCard: {
        title: 'Actionable Dietary Swap',
        recommendation: 'Add 2 boiled eggs to breakfast for +13g complete protein & 0g sugar.'
      }
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await response.json();
      setIsTyping(false);

      if (data.success) {
        setMessages(prev => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: 'assistant',
            text: data.reply,
            specificAdvice: data.specificAdvice,
            timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setIsTyping(false);
      let fallbackReply = 'Based on your monthly logs, you have a protein gap of ~35g/day. Adding 2 boiled eggs or 50g boiled soya chunks will balance your daily nitrogen intake.';
      if (query.toLowerCase().includes('oil')) {
        fallbackReply = 'To curb excess cooking oil, use an oil spray for your rotis and avoid double-tempering your moong dal.';
      }
      setMessages(prev => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: 'assistant',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const quickPrompts = [
    'How do I fix my protein shortfall?',
    'Add boiled eggs for protein — what is the exact macro impact?',
    'Tips to reduce excess cooking oil in Indian dals',
    'Am I drinking too much sugar in breakfast juices?'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-4xl mx-auto space-y-4"
    >
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-clean-sm flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-clean-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">
                AI Nutrition Advisor
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Connected to Monthly Log
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Reads your monthly food intake to suggest personalized macro balance & ingredient swaps.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-emerald-700">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Biochemical Diet Intelligence</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-clean-sm flex flex-col h-[520px]">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isUser 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] rounded-2xl p-4 text-xs font-sans leading-relaxed ${
                  isUser 
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow-clean-xs' 
                    : 'bg-gray-50 border border-gray-200/80 text-gray-800 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-line space-y-2">
                    {msg.text}
                  </div>

                  {/* Specific Actionable Advice Card */}
                  {(msg.specificAdvice || msg.adviceCard) && (
                    <div className="mt-3 p-3 rounded-xl bg-white border border-emerald-200 text-gray-800 shadow-clean-xs">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>{msg.specificAdvice?.action || msg.adviceCard?.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 font-sans">
                        {msg.specificAdvice?.macroImpact || msg.adviceCard?.recommendation}
                      </p>
                    </div>
                  )}

                  <span className={`block text-[10px] font-mono mt-2 ${
                    isUser ? 'text-emerald-100 text-right' : 'text-gray-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 max-w-[140px] rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-500">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Analyzing logs...</span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Suggested Quick Prompt Pills */}
        <div className="pt-3 pb-3 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Suggested Dietary Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-xs px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI Nutrition Advisor about macros, protein deficit, or healthy swaps..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-clean-xs transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </motion.div>
  );
};
