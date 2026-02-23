import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle, Clock, Trash2, 
  RefreshCcw, LogOut, Shield,
  Search, MessageSquare, UserCog, ArrowUpCircle, AlertTriangle
} from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('leads'); 
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [authError, setAuthError] = useState(false);

  // --- AUTH HELPER (FIXED) ---
  const getAuthHeaders = useCallback(() => {
    // We must parse the 'user' object because your Login component 
    // saves the token inside that object, not as a standalone string.
    const sessionData = localStorage.getItem('user');
    const parsedData = sessionData ? JSON.parse(sessionData) : null;
    const token = parsedData?.token;

    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setAuthError(false);
    try {
      const headers = getAuthHeaders();
      
      // If there's no token at all, don't even try the fetch
      if (!headers.Authorization || headers.Authorization === 'Bearer ') {
        setAuthError(true);
        setLoading(false);
        return;
      }

      const [leadsRes, usersRes] = await Promise.all([
        fetch('http://localhost:5000/api/leads', { headers }),
        fetch('http://localhost:5000/api/users', { headers })
      ]);

      if (leadsRes.status === 401 || usersRes.status === 401) {
        setAuthError(true);
        return;
      }

      const leadsData = await leadsRes.json();
      const usersData = await usersRes.json();

      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (error) {
      console.error("CRITICAL: System Link Severed", error);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => { 
    fetchData(); 
  }, [fetchData]);

  // --- ACTIONS ---
  const toggleUserRole = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'client' : 'admin';
      const res = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteRecord = async (id, type) => {
    const endpoint = type === 'lead' ? `leads/${id}` : `users/${id}`;
    if (window.confirm(`CONFIRM PERMANENT ERASE: ${type.toUpperCase()}?`)) {
      try {
        await fetch(`http://localhost:5000/api/${endpoint}`, { 
          method: 'DELETE', 
          headers: getAuthHeaders() 
        });
        fetchData();
      } catch (err) { console.error(err); }
    }
  };

  // --- FILTERS ---
  const filteredLeads = leads.filter(l => 
    (l?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || l?.status === filter)
  );

  const filteredUsers = users.filter(u => 
    (u?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 p-4 md:p-10 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 pointer-events-none blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-emerald-500 animate-pulse" size={20} />
              <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Command Centre</h1>
            </div>
            <div className="flex gap-6 border-b border-white/5">
               {['leads', 'users'].map((tab) => (
                 <button 
                  key={tab}
                  onClick={() => { setActiveTab(tab); setFilter('all'); }}
                  className={`pb-2 text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
                    activeTab === tab ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                 >
                   {tab === 'leads' ? 'Leads Database' : 'Personnel Management'}
                 </button>
               ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {activeTab === 'leads' && (
              <div className="flex bg-white/5 p-1 rounded-sm border border-white/10">
                {['all', 'Pending', 'Contacted', 'Enrolled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-3 py-1 text-[9px] uppercase font-black transition-all ${
                      filter === s ? 'bg-emerald-500 text-black' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex-grow lg:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 py-3 pl-10 pr-4 text-xs text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700" 
                placeholder="SEARCH ARCHIVES..." 
              />
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 bg-red-950/20 border border-red-900/30 text-red-500 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
              <LogOut size={14} /> Terminate
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatBox label="Total Recruits" val={leads.length} icon={<Users />} color="border-emerald-500/40" />
          <StatBox label="Active Personnel" val={users.length} icon={<UserCog />} color="border-blue-500/40" />
          <StatBox label="Pending Review" val={leads.filter(l=>l.status==='Pending').length} icon={<Clock />} color="border-amber-500/40" />
        </div>

        {/* Main Data Table */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-sm overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <RefreshCcw className="animate-spin text-emerald-500" size={32} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Syncing with Vault...</span>
            </div>
          ) : authError ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4 text-center">
              <AlertTriangle className="text-red-500" size={48} />
              <h2 className="text-white font-black uppercase italic text-2xl">Access Denied</h2>
              <p className="max-w-xs text-sm">Your clearance has expired or you do not have Admin privileges.</p>
              <button onClick={onLogout} className="mt-4 px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest">Re-Authenticate</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.01] text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 border-b border-white/5">
                  <tr>
                    <th className="p-6">{activeTab === 'leads' ? 'Identity' : 'Personnel'}</th>
                    <th className="p-6">{activeTab === 'leads' ? 'Objective' : 'Clearance'}</th>
                    <th className="p-6 text-center">{activeTab === 'leads' ? 'Protocol' : 'Access Level'}</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <AnimatePresence mode="wait">
                    {(activeTab === 'leads' ? filteredLeads : filteredUsers).map((item) => (
                      <motion.tr 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        key={item._id} 
                        className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="p-6">
                          <div className="text-white font-bold uppercase tracking-tight">{item.fullName}</div>
                          <div className="text-[10px] text-zinc-600 font-mono">
                            {activeTab === 'leads' ? (item.phone || item.email) : item.email}
                          </div>
                        </td>
                        <td className="p-6">
                          {activeTab === 'leads' ? (
                            <span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">{item.program}</span>
                          ) : (
                            <span className={`text-[9px] font-black px-3 py-1 border ${item.role === 'admin' ? 'border-emerald-500 text-emerald-500' : 'border-zinc-700 text-zinc-500'}`}>
                              {item.role?.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {activeTab === 'leads' ? (
                            <select 
                              value={item.status}
                              onChange={(e) => updateStatus(item._id, e.target.value)}
                              className="bg-black border border-white/10 text-[9px] font-black uppercase p-2 text-zinc-500 outline-none focus:border-emerald-500 cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                            </select>
                          ) : (
                            <button 
                              onClick={() => toggleUserRole(item._id, item.role)}
                              className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-emerald-500 flex items-center gap-2 mx-auto transition-colors"
                            >
                              <ArrowUpCircle size={14} /> {item.role === 'admin' ? 'Demote' : 'Promote'}
                            </button>
                          )}
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                            {activeTab === 'leads' && (
                              <button onClick={() => setSelectedGoal(item)} className="p-2 border border-white/5 hover:text-emerald-500 transition-colors" title="View Goals"><MessageSquare size={14}/></button>
                            )}
                            <button onClick={() => deleteRecord(item._id, activeTab === 'leads' ? 'lead' : 'user')} className="p-2 border border-white/5 hover:text-red-500 transition-colors" title="Delete Record"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {(activeTab === 'leads' ? filteredLeads : filteredUsers).length === 0 && (
                <div className="p-20 text-center uppercase tracking-[0.3em] text-[10px] text-zinc-600 font-bold">No Records Found in Archive</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedGoal && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md" onClick={() => setSelectedGoal(null)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-zinc-900 border border-emerald-500/30 p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                <h3 className="text-xl font-black text-white italic uppercase mb-4">{selectedGoal.fullName} // MISSION DATA</h3>
                <div className="bg-black/50 p-6 border border-white/5 font-mono text-zinc-400 text-sm leading-relaxed min-h-[100px]">
                  {selectedGoal.goals || "No reconnaissance data provided."}
                </div>
                <button onClick={() => setSelectedGoal(null)} className="w-full mt-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors">Close Protocol</button>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatBox = ({ label, val, icon, color }) => (
  <div className={`bg-zinc-900/40 border-l-2 ${color} p-8 flex justify-between items-center backdrop-blur-md`}>
    <div>
      <p className="text-[9px] uppercase font-black text-zinc-500 mb-2">{label}</p>
      <h4 className="text-5xl font-display font-black text-white italic leading-none">{val}</h4>
    </div>
    <div className="text-zinc-800">{icon}</div>
  </div>
);

export default AdminDashboard;