import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Send, ShieldCheck, Zap, Terminal, Bot } from 'lucide-react';

const CommsPage = () => {
  const [message, setMessage] = useState('');

  const sendTestSignal = async (e) => {
    e.preventDefault();
    // Insert your Backend API call here
    alert("SIGNAL DISPATCHED TO ENCRYPTED CHANNEL");
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-emerald-500/20 pb-8">
          <div className="p-4 bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <Radio size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Signals Intelligence</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-bold">Protocol // Telegram Bot Management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bot Status Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-zinc-900/50 border border-white/5 p-8 backdrop-blur-xl">
              <Bot className="text-emerald-500 mb-4" size={40} />
              <h2 className="text-xl font-black text-white uppercase italic">Agent Status</h2>
              <div className="mt-4 space-y-3">
                <StatusRow label="Connection" value="SECURE" color="text-emerald-500" />
                <StatusRow label="Bot API" value="ACTIVE" color="text-emerald-500" />
                <StatusRow label="Uptime" value="99.9%" color="text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Terminal Dispatch */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 border border-emerald-500/20 p-8 backdrop-blur-xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Terminal size={100} /></div>
              <h2 className="text-xl font-black text-white uppercase italic mb-6 flex items-center gap-2">
                <Zap className="text-emerald-500" size={20} /> Manual Dispatch
              </h2>
              <form onSubmit={sendTestSignal} className="space-y-4">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 p-6 font-mono text-emerald-500 text-sm focus:border-emerald-500 outline-none h-40"
                  placeholder="TYPE ENCRYPTED MESSAGE HERE..."
                />
                <button className="w-full bg-emerald-600 text-white font-black uppercase py-4 tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500">
                  Execute Transmission
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ label, value, color }) => (
  <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] font-black tracking-widest uppercase">
    <span className="text-zinc-500">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

export default CommsPage;