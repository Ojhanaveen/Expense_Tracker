import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await register(name, email, password);
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.error);
            }
        } catch (err) {
            setError('Registration failed. Please check your details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-dark p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full"></div>
                    
                    <div className="text-center space-y-2 relative z-10">
                        <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
                            <UserPlus className="text-indigo-400 w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
                        <p className="text-slate-400 text-sm">Join our world-class financial community</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm flex items-center gap-3"
                        >
                            <ShieldCheck size={18} /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                                <input
                                    type="password"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-3 disabled:opacity-50 group"
                        >
                            {isSubmitting ? 'Creating account...' : (
                                <>
                                    Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-4 relative z-10">
                        <p className="text-slate-400 text-sm">
                            Already have an account? <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors inline-flex items-center gap-1 group">
                                Sign In <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
