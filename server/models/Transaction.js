const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number'],
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
