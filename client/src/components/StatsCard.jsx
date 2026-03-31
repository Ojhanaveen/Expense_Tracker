import { ArrowUp, ArrowDown, DollarSign } from 'lucide-react';

const StatsCard = ({ title, amount, icon: Icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">
                    {amount !== undefined ? `$${Math.abs(amount).toLocaleString()}` : '...'}
                </h3>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                {Icon && <Icon size={24} className="text-white" />}
            </div>
        </div>
    );
};

export default StatsCard;
