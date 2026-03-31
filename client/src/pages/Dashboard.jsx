import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  ChevronRight,
  PieChart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/transactions/summary`, config);
                setSummary(data);
            } catch (error) {
                console.error("Error fetching summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [user.token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
                />
            </div>
        );
    }

    const { overall, byCategory } = summary || { overall: {}, byCategory: [] };

    return (
        <div className="max-w-7xl mx-auto px-6 py-6 pb-24 space-y-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Financial Overview</h1>
                    <p className="text-slate-400 font-medium">Hello, {user?.name}. Here's what's happening with your wealth.</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/20 text-sm font-semibold">
                    <Activity size={16} /> 24h Activity: Normal
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Spending"
                    amount={overall.totalExpenses || 0}
                    icon={DollarSign}
                    color="bg-gradient-to-br from-blue-600 to-blue-400"
                />
                <StatsCard
                    title="Operations"
                    amount={overall.count || 0}
                    icon={Activity}
                    color="bg-gradient-to-br from-indigo-600 to-indigo-400"
                />
                <StatsCard
                    title="Avg. Expense"
                    amount={overall.avgAmount ? Math.round(overall.avgAmount) : 0}
                    icon={CreditCard}
                    color="bg-gradient-to-br from-cyan-600 to-cyan-400"
                />
                <StatsCard
                    title="Peak Volume"
                    amount={overall.maxAmount || 0}
                    icon={TrendingUp}
                    color="bg-gradient-to-br from-purple-600 to-purple-400"
                />
            </div>

            {/* Category Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    
                    <div className="flex justify-between items-center mb-10 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                                <PieChart size={20} className="text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Expense Distribution</h3>
                        </div>
                        <button className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1">
                            Analyze details <ChevronRight size={16} />
                        </button>
                    </div>

                    {byCategory && byCategory.length > 0 ? (
                        <div className="space-y-8 relative z-10">
                            {byCategory.map((cat, i) => (
                                <motion.div 
                                    key={cat._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-300 font-semibold tracking-wide uppercase text-[10px]">{cat._id}</span>
                                        <span className="text-white font-bold">${cat.total.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-3 p-[2px] border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(cat.total / overall.totalExpenses) * 100}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-400 h-full rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
                            <Activity size={48} className="opacity-20" />
                            <p>No analytical data available yet.</p>
                        </div>
                    )}
                </div>

                {/* Quick Recommendation Card */}
                <div className="glass-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl bg-gradient-to-br from-indigo-600/10 to-transparent flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/20">
                            <TrendingUp size={24} className="text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Smart Insight</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Based on your spending in <strong>{byCategory?.[0]?._id || 'Food'}</strong>, you can save up to 15% next month by adjusting your daily allocation.
                        </p>
                    </div>
                    <button className="btn-primary w-full mt-8">View Strategy</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
