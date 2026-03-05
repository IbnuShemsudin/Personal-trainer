import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, Loader2, AlertCircle, Terminal, Activity } from 'lucide-react';

// Added onLoginSuccess to the props destructured below
const Login = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = {
      email: e.target.email.value, 
      password: e.target.password.value,
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setUserRole(data.user.role);

        const sessionData = {
          name: data.user.name,
          role: data.user.role,
          token: data.token
        };

        localStorage.setItem('user', JSON.stringify(sessionData));

        // CRITICAL: Call the parent function to update App.jsx state
        if (onLoginSuccess) {
          onLoginSuccess(sessionData);
        }

        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin/dashboard'); 
          } else {
            navigate('/');
          }
        }, 2000);
      } else {
        setError(data.msg || 'IDENTITY REJECTED');
      }
    } catch (err) {
      setError('COMMAND CENTRE OFFLINE');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-900/50 border border-white/10 p-10 relative overflow-hidden backdrop-blur-xl shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan z-20" />
        
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="py-12 text-center space-y-6"
            >
              <div className="inline-flex p-5 bg-emerald-500 text-black rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">
                   {userRole === 'admin' ? 'Commander Identified' : 'Access Granted'}
                </h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-bold animate-pulse">
                  Initializing {userRole === 'admin' ? 'Admin' : 'Recruit'} Interface...
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-10">
                <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 text-emerald-500">
                  <Terminal size={32} />
                </div>
                <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">Personnel Login</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-2">Access Portal // Role Verified Entry</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-emerald-500 tracking-widest ml-1">Email ID</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      name="email" 
                      type="email"
                      autoComplete="off"
                      required 
                      className="w-full bg-black/50 border border-white/5 p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-800 text-sm" 
                      placeholder="ENTER EMAIL" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black text-emerald-500 tracking-widest ml-1">Access Key</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input 
                      type="password" 
                      name="password" 
                      required 
                      className="w-full bg-black/50 border border-white/5 p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-800 text-sm" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-red-500 bg-red-500/5 border border-red-500/20 py-3"
                  >
                    <AlertCircle size={14} />
                    <p className="text-[9px] uppercase font-bold tracking-widest">{error}</p>
                  </motion.div>
                )}

                <button 
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-white/10 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Verify Identity"
                  )}
                </button>
                
                <div className="text-center pt-4">
                   <button 
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-[9px] uppercase font-black text-zinc-600 hover:text-emerald-500 tracking-[0.2em] transition-colors"
                   >
                     New Recruit? Initiate Enrollment
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none">
          <p className="text-[8px] font-mono text-zinc-600">AUTH_PROTOCOL_02.B</p>
        </div>
      </motion.div>

      {/* FIXED: Removed the 'jsx' attribute to resolve console warning */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;