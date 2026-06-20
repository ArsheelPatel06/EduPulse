import React from 'react';
import { Play, Lock, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MissionItem = ({ mission, subjectId, isLocked }) => {
    const navigate = useNavigate();

    const handleStart = () => {
        if (isLocked) return;
        navigate('/study/quiz', {
            state: {
                subjectId,
                missionId: mission.id,
                title: mission.title,
                xp: mission.xp
            }
        });
    };

    return (
        <div className={`
            flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200
            ${mission.completed
                ? 'bg-green-500/5 border-green-500/20 hover:bg-green-500/10'
                : isLocked
                    ? 'bg-base border-border opacity-60'
                    : 'bg-surface border-border hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/5'
            }
        `}>
            {/* Left: Info */}
            <div className="flex items-center gap-4">
                <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center border-2
                    ${mission.completed
                        ? 'bg-green-500 text-white border-green-500'
                        : isLocked
                            ? 'bg-base border-border text-muted'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 border-purple-200 dark:border-purple-800'
                    }
                `}>
                    {mission.completed ? <CheckCircle className="w-5 h-5" /> : isLocked ? <Lock className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                </div>

                <div>
                    <h4 className={`font-bold text-sm ${mission.completed ? 'text-green-600 dark:text-green-400' : 'text-main'}`}>
                        {mission.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-base px-2 py-0.5 rounded border border-border text-muted">
                            {mission.xp} XP
                        </span>
                        {isLocked && (
                            <span className="text-[10px] font-bold text-red-400 uppercase">
                                Locked
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Action */}
            {!isLocked && !mission.completed && (
                <button
                    onClick={handleStart}
                    className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/20 btn-tactile"
                >
                    <Play className="w-4 h-4 fill-white" />
                </button>
            )}

            {mission.completed && (
                <button
                    onClick={handleStart} // Replay allowed
                    className="p-2 rounded-lg border-2 border-green-500/30 text-green-600 hover:bg-green-500/10 transition-colors"
                    title="Replay Mission"
                >
                    <Play className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default MissionItem;
