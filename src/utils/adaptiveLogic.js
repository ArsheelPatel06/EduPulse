/**
 * Adjusts difficulty based on user performance history.
 * @param {string} currentDifficulty - 'easy', 'medium', or 'hard'
 * @param {boolean[]} recentHistory - Array of last N verification results (true = correct, false = wrong)
 * @returns {string} - The next recommended difficulty level
 */
export const getNextDifficulty = (currentDifficulty, recentHistory) => {
    if (recentHistory.length < 2) return currentDifficulty;

    const lastTwo = recentHistory.slice(-2);
    const attempts = lastTwo.length;

    // If last 2 were wrong -> Easier
    if (attempts === 2 && lastTwo.every(r => r === false)) {
        if (currentDifficulty === 'hard') return 'medium';
        if (currentDifficulty === 'medium') return 'easy';
        return 'easy';
    }

    // If last 2 were correct -> Harder
    if (attempts === 2 && lastTwo.every(r => r === true)) {
        if (currentDifficulty === 'easy') return 'medium';
        if (currentDifficulty === 'medium') return 'hard';
        return 'hard';
    }

    // Maintain current level otherwise
    return currentDifficulty;
};
