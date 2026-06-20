import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Crosshair } from 'lucide-react';

const SubjectResultCard = ({ title, mastery, accuracy, attempts, weakArea }) => {
    // Determine Status Logic
    let statusColor = "text-purple-500";
    let progressBarColor = "bg-purple-600";
    let statusText = "In Progress";

    if (mastery >= 80) {
        statusColor = "text-green-500";
        progressBarColor = "bg-green-500";
        statusText = "Mastered";
    } else if (mastery < 40) {
        statusColor = "text-red-500";
        progressBarColor = "bg-red-500";
        statusText = "Needs Focus";
    }

    return (
        <div className="group space-y-3 p-4 rounded-xl border-2 border-transparent hover:border-border hover:bg-base/30 transition-all">

            {/* Header: Title & Status */}
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="font-bold text-lg text-main group-hover:text-purple-400 transition-colors">
                        {title}
                    </h3>
                    {weakArea && accuracy < 50 && (
                        <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1 animate-pulse">
                            <AlertTriangle className="w-3 h-3" />
                            Weakness: {weakArea}
                        </p>
                    )}
                </div>
                <div className="text-right">
                    <span className={`block font-black uppercase text-xs tracking-wider ${statusColor}`}>
                        {statusText}
                    </span>
                    <span className="text-[10px] font-bold text-muted uppercase">
                        {attempts} Attempts
                    </span>
                </div>
            </div>

            {/* Mastery Bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-muted">
                    <span>Mastery</span>
                    <span>{mastery}%</span>
                </div>
                <div className="h-3 w-full bg-base rounded-full overflow-hidden border border-border relative">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)', backgroundSize: '10px 100%' }} />

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${mastery}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${progressBarColor} shadow-[0_0_10px_currentColor] opacity-90 relative`}
                    >
                        <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-white/40" />
                    </motion.div>
                </div>
            </div>

            {/* Accuracy Indicator (Secondary) */}
            <div className="flex items-center gap-3 pt-1">
                <div className="w-full bg-base h-1.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500/60"
                        style={{ width: `${accuracy}%` }}
                    />
                </div>
                <span className="text-[10px] font-bold text-blue-400 shrink-0 min-w-[3rem] text-right">
                    {accuracy}% Acc.
                </span>
            </div>
        </div>
    );
};

export default SubjectResultCard;
