const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cookieParser()); // Cookie handling
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    // Add Vercel URL here if you have it
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all requests
app.use(limiter);

// Specific rate limit for Auth (optional, more restrictive)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit login attempts to 10 per hour
    message: 'Too many login attempts, please try again after an hour',
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB Runtime Error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

// Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'Expense Tracker API is healthy and running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
