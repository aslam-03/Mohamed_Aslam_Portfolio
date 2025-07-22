import { useRef, useEffect } from 'react';

// Hero Animation Component (2D Canvas Game)
const HeroAnimation = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const scoreRef = useRef(0);
  const isPlayerDestroyed = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    let spaceship = {};
    let asteroids = [];
    let stars = [];
    let comets = [];
    let alienShip = null;
    let alienBullets = [];
    let explosions = [];
    let lastAsteroidSpawnTime = 0;
    const asteroidSpawnRate = 300;
    const numStars = 200;
    const starSpeed = 0.4; // Reduced from 0.5

    function resetGame() {
      isPlayerDestroyed.current = false;
      scoreRef.current = 0;
      spaceship = { 
        x: canvas.width / 2, 
        y: canvas.height - 120, 
        width: 60, 
        height: 60, 
        color: '#007bff', 
        speed: 4, 
        dx: 0, 
        bullets: [], 
        fireRate: 250, 
        lastShotTime: 0, 
        boosterFlicker: 0 
      }; // Speed reduced from 5 to 4, Y position adjusted to be more visible
      asteroids = [];
      comets = [];
      alienShip = null;
      alienBullets = [];
      explosions = [];
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({ 
          x: Math.random() * canvas.width, 
          y: Math.random() * canvas.height, 
          size: Math.random() * 2 + 0.5, 
          color: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})` 
        });
      }
    }
    
    resizeCanvas();
    resetGame();
    window.addEventListener('resize', resizeCanvas);

    const gameLoop = (currentTime) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Update and Draw Stars ---
      stars.forEach(star => {
        star.y += starSpeed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      
      // --- Update and Draw Comets ---
      if (Math.random() < 0.005) {
        comets.push(createComet(canvas.width, canvas.height));
      }
      comets = comets.filter(comet => {
        comet.x += comet.dx;
        comet.y += comet.dy;
        drawComet(ctx, comet);
        return comet.x > -comet.length && comet.x < canvas.width + comet.length && comet.y > -comet.length && comet.y < canvas.height + comet.length;
      });

      if (!isPlayerDestroyed.current) {
        // --- Spaceship AI and Movement ---
        let target = alienShip ? alienShip : null;
        if (!target && asteroids.length > 0) {
          const visibleAsteroids = asteroids.filter(a => a.y < canvas.height / 2 && a.y > 0);
          if (visibleAsteroids.length > 0) {
            target = visibleAsteroids.reduce((prev, curr) => Math.abs(curr.x - spaceship.x) < Math.abs(prev.x - spaceship.x) ? curr : prev);
          }
        }

        if (target) {
          const targetX = target.x - spaceship.width / 2;
          const currentX = spaceship.x;
          const tolerance = spaceship.speed / 2;
          if (currentX < targetX - tolerance) spaceship.dx = spaceship.speed;
          else if (currentX > targetX + tolerance) spaceship.dx = -spaceship.speed;
          else spaceship.dx = 0;
        } else {
          spaceship.dx = 0;
        }

        spaceship.x += spaceship.dx;
        if (spaceship.x < 0) spaceship.x = 0;
        if (spaceship.x + spaceship.width > canvas.width) spaceship.x = canvas.width - spaceship.width;
        spaceship.boosterFlicker = Math.random();
        drawSpaceship(ctx, spaceship);

        // --- Firing Logic ---
        if (target && Math.abs(spaceship.x + spaceship.width / 2 - target.x) < 50) {
          const now = performance.now();
          if (now - spaceship.lastShotTime > spaceship.fireRate) {
            spaceship.bullets.push({ 
              x: spaceship.x + spaceship.width / 2 - 2.5, 
              y: spaceship.y, 
              width: 5, 
              height: 15, 
              speed: 12, 
              color: '#00FFFF' 
            }); // Speed reduced from 15 to 12
            spaceship.lastShotTime = now;
          }
        }
      }

      // --- Update and Draw Player Bullets ---
      spaceship.bullets = spaceship.bullets.filter(bullet => {
        bullet.y -= bullet.speed;
        drawBullet(ctx, bullet);
        return bullet.y > 0;
      });

      // --- Asteroid Spawning and Logic ---
      if (currentTime - lastAsteroidSpawnTime > asteroidSpawnRate) {
        asteroids.push(createAsteroid(canvas.width));
        lastAsteroidSpawnTime = currentTime;
      }

      asteroids = asteroids.filter(asteroid => {
        asteroid.y += asteroid.speed;
        drawAsteroid(ctx, asteroid);
        for (let i = spaceship.bullets.length - 1; i >= 0; i--) {
          const bullet = spaceship.bullets[i];
          if (checkCollision(bullet, asteroid)) {
            createExplosion(explosions, asteroid.x, asteroid.y, '#ffffff');
            asteroids.splice(asteroids.indexOf(asteroid), 1);
            spaceship.bullets.splice(i, 1);
            if (!isPlayerDestroyed.current) scoreRef.current += 1;
            return false;
          }
        }
        if (asteroid.y > canvas.height + asteroid.size) {
          if (!isPlayerDestroyed.current) scoreRef.current = 0;
          return false;
        }
        return true;
      });

      // --- Alien Ship Logic ---
      if (!alienShip && Math.random() < 0.002) {
        alienShip = createAlienShip(canvas.width, canvas.height);
      }
      if (alienShip) {
        moveAlienShip(alienShip, canvas.width, canvas.height);
        drawAlienShip(ctx, alienShip);

        // Alien Firing Logic
        const now = performance.now();
        if (now - alienShip.lastShotTime > alienShip.fireRate && !isPlayerDestroyed.current) {
          alienShip.lastShotTime = now;
          if (Math.random() < 0.2) { // 20% chance to hit
            const angle = Math.atan2(spaceship.y - alienShip.y, (spaceship.x + spaceship.width / 2) - alienShip.x);
            alienBullets.push(createAlienBullet(alienShip.x, alienShip.y, angle));
          }
        }

        // Check player bullet collision with alien
        for (let i = spaceship.bullets.length - 1; i >= 0; i--) {
          const bullet = spaceship.bullets[i];
          if (checkCollision(bullet, alienShip)) {
            createExplosion(explosions, alienShip.x, alienShip.y, '#00ff00');
            alienShip = null;
            spaceship.bullets.splice(i, 1);
            if (!isPlayerDestroyed.current) scoreRef.current += 10;
            break; 
          }
        }
        if (alienShip && (alienShip.x > canvas.width + alienShip.size || alienShip.x < -alienShip.size)) {
          alienShip = null;
        }
      }

      // --- Update and Draw Alien Bullets ---
      alienBullets = alienBullets.filter(bullet => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        drawAlienBullet(ctx, bullet);
        // Player hit detection
        if (!isPlayerDestroyed.current && checkPlayerCollision(bullet, spaceship)) {
          createExplosion(explosions, spaceship.x + spaceship.width / 2, spaceship.y + spaceship.height / 2, spaceship.color);
          isPlayerDestroyed.current = true;
          setTimeout(resetGame, 2000); // Reset after 2 seconds
          return false; // remove bullet
        }
        return bullet.y < canvas.height && bullet.y > 0 && bullet.x > 0 && bullet.x < canvas.width;
      });
      
      // --- Explosions Logic ---
      explosions = explosions.filter(explosion => {
        drawExplosion(ctx, explosion);
        return explosion.particles.some(p => p.alpha > 0);
      });

      // --- Score Display ---
      ctx.font = '24px "Press Start 2P"';
      ctx.fillStyle = '#00FFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`SCORE: ${scoreRef.current}`, canvas.width - 20, 40);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    function drawSpaceship(ctx, ship) {
      // Main body (sleeker design)
      ctx.fillStyle = '#1e40af'; // Darker blue base
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width * 0.15, ship.y + ship.height * 0.3);
      ctx.lineTo(ship.x + ship.width * 0.85, ship.y + ship.height * 0.3);
      ctx.lineTo(ship.x + ship.width * 0.9, ship.y + ship.height * 0.8);
      ctx.lineTo(ship.x + ship.width * 0.1, ship.y + ship.height * 0.8);
      ctx.closePath();
      ctx.fill();

      // Wing extensions
      ctx.fillStyle = '#3b82f6'; // Lighter blue for wings
      ctx.beginPath();
      ctx.moveTo(ship.x, ship.y + ship.height * 0.5);
      ctx.lineTo(ship.x + ship.width * 0.25, ship.y + ship.height * 0.4);
      ctx.lineTo(ship.x + ship.width * 0.15, ship.y + ship.height * 0.7);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width, ship.y + ship.height * 0.5);
      ctx.lineTo(ship.x + ship.width * 0.75, ship.y + ship.height * 0.4);
      ctx.lineTo(ship.x + ship.width * 0.85, ship.y + ship.height * 0.7);
      ctx.closePath();
      ctx.fill();

      // Cockpit/nose cone
      ctx.fillStyle = '#60a5fa'; // Light blue cockpit
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width / 2, ship.y);
      ctx.lineTo(ship.x + ship.width * 0.35, ship.y + ship.height * 0.35);
      ctx.lineTo(ship.x + ship.width * 0.65, ship.y + ship.height * 0.35);
      ctx.closePath();
      ctx.fill();

      // Cockpit window
      ctx.fillStyle = '#87ceeb'; // Sky blue window
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width / 2, ship.y + ship.height * 0.05);
      ctx.lineTo(ship.x + ship.width * 0.4, ship.y + ship.height * 0.25);
      ctx.lineTo(ship.x + ship.width * 0.6, ship.y + ship.height * 0.25);
      ctx.closePath();
      ctx.fill();

      // Engine details
      ctx.fillStyle = '#1e3a8a'; // Dark blue engine housing
      ctx.fillRect(ship.x + ship.width * 0.2, ship.y + ship.height * 0.7, ship.width * 0.15, ship.height * 0.2);
      ctx.fillRect(ship.x + ship.width * 0.65, ship.y + ship.height * 0.7, ship.width * 0.15, ship.height * 0.2);

      // Side weapon mounts
      ctx.fillStyle = '#374151'; // Gray weapon mounts
      ctx.fillRect(ship.x + ship.width * 0.05, ship.y + ship.height * 0.55, ship.width * 0.1, ship.height * 0.1);
      ctx.fillRect(ship.x + ship.width * 0.85, ship.y + ship.height * 0.55, ship.width * 0.1, ship.height * 0.1);

      // Engine glow/boosters
      const time = performance.now() * 0.01;
      const boosterIntensity = 0.5 + Math.sin(time) * 0.3;
      const boosterColor1 = ship.boosterFlicker > 0.5 ? '#00bfff' : '#0080ff'; // Blue flames
      const boosterColor2 = ship.boosterFlicker > 0.3 ? '#ffa500' : '#ff4500'; // Orange core
      const boosterHeight = ship.height / 2 + ship.boosterFlicker * 12;
      
      // Outer blue flame
      ctx.fillStyle = boosterColor1;
      ctx.globalAlpha = boosterIntensity;
      ctx.fillRect(ship.x + ship.width * 0.22, ship.y + ship.height * 0.9, ship.width * 0.11, boosterHeight * 0.8);
      ctx.fillRect(ship.x + ship.width * 0.67, ship.y + ship.height * 0.9, ship.width * 0.11, boosterHeight * 0.8);
      
      // Inner orange core
      ctx.fillStyle = boosterColor2;
      ctx.globalAlpha = boosterIntensity * 0.8;
      ctx.fillRect(ship.x + ship.width * 0.24, ship.y + ship.height * 0.9, ship.width * 0.07, boosterHeight * 0.6);
      ctx.fillRect(ship.x + ship.width * 0.69, ship.y + ship.height * 0.9, ship.width * 0.07, boosterHeight * 0.6);
      
      // Reset alpha
      ctx.globalAlpha = 1;

      // Add some detail lines
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width * 0.3, ship.y + ship.height * 0.4);
      ctx.lineTo(ship.x + ship.width * 0.7, ship.y + ship.height * 0.4);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width * 0.25, ship.y + ship.height * 0.6);
      ctx.lineTo(ship.x + ship.width * 0.75, ship.y + ship.height * 0.6);
      ctx.stroke();
    }

    function drawBullet(ctx, bullet) {
      ctx.fillStyle = bullet.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = bullet.color;
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      ctx.shadowBlur = 0;
    }
    
    function createAlienBullet(x, y, angle) {
      const speed = 4; // Reduced from 5
      return { 
        x, 
        y, 
        width: 4, 
        height: 15, 
        color: '#39FF14', 
        dx: Math.cos(angle) * speed, 
        dy: Math.sin(angle) * speed 
      };
    }

    function drawAlienBullet(ctx, bullet) {
      ctx.save();
      ctx.translate(bullet.x, bullet.y);
      ctx.rotate(Math.atan2(bullet.dy, bullet.dx) + Math.PI / 2);
      ctx.fillStyle = bullet.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = bullet.color;
      ctx.fillRect(-bullet.width / 2, -bullet.height / 2, bullet.width, bullet.height);
      ctx.restore();
      ctx.shadowBlur = 0;
    }

    function createAsteroid(canvasWidth) {
      const size = Math.random() * 10 + 10;
      const speed = Math.random() * 3.2 + 2.4; // Reduced from 3-7 to 2.4-5.6
      const numVertices = Math.floor(Math.random() * 4) + 5;
      const vertices = [];
      for (let i = 0; i < numVertices; i++) {
        const angle = (i / numVertices) * Math.PI * 2;
        const irregularity = (Math.random() - 0.5) * 0.8;
        const r = size * (1 + irregularity);
        vertices.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
      }
      return { 
        x: Math.random() * (canvasWidth * 0.6) + canvasWidth * 0.2, 
        y: -size, 
        size: size, 
        speed: speed, 
        color: '#888888', 
        vertices: vertices 
      };
    }

    function drawAsteroid(ctx, asteroid) {
      ctx.fillStyle = asteroid.color;
      ctx.beginPath();
      ctx.moveTo(asteroid.x + asteroid.vertices[0].x, asteroid.y + asteroid.vertices[0].y);
      for (let i = 1; i < asteroid.vertices.length; i++) {
        ctx.lineTo(asteroid.x + asteroid.vertices[i].x, asteroid.y + asteroid.vertices[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }

    function createComet(canvasWidth, canvasHeight) {
      const x = Math.random() * canvasWidth;
      const y = 0;
      return { 
        x: x, 
        y: y, 
        length: Math.random() * 100 + 50, 
        dx: (Math.random() - 0.5) * 3.2, 
        dy: Math.random() * 3.2 + 1.6, 
        color: 'rgba(255, 255, 255, 0.7)' 
      }; // Speed reduced
    }

    function drawComet(ctx, comet) {
      ctx.beginPath();
      ctx.moveTo(comet.x, comet.y);
      ctx.lineTo(comet.x - comet.dx * comet.length/10, comet.y - comet.dy * comet.length/10);
      ctx.strokeStyle = comet.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function createAlienShip(canvasWidth, canvasHeight) {
      const startOnLeft = Math.random() < 0.5;
      const x = startOnLeft ? -40 : canvasWidth + 40;
      const dx = startOnLeft ? Math.random() * 1.6 + 0.8 : -(Math.random() * 1.6 + 0.8); // Speed reduced
      return { 
        x: x, 
        y: Math.random() * (canvasHeight / 2),
        size: 40, 
        dx: dx, 
        dy: 0, 
        changeDirectionTime: performance.now() + 1000,
        fireRate: 1500,
        lastShotTime: performance.now()
      };
    }

    function moveAlienShip(ship, canvasWidth, canvasHeight) {
      ship.x += ship.dx;
      ship.y += ship.dy;

      if (performance.now() > ship.changeDirectionTime) {
        ship.dy = (Math.random() - 0.5) * 1.6; // Speed reduced
        ship.changeDirectionTime = performance.now() + Math.random() * 1500 + 500;
      }

      if (ship.y < ship.size || ship.y > canvasHeight / 2) {
        ship.dy *= -1;
      }
    }

    function drawAlienShip(ctx, ship) {
      ctx.fillStyle = '#4ade80'; // green-400
      ctx.beginPath();
      ctx.ellipse(ship.x, ship.y, ship.size, ship.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(ship.x, ship.y - ship.size / 3, ship.size / 2, ship.size / 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function createExplosion(explosions, x, y, color) {
      let particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: x, y: y,
          dx: (Math.random() - 0.5) * 8, dy: (Math.random() - 0.5) * 8,
          size: Math.random() * 3 + 1,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.01,
          color: color
        });
      }
      explosions.push({ particles });
    }

    function drawExplosion(ctx, explosion) {
      explosion.particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if(p.alpha > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      ctx.globalAlpha = 1;
    }

    function checkCollision(obj1, obj2) {
      const dx = (obj1.x + (obj1.width || 0) / 2) - obj2.x;
      const dy = (obj1.y + (obj1.height || 0) / 2) - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < obj2.size + Math.max((obj1.width || 0), (obj1.height || 0)) / 2;
    }

    function checkPlayerCollision(bullet, player) {
      return bullet.x >= player.x &&
             bullet.x <= player.x + player.width &&
             bullet.y >= player.y &&
             bullet.y <= player.y + player.height;
    }

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="block w-full h-full"></canvas>
    </div>
  );
};

export default HeroAnimation;
