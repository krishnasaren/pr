import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Code2, Sparkles, Search, Bell, User } from 'lucide-react';

const Header = ({ onToggleSidebar, sidebarOpen }) => {
    return (
        <motion.header
            className="h-16 bg-slate-800/80 backdrop-blur-lg border-b border-slate-700/50 flex items-center px-6 z-20 relative"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm" />

            <div className="relative z-10 flex items-center justify-between w-full">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    {/* Menu toggle */}
                    <motion.button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu size={20} />
                    </motion.button>

                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <div className="relative">
                            <Code2 size={28} className="text-blue-400" />
                            <motion.div
                                className="absolute -top-1 -right-1"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles size={12} className="text-yellow-400" />
                            </motion.div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Amstig
                            </h1>
                            <p className="text-xs text-slate-400 -mt-1">Learn. Code. Create.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Center - Search (hidden on mobile) */}
                <motion.div
                    className="hidden md:flex items-center flex-1 max-w-md mx-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="relative w-full">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all placeholder-slate-400"
                        />
                    </div>
                </motion.div>

                {/* Right side */}
                <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Notifications */}
                    <motion.button
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Bell size={18} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    </motion.button>

                    {/* Profile */}
                    <motion.div
                        className="flex items-center space-x-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                        <span className="hidden sm:block text-sm font-medium">Learner</span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.header>
    );
};

export default Header;