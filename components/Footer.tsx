'use client';

import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github, Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) return null;

    return (
        <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-md mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="text-xl font-black font-display mb-4">
                            <span className="text-primary">G</span>en<span className="text-secondary">Z</span> <span className="text-white">Invest</span>
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Making finance simple, fun, and profitable for the next generation. No suits, just gains.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Platform links */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Market Dashboard</Link></li>
                            <li><Link href="/flashcards" className="hover:text-primary transition-colors">Swipe Wisdom</Link></li>
                            <li><Link href="/learn" className="hover:text-primary transition-colors">Learn Investing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Crypto Tracker</Link></li>
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal links */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
                            <li><Link href="/ai-policy" className="hover:text-primary transition-colors">AI Usage Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500 font-mono">
                        &copy; {new Date().getFullYear()} GenZ Invest. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-500 fill-red-500" /> by <span className="text-white font-bold">You</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
