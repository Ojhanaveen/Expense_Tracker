import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { X, Save, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionForm = ({ transaction, onClose, onSave }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        notes: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (transaction) {
            setFormData({
                title: transaction.title,
                amount: transaction.amount,
                category: transaction.category,
                date: new Date(transaction.date).toISOString().split('T')[0],
                notes: transaction.notes || '',
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            const config = {
                withCredentials: true
            };

            if (transaction) {
                await axios.put(`${import.meta.env.VITE_API_URL}/transactions/${transaction._id}`, formData, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/transactions`, formData, config);
            }
            onSave();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving transaction');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-lg glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative z-10"
            >
                <div className="p-8 md:p-10 space-y-8">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                {transaction ? 'Edit Record' : 'New Transaction'}
                            </h2>
                            <p className="text-slate-400 text-sm font-medium">Specify the details of your expense.</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium"
                                    placeholder="e.g. Monthly Rent"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Value ($)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium font-mono"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium cursor-pointer"
                                >
                                    <option value="Food">Food & Dining</option>
                                    <option value="Transport">Transportation</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Health">Healthcare</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium cursor-pointer [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Reference Notes (Optional)</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600 font-medium resize-none"
                                rows="3"
                                placeholder="Add any details..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3 font-bold text-lg group transition-all"
                        >
                            <Save size={20} className="group-hover:scale-125 transition-transform" />
                            {isSubmitting ? 'Syncing...' : (transaction ? 'Update Record' : 'Secure Entry')}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default TransactionForm;
