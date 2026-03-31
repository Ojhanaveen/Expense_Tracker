import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Calendar, 
  Tag, 
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpenseTracker = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // Filters
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                params: {
                    page,
                    limit: 10,
                    search,
                    category,
                    startDate,
                    endDate,
                },
            };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config);
            setTransactions(data.transactions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [page, search, category, startDate, endDate, user.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${id}`, config);
                fetchTransactions();
            } catch (error) {
                console.error("Error deleting transaction:", error);
            }
        }
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingTransaction(null);
        setShowModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Transaction History</h1>
                    <p className="text-slate-400 font-medium">Keep track of every cent in your financial universe.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="btn-primary flex items-center gap-2 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add New Transaction
                </button>
            </div>

            {/* Filters Bar */}
            <div className="glass-dark p-4 rounded-3xl border border-white/5 flex flex-wrap gap-4 items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 -z-10"></div>
                
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-2.5 flex-1 min-w-[280px] group focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                    <Search size={20} className="text-slate-500 ml-2 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="bg-transparent outline-none w-full px-3 text-white placeholder:text-slate-600 font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 items-center flex-wrap">
                    <select
                        className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>

                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 pr-4 group transition-all">
                        <div className="bg-blue-600/20 p-1.5 rounded-xl border border-blue-500/20 text-blue-400">
                            <Calendar size={18} />
                        </div>
                        <input
                            type="date"
                            className="bg-transparent text-slate-300 outline-none font-medium cursor-pointer [color-scheme:dark]"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <ArrowRight size={14} className="text-slate-600" />
                        <input
                            type="date"
                            className="bg-transparent text-slate-300 outline-none font-medium cursor-pointer [color-scheme:dark]"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-[60px] bg-white/5 border-b border-white/5 -z-10"></div>
                
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5">Title & Reference</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Value</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {transactions.map((t, i) => (
                                    <motion.tr 
                                        key={t._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.02] group transition-all"
                                    >
                                        <td className="px-8 py-6 whitespace-nowrap text-sm text-slate-400 font-medium">
                                            {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold tracking-tight">{t.title}</span>
                                                {t.notes && (
                                                    <span className="text-xs text-slate-500 truncate max-w-[250px] flex items-center gap-1 mt-1">
                                                        <Info size={12} className="shrink-0" /> {t.notes}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase font-bold tracking-wider">
                                                <Tag size={10} /> {t.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-lg font-black text-white tracking-tight">
                                                ${t.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-4">
                                            <button 
                                                onClick={() => handleEdit(t)} 
                                                className="text-slate-500 hover:text-blue-400 transition-colors p-2 hover:bg-blue-400/10 rounded-xl"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(t._id)} 
                                                className="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-red-400/10 rounded-xl"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>

                            {!loading && transactions.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-slate-500">
                                            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center opacity-20">
                                                <Search size={32} />
                                            </div>
                                            <p className="font-medium">No matching records found in your stream.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white/[0.01] px-8 py-6 flex items-center justify-between border-t border-white/5">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-white font-semibold hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="bg-blue-600 border border-blue-500 px-6 py-2 rounded-xl text-sm text-white font-semibold hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <TransactionForm
                    transaction={editingTransaction}
                    onClose={() => setShowModal(false)}
                    onSave={fetchTransactions}
                />
            )}
        </div>
    );
};

export default ExpenseTracker;
