import { useEffect, useRef } from 'react';

const ShootingStarCursor = () => {
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTrailTime = useRef(0);
  const mouseMoveTime = useRef(0);

  useEffect(() => {
    // Always keep the shooting star cursor class on body
    if (!document.body.classList.contains('shooting-star-cursor')) {
      document.body.classList.add('shooting-star-cursor');
    }
    
    // Try multiple cursor formats for better browser compatibility
    const starCursorDataUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M16 4 L20 12 L28 12 L22 18 L24 26 L16 22 L8 26 L10 18 L4 12 L12 12 Z' fill='%23FFD700' stroke='%23FFAA00' stroke-width='1'/%3E%3C/svg%3E";
    
    // Force the star cursor as an inline style with fallbacks
    document.body.style.cursor = `url("${starCursorDataUrl}") 16 16, url("${starCursorDataUrl}"), pointer`;
    
    // Also apply to all elements with high specificity
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      body.shooting-star-cursor, 
      body.shooting-star-cursor * {
        cursor: url("${starCursorDataUrl}") 16 16, url("${starCursorDataUrl}"), pointer !important;
      }
    `;
    document.head.appendChild(styleElement);

    const createStarTrail = (x, y) => {
      // Create falling star trail
      const trail = document.createElement('div');
      trail.className = 'star-trail';
      trail.style.left = (x - 6) + 'px';
      trail.style.top = (y - 6) + 'px';
      document.body.appendChild(trail);

      // Create random offset for natural falling effect
      const randomOffset = (Math.random() - 0.5) * 15;
      trail.style.transform = `translateX(${randomOffset}px)`;

      // Remove trail after animation
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 800);
    };

    const createTwinkle = (x, y) => {
      // Create twinkle effect
      const twinkle = document.createElement('div');
      twinkle.className = 'star-twinkle';
      twinkle.style.left = (x - 3) + 'px';
      twinkle.style.top = (y - 3) + 'px';
      document.body.appendChild(twinkle);

      // Random position offset for twinkle
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      twinkle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      // Remove twinkle after animation
      setTimeout(() => {
        if (twinkle.parentNode) {
          twinkle.parentNode.removeChild(twinkle);
        }
      }, 800);
    };

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      const { clientX: x, clientY: y } = e;
      
      // Calculate mouse movement speed
      const deltaX = x - lastMousePos.current.x;
      const deltaY = y - lastMousePos.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      lastMousePos.current = { x, y };
      mouseMoveTime.current = currentTime;

      // Create star trails when mouse is moving
      if (distance > 2 && currentTime - lastTrailTime.current > 50) {
        createStarTrail(x, y);
        lastTrailTime.current = currentTime;

        // Create additional trails for faster movement
        if (distance > 8) {
          setTimeout(() => createStarTrail(x + deltaX * 0.3, y + deltaY * 0.3), 25);
          setTimeout(() => createStarTrail(x + deltaX * 0.6, y + deltaY * 0.6), 50);
        }
        
        // Create twinkle effect occasionally
        if (Math.random() < 0.4) {
          setTimeout(() => createTwinkle(x, y), 15);
        }
      }
    };

    const handleMouseStop = () => {
      // Create a final twinkle when mouse stops
      setTimeout(() => {
        const currentTime = Date.now();
        if (currentTime - mouseMoveTime.current > 100) {
          createTwinkle(lastMousePos.current.x, lastMousePos.current.y);
        }
      }, 150);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseStop);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseStop);
      // Remove the style element
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
      // Remove any remaining trails and twinkles
      const existingTrails = document.querySelectorAll('.star-trail, .star-twinkle');
      existingTrails.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      // Reset cursor style on cleanup
      document.body.style.cursor = '';
    };
  }, []);

  return null;
};

export default ShootingStarCursor;
