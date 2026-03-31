import { motion } from 'framer-motion';

const StatsCard = ({ title, amount, icon: Icon, color }) => {
    return (
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-dark p-6 rounded-[2rem] border border-white/10 shadow-xl flex items-center justify-between group transition-all"
        >
            <div className="space-y-1">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider ml-1">{title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">
                    {amount !== undefined ? `$${Math.abs(amount).toLocaleString()}` : '...'}
                </h3>
            </div>
            
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 border border-white/10`}>
                {Icon && <Icon size={28} className="text-white" />}
            </div>
        </motion.div>
    );
};

export default StatsCard;
