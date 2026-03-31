import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Ambient Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full animate-float"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-purple-600/15 blur-[100px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <Navbar />
            
            <main className="flex-grow pt-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
