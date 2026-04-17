
"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

const data = [
    { time: 'Accumulation', price: 100 },
    { time: 'Markup', price: 150 },
    { time: 'Boom', price: 300 },
    { time: 'Euphoria', price: 450 },
    { time: 'Distribution', price: 420 },
    { time: 'Markdown', price: 250 },
    { time: 'Panic', price: 150 },
    { time: 'Capitulation', price: 90 },
    { time: 'Recovery', price: 130 },
];

export default function MarketCycleChart() {
    return (
        <div className="h-[300px] w-full bg-surface-highlight/10 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Market Psychology Cycle</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#666" fontSize={10} tick={{ fill: '#888' }} interval={0} angle={-15} textAnchor="end" height={50} />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                    />
                    <ReferenceLine x="Euphoria" stroke="red" label={{ position: 'top', value: 'Greed', fill: 'red', fontSize: 10 }} />
                    <ReferenceLine x="Panic" stroke="cyan" label={{ position: 'top', value: 'Fear', fill: 'cyan', fontSize: 10 }} />
                    <Line type="monotone" dataKey="price" stroke="#CCFF00" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
