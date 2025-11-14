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

    // Tunable constants controlling spaceship baseline across viewport sizes
    const SPACESHIP_WIDTH = 64;
    const SPACESHIP_HEIGHT = 64;
  const SPACESHIP_BASELINE_RATIO = 0.76;
  const SPACESHIP_MIN_RATIO = 0.6;
  const SPACESHIP_BOTTOM_OFFSET = 70;

    const getSpaceshipY = () => {
      const baseline = canvas.height * SPACESHIP_BASELINE_RATIO;
      const minTop = canvas.height * SPACESHIP_MIN_RATIO;
      const maxTop = Math.max(canvas.height - (SPACESHIP_BOTTOM_OFFSET + SPACESHIP_HEIGHT), 0);
      const clampedBaseline = Math.min(Math.max(baseline, minTop), maxTop);
      return Math.max(0, clampedBaseline);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (spaceship && spaceship.width) {
        spaceship.x = Math.max(0, Math.min(spaceship.x, canvas.width - spaceship.width));
        spaceship.y = getSpaceshipY();
      }
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
        y: getSpaceshipY(),
        width: SPACESHIP_WIDTH,
        height: SPACESHIP_HEIGHT,
        color: '#007bff',
        speed: 4,
        dx: 0,
        bullets: [],
        fireRate: 250,
        lastShotTime: 0,
        boosterFlicker: 0
      }; // Speed reduced from 5 to 4, baseline raised for better visibility
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

    const drawBullet = (context, bullet) => {
      context.fillStyle = bullet.color;
      context.shadowBlur = 12;
      context.shadowColor = bullet.color;
      context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      context.shadowBlur = 0;
    };

    const createAlienBullet = (x, y, angle) => {
      const speed = 4;
      return {
        x,
        y,
        width: 4,
        height: 15,
        color: '#39FF14',
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed
      };
    };

    const drawAlienBullet = (context, bullet) => {
      context.save();
      context.translate(bullet.x, bullet.y);
      context.rotate(Math.atan2(bullet.dy, bullet.dx) + Math.PI / 2);
      context.fillStyle = bullet.color;
      context.shadowBlur = 12;
      context.shadowColor = bullet.color;
      context.fillRect(-bullet.width / 2, -bullet.height / 2, bullet.width, bullet.height);
      context.restore();
      context.shadowBlur = 0;
    };

    const createAsteroid = (canvasWidth) => {
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
        size,
        speed,
        color: '#888888',
        vertices
      };
    };

    const drawAsteroid = (context, asteroid) => {
      context.fillStyle = asteroid.color;
      context.beginPath();
      context.moveTo(asteroid.x + asteroid.vertices[0].x, asteroid.y + asteroid.vertices[0].y);
      for (let i = 1; i < asteroid.vertices.length; i++) {
        context.lineTo(asteroid.x + asteroid.vertices[i].x, asteroid.y + asteroid.vertices[i].y);
      }
      context.closePath();
      context.fill();
    };

    const createComet = (canvasWidth) => {
      const x = Math.random() * canvasWidth;
      const y = 0;
      return {
        x,
        y,
        length: Math.random() * 100 + 50,
        dx: (Math.random() - 0.5) * 3.2,
        dy: Math.random() * 3.2 + 1.6,
        color: 'rgba(255, 255, 255, 0.7)'
      }; // Speed reduced
    };

    const drawComet = (context, comet) => {
      context.beginPath();
      context.moveTo(comet.x, comet.y);
      context.lineTo(comet.x - comet.dx * comet.length / 10, comet.y - comet.dy * comet.length / 10);
      context.strokeStyle = comet.color;
      context.lineWidth = 2;
      context.stroke();
    };

    const createAlienShip = (canvasWidth, canvasHeight) => {
      const startOnLeft = Math.random() < 0.5;
      const x = startOnLeft ? -40 : canvasWidth + 40;
      const dx = startOnLeft ? Math.random() * 1.6 + 0.8 : -(Math.random() * 1.6 + 0.8);
      return {
        x,
        y: Math.random() * (canvasHeight / 2),
        size: 40,
        dx,
        dy: 0,
        changeDirectionTime: performance.now() + 1000,
        fireRate: 1500,
        lastShotTime: performance.now()
      };
    };

    const moveAlienShip = (ship, canvasWidth, canvasHeight) => {
      ship.x += ship.dx;
      ship.y += ship.dy;

      if (performance.now() > ship.changeDirectionTime) {
        ship.dy = (Math.random() - 0.5) * 1.6;
        ship.changeDirectionTime = performance.now() + Math.random() * 1500 + 500;
      }

      if (ship.y < ship.size || ship.y > canvasHeight / 2) {
        ship.dy *= -1;
      }
    };

    const drawAlienShip = (context, ship) => {
      context.fillStyle = '#4ade80';
      context.beginPath();
      context.ellipse(ship.x, ship.y, ship.size, ship.size / 2, 0, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#ffffff';
      context.beginPath();
      context.ellipse(ship.x, ship.y - ship.size / 3, ship.size / 2, ship.size / 4, 0, 0, Math.PI * 2);
      context.fill();
    };

    const createExplosion = (explosionsList, x, y, color) => {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
          size: Math.random() * 3 + 1,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.01,
          color
        });
      }
      explosionsList.push({ particles });
    };

    const drawExplosion = (context, explosion) => {
      explosion.particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if (p.alpha > 0) {
          context.fillStyle = p.color;
          context.globalAlpha = p.alpha;
          context.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      context.globalAlpha = 1;
    };

    const checkCollision = (obj1, obj2) => {
      const dx = (obj1.x + (obj1.width || 0) / 2) - obj2.x;
      const dy = (obj1.y + (obj1.height || 0) / 2) - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < obj2.size + Math.max(obj1.width || 0, obj1.height || 0) / 2;
    };

    const checkPlayerCollision = (bullet, player) => (
      bullet.x >= player.x &&
      bullet.x <= player.x + player.width &&
      bullet.y >= player.y &&
      bullet.y <= player.y + player.height
    );

    const gameLoop = (currentTime) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Update and Draw Stars ---
      stars.forEach((star) => {
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
        comets.push(createComet(canvas.width));
      }
      comets = comets.filter((comet) => {
        comet.x += comet.dx;
        comet.y += comet.dy;
        drawComet(ctx, comet);
        return (
          comet.x > -comet.length &&
          comet.x < canvas.width + comet.length &&
          comet.y > -comet.length &&
          comet.y < canvas.height + comet.length
        );
      });

      if (!isPlayerDestroyed.current) {
        // --- Spaceship AI and Movement ---
        let target = alienShip || null;
        if (!target && asteroids.length > 0) {
          const visibleAsteroids = asteroids.filter((a) => a.y < canvas.height / 2 && a.y > 0);
          if (visibleAsteroids.length > 0) {
            target = visibleAsteroids.reduce((prev, curr) => (
              Math.abs(curr.x - spaceship.x) < Math.abs(prev.x - spaceship.x) ? curr : prev
            ));
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
            });
            spaceship.lastShotTime = now;
          }
        }
      }

      // --- Update and Draw Player Bullets ---
      spaceship.bullets = spaceship.bullets.filter((bullet) => {
        bullet.y -= bullet.speed;
        drawBullet(ctx, bullet);
        return bullet.y > 0;
      });

      // --- Asteroid Spawning and Logic ---
      if (currentTime - lastAsteroidSpawnTime > asteroidSpawnRate) {
        asteroids.push(createAsteroid(canvas.width));
        lastAsteroidSpawnTime = currentTime;
      }

      asteroids = asteroids.filter((asteroid) => {
        asteroid.y += asteroid.speed;
        drawAsteroid(ctx, asteroid);
        for (let i = spaceship.bullets.length - 1; i >= 0; i--) {
          const bullet = spaceship.bullets[i];
          if (checkCollision(bullet, asteroid)) {
            createExplosion(explosions, asteroid.x, asteroid.y, '#ffffff');
            asteroid.hit = true;
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

        const now = performance.now();
        if (now - alienShip.lastShotTime > alienShip.fireRate && !isPlayerDestroyed.current) {
          alienShip.lastShotTime = now;
          if (Math.random() < 0.2) {
            const angle = Math.atan2(spaceship.y - alienShip.y, (spaceship.x + spaceship.width / 2) - alienShip.x);
            alienBullets.push(createAlienBullet(alienShip.x, alienShip.y, angle));
          }
        }

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
      alienBullets = alienBullets.filter((bullet) => {
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        drawAlienBullet(ctx, bullet);
        if (!isPlayerDestroyed.current && checkPlayerCollision(bullet, spaceship)) {
          createExplosion(explosions, spaceship.x + spaceship.width / 2, spaceship.y + spaceship.height / 2, spaceship.color);
          isPlayerDestroyed.current = true;
          setTimeout(resetGame, 2000);
          return false;
        }
        return bullet.y < canvas.height && bullet.y > 0 && bullet.x > 0 && bullet.x < canvas.width;
      });

      // --- Explosions Logic ---
      explosions = explosions.filter((explosion) => {
        drawExplosion(ctx, explosion);
        return explosion.particles.some((p) => p.alpha > 0);
      });

      // --- Score Display ---
      ctx.font = '24px "Press Start 2P"';
      ctx.fillStyle = '#00FFFF';
      ctx.textAlign = 'right';
      ctx.fillText(`SCORE: ${scoreRef.current}`, canvas.width - 20, 40);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    resetGame();
    window.addEventListener('resize', resizeCanvas);
    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const drawSpaceship = (context, ship) => {
    // Missile-styled retro spaceship sprite
    context.save();
    context.translate(ship.x, ship.y);

    const w = ship.width;
    const h = ship.height;
    const centerX = w / 2;
    const unitX = w / 16;
    const unitY = h / 16;

    const previousSmoothing = context.imageSmoothingEnabled;
    context.imageSmoothingEnabled = false;
    context.lineJoin = 'miter';

    // === Fuselage (metallic missile body) ===
    const fuselageGradient = context.createLinearGradient(0, 0, 0, h);
    fuselageGradient.addColorStop(0, '#60a5fa'); // blue-400
    fuselageGradient.addColorStop(0.55, '#3b82f6'); // blue-500
    fuselageGradient.addColorStop(1, '#1e3a8a'); // blue-900
    context.fillStyle = fuselageGradient;

    context.beginPath();
    // pointed nose
    context.moveTo(centerX, 0);
    context.lineTo(centerX + unitX * 1.8, unitY * 2.4);
    context.lineTo(centerX + unitX * 2.6, unitY * 6.5);
    context.lineTo(centerX + unitX * 2, unitY * 11.5);
    context.lineTo(centerX + unitX * 1.3, h - unitY * 2.2);
    context.lineTo(centerX + unitX * 0.8, h - unitY * 1.1);
    context.lineTo(centerX, h);
    context.lineTo(centerX - unitX * 0.8, h - unitY * 1.1);
    context.lineTo(centerX - unitX * 1.3, h - unitY * 2.2);
    context.lineTo(centerX - unitX * 2, unitY * 11.5);
    context.lineTo(centerX - unitX * 2.6, unitY * 6.5);
    context.lineTo(centerX - unitX * 1.8, unitY * 2.4);
    context.closePath();
    context.fill();

    context.strokeStyle = 'rgba(30, 64, 175, 0.8)'; // blue-800 outline
    context.lineWidth = unitX * 0.9;
    context.stroke();

    // Center fuselage highlight stripe
    context.fillStyle = 'rgba(255,255,255,0.18)';
    context.fillRect(centerX - unitX * 0.5, unitY * 2.5, unitX, unitY * 7.8);

    // === Wings (retro aircraft delta wings) ===
    const wingGradient = context.createLinearGradient(0, unitY * 5, 0, unitY * 13);
    wingGradient.addColorStop(0, '#1e40af'); // blue-800
    wingGradient.addColorStop(1, '#0f172a'); // slate-950
    context.fillStyle = wingGradient;

    context.beginPath();
    // left wing
    context.moveTo(centerX - unitX * 2.2, unitY * 6.4);
    context.lineTo(-unitX * 1.2, unitY * 8.4);
    context.lineTo(-unitX * 0.4, unitY * 12.6);
    context.lineTo(centerX - unitX * 2, unitY * 11.8);
    context.closePath();
    context.fill();

    context.beginPath();
    // right wing
    context.moveTo(centerX + unitX * 2.2, unitY * 6.4);
    context.lineTo(w + unitX * 1.2, unitY * 8.4);
    context.lineTo(w + unitX * 0.4, unitY * 12.6);
    context.lineTo(centerX + unitX * 2, unitY * 11.8);
    context.closePath();
    context.fill();

    // Wing leading-edge highlight
    context.strokeStyle = 'rgba(96, 165, 250, 0.4)';
    context.lineWidth = unitX * 0.6;
    context.beginPath();
    context.moveTo(centerX - unitX * 1.9, unitY * 6.6);
    context.lineTo(-unitX * 0.6, unitY * 8.2);
    context.stroke();
    context.beginPath();
    context.moveTo(centerX + unitX * 1.9, unitY * 6.6);
    context.lineTo(w + unitX * 0.6, unitY * 8.2);
    context.stroke();

    // === Tail fins ===
    context.fillStyle = '#1e3a8a';
    context.beginPath();
    context.moveTo(centerX - unitX * 1.2, h - unitY * 2.4);
    context.lineTo(centerX - unitX * 2.4, h - unitY * 0.8);
    context.lineTo(centerX - unitX * 0.8, h - unitY * 0.6);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(centerX + unitX * 1.2, h - unitY * 2.4);
    context.lineTo(centerX + unitX * 2.4, h - unitY * 0.8);
    context.lineTo(centerX + unitX * 0.8, h - unitY * 0.6);
    context.closePath();
    context.fill();

    // === Cockpit canopy ===
    const canopyGradient = context.createLinearGradient(0, unitY * 2.6, 0, unitY * 9.5);
    canopyGradient.addColorStop(0, 'rgba(191, 219, 254, 0.9)');
    canopyGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.75)');
    canopyGradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
    context.beginPath();
    context.moveTo(centerX - unitX * 1.6, unitY * 2.8);
    context.quadraticCurveTo(centerX, unitY * 1.6, centerX + unitX * 1.6, unitY * 2.8);
    context.lineTo(centerX + unitX * 1.2, unitY * 8.8);
    context.quadraticCurveTo(centerX, unitY * 9.8, centerX - unitX * 1.2, unitY * 8.8);
    context.closePath();
    context.fillStyle = canopyGradient;
    context.fill();

    context.strokeStyle = 'rgba(148, 163, 184, 0.75)';
    context.lineWidth = unitX * 0.6;
    context.stroke();

    // Canopy reflections
    context.fillStyle = 'rgba(255,255,255,0.55)';
    context.fillRect(centerX - unitX * 0.9, unitY * 4, unitX * 0.45, unitY * 2.2);
    context.fillRect(centerX + unitX * 0.3, unitY * 5, unitX * 0.3, unitY * 1.6);

    // === Hull plating + scratches ===
    context.strokeStyle = 'rgba(59, 130, 246, 0.25)';
    context.lineWidth = unitX * 0.4;
    context.beginPath();
    context.moveTo(centerX - unitX * 1.6, unitY * 6.2);
    context.lineTo(centerX + unitX * 1.6, unitY * 6.2);
    context.moveTo(centerX - unitX * 1, unitY * 9.4);
    context.lineTo(centerX + unitX * 1, unitY * 9.4);
    context.stroke();

    context.strokeStyle = 'rgba(255,255,255,0.35)';
    context.lineWidth = unitX * 0.3;
    context.beginPath();
    context.moveTo(unitX * 4.8, unitY * 7.1);
    context.lineTo(unitX * 6.1, unitY * 7.6);
    context.moveTo(w - unitX * 4.8, unitY * 7.6);
    context.lineTo(w - unitX * 6.1, unitY * 8.1);
    context.stroke();

    // === Engine housings ===
    context.fillStyle = '#1e293b';
    context.fillRect(unitX * 3.2, h - unitY * 3.1, unitX * 2.2, unitY * 1.6);
    context.fillRect(w - unitX * 5.4, h - unitY * 3.1, unitX * 2.2, unitY * 1.6);

    context.fillStyle = 'rgba(148, 163, 184, 0.35)';
    context.fillRect(centerX - unitX * 0.9, h - unitY * 2.2, unitX * 1.8, unitY * 1);

    // === Thruster flames with glow ===
    const flameBaseY = h - unitY * 1.2;
    const flameHeight = unitY * (5 + ship.boosterFlicker * 3);

    const drawFlame = (offset) => {
      const baseX = centerX + offset * unitX * 3.1;
      const flameGradient = context.createLinearGradient(baseX, flameBaseY, baseX, flameBaseY + flameHeight);
      flameGradient.addColorStop(0, '#60a5fa');
      flameGradient.addColorStop(0.45, '#3b82f6');
      flameGradient.addColorStop(0.75, '#fdba74');
      flameGradient.addColorStop(1, '#f97316');

      context.shadowBlur = 20;
      context.shadowColor = 'rgba(59,130,246,0.4)';

      context.beginPath();
      context.moveTo(baseX - unitX, flameBaseY);
      context.lineTo(baseX - unitX * 1.1, flameBaseY + flameHeight * 0.45);
      context.lineTo(baseX, flameBaseY + flameHeight);
      context.lineTo(baseX + unitX * 1.1, flameBaseY + flameHeight * 0.45);
      context.lineTo(baseX + unitX, flameBaseY);
      context.closePath();
      context.fillStyle = flameGradient;
      context.fill();

      context.shadowBlur = 0;
    };

    drawFlame(-1);
    drawFlame(1);

    context.imageSmoothingEnabled = previousSmoothing;
    context.restore();
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroAnimation;
