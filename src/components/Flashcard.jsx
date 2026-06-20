import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

const Flashcard = ({ front, back }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="perspective-1000 w-full max-w-sm h-64 mx-auto cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-surface border-2 border-border rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-none group-hover:border-purple-500 transition-colors">
                    <div className="text-xs font-bold text-purple-400 mb-4 uppercase tracking-wider">Question</div>
                    <h3 className="text-xl font-medium text-main">{front}</h3>
                    <div className="absolute bottom-4 right-4 text-muted">
                        <RotateCw className="w-5 h-5" />
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden bg-base border-2 border-purple-600 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-none [transform:rotateY(180deg)]"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="text-xs font-bold text-green-400 mb-4 uppercase tracking-wider">Answer</div>
                    <h3 className="text-xl font-medium text-main">{back}</h3>
                </div>
            </motion.div>
        </div>
    );
};

export default Flashcard;
