import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import Navbar from '../components/Navbar';
import { DollarSign, CreditCard, TrendingUp, Activity } from 'lucide-react';

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
                // console.log("Dashboard Summary Data:", data);
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
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    const { overall, byCategory } = summary || { overall: {}, byCategory: [] };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome back, {user?.name}!</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Expenses"
                        amount={overall.totalExpenses || 0}
                        icon={DollarSign}
                        color="bg-blue-500"
                    />
                    <StatsCard
                        title="Transaction Count"
                        amount={overall.count || 0}
                        icon={Activity}
                        color="bg-purple-500"
                    />
                    <StatsCard
                        title="Avg. Transaction"
                        amount={overall.avgAmount ? Math.round(overall.avgAmount) : 0}
                        icon={CreditCard}
                        color="bg-green-500"
                    />
                    <StatsCard
                        title="Max Transaction"
                        amount={overall.maxAmount || 0}
                        icon={TrendingUp}
                        color="bg-red-500"
                    />
                </div>

                {/* Category Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Expenses by Category</h3>
                        {byCategory && byCategory.length > 0 ? (
                            <div className="space-y-4">
                                {byCategory.map((cat) => (
                                    <div key={cat._id} className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">{cat._id}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${(cat.total / overall.totalExpenses) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-800 font-bold">${cat.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No transactions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
