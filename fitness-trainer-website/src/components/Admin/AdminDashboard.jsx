import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { 
  Users, CheckCircle, Clock, Trash2, 
  RefreshCcw, LogOut, ExternalLink, Shield,
  Search, Eye, MessageSquare
} from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

  // Helper to get the token for secure requests
  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.token}`
    };
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        headers: getAuthHeaders() // Added Auth Headers
      });
      const data = await response.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Critical: Database link severed.", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(), // Added Auth Headers
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchLeads();
    } catch (error) {
      console.error("Protocol Update Failed");
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm("PERMANENT DATA EXPUNGE: Confirm identity for deletion?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/leads/${id}`, { 
          method: 'DELETE',
          headers: getAuthHeaders() // Added Auth Headers
        });
        if (res.ok) setLeads(leads.filter(l => l._id !== id));
      } catch (error) {
        console.error("Expunge Failed");
      }
    }
  };

  // Rest of your logic stays exactly the same
  const stats = {
    total: leads?.length || 0,
    enrolled: leads?.filter(l => l?.status === 'Enrolled').length || 0,
    pending: leads?.filter(l => l?.status === 'Pending').length || 0,
  };

  const filteredLeads = leads.filter(l => {
    const name = l?.fullName || "";
    const status = l?.status || "Pending";
    const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filter === 'all' || status.toLowerCase() === filter.toLowerCase();
    return nameMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 p-4 md:p-10 font-sans relative selection:bg-emerald-500 selection:text-black">
      <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 pointer-events-none blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-emerald-500 animate-pulse" size={18} />
              <h1 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">Command Centre</h1>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500/60 font-bold underline decoration-emerald-500/30 underline-offset-8">
              System Access: Level 01 // Operational Status: Green
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={14} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 py-3 pl-10 pr-4 text-xs text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700" 
                placeholder="SEARCH RECRUITS..." 
              />
            </div>
            <button onClick={fetchLeads} className="p-3 bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 transition-all">
              <RefreshCcw size={18} className={loading ? 'animate-spin text-emerald-500' : ''} />
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 bg-red-950/20 border border-red-900/30 text-red-500 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
              <LogOut size={14} /> Terminate Session
            </button>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Recruits", value: stats.total, icon: <Users />, color: "border-blue-500/40" },
            { label: "Elite Protocol", value: stats.enrolled, icon: <CheckCircle />, color: "border-emerald-500/40" },
            { label: "Pending Review", value: stats.pending, icon: <Clock />, color: "border-amber-500/40" },
          ].map((s, i) => (
            <div key={i} className={`bg-zinc-900/40 border-l-2 ${s.color} p-8 flex justify-between items-center backdrop-blur-md`}>
              <div>
                <p className="text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2">{s.label}</p>
                <h4 className="text-5xl font-display font-black text-white italic leading-none">{s.value}</h4>
              </div>
              <div className="text-zinc-800">{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-sm">
          <div className="p-6 border-b border-white/5 flex flex-wrap gap-4 justify-between items-center bg-white/[0.01]">
            <div className="flex gap-2">
              {['all', 'Pending', 'Contacted', 'Enrolled'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${
                    filter === t ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-white/10 text-zinc-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01] text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600">
                  <th className="p-6">Lead Identity</th>
                  <th className="p-6">Program Objective</th>
                  <th className="p-6 text-center">Recruit Goals</th>
                  <th className="p-6">Deployment Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <AnimatePresence mode='popLayout'>
                  {filteredLeads.map((lead) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={lead._id} 
                      className="border-b border-white/5 hover:bg-emerald-500/[0.02] transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-white font-bold uppercase tracking-tight group-hover:text-emerald-400">{lead?.fullName}</span>
                          <span className="text-zinc-600 text-[10px] font-mono mt-1">{lead?.phone}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">
                          {lead?.program || "UNSPECIFIED"}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => setSelectedGoal(lead)}
                          className="p-2 bg-zinc-800/50 hover:bg-emerald-500/20 text-zinc-500 hover:text-emerald-500 transition-all rounded-sm border border-white/5"
                        >
                          <MessageSquare size={14} />
                        </button>
                      </td>
                      <td className="p-6">
                        <select 
                          value={lead?.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                          className="bg-black/40 border border-white/10 text-[9px] font-black uppercase tracking-widest px-3 py-2 outline-none cursor-pointer hover:border-emerald-500/60 transition-all text-zinc-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                        </select>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-all">
                          <a href={`https://wa.me/${lead?.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="p-2.5 bg-zinc-800/50 text-zinc-400 hover:text-emerald-500 border border-white/5">
                            <ExternalLink size={14} />
                          </a>
                          <button onClick={() => deleteLead(lead._id)} className="p-2.5 bg-zinc-800/50 text-zinc-400 hover:text-red-500 border border-white/5">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RECRUIT GOAL OVERLAY */}
      <AnimatePresence>
        {selectedGoal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedGoal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-emerald-500/30 p-8 max-w-lg w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <h3 className="text-xl font-display font-black text-white uppercase italic mb-2">{selectedGoal.fullName}</h3>
              <p className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold mb-6">Mission Objectives / Fitness Goals</p>
              <div className="bg-black/50 p-6 border border-white/5 text-zinc-400 text-sm leading-relaxed font-mono">
                {selectedGoal.goals || "No detailed reconnaissance data provided for this recruit."}
              </div>
              <button 
                onClick={() => setSelectedGoal(null)}
                className="mt-8 w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors"
              >
                Close Protocol
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;