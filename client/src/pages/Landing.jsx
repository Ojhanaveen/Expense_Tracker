import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Zap, 
  Users, 
  Globe,
  ArrowRight,
  Smartphone,
  CreditCard,
  Target
} from 'lucide-react';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="flex flex-col gap-24 py-12 overflow-hidden border-none outline-none">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 text-center space-y-8 relative"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
          <Zap size={14} className="fill-blue-300" />
          <span>New: AI-Powered Insights Available Now</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1]">
          Manage your wealth <br />
          <span className="text-gradient">with precision.</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The all-in-one suite to track, analyze, and optimize your financial journey. Experience world-class expense management with a premium glassmorphic interface.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link to="/register" className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center group">
            Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/login" className="btn-secondary w-full md:w-auto text-center">
            View Live Demo
          </Link>
        </motion.div>

        {/* Visual Hook - Floating glass cards */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 mx-auto max-w-5xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-dark rounded-3xl aspect-video overflow-hidden border border-white/10 shadow-2xl">
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                    <BarChart3 className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Projected Savings</h4>
                    <p className="text-slate-500 text-sm font-medium">Next 30 Days</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-400">+$2,450.00</span>
                  <p className="text-slate-500 text-sm">Target: $5,000.00</p>
                </div>
              </div>
              <div className="w-full h-48 bg-white/5 rounded-2xl flex items-end justify-between px-8 py-4 gap-4">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1 + i*0.1, duration: 1 }}
                    className="w-full bg-gradient-to-t from-blue-600/80 to-indigo-600/40 rounded-t-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold font-serif italic text-white italic">Powerful features for<br />ultimate control.</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Everything you need to master your expenses, all in one premium workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Shield />, title: 'Bank-Level Security', desc: 'Enterprise-grade encryption and multi-factor authentication protect your data.' },
            { icon: <TrendingUp />, title: 'Growth Tracking', desc: 'Monitor your spending habits and visualize your financial growth over time.' },
            { icon: <Smartphone />, title: 'Mobile Refined', desc: 'Access your cloud-synced dashboard on any device, anywhere in the world.' },
            { icon: <CreditCard />, title: 'Smart Categorization', desc: 'Automatically classify transactions to understand where your money goes.' },
            { icon: <Target />, title: 'Budget Goals', desc: 'Set monthly targets and receive real-time notifications on your progress.' },
            { icon: <Globe />, title: 'Global Reach', desc: 'Support for multiple currencies and localized financial insights.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="glass p-8 rounded-3xl space-y-4 hover:border-blue-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-blue-600/5 backdrop-blur-3xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
                { count: '10K+', label: 'Active Users', icon: <Users size={20} /> },
                { count: '$12M+', label: 'Managed Wealth', icon: <Smartphone size={20} /> },
                { count: '99.9%', label: 'Uptime Relay', icon: <Globe size={20} /> },
                { count: '4.9/5', label: 'User Rating', icon: <Shield size={20} /> }
            ].map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                    <div className="flex justify-center text-blue-400 mb-2">{stat.icon}</div>
                    <div className="text-4xl font-black text-white">{stat.count}</div>
                    <div className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="glass-dark p-16 rounded-[3rem] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full -mr-32 -mt-32 animate-float"></div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">Ready to master your <br /> financial destiny?</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Join the premium tier of expense management today. No credit card required to start.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn-primary">Join 10,000+ Users</Link>
                <Link to="/login" className="btn-secondary">Explore Dashboard</Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
