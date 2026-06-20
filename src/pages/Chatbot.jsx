import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../state/appState';
import { generateContent } from '../services/geminiClient';
import { buildJimiPrompt } from '../utils/jimiContext';

const Chatbot = () => {
    const { state } = useAppState();
    const role = state.currentUser?.role || 'student';
    
    const initialMessage = role === 'admin' 
        ? "Welcome, Admin. I am Jimi AI. I'm here to help you analyze platform metrics and manage users."
        : role === 'teacher'
        ? "Welcome, Educator. I am Jimi AI. I'm here to help you track student performance and generate assignments."
        : "Welcome, Student. I am Jimi AI. I'm here to analyze your stats and help you crush your next exam. What's the mission today?";

    const [messages, setMessages] = useState([
        { id: 1, text: initialMessage, sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        // 1. Add User Message
        const newUserMsg = { id: Date.now() + Math.random(), text, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // 2. Build Prompt & Call Gemini
            const prompt = buildJimiPrompt(state, text);
            const responseText = await generateContent(prompt);

            // 3. Add Jimi's Response
            const newBotMsg = { id: Date.now() + 1 + Math.random(), text: responseText.trim(), sender: 'bot' };
            setMessages(prev => [...prev, newBotMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg = { id: Date.now() + 1 + Math.random(), text: "Connection interrupted. Tactical systems offline. Please try again.", sender: 'bot' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = role === 'admin'
        ? ["Generate system health report", "Find inactive students", "Summarize platform usage"]
        : role === 'teacher'
        ? ["Identify at-risk students", "Draft a new assignment on React", "Generate quiz questions"]
        : ["Explain Red-Black Trees", "Quiz me on SQL Joins", "Generate a study plan", "Debug my code snippet"];

    // Simple Markdown Formatter
    const formatMessage = (text) => {
        if (!text) return null;

        // 1. Split by newlines to handle paragraphs and lists
        return text.split('\n').map((line, i) => {
            if (!line.trim()) return <br key={i} />;

            // 2. Handle Bullet Points
            if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                const content = line.trim().substring(2);
                return (
                    <li key={i} className="ml-4 list-disc pl-1 mb-1 marker:text-purple-400">
                        {parseBold(content)}
                    </li>
                );
            }

            // 3. Regular Paragraph
            return (
                <p key={i} className="mb-2 last:mb-0">
                    {parseBold(line)}
                </p>
            );
        });
    };

    // Helper to parse **bold** text
    const parseBold = (text) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-purple-300 font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="min-h-screen bg-base text-main flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col h-[calc(100vh-64px)]">

                {/* Chat Header */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-surface border-2 border-border">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white border-2 border-purple-500">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-main">AI Study Assistant</h1>
                        <p className="text-xs text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Online • Context Aware
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">

                    {/* Render Chat Messages */}
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border-2
                                ${msg.sender === 'user' ? 'bg-surface border-border' : 'bg-surface border-purple-900'}`}>
                                {msg.sender === 'user' ? <User className="w-5 h-5 text-muted" /> : <Bot className="w-5 h-5 text-purple-500" />}
                            </div>

                            <div className={`p-4 rounded-xl max-w-[80%] text-sm font-medium leading-relaxed border-2 relative
                                ${msg.sender === 'user'
                                    ? 'bg-purple-600 text-white border-purple-500 rounded-tr-none'
                                    : 'bg-surface text-main border-border rounded-tl-none'}`}>
                                {msg.sender === 'user' ? msg.text : formatMessage(msg.text)}
                            </div>
                        </motion.div>
                    ))}

                    {/* Thinking Indicator (Outside Map to fix layout order) */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-3"
                        >
                            <div className="w-10 h-10 bg-surface rounded-lg border-2 border-purple-900 flex items-center justify-center shadow-lg shadow-purple-900/10">
                                <Bot className="w-5 h-5 text-purple-500 animate-pulse" />
                            </div>
                            <div className="bg-surface px-4 py-3 rounded-xl border-2 border-border rounded-tl-none flex gap-1.5 items-center h-12 shadow-sm">
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200" />
                            </div>
                        </motion.div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input Area */}
                <div className="mt-auto">
                    {/* Suggestions */}
                    {messages.length < 3 && (
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(suggestion)}
                                    className="whitespace-nowrap px-4 py-2 rounded-lg bg-surface hover:bg-base border-2 border-border hover:border-gray-400 dark:hover:border-gray-600 text-xs font-bold text-muted transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Field */}
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask anything..."
                            className="w-full bg-surface border-2 border-border rounded-xl py-4 pl-6 pr-14 text-main placeholder-muted focus:outline-none focus:border-purple-500 focus:ring-0 transition-all shadow-none"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="absolute right-2 top-2 p-2 bg-purple-600 rounded-lg hover:bg-purple-700 border-2 border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-muted mt-2 font-mono">AI can make mistakes. Verify important information.</p>
                </div>

            </main>
        </div>
    );
};

export default Chatbot;
