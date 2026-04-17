"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { 
  User as UserIcon, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Check, 
  AlertCircle,
  Camera,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Sync state if user data loads late
  useEffect(() => {
    if (user?.displayName) {
      setNewDisplayName(user.displayName);
    }
  }, [user]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !newDisplayName.trim()) return;

    setIsUpdating(true);
    setMessage(null);

    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName.trim()
      });
      setMessage({ text: "Username updated successfully! 🔥", type: 'success' });
      // Force a slight delay to show the success state
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage({ text: "Failed to update. Try again later.", type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMockToggle = (feature: string) => {
    alert(`${feature} toggle updated! (Mocked for demo)`);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 relative overflow-hidden bg-background">
      <ProtectedRoute>
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Navbar />
          <div className="h-32 md:h-40 w-full" aria-hidden="true" />

          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-black font-display flex items-center gap-3">
              Settings <SettingsIcon className="text-secondary animate-spin-slow" size={32} />
            </h2>
            <p className="text-white/60">Customize your profile and app experience.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar Navigation (Visual) */}
            <div className="space-y-2">
              <SettingsNavItem icon={<UserIcon size={18}/>} label="Personal Info" active />
              <SettingsNavItem icon={<Bell size={18}/>} label="Notifications" />
              <SettingsNavItem icon={<Shield size={18}/>} label="Privacy & Security" />
              <SettingsNavItem icon={theme === 'dark' ? <Moon size={18}/> : <Sun size={18}/>} label="Theme" onClick={toggleTheme} />
            </div>

            {/* Main Settings Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Profile Card */}
              <section className="glass rounded-[2rem] border border-white/10 p-6 md:p-8">
                <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                  <UserIcon size={20} className="text-primary" /> Profile Details
                </h3>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-4 border-primary/20 p-1">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center text-white/20">
                           <UserIcon size={40} />
                        </div>
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-primary text-black p-2 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateName} className="flex-1 w-full space-y-4">
                    <div>
                      <label className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">Username / Display Name</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newDisplayName}
                          onChange={(e) => setNewDisplayName(e.target.value)}
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors font-medium"
                          placeholder="Your cool name..."
                        />
                        <button 
                          disabled={isUpdating || newDisplayName === user?.displayName}
                          className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-black px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap"
                        >
                          {isUpdating ? 'Updating...' : 'Save'}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {message && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {message.type === 'success' ? <Check size={16}/> : <AlertCircle size={16}/>}
                          {message.text}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </section>

              {/* Preferences Section */}
              <section className="glass rounded-[2rem] border border-white/10 p-6 md:p-8">
                <h3 className="text-xl font-bold font-display mb-6">General Preferences</h3>
                
                <div className="space-y-4">
                  <ToggleItem 
                    title="Push Notifications" 
                    desc="Get alerts about new flashcards and market trending news." 
                    checked={true}
                    onChange={() => handleMockToggle("Notifications")}
                  />
                  <ToggleItem 
                    title="Daily XP Reminders" 
                    desc="Remind me to maintain my streak so I don't lose tokens." 
                    checked={true}
                    onChange={() => handleMockToggle("Reminders")}
                  />
                  <ToggleItem 
                    title="Public Profile" 
                    desc="Allow others to see your trade setup posts in the feed." 
                    checked={false}
                    onChange={() => handleMockToggle("Privacy")}
                  />
                </div>
              </section>

              {/* Danger Zone */}
              <div className="pt-4">
                <button 
                  onClick={() => auth.signOut()}
                  className="flex items-center gap-2 text-red-500/60 hover:text-red-500 font-bold transition-colors group"
                >
                  <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                  Sign out from GenZInvest
                </button>
              </div>

            </div>
          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}

function SettingsNavItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${active ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 text-white/60'}`}
    >
      <div className="flex items-center gap-3 font-bold text-sm">
        {icon}
        {label}
      </div>
      <ChevronRight size={16} className={active ? 'opacity-100' : 'opacity-0'} />
    </button>
  );
}

function ToggleItem({ title, desc, checked, onChange }: { title: string, desc: string, checked: boolean, onChange: () => void }) {
  const [isOn, setIsOn] = useState(checked);

  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 bg-white/5">
      <div className="flex-1">
        <h4 className="font-bold text-sm text-white">{title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
      </div>
      <button 
        onClick={() => {
          setIsOn(!isOn);
          onChange();
        }}
        className={`w-12 h-6 rounded-full relative transition-colors ${isOn ? 'bg-primary' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOn ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}
