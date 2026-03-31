import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

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
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
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
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            rows="3"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Save Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
