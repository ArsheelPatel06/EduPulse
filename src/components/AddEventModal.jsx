import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddEventModal = ({ isOpen, onClose, onSave, defaultDate }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('study'); // study, exam, deadline
    const [time, setTime] = useState('10:00');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            title,
            type,
            time,
            subject,
            date: defaultDate // Keeping it simple for now, relying on parent passed date
        });
        // Reset form
        setTitle('');
        setType('study');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-surface w-full max-w-md rounded-2xl border-2 border-border shadow-2xl relative z-10 overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-border flex justify-between items-center bg-base/50">
                    <h2 className="text-xl font-black uppercase flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        Add New Event
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-base rounded-lg transition-colors">
                        <X className="w-5 h-5 text-muted" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Event Type Selection */}
                    <div className="grid grid-cols-3 gap-3">
                        {['study', 'exam', 'deadline'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`
                                    py-3 rounded-xl font-bold text-sm uppercase transition-all border-2
                                    ${type === t
                                        ? t === 'exam' ? 'bg-red-500/10 border-red-500 text-red-500'
                                            : t === 'study' ? 'bg-purple-500/10 border-purple-500 text-purple-500'
                                                : 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                                        : 'bg-base border-transparent text-muted hover:border-border'
                                    }
                                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-muted uppercase ml-1">Event Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Linear Algebra Review"
                                className="w-full bg-base border-2 border-border rounded-xl p-3 font-bold text-main focus:border-purple-500 focus:outline-none transition-colors placeholder:text-muted/50"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-muted uppercase ml-1">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3.5 w-4 h-4 text-muted" />
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full bg-base border-2 border-border rounded-xl p-3 pl-10 font-bold text-main focus:border-purple-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-muted uppercase ml-1">Subject</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-3.5 w-4 h-4 text-muted" />
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Optional"
                                        className="w-full bg-base border-2 border-border rounded-xl p-3 pl-10 font-bold text-main focus:border-purple-500 focus:outline-none transition-colors placeholder:text-muted/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-bold uppercase tracking-wider text-muted hover:bg-base hover:text-main transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-xl font-bold uppercase tracking-wider bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/20"
                        >
                            Save Event
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default AddEventModal;
