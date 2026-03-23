import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  swayDuration: number;
}

const COLORS = [
  "hsl(38, 65%, 50%)",    // gold
  "hsl(38, 55%, 65%)",    // light gold
  "hsl(30, 10%, 25%)",    // charcoal
  "hsl(35, 20%, 75%)",    // warm beige
  "hsl(40, 40%, 85%)",    // cream
  "hsl(36, 70%, 40%)",    // deep gold
];

export default function BalloonAnimation() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const items: Balloon[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 28 + Math.random() * 24,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 1.5,
      duration: 4 + Math.random() * 3,
      swayDuration: 2 + Math.random() * 2,
    }));
    setBalloons(items);

    const timer = setTimeout(() => setVisible(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.x}%`,
            bottom: "-60px",
            animation: `balloon-float ${b.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${b.delay}s forwards`,
          }}
        >
          <div
            style={{
              animation: `balloon-sway ${b.swayDuration}s ease-in-out infinite`,
            }}
          >
            {/* Balloon SVG */}
            <svg width={b.size} height={b.size * 1.3} viewBox="0 0 50 65">
              <defs>
                <radialGradient id={`grad-${b.id}`} cx="35%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="100%" stopColor={b.color} stopOpacity="0.85" />
                </radialGradient>
              </defs>
              <ellipse cx="25" cy="22" rx="20" ry="22" fill={`url(#grad-${b.id})`} />
              <polygon points="22,43 25,50 28,43" fill={b.color} opacity="0.7" />
              <line x1="25" y1="50" x2="25" y2="65" stroke={b.color} strokeWidth="0.8" opacity="0.5" />
            </svg>
          </div>
        </div>
      ))}
      {/* Confetti pieces */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            animation: `confetti-fall ${3 + Math.random() * 4}s linear ${Math.random() * 3}s forwards`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}
