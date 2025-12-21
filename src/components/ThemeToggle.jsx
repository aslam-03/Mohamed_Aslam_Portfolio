import { motion } from 'framer-motion';
import { Sun, Moon } from './Icons';

const ThemeToggle = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-16 h-8 rounded-full flex items-center p-1 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-blue-100 border border-blue-200'} shadow-inner focus:outline-none`}
            aria-label="Toggle Theme"
        >
            <motion.div
                className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center ${isDark ? 'bg-gray-900 text-yellow-400' : 'bg-white text-orange-500'}`}
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{
                    // If dark (moon at left), x should be 0. If light (sun at right), x should be ~32px.
                    // Wait, user said "initialy at left and moon on it and when click move smooth to right... sun appear".
                    // This implies Left = Moon (Dark mode?), Right = Sun (Light mode?).
                    // Let's assume standard toggle behavior: Left/Off, Right/On.
                    // If "Moon on it" when at left:
                    x: isDark ? 0 : 32
                }}
            >
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </motion.div>
        </button>
    );
};

export default ThemeToggle;
