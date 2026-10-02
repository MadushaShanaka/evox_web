import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

type Kind = 'kw' | 'str' | 'cmt' | 'plain';

const LINES: { text: string; kind: Kind }[][] = [
  [
    { text: 'const', kind: 'kw' },
    { text: ' app = ', kind: 'plain' },
    { text: "'evox-platform'", kind: 'str' },
    { text: ';', kind: 'plain' },
  ],
  [
    { text: 'await', kind: 'kw' },
    { text: ' build(app);', kind: 'plain' },
  ],
  [
    { text: 'await', kind: 'kw' },
    { text: ' test(app, { ai: ', kind: 'plain' },
    { text: 'true', kind: 'kw' },
    { text: ' });', kind: 'plain' },
  ],
  [
    { text: 'deploy(app, ', kind: 'plain' },
    { text: "'production'", kind: 'str' },
    { text: ');', kind: 'plain' },
  ],
  [{ text: '// live in 42s', kind: 'cmt' }],
];

const KIND_CLASS: Record<Kind, string> = {
  kw: 'text-[#22B8D4]',
  str: 'text-[#2ECF8B]',
  cmt: 'text-[#7E909C]',
  plain: 'text-[#D7E7EF]',
};

interface Glyph {
  ch: string;
  kind: Kind;
  breakBefore: boolean;
}

function flatten(): Glyph[] {
  const glyphs: Glyph[] = [];
  LINES.forEach((line, lineIndex) => {
    line.forEach((token, tokenIndex) => {
      [...token.text].forEach((ch, charIndex) => {
        glyphs.push({
          ch,
          kind: token.kind,
          breakBefore: tokenIndex === 0 && charIndex === 0 && lineIndex > 0,
        });
      });
    });
  });
  return glyphs;
}

interface CodeWindowProps {
  started: boolean;
  paused: boolean;
  reduce: boolean;
  tilt: boolean;
  tiltX: number;
  tiltY: number;
  onComplete: () => void;
}

export function CodeWindow({ started, paused, reduce, tilt, tiltX, tiltY, onComplete }: CodeWindowProps) {
  const glyphs = useMemo(flatten, []);
  const [count, setCount] = useState(0);
  const finished = useRef(false);
  const y = useMotionValue(0);

  useEffect(() => {
    if (reduce) setCount(glyphs.length);
  }, [glyphs.length, reduce]);

  useEffect(() => {
    if (!started || paused || reduce || count >= glyphs.length) return;
    const timer = window.setInterval(() => {
      setCount((current) => (current >= glyphs.length ? current : current + 1));
    }, 40);
    return () => window.clearInterval(timer);
  }, [count, glyphs.length, paused, reduce, started]);

  useEffect(() => {
    if (count < glyphs.length || finished.current) return;
    finished.current = true;
    onComplete();
  }, [count, glyphs.length, onComplete]);

  useEffect(() => {
    if (paused) {
      y.set(0);
      return;
    }
    const controls = animate(y, [0, -10, 0], {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => controls.stop();
  }, [paused, y]);

  const done = count >= glyphs.length;

  return (
    <div className="absolute left-1/2 top-1/2 w-[min(100%,280px)] -translate-x-1/2 -translate-y-1/2 sm:w-[300px]">
      <motion.div
        style={{
          y,
          rotateX: tilt ? tiltX : 0,
          rotateY: tilt ? tiltY : 0,
          transformPerspective: 900,
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C1A24] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="flex-1 text-center font-mono text-[11px] text-[#9DB3BF]">deploy.js</span>
          <span className="w-10" />
        </div>
        <pre className="min-h-[148px] px-4 py-3 font-mono text-[11px] leading-6 sm:text-xs">
          <code>
            {glyphs.slice(0, count).map((glyph, index) => (
              <span key={index}>
                {glyph.breakBefore ? '\n' : ''}
                <span className={KIND_CLASS[glyph.kind]}>{glyph.ch}</span>
              </span>
            ))}
            {done && <span className="hero-caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-[#22B8D4]" />}
          </code>
        </pre>
        </div>
      </motion.div>
    </div>
  );
}
