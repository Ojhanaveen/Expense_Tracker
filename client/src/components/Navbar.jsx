import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  LogOut, 
  User, 
  ChevronDown, 
  PieChart, 
  Wallet, 
  X,
  PlusCircle,
  History
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass-dark rounded-2xl px-6 py-3 pointer-events-auto">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Wallet className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Expense<span className="text-blue-400">Tracker</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                <PieChart size={18} /> Dashboard
                            </Link>
                            <Link to="/transactions" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                <History size={18} /> Transactions
                            </Link>
                            <Link to="/transactions" className="btn-primary py-2 px-4 text-xs flex items-center gap-2">
                                <PlusCircle size={16} /> New Expense
                            </Link>
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                        <User size={18} className="text-indigo-400" />
                                    </div>
                                    <span className="text-sm font-medium text-white">{user.name}</span>
                                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 glass-dark rounded-xl p-2 border border-white/10 shadow-2xl"
                                        >
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="btn-secondary text-sm">Login</Link>
                            <Link to="/register" className="btn-primary text-sm">Get Started</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white pointer-events-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 mx-auto max-w-7xl glass-dark rounded-2xl overflow-hidden pointer-events-auto"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="p-3 hover:bg-white/5 rounded-xl text-white flex items-center gap-3">
                                        <PieChart size={18} /> Dashboard
                                    </Link>
                                    <Link to="/transactions" className="p-3 hover:bg-white/5 rounded-xl text-white flex items-center gap-3">
                                        <History size={18} /> Transactions
                                    </Link>
                                    <Link to="/transactions" className="btn-primary text-center">
                                        + New Expense
                                    </Link>
                                    <button onClick={handleLogout} className="p-3 text-left hover:bg-red-500/10 rounded-xl text-red-400 flex items-center gap-3">
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="p-3 hover:bg-white/5 rounded-xl text-white text-center">Login</Link>
                                    <Link to="/register" className="btn-primary text-center">Get Started</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
