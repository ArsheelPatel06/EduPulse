import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, total, color = "bg-purple-500", label }) => {
    const percentage = Math.min(100, Math.max(0, (progress / total) * 100));

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between text-xs mb-1 text-gray-400">
                    <span>{label}</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color} shadow-[0_0_10px_rgba(168,85,247,0.4)]`}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
