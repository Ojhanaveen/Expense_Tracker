import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Receipt, LogOut } from 'lucide-react';

const Navbar = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-700' : '';
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold flex items-center gap-2">
                    <Receipt size={24} />
                    ExpenseTracker
                </Link>

                {user && (
                    <div className="flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/dashboard')}`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-700 transition ${isActive('/transactions')}`}
                        >
                            <Receipt size={18} />
                            Transactions
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600 transition ml-4"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
