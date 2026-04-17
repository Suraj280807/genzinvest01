
"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ChartConfig } from '@/lib/learnData';

const COLORS = ['#CCFF00', '#00C8FF', '#FF0055', '#FFD700', '#AA55FF'];

export default function GenericChart({ config }: { config: ChartConfig }) {
    return (
        <div className="h-[350px] w-full bg-surface-highlight/10 p-6 rounded-2xl border border-white/5 shadow-2xl">
            <h4 className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-widest">{config.title}</h4>
            <p className="text-xs text-gray-500 mb-6 font-mono">{config.description}</p>

            <ResponsiveContainer width="100%" height="80%">
                {renderChart(config)}
            </ResponsiveContainer>
        </div>
    );
}

function renderChart(config: ChartConfig) {
    switch (config.type) {
        case 'area':
            return (
                <AreaChart data={config.data}>
                    <defs>
                        <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey={config.xAxisKey} stroke="#666" fontSize={10} tick={{ fill: '#888' }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} />
                    <Area type="monotone" dataKey={config.dataKey} stroke="#CCFF00" fillOpacity={1} fill="url(#colorMain)" />
                    {/* Optional secondary if exists in data? simpler to stick to one for generic */}
                </AreaChart>
            );
        case 'bar':
            return (
                <BarChart data={config.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey={config.xAxisKey} stroke="#666" fontSize={10} tick={{ fill: '#888' }} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} />
                    <Bar dataKey={config.dataKey} fill="#00C8FF" radius={[4, 4, 0, 0]} />
                </BarChart>
            );
        case 'line':
            return (
                <LineChart data={config.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey={config.xAxisKey} stroke="#666" fontSize={10} tick={{ fill: '#888' }} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} />
                    <Line type="monotone" dataKey={config.dataKey} stroke="#FF0055" strokeWidth={3} dot={{ r: 4, fill: '#000', stroke: '#FF0055' }} />
                </LineChart>
            );
        case 'pie':
            return (
                <PieChart>
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }} />
                    <Pie
                        data={config.data}
                        dataKey={config.dataKey}
                        nameKey={config.xAxisKey}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                    >
                        {config.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                        ))}
                    </Pie>
                </PieChart>
            );
        default:
            return <p>Chart type not supported</p>;
    }
}
