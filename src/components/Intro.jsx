import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import TrueFocus from './TrueFocus';

const Intro = ({ onComplete }) => {
    const [init, setInit] = useState(false);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    useEffect(() => {
        // Exit after a set duration (enough for a few cycles of the animation)
        const timer = setTimeout(() => {
            setExit(true);
        }, 5000); // 5 seconds duration

        return () => clearTimeout(timer);
    }, []);

    const particlesOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 4,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
            },
        },
        particles: {
            number: {
                value: 150,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: "#ffffff",
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                },
            },
            size: {
                value: { min: 0.5, max: 2 },
            },
            move: {
                enable: true,
                speed: 0.3,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "out",
                },
            },
            links: {
                enable: false,
            }
        },
        detectRetina: true,
    };

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {!exit && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#1B2735_0%,_#090A0F_100%)] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "100%",
                        opacity: 0,
                        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                >
                    {init && (
                        <Particles
                            id="tsparticles"
                            options={particlesOptions}
                            className="absolute inset-0"
                        />
                    )}

                    <div className="relative z-10 flex flex-col items-center justify-center text-cyan-400">
                        <TrueFocus
                            sentence="Design Develop Deliver"
                            manualMode={false}
                            blurAmount={5}
                            borderColor="#00f3ff"
                            glowColor="rgba(0, 243, 255, 0.6)"
                            animationDuration={0.5}
                            pauseBetweenAnimations={1}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Intro;
