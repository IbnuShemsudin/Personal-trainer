import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, ChevronRight, Activity } from 'lucide-react';

const Register = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        const userData = {
          name: data.user.name,
          role: data.user.role || 'client',
          token: data.token
        };

        // Save to LocalStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Update App.jsx State
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }

        // Redirect to Home
        navigate('/');
      } else {
        setError(data.msg || "Registration Failed");
      }
    } catch (err) {
      setError("Command Centre Offline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/5 p-12 relative"
      >
        <div className="text-center mb-10">
          <div className="inline-flex bg-emerald-600 p-4 skew-x-[-12deg] mb-6">
            <Activity className="text-white skew-x-[12deg]" size={32} />
          </div>
          <h2 className="text-4xl font-display font-black text-white uppercase italic">Join the <span className="text-emerald-500">Vanguard</span></h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-2 font-bold">Create your recruit profile</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] p-3 uppercase font-bold tracking-widest text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
              <input 
                type="text" required
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-zinc-900/50 border border-white/5 py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all font-display italic uppercase"
                placeholder="ABEBE KEBEDE"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
              <input 
                type="email" required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-900/50 border border-white/5 py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all font-display italic uppercase"
                placeholder="RECRUIT@WARFARE.COM"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-1">Set Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
              <input 
                type="password" required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-zinc-900/50 border border-white/5 py-4 pl-12 pr-4 text-white focus:border-emerald-500 outline-none transition-all font-display italic uppercase"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Initiate Training <ChevronRight size={16}/></>}
          </button>

          <p className="text-center text-zinc-600 text-[10px] uppercase tracking-widest font-bold mt-6">
            Already enlisted? <Link to="/login" className="text-emerald-500 hover:text-white transition-colors">Login Here</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;