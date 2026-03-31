import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(email, password);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all hover:scale-105 duration-300">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Bellcorp</h1>
                    <p className="text-gray-500 text-sm tracking-widest uppercase">Expense Tracker</p>
                </div>

                <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Welcome Back</h2>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded text-sm flex items-center">
                        <span className="mr-2">⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600 text-sm">
                    New to Bellcorp? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
