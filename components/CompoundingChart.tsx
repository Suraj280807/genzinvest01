
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { year: 'Year 1', invested: 120000, value: 135000 },
    { year: 'Year 3', invested: 360000, value: 450000 },
    { year: 'Year 5', invested: 600000, value: 850000 },
    { year: 'Year 10', invested: 1200000, value: 2300000 },
    { year: 'Year 15', invested: 1800000, value: 5500000 },
    { year: 'Year 20', invested: 2400000, value: 12000000 },
];

export default function CompoundingChart() {
    return (
        <div className="h-[300px] w-full bg-surface-highlight/10 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Power of Compounding (SIP)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#CCFF00" fillOpacity={1} fill="url(#colorValue)" name="Portfolio Value" />
                    <Area type="monotone" dataKey="invested" stroke="#8884d8" fillOpacity={1} fill="url(#colorInvested)" name="Total Invested" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
