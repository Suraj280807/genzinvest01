'use client';
import { useState, useEffect } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { FcGoogle } from 'react-icons/fc';
import SplashScreen from '@/components/SplashScreen';

export default function LoginPage() {
    const [showSplash, setShowSplash] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true); // Default to true
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is already logged in, redirect immediately without waiting for splash
                console.log("Session found, redirecting to home...");
                router.push('/');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleSplashFinish = () => {
        if (auth.currentUser) {
            router.push('/');
        } else {
            setShowSplash(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Set persistence based on rememberMe checkbox
                await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/');
        } catch (err: any) {
            setError(err.message.replace('Firebase:', '').trim());
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (showSplash) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020410] relative overflow-hidden font-sans text-white">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)] mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        <span className="text-white">Gen</span>
                        <span className="text-purple-400">Z</span>
                        <span className="text-primary">Invest</span>
                    </h1>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-2" />
                </div>

                {/* Card */}
                <div className="bg-[#0A101F]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-2 text-center">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400 text-center text-sm mb-8">
                        {isLogin ? 'Enter your portal to manage your digital assets.' : 'Join the future of digital asset management.'}
                    </p>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 rounded-xl p-3.5 transition-all duration-200 mb-3 group"
                    >
                        <FcGoogle className="text-xl" />
                        <span className="font-medium text-sm text-gray-200 group-hover:text-white">Continue with Google</span>
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">or email</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3 text-red-400 text-sm"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-primary text-white p-3.5 pl-12 rounded-xl outline-none transition-all placeholder:text-gray-600 font-medium"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0F172A] border border-[#1E293B] focus:border-primary text-white p-3.5 pl-12 pr-12 rounded-xl outline-none transition-all placeholder:text-gray-600 font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                                    <div
                                        className={`w-4 h-4 rounded border border-gray-600 bg-[#0F172A] flex items-center justify-center transition-colors ${rememberMe ? 'border-primary' : ''}`}
                                    >
                                        <Check size={12} className={`text-primary ${rememberMe ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="hidden"
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-[#b0d600] text-black font-bold p-3.5 rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Authorize Access' : 'Create Account'}
                                    <ArrowRight size={18} strokeWidth={2.5} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-gray-400 text-sm">
                            {isLogin ? "New Investor?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-bold hover:underline ml-1 outline-none"
                            >
                                {isLogin ? 'Create Profile' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center gap-6 mt-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy</span>
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms</span>
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">Risk</span>
                </div>
            </motion.div>
        </div>
    );
}
