import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Clock, Users } from 'lucide-react';
import ContentRenderer from './ContentRenderer';
import CodeEditor from '../CodeEditor/CodeEditor';
import topics from '../../data/topics';

const TopicContent = () => {
    const { topicId, subtopicId } = useParams();
    const navigate = useNavigate();

    // Find current topic and subtopic
    const currentTopic = topics.find(topic => topic.id === topicId);
    const currentSubtopic = currentTopic?.subtopics.find(subtopic => subtopic.id === subtopicId);

    if (!currentTopic || !currentSubtopic) {
        return (
            <div className="flex items-center justify-center h-full p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Content Not Found</h2>
                    <p className="text-slate-400 mb-6">The requested topic or subtopic could not be found.</p>
                    <motion.button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Return to Home
                    </motion.button>
                </div>
            </div>
        );
    }

    // Find navigation info
    const currentIndex = currentTopic.subtopics.findIndex(sub => sub.id === subtopicId);
    const prevSubtopic = currentIndex > 0 ? currentTopic.subtopics[currentIndex - 1] : null;
    const nextSubtopic = currentIndex < currentTopic.subtopics.length - 1 ? currentTopic.subtopics[currentIndex + 1] : null;

    const handleNavigation = (targetSubtopic) => {
        if (targetSubtopic) {
            navigate(`/topic/${topicId}/${targetSubtopic.id}`);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <motion.div
                className="p-4 sm:p-6 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="min-w-0">
                        <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2 flex-wrap">
                            <span>{currentTopic.icon}</span>
                            <span>{currentTopic.title}</span>
                            <ChevronRight size={16} />
                            <span className="text-blue-400 truncate">{currentSubtopic.title}</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 truncate">
                            {currentSubtopic.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center space-x-1">
                                <Clock size={16} />
                                <span>~15 min read</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <BookOpen size={16} />
                                <span>Beginner Level</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users size={16} />
                                <span>1.2k learners</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <motion.div
                        className="text-right"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-sm text-slate-400 mb-1 whitespace-nowrap">
                            Progress: {currentIndex + 1} / {currentTopic.subtopics.length}
                        </div>
                        <div className="w-32 bg-slate-700 rounded-full h-2">
                            <motion.div
                                className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentIndex + 1) / currentTopic.subtopics.length) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Main Content and Code Editor - Stack vertically on mobile */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Main Content */}
                    <motion.div
                        className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{
                            // Takes full height when no editor, 60% when editor exists
                            minHeight: currentSubtopic.codeExample ? '60vh' : 'none',
                            maxHeight: currentSubtopic.codeExample ? '60vh' : 'none'
                        }}

                    >
                        <div className="max-w-4xl mx-auto">
                            <ContentRenderer content={currentSubtopic.content} />

                            {/* Navigation Buttons */}
                            <motion.div
                                className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50 flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div>
                                    {prevSubtopic ? (
                                        <motion.button
                                            onClick={() => handleNavigation(prevSubtopic)}
                                            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors border border-slate-600/50"
                                            whileHover={{ scale: 1.02, x: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <ChevronLeft size={20} />
                                            <div className="text-left">
                                                <div className="text-xs text-slate-400">Previous</div>
                                                <div className="font-medium truncate max-w-[120px] sm:max-w-none">{prevSubtopic.title}</div>
                                            </div>
                                        </motion.button>
                                    ) : (
                                        <div />
                                    )}
                                </div>

                                <div>
                                    {nextSubtopic ? (
                                        <motion.button
                                            onClick={() => handleNavigation(nextSubtopic)}
                                            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="text-right">
                                                <div className="text-xs text-blue-100">Next</div>
                                                <div className="font-medium truncate max-w-[120px] sm:max-w-none">{nextSubtopic.title}</div>
                                            </div>
                                            <ChevronRight size={20} />
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors shadow-lg hover:shadow-green-500/25"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="text-right">
                                                <div className="text-xs text-green-100">Completed!</div>
                                                <div className="font-medium">🎉 Well Done!</div>
                                            </div>
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Code Editor Panel - Show only if there's a code example */}
                    {currentSubtopic.codeExample && (
                        <motion.div
                            className="w-full lg:w-2/5 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-700/50"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            style={{
                                height: '40vh' ,
                                minHeight:  '40vh'
                            }}
                        >
                            <div className="flex-1 flex flex-col min-h-0"> {/* Critical for Monaco */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">🧪 Try It Yourself</h3>
                                    <p className="text-sm text-slate-400">Experiment with the code below</p>
                                </div>
                                <div className="flex-1 min-h-0 overflow-hidden"> {/* Fixes editor sizing */}
                                    <CodeEditor
                                        initialCode={currentSubtopic.codeExample}
                                        language="javascript"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopicContent;