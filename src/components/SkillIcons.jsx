import React from 'react';
import dagshubLogo from '../assets/logos/dagshub.png';
import css from '../assets/logos/css3.png';
import vscode from '../assets/logos/vscode2.png'; 

const Badge = ({ children, size = 48, bg = '#111827', color = 'white' }) => {
  const text = String(children || '');
  // reduce font size for longer labels so they fit inside the circle
  const baseSize = text.length <= 2 ? 0.42 : text.length === 3 ? 0.32 : 0.26;
  const fontSize = Math.round(size * baseSize);

  return (
    <div
      style={{ width: size, height: size, borderRadius: size / 2, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}
    >
      <span style={{ fontWeight: 700, fontSize }}>{text}</span>
    </div>
  );
};

export const ReactIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(128,128)">
      <g stroke="#61DAFB" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <ellipse rx="70" ry="22" transform="rotate(0)" />
        <ellipse rx="70" ry="22" transform="rotate(60)" />
        <ellipse rx="70" ry="22" transform="rotate(120)" />
      </g>
      <circle r="18" fill="#61DAFB" />
    </g>
  </svg>
);

export const StreamlitIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="10" fill="#FF4B4B" />
    <path d="M20 32c0-6 6-11 14-11s14 5 14 11-6 11-14 11S20 38 20 32z" fill="#FFF" opacity="0.95" />
  </svg>
);

export const FlaskIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="10" fill="#F7A400" />
    <path d="M20 18h24v4l-6 8v6c0 3-2 6-6 6s-6-3-6-6v-6l-6-8v-4z" fill="#fff" opacity="0.95"/>
  </svg>
);

// Inline blue CSS SVG as React component (guaranteed color)
// CSS and VS Code use the Simple Icons CDN (official SVGs) via LogoImg to match previous behavior

// Local SVG for CSS3 (shield-like) - embedded to avoid CDN sizing issues
// (logos are loaded via CDN LogoImg below)

  // helper to load logos from Simple Icons CDN (SVG)
export const LogoImg = ({ src, alt = '', size = 48 }) => {
  const normalizeInitialSrc = (s) => {
    if (!s) return s;
    // if already has an extension (png, jpg, svg, webp, etc.), return as-is
    if (/\.[a-zA-Z0-9]+$/.test(s)) return s;
    // if it's an absolute http(s) URL without extension, assume .svg
    if (/^https?:\/\//i.test(s)) return s.endsWith('.svg') ? s : `${s}.svg`;
    // relative/local paths without extension: return as-is (do not append)
    return s;
  };

  const [srcState, setSrcState] = React.useState(normalizeInitialSrc(src));
  const [triedAlt, setTriedAlt] = React.useState(false);
  const [ok, setOk] = React.useState(true);

  // second CDN fallback using jsDelivr/UNPKG mirror for simple-icons (uses npm package path)
  const altSrc = (s) => {
    if (!s) return s;
    try {
      const m = s.match(/https?:\/\/cdn\.simpleicons\.org\/(.+)\/(.+)\.svg$/i);
      if (m) {
        const name = m[1];
        // try jsDelivr raw github usercontent mirror for simple-icons (unofficial but often available)
        return `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${name}.svg`;
      }
    } catch {
      // Fallback if URL parsing fails
      return s;
    }
    return s;
  };

  if (!ok) return <Badge size={size} bg="#6B7280">{alt ? alt.substring(0, 2).toUpperCase() : '?'}</Badge>;

  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'transparent' }}>
      <img
        src={srcState}
        alt={alt}
        style={{ maxWidth: '70%', maxHeight: '70%', width: 'auto', height: 'auto', display: 'block', background: 'transparent', objectFit: 'contain' }}
        onError={(e) => {
          // first error: try alternate CDN once
          if (!triedAlt) {
            setTriedAlt(true);
            const altUrl = altSrc(srcState);
            if (altUrl && altUrl !== srcState) {
              setSrcState(altUrl);
              // let the <img> retry with new src
              e.currentTarget.src = altUrl;
              return;
            }
          }
          // final fallback to badge
          setOk(false);
        }}
      />
    </div>
  );
};

export const GenericIcon = ({ label, size = 48 }) => (
  <Badge size={size} bg="#6B7280">{label && label.length ? label[0].toUpperCase() : '?'}</Badge>
);
const renderSkillIcon = (skill, props = {}) => {
  if (!skill) return <GenericIcon {...props} label="?" />;
  const s = skill.toLowerCase();
  // explicit soft-skill shortcodes
  if (s === 'problem solving' || s === 'problem-solving' || s === 'problemsolving') return <Badge {...props} bg="#10B981">PS</Badge>;
  if (s === 'time management' || s === 'timemanagement') return <Badge {...props} bg="#F59E0B">TM</Badge>;
  if (s === 'team collaboration' || s === 'team-collaboration' || s === 'team collaboration') return <Badge {...props} bg="#6366F1">TC</Badge>;
  // Machine Learning / Gen AI / Frontend Development shortcuts
  if (s.includes('machine learning') || s.includes('machine-learning') || s === 'machine' || s === 'ml') return <Badge {...props} bg="#06B6D4">ML</Badge>;
  if (s.includes('gen ai') || s.includes('genai') || s.includes('gen-ai') || s === 'gen ai') return <Badge {...props} bg="#8B5CF6">AI</Badge>;
  if (s.includes('frontend') || s.includes('front-end') || s.includes('frontend development') || s.includes('front end')) return <Badge {...props} bg="#F97316">FD</Badge>;
  if (s.includes('react')) return <LogoImg src="https://cdn.simpleicons.org/react/61DAFB.svg" alt="React" {...props} />;
  if (s.includes('streamlit')) return <LogoImg src="https://cdn.simpleicons.org/streamlit/FF4B4B.svg" alt="Streamlit" {...props} />;
  if (s.includes('flask')) return <LogoImg src="https://cdn.simpleicons.org/flask/F7A400.svg" alt="Flask" {...props} />;
  if (s.includes('python')) return <LogoImg src="https://cdn.simpleicons.org/python/3776AB.svg" alt="Python" {...props} />;
  if (s.includes('javascript') || s === 'js') return <LogoImg src="https://cdn.simpleicons.org/javascript/F7DF1E.svg" alt="JavaScript" {...props} />;
  if (s.includes('html')) return <LogoImg src="https://cdn.simpleicons.org/html5/E34F26.svg" alt="HTML5" {...props} />;
  if (s.includes('css')) return <LogoImg src={css} alt="CSS3" {...props} />;
  // if (s.includes('css')) return <LogoImg src="https://cdn.simpleicons.org/css3/1572B6.svg" alt="CSS3" {...props} />;
  if (s.includes('git') && !s.includes('github')) return <LogoImg src="https://cdn.simpleicons.org/git/F05032.svg" alt="Git" {...props} />;
  if (s.includes('github')) return <LogoImg src="https://cdn.simpleicons.org/github/111827.svg" alt="GitHub" {...props} />;
  if (s.includes('docker')) return <LogoImg src="https://cdn.simpleicons.org/docker/2496ED.svg" alt="Docker" {...props} />;
  if (s.includes('vscode')) return <LogoImg src={vscode} alt="VS Code" {...props} />;
  // if (s.includes('vs code') || s.includes('vscode')) return <LogoImg src="https://cdn.simpleicons.org/visualstudiocode/007ACC.svg" alt="VS Code" {...props} />;
  if (s.includes('dagshub')) return <LogoImg src={dagshubLogo} alt="DagsHub" {...props} />;
  if (s.includes('n8n')) return <LogoImg src="https://cdn.simpleicons.org/n8n/FF6A00.svg" alt="n8n" {...props} />;
  // AI/ML Libraries
  if (s.includes('tensorflow')) return <LogoImg src="https://cdn.simpleicons.org/tensorflow/FF6F00.svg" alt="TensorFlow" {...props} />;
  if (s.includes('numpy')) return <LogoImg src="https://numpy.org/images/logo.svg" alt="NumPy" {...props} />;
  if (s.includes('pandas')) return <LogoImg src="https://cdn.simpleicons.org/pandas/150458.svg" alt="Pandas" {...props} />;
  if (s.includes('scikit') || s.includes('sklearn') || s === 'scikit learn') return <LogoImg src="https://cdn.simpleicons.org/scikitlearn/F7931E.svg" alt="scikit-learn" {...props} />;
  // Backend & APIs
  if (s.includes('fastapi')) return <LogoImg src="https://cdn.simpleicons.org/fastapi/009688.svg" alt="FastAPI" {...props} />;
  if (s.includes('rest api') || s.includes('rest apis') || s === 'rest apis') return <LogoImg src="https://cdn.simpleicons.org/swagger/85EA2D.svg" alt="REST APIs" {...props} />;
  if (s.includes('mysql')) return <LogoImg src="https://cdn.simpleicons.org/mysql/4479A1.svg" alt="MySQL" {...props} />;
  // Tools
  if (s.includes('vercel')) return <LogoImg src="https://cdn.simpleicons.org/vercel/000000.svg" alt="Vercel" {...props} />;
  // Legacy entries (kept for backward compatibility)
  if (s.includes('machine learning') || s.includes('machine-learning') || s === 'machine' || s === 'ml') return <LogoImg src="https://cdn.simpleicons.org/microsoftazure/0089D6.svg" alt="ML" {...props} />;
  if (s.includes('gen ai') || s.includes('genai') || s.includes('gen-ai') || s === 'gen ai') return <LogoImg src="https://cdn.simpleicons.org/google/4285F4.svg" alt="AI" {...props} />;
  if (s.includes('frontend') || s.includes('front-end') || s.includes('frontend development') || s.includes('front end')) return <LogoImg src="https://cdn.simpleicons.org/webpack/8DD6F9.svg" alt="Frontend" {...props} />;
  // fallback
  // fallback
  return <GenericIcon {...props} label={skill} />;
};

const SkillIcon = ({ skill, size = 48 }) => renderSkillIcon(skill, { size });

export default SkillIcon;
