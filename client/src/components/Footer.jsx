import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Wallet,
  Scale,
  ShieldCheck,
  Zap
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto glass-dark rounded-[3rem] p-12 overflow-hidden relative">
                {/* Decorative background effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                <Wallet className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Expense<span className="text-blue-400">Tracker</span></span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Take control of your financial journey with our world-class, premium expense management suite. Secure, fast, and beautifully intuitive.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:bg-slate-800 transition-all text-slate-400 hover:text-white">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:bg-slate-800 transition-all text-slate-400 hover:text-white">
                                <Github size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:bg-slate-800 transition-all text-slate-400 hover:text-white">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="space-y-6">
                        <h3 className="text-white font-semibold">Features</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer group">
                                <Scale size={16} className="group-hover:scale-125 transition-transform" /> Smart Allocation
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer group">
                                <ShieldCheck size={16} className="group-hover:scale-125 transition-transform" /> Privacy First
                            </li>
                            <li className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer group">
                                <Zap size={16} className="group-hover:scale-125 transition-transform" /> Instant Analytics
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-6">
                        <h3 className="text-white font-semibold">Support</h3>
                        <ul className="space-y-4">
                            <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link to="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="space-y-6">
                        <h3 className="text-white font-semibold">Ready to excel?</h3>
                        <p className="text-slate-400 text-sm">Join over 10,000 users managing their wealth with Tracker.</p>
                        <Link to="/register" className="btn-primary w-full text-center inline-block">Join Now</Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm italic font-serif">© 2026 Expense Tracker. Managed with precision.</p>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Security</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
