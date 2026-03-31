const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Helper to escape regex characters
const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, startDate, endDate } = req.query;

        const query = { user: req.user.id };

        // Search by title or notes (Escaped to prevent Regex Injection)
        if (search) {
            const escapedSearch = escapeRegex(search);
            query.$or = [
                { title: { $regex: escapedSearch, $options: 'i' } },
                { notes: { $regex: escapedSearch, $options: 'i' } },
            ];
        }

        // Filter by category
        if (category && category !== 'All') {
            query.category = category;
        }

        // Filter by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(query)
            .sort({ date: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Transaction.countDocuments(query);

        res.status(200).json({
            transactions,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalTransactions: count,
        });
    } catch (error) {
        const message = process.env.NODE_ENV === 'production' ? 'Error fetching transactions' : error.message;
        res.status(500).json({ message });
    }
};

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = async (req, res) => {
    try {
        const { title, amount, category, date, notes } = req.body;
        
        if (!title || !amount || !category) {
            res.status(400).json({ message: 'Please add title, amount and category' });
            return;
        }

        const transaction = await Transaction.create({
            user: req.user.id,
            title,
            amount,
            category,
            date: date || Date.now(),
            notes,
        });

        res.status(200).json(transaction);
    } catch (error) {
        const message = process.env.NODE_ENV === 'production' ? 'Error creating transaction' : error.message;
        res.status(500).json({ message });
    }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            res.status(400).json({ message: 'Transaction not found' });
            return;
        }

        // Check for user
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        // Make sure the logged in user matches the transaction user
        if (transaction.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        // Prevent Mass Assignment: Only allowed specific fields
        const { title, amount, category, date, notes } = req.body;
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (amount !== undefined) updateData.amount = amount;
        if (category !== undefined) updateData.category = category;
        if (date !== undefined) updateData.date = date;
        if (notes !== undefined) updateData.notes = notes;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedTransaction);
    } catch (error) {
        const message = process.env.NODE_ENV === 'production' ? 'Error updating transaction' : error.message;
        res.status(500).json({ message });
    }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            res.status(400).json({ message: 'Transaction not found' });
            return;
        }

        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        if (transaction.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        await transaction.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        const message = process.env.NODE_ENV === 'production' ? 'Error deleting transaction' : error.message;
        res.status(500).json({ message });
    }
};

// @desc    Get summary stats
// @route   GET /api/transactions/summary
// @access  Private
const getSummary = async (req, res) => {
    try {
        const userId = req.user.id;

        const summary = await Transaction.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: "$amount" },
                    count: { $sum: 1 },
                    minAmount: { $min: "$amount" },
                    maxAmount: { $max: "$amount" },
                    avgAmount: { $avg: "$amount" }
                }
            }
        ]);

        const categoryStats = await Transaction.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            overall: summary[0] || {},
            byCategory: categoryStats
        });

    } catch (error) {
        const message = process.env.NODE_ENV === 'production' ? 'Error fetching summary' : error.message;
        res.status(500).json({ message });
    }
};

module.exports = {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
};
