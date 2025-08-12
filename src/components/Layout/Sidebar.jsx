import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, BookOpen, Play, CheckCircle } from 'lucide-react';
import topics from '../../data/topics';

const Sidebar = ({ isOpen }) => {
    const [expandedTopics, setExpandedTopics] = useState(['javascript-basics']);
    const { topicId, subtopicId } = useParams();
    const location = useLocation();

    //added
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


    const toggleTopic = (id) => {
        setExpandedTopics(prev =>
            prev.includes(id)
                ? prev.filter(topic => topic !== id)
                : [...prev, id]
        );
    };

    const isTopicActive = (topic) => topicId === topic.id;
    const isSubtopicActive = (topic, subtopic) =>
        topicId === topic.id && subtopicId === subtopic.id;

    return (
        <motion.aside
            className="h-full bg-slate-800/90 backdrop-blur-lg border-r border-slate-700/50 overflow-hidden relative"
            initial={{ x: isMobile ? '-80%' : -320 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />

            <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-700/50">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {isOpen && (
                            <>
                                <h2 className="text-lg font-semibold text-white mb-1">
                                    📚 Learning Path
                                </h2>
                                <p className="text-sm text-slate-400">
                                    Master programming step by step
                                </p>
                            </>
                        )}
                    </motion.div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                    <AnimatePresence>
                        {topics.map((topic, topicIndex) => (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: topicIndex * 0.1 }}
                                className="mb-2"
                            >
                                {/* Topic Header */}
                                <motion.button
                                    onClick={() => toggleTopic(topic.id)}
                                    className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-700/50 transition-colors ${
                                        isTopicActive(topic) ? 'bg-blue-500/20 border-r-2 border-blue-400' : ''
                                    }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center space-x-3">
                                        {isOpen && (
                                            <>
                                                <span className="text-xl">{topic.icon}</span>
                                                <div className="text-left">
                                                    <h3 className="text-sm font-medium text-white">
                                                        {topic.title}
                                                    </h3>
                                                    <p className="text-xs text-slate-400 truncate max-w-32">
                                                        {topic.description}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {!isOpen && (
                                            <span className="text-xl">{topic.icon}</span>
                                        )}
                                    </div>
                                    {isOpen && (
                                        <motion.div
                                            animate={{ rotate: expandedTopics.includes(topic.id) ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight size={16} className="text-slate-400" />
                                        </motion.div>
                                    )}
                                </motion.button>

                                {/* Subtopics */}
                                <AnimatePresence>
                                    {expandedTopics.includes(topic.id) && isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-slate-900/30"
                                        >
                                            {topic.subtopics.map((subtopic, subtopicIndex) => (
                                                <motion.div
                                                    key={subtopic.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: subtopicIndex * 0.05 }}
                                                >
                                                    <Link
                                                        to={`/topic/${topic.id}/${subtopic.id}`}
                                                        className={`block px-12 py-2 text-sm hover:bg-slate-700/30 transition-colors border-l-2 ${
                                                            isSubtopicActive(topic, subtopic)
                                                                ? 'border-blue-400 bg-blue-500/10 text-blue-300'
                                                                : 'border-transparent text-slate-300 hover:text-white hover:border-slate-600'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                {isSubtopicActive(topic, subtopic) ? (
                                                                    <Play size={14} className="text-blue-400" />
                                                                ) : (
                                                                    <BookOpen size={14} className="text-slate-500" />
                                                                )}
                                                                <span>{subtopic.title}</span>
                                                            </div>
                                                            {/* Progress indicator */}
                                                            <CheckCircle
                                                                size={14}
                                                                className="text-green-400 opacity-50"
                                                            />
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </nav>

                {/* Footer */}
                {isOpen && (
                    <motion.div
                        className="p-6 border-t border-slate-700/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Progress</span>
                                <span className="text-blue-400 font-medium">23%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '23%' }}
                                    transition={{ delay: 1, duration: 1 }}
                                />
                            </div>
                            <p className="text-xs text-slate-400">
                                Keep learning to unlock new topics! 🚀
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.aside>
    );
};

export default Sidebar;