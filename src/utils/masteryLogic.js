/**
 * Calculates new mastery percentage based on performance.
 * @param {number} currentMastery - Current mastery percentage (0-100)
 * @param {boolean} isSuccess - Whether the recent attempt was successful
 * @param {string} difficulty - Difficulty of the task ('easy', 'medium', 'hard')
 * @returns {number} - New mastery percentage
 */
export const calculateNewMastery = (currentMastery, isSuccess, difficulty) => {
    let change = 0;

    if (isSuccess) {
        // Bigger boost for harder tasks
        change = difficulty === 'hard' ? 5 : difficulty === 'medium' ? 3 : 1;
    } else {
        // Smaller penalty for mistakes
        change = difficulty === 'hard' ? -1 : difficulty === 'medium' ? -2 : -3;
    }

    // Clamp between 0 and 100
    return Math.min(100, Math.max(0, currentMastery + change));
};

/**
 * Calculates XP reward.
 * @param {string} difficulty 
 * @returns {number}
 */
export const calculateXpReward = (difficulty) => {
    switch (difficulty) {
        case 'hard': return 100;
        case 'medium': return 50;
        case 'easy': return 25;
        default: return 10;
    }
};
