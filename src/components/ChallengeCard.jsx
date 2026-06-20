import React from 'react';
import { Zap, Clock, CheckCircle } from 'lucide-react';

const ChallengeCard = ({ type, title, reward, progress, total, timeLeft }) => {
    const isCompleted = progress >= total;

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

            <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded bg-opacity-20 ${type === 'Daily' ? 'text-blue-400 bg-blue-500' : 'text-purple-400 bg-purple-500'}`}>
                    {type.toUpperCase()} QUEST
                </span>
                {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                        <Clock className="w-3 h-3" />
                        <span>{timeLeft}</span>
                    </div>
                )}
            </div>

            <h4 className="font-bold text-white mb-2">{title}</h4>

            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>+{reward} XP Reward</span>
            </div>

            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                    style={{ width: `${(progress / total) * 100}%` }}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Progress</span>
                <span>{progress} / {total}</span>
            </div>
        </div>
    );
};

export default ChallengeCard;
