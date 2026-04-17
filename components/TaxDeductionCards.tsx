"use client";

import { motion } from "framer-motion";
import { ShieldPlus, HeartPulse, Home, PiggyBank, Briefcase } from "lucide-react";

export default function TaxDeductionCards() {
    const deductions = [
        {
            title: "Section 80C",
            icon: <PiggyBank className="text-pink-400" size={32} />,
            color: "from-pink-500/20 to-rose-500/5",
            borderColor: "border-pink-500/30",
            limit: "₹1.5 Lakhs",
            desc: "The holy grail of tax saving. Includes ELSS, EPF, PPF, Life Insurance, and Principal on Home Loan.",
        },
        {
            title: "Section 80D",
            icon: <HeartPulse className="text-red-400" size={32} />,
            color: "from-red-500/20 to-orange-500/5",
            borderColor: "border-red-500/30",
            limit: "₹25K to ₹1L",
            desc: "Health insurance premiums. ₹25K for yourself/family, plus up to ₹50K for senior citizen parents.",
        },
        {
            title: "Section 80CCD(1B)",
            icon: <Briefcase className="text-blue-400" size={32} />,
            color: "from-blue-500/20 to-cyan-500/5",
            borderColor: "border-blue-500/30",
            limit: "Extra ₹50,000",
            desc: "National Pension System (NPS). This is over and above the ₹1.5L limit of Section 80C.",
        },
        {
            title: "Section 24(b)",
            icon: <Home className="text-green-400" size={32} />,
            color: "from-green-500/20 to-emerald-500/5",
            borderColor: "border-green-500/30",
            limit: "Up to ₹2 Lakhs",
            desc: "Interest paid on a home loan for a self-occupied property.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-8">
            {deductions.map((item, idx) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-3xl border ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-md relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:bg-white/10 transition-colors" />
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-black/40 rounded-2xl backdrop-blur-md border border-white/10">
                                {item.icon}
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white">
                                Max: {item.limit}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
