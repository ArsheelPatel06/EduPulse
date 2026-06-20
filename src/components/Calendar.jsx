import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const Calendar = ({ events = [], onSelectDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calendar Logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(new Date(newDate));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    // Event Indicators Helper
    const getEventsForDay = (day) => {
        return events.filter(e => {
            const eDate = new Date(e.date);
            return eDate.getDate() === day &&
                eDate.getMonth() === currentDate.getMonth() &&
                eDate.getFullYear() === currentDate.getFullYear();
        });
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'exam': return 'bg-red-500';
            case 'study': return 'bg-purple-500';
            case 'deadline': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="bg-surface p-6 rounded-2xl border-2 border-border shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase text-main flex items-center gap-2">
                    {monthName} <span className="text-muted">{year}</span>
                </h2>
                <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-base rounded-lg border border-transparent hover:border-border transition-all">
                        <ChevronLeft className="w-5 h-5 text-muted" />
                    </button>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-base rounded-lg border border-transparent hover:border-border transition-all">
                        <ChevronRight className="w-5 h-5 text-muted" />
                    </button>
                </div>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-bold text-muted uppercase tracking-wider py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* Empty slots for previous month */}
                {[...Array(firstDay)].map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Days */}
                {[...Array(days)].map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);

                    return (
                        <motion.button
                            key={day}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                            className={`
                                aspect-square rounded-xl border-2 flex flex-col items-center justify-start pt-2 relative transition-colors
                                ${isToday(day) ? 'bg-purple-600/10 border-purple-500 text-purple-500 font-black' : 'bg-base border-transparent hover:border-border text-main'}
                            `}
                        >
                            <span className="text-sm">{day}</span>

                            {/* Event Dots */}
                            <div className="flex gap-1 mt-1">
                                {dayEvents.slice(0, 3).map((ev, idx) => (
                                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${getTypeColor(ev.type)}`} />
                                ))}
                                {dayEvents.length > 3 && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-6 text-xs font-bold text-muted justify-center border-t border-border pt-4">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Exam</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> Study</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Deadline</div>
            </div>
        </div>
    );
};

export default Calendar;
