import { useEffect, useRef } from 'react';

const ThemeTransition = ({ onTransitionComplete, nextTheme }) => {
  const canvasRef = useRef(null);
  const themeChangedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = 500;
    const transitionDuration = 1200; // 1.2 seconds

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        // Speed is proportional to size for a parallax effect
        this.speed = this.size * 5; 
      }

      update() {
        this.x -= this.speed;
        if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      draw(overlayAlpha) {
        // Make stars brighter as the background gets darker
        const brightness = Math.max(0.5, overlayAlpha) * 255;
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const animationProgress = Math.min(progress / transitionDuration, 1);

      // At 50% progress, directly change the body class. This avoids React re-renders.
      if (animationProgress > 0.5 && !themeChangedRef.current) {
        document.body.className = `${nextTheme}-theme`;
        themeChangedRef.current = true;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use a solid black overlay that fades in and out to hide the theme switch
      const overlayAlpha = Math.sin(animationProgress * Math.PI);
      ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.update();
        star.draw(overlayAlpha);
      });

      if (animationProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        onTransitionComplete();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };

  }, [onTransitionComplete, nextTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
    />
  );
};

export default ThemeTransition;
