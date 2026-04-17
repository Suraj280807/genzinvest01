'use client';
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut, User as UserIcon, Settings, Moon, Sun, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function UserProfile() {
    const { user } = useAuth();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center p-0.5 rounded-full hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-primary/50"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-primary/80 object-cover shadow-[0_0_15px_rgba(204,255,0,0.3)] bg-surface"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-surface-highlight flex items-center justify-center border-2 border-primary/80 text-primary shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                        <UserIcon size={20} />
                    </div>
                )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50 bg-background/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto"
                    >
                        {/* User Identity Section */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-br from-surface to-background flex items-center gap-3">
                            <div className="flex-shrink-0">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full border border-primary/30 object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <UserIcon size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-foreground truncate">
                                    {user.displayName || 'User'}
                                </p>
                                <p className="text-xs text-foreground/60 truncate">
                                    {user.email || 'No email provided'}
                                </p>
                            </div>
                        </div>

                        {/* Actions Array */}
                        <div className="p-2 flex flex-col gap-1">
                            {/* Theme Toggle option */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent immediately closing if wanted, but fine to close
                                    toggleTheme();
                                }}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-highlight text-foreground/80 hover:text-foreground transition-colors group text-sm font-medium"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-md bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                                        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                                    </div>
                                    <span>Theme</span>
                                </div>
                                <span className="text-xs text-foreground/50 capitalize bg-surface-highlight px-2 py-0.5 rounded-full border border-white/5">
                                    {theme} Mode
                                </span>
                            </button>

                            {/* Community / Feed */}
                            <Link 
                                href="/feed"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-highlight text-foreground/80 hover:text-foreground transition-colors group text-sm font-medium"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                                        <Users size={16} />
                                    </div>
                                    <span>Community</span>
                                </div>
                                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                                    New
                                </span>
                            </Link>

                            {/* Settings */}
                            <Link 
                                href="/settings"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-highlight text-foreground/80 hover:text-foreground transition-colors group text-sm font-medium"
                            >
                                <div className="p-1.5 rounded-md bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors">
                                    <Settings size={16} />
                                </div>
                                <span>Settings</span>
                            </Link>

                            <hr className="my-1 border-white/5 mx-2" />

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-500 transition-colors group text-sm font-medium"
                            >
                                <div className="p-1.5 rounded-md text-red-400 group-hover:scale-110 transition-transform">
                                    <LogOut size={16} />
                                </div>
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
