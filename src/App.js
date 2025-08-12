import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Topic from './pages/Topic';
import './styles/globals.css';

function App() {
  return (
      <Router>
        <motion.div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
            />
          </div>

          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topic/:topicId" element={<Topic />} />
              <Route path="/topic/:topicId/:subtopicId" element={<Topic />} />
            </Routes>
          </Layout>
        </motion.div>
      </Router>
  );
}

export default App;