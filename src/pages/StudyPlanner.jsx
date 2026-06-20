import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import { useAppState } from '../state/appState';
import AddEventModal from '../components/AddEventModal';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudyPlanner = () => {
    const { state, dispatch } = useAppState();
    const { events } = state;

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleAddEvent = (newEvent) => {
        const eventWithId = {
            ...newEvent,
            id: Date.now(),
            date: newEvent.date.toISOString() // Store as ISO string
        };
        dispatch({ type: 'ADD_EVENT', payload: eventWithId });
        setIsModalOpen(false);
    };

    const handleDeleteEvent = (id) => {
        dispatch({ type: 'DELETE_EVENT', payload: id });
    };

    // Filter events for selected date
    const selectedEvents = events.filter(e => {
        const eDate = new Date(e.date);
        return eDate.getDate() === selectedDate.getDate() &&
            eDate.getMonth() === selectedDate.getMonth() &&
            eDate.getFullYear() === selectedDate.getFullYear();
    });

    return (
        <div className="min-h-screen bg-base text-main transition-colors duration-300">
            <Navbar />

            <AddEventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddEvent}
                defaultDate={selectedDate}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
                        <CalendarIcon className="w-10 h-10 text-purple-600" />
                        Academic Planner
                    </h1>
                    <p className="text-muted font-bold text-lg">
                        Organize your exams, study sessions, and deadlines.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-250px)] min-h-[600px]">

                    {/* Left: Calendar */}
                    <div className="lg:col-span-2">
                        <Calendar events={events} onSelectDate={handleDateSelect} />
                    </div>

                    {/* Right: Event Panel */}
                    <div className="bg-surface rounded-2xl border-2 border-border p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black uppercase">
                                {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 text-xs font-bold bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Event
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-border">
                            {selectedEvents.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted opacity-50 space-y-2">
                                    <Clock className="w-8 h-8" />
                                    <p className="font-bold">No plans for today</p>
                                </div>
                            ) : (
                                selectedEvents.map(event => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-base border-2 border-border p-4 rounded-xl flex items-start gap-4 group hover:border-purple-500/50 transition-colors"
                                    >
                                        <div className={`w-1 self-stretch rounded-full ${event.type === 'exam' ? 'bg-red-500' :
                                                event.type === 'study' ? 'bg-purple-500' : 'bg-yellow-500'
                                            }`} />

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-main">{event.title}</h3>
                                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${event.type === 'exam' ? 'border-red-500 text-red-500' :
                                                        event.type === 'study' ? 'border-purple-500 text-purple-500' : 'border-yellow-500 text-yellow-500'
                                                    }`}>{event.type}</span>
                                            </div>

                                            <div className="flex gap-3 mt-1">
                                                <p className="text-xs font-bold text-muted flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {event.time}
                                                </p>
                                                {event.subject && (
                                                    <p className="text-xs font-bold text-muted flex items-center gap-1">
                                                        <BookOpen className="w-3 h-3" /> {event.subject}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default StudyPlanner;
