import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    //added
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
            {/* Sidebar */}
            <AnimatePresence>
                <motion.div
                    initial={{ x: isMobile ? '-100%' : -320, opacity: 0 }}
                    animate={{ x: sidebarOpen ? 0 : (isMobile ? '-100%' : -320), opacity: sidebarOpen ? 1 : 0.3,width: isMobile ? '80%' : (sidebarOpen ? 320 : 0)}}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`h-full bg-slate-800/90 backdrop-blur-lg border-r border-slate-700/50 overflow-hidden
                    ${isMobile ? 'fixed top-0 left-0 z-50 h-full' : 'relative'}
                    `}
                    //className="relative z-30 bg-slate-800 overflow-hidden"
                    /*className={`${
                        sidebarOpen ? 'w-80' : 'w-16'
                    } relative z-30 transition-all duration-300`}* in old code animate width wasn't there*/
                >
                    <Sidebar isOpen={sidebarOpen} />
                </motion.div>
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

                {/* Main Content */}
                <motion.main
                    className="flex-1 overflow-hidden relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Glass morphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border-l border-white/10" />

                    {/* Content */}
                    <div className="relative z-10 h-full">
                        {children}
                    </div>
                </motion.main>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/50 z-20"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;