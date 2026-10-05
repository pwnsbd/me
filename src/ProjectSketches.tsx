/* Hand-drawn window contents for the project cards.
   Coordinates live inside the ProjectWindow content area (x 12–308, y 38–210). */

export type SketchKind =
  | 'journal' | 'palette' | 'lens' | 'graph' | 'gallery'
  | 'book' | 'dictionary' | 'orbits' | 'frog'
  | 'towers' | 'swatches';

const INK = 'var(--ink)';
const HAND = "'Architects Daughter', cursive";
const SKETCH = "'Caveat', cursive";

/* sketchy horizontal text lines */
export function TextLines({ x, y, count, widths, gap = 11 }: {
  x: number; y: number; count: number; widths: number[]; gap?: number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <path key={i}
          d={`M ${x} ${y + i * gap} C ${x + widths[i] * 0.4} ${y + i * gap - 0.5} ${x + widths[i] * 0.8} ${y + i * gap + 0.5} ${x + widths[i]} ${y + i * gap}`}
          stroke={INK} strokeWidth="1" fill="none" opacity="0.35"
          strokeLinecap="round" />
      ))}
    </>
  );
}

/* wobbly rectangle */
function Box({ x, y, w, h, fill = 'none', opacity = 0.5, sw = 0.9 }: {
  x: number; y: number; w: number; h: number; fill?: string; opacity?: number; sw?: number;
}) {
  return (
    <path d={`M ${x} ${y} L ${x + w} ${y + 0.8} L ${x + w - 0.6} ${y + h} L ${x + 0.5} ${y + h - 0.7} Z`}
      fill={fill} stroke={INK} strokeWidth={sw} opacity={opacity} />
  );
}

function Label({ x, y, children, size = 9, anchor = 'start', opacity = 0.55 }: {
  x: number; y: number; children: React.ReactNode; size?: number; anchor?: 'start' | 'middle' | 'end'; opacity?: number;
}) {
  return (
    <text x={x} y={y} fontFamily={HAND} fontSize={size} fill="var(--ink-mid)"
      textAnchor={anchor} opacity={opacity}>{children}</text>
  );
}

const SKETCHES: Record<SketchKind, () => React.ReactNode> = {
  /* Words — a journal page with an echo linking two passages */
  journal: () => (
    <>
      <text x="22" y="58" fontFamily={SKETCH} fontSize="15" fontWeight="700" fill={INK} opacity="0.7">today</text>
      <TextLines x={22} y={74} count={4} gap={13} widths={[170, 150, 165, 110]} />
      <path d="M 22 133 C 60 131 110 134 150 132" stroke={INK} strokeWidth="5" opacity="0.12" strokeLinecap="round" />
      <Box x={196} y={120} w={100} h={62} fill="var(--paper-dark)" opacity={0.55} />
      <Label x={204} y={134} size={8}>march 12</Label>
      <TextLines x={204} y={148} count={3} gap={10} widths={[80, 70, 55]} />
      <path d="M 150 132 C 165 118 180 122 196 132" stroke={INK} strokeWidth="1" fill="none"
        strokeDasharray="3 3" opacity="0.5" />
      <Label x={22} y={196} size={8}>you wrote something like this before…</Label>
    </>
  ),

  /* Rasa — reference swatch → arrow → restyled photo */
  palette: () => (
    <>
      <Box x={24} y={62} w={96} h={80} fill="var(--paper-dark)" />
      <path d="M 30 132 L 55 100 L 75 120 L 92 104 L 114 132 Z" fill={INK} opacity="0.12" />
      <circle cx="96" cy="80" r="8" fill={INK} opacity="0.1" />
      {[0, 1, 2, 3].map(i => (
        <circle key={i} cx={36 + i * 24} cy={162} r="8" fill={INK}
          opacity={0.08 + i * 0.07} stroke={INK} strokeWidth="0.7" />
      ))}
      <Label x={72} y={190} size={8} anchor="middle">essence</Label>
      <path d="M 132 102 C 150 100 168 103 186 102" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.6" />
      <path d="M 180 96 L 187 102 L 180 108" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.6" />
      <Box x={198} y={62} w={96} h={80} fill={INK} opacity={0.14} />
      <path d="M 204 132 L 229 100 L 249 120 L 266 104 L 288 132 Z" fill={INK} opacity="0.22" />
      <Label x={246} y={162} size={8} anchor="middle">your photo, restyled</Label>
    </>
  ),

  /* RayForge — rays converging through a lens */
  lens: () => (
    <>
      <path d="M 20 180 L 300 180" stroke={INK} strokeWidth="0.8" opacity="0.25" strokeDasharray="4 4" />
      {[80, 104, 128, 152].map((y, i) => (
        <g key={i}>
          <path d={`M 22 ${y} L 150 ${y}`} stroke={INK} strokeWidth="1" opacity="0.5" />
          <path d={`M 150 ${y} L 250 116 L 300 ${232 - y}`} stroke={INK} strokeWidth="1" opacity="0.5" fill="none" />
        </g>
      ))}
      <path d="M 150 64 C 166 90 166 142 150 168 C 134 142 134 90 150 64 Z"
        fill="var(--paper-dark)" stroke={INK} strokeWidth="1.3" opacity="0.8" />
      <circle cx="250" cy="116" r="3" fill={INK} opacity="0.6" />
      <Label x={250} y={204} size={8} anchor="middle">f = 50.0 mm</Label>
      <Label x={22} y={58} size={8}>BK7 · biconvex</Label>
    </>
  ),

  /* Buddhi / Nidhi — a small node graph */
  graph: () => {
    const nodes: [number, number, number][] = [
      [160, 120, 16], [80, 80, 9], [90, 165, 10], [240, 75, 11], [250, 160, 9], [45, 125, 6], [200, 190, 6], [290, 115, 6],
    ];
    const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 7], [4, 7], [1, 3]];
    return (
      <>
        {edges.map(([a, b], i) => (
          <path key={i} d={`M ${nodes[a][0]} ${nodes[a][1]} L ${nodes[b][0]} ${nodes[b][1]}`}
            stroke={INK} strokeWidth="1" opacity="0.35" />
        ))}
        {nodes.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i === 0 ? INK : 'var(--paper)'}
            fillOpacity={i === 0 ? 0.15 : 1} stroke={INK} strokeWidth="1" opacity="0.7" />
        ))}
        <Label x={22} y={58} size={8}>“the drone footage from nepal”</Label>
      </>
    );
  },

  /* MemoryRoom — photos hanging in a meadow under a dome */
  gallery: () => (
    <>
      <path d="M 20 160 C 80 150 140 158 200 152 C 240 148 280 154 300 152" stroke={INK} strokeWidth="1" fill="none" opacity="0.4" />
      {[30, 52, 250, 272, 290].map((x, i) => (
        <path key={i} d={`M ${x} 158 L ${x + 7} 128 L ${x + 14} 158 Z`} fill={INK} opacity="0.12" stroke={INK} strokeWidth="0.6" />
      ))}
      {[[90, 78, -6], [140, 70, 3], [190, 80, -2]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r}, ${x + 20}, ${y + 25})`}>
          <Box x={x} y={y} w={40} h={50} fill="var(--paper-dark)" opacity={0.7} />
          <path d={`M ${x + 4} ${y + 40} L ${x + 15} ${y + 26} L ${x + 24} ${y + 34} L ${x + 36} ${y + 22} L ${x + 36} ${y + 40} Z`} fill={INK} opacity="0.12" />
          <path d={`M ${x + 20} ${y + 50} L ${x + 20} 152`} stroke={INK} strokeWidth="0.5" opacity="0.25" />
        </g>
      ))}
      {[[40, 70], [70, 100], [240, 64], [280, 92], [230, 110]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill={INK} opacity="0.3" />
      ))}
      <Label x={160} y={190} size={8} anchor="middle">point · press trigger · step inside</Label>
    </>
  ),

  /* Spotlight — an open book with one highlighted line */
  book: () => (
    <>
      <path d="M 160 64 C 120 56 70 58 30 66 L 30 196 C 70 188 120 186 160 194 Z"
        fill="var(--paper-dark)" stroke={INK} strokeWidth="1" opacity="0.6" />
      <path d="M 160 64 C 200 56 250 58 290 66 L 290 196 C 250 188 200 186 160 194 Z"
        fill="var(--paper-dark)" stroke={INK} strokeWidth="1" opacity="0.6" />
      <TextLines x={44} y={88} count={7} gap={13} widths={[100, 90, 104, 80, 96, 100, 60]} />
      <TextLines x={176} y={88} count={3} gap={13} widths={[100, 96, 70]} />
      <path d="M 174 128 C 210 126 250 129 276 127" stroke="#E8C547" strokeWidth="9" opacity="0.45" strokeLinecap="round" />
      <TextLines x={176} y={128} count={1} widths={[100]} />
      <TextLines x={176} y={154} count={3} gap={13} widths={[90, 104, 50]} />
    </>
  ),

  /* Lingo — sidebar list of names */
  dictionary: () => (
    <>
      <Box x={20} y={44} w={110} h={160} fill="var(--paper-dark)" opacity={0.45} />
      <Label x={30} y={60} size={8} opacity={0.7}>LINGO</Label>
      {['NavBar', 'HeroSection', 'PlanGrid', 'loginHandler', 'SignupForm', 'Footer'].map((n, i) => (
        <g key={n}>
          {i === 2 && <path d={`M 26 ${80 + i * 20} L 124 ${80 + i * 20}`} stroke={INK} strokeWidth="14" opacity="0.08" />}
          <Label x={32} y={83 + i * 20} size={9} opacity={0.65}>{n}</Label>
        </g>
      ))}
      <TextLines x={148} y={66} count={3} gap={12} widths={[120, 90, 140]} />
      <Box x={148} y={130} w={146} h={34} opacity={0.4} />
      <Label x={156} y={151} size={8}>“make PlanGrid 2 cols”</Label>
    </>
  ),

  /* Nakshatra — orbits around a sun */
  orbits: () => (
    <>
      {[30, 52, 76, 96].map((r, i) => (
        <ellipse key={i} cx="160" cy="124" rx={r * 1.4} ry={r * 0.7} fill="none" stroke={INK}
          strokeWidth="0.8" opacity="0.3" />
      ))}
      <circle cx="160" cy="124" r="11" fill="#E8C547" opacity="0.5" stroke={INK} strokeWidth="0.8" />
      {[[202, 124, 3.5], [100, 150, 4.5], [250, 90, 5], [40, 115, 4]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={INK} opacity="0.45" />
      ))}
      <Label x={22} y={58} size={8}>◀◀ rewinding to 1998-04-12</Label>
    </>
  ),

  /* FroggerAR — platforms and a jump arc */
  frog: () => (
    <>
      {[[24, 180], [94, 150], [164, 168], [234, 136]].map(([x, y], i) => (
        <Box key={i} x={x} y={y} w={56} h={10} fill={i < 2 ? '#81C784' : 'var(--paper-dark)'} opacity={0.6} />
      ))}
      <path d="M 122 146 C 140 90 180 96 192 164" stroke={INK} strokeWidth="1" fill="none" strokeDasharray="3 4" opacity="0.5" />
      <ellipse cx="120" cy="140" rx="10" ry="7" fill="#81C784" stroke={INK} strokeWidth="0.9" opacity="0.8" />
      <circle cx="116" cy="135" r="1.5" fill={INK} />
      <circle cx="124" cy="135" r="1.5" fill={INK} />
      {[0, 1, 2].map(i => (
        <path key={i} d={`M ${250 + i * 16} 60 C ${246 + i * 16} 54 ${240 + i * 16} 60 ${250 + i * 16} 68 C ${260 + i * 16} 60 ${254 + i * 16} 54 ${250 + i * 16} 60 Z`}
          fill="#E57373" opacity={i < 2 ? 0.6 : 0.15} stroke={INK} strokeWidth="0.6" />
      ))}
    </>
  ),

  /* Tower War — towers linked by lines */
  towers: () => {
    const t: [number, number][] = [[60, 160], [150, 110], [240, 150], [210, 70], [90, 80]];
    return (
      <>
        {[[0, 1], [1, 2], [1, 3], [4, 1]].map(([a, b], i) => (
          <path key={i} d={`M ${t[a][0]} ${t[a][1]} L ${t[b][0]} ${t[b][1]}`} stroke={INK}
            strokeWidth="1.2" strokeDasharray="5 3" opacity="0.4" />
        ))}
        {t.map(([x, y], i) => (
          <g key={i}>
            <path d={`M ${x - 10} ${y + 14} L ${x - 7} ${y - 12} L ${x + 7} ${y - 12} L ${x + 10} ${y + 14} Z`}
              fill={i % 2 ? '#E57373' : '#81C784'} opacity="0.5" stroke={INK} strokeWidth="0.8" />
            <Label x={x} y={y + 4} size={8} anchor="middle" opacity={0.7}>{[12, 30, 8, 15, 21][i]}</Label>
          </g>
        ))}
      </>
    );
  },

  /* Color Picker — base colour, complement and hue slider */
  swatches: () => (
    <>
      <Box x={40} y={64} w={100} h={70} fill="hsl(200 55% 55%)" opacity={0.7} />
      <Box x={180} y={64} w={100} h={70} fill="hsl(20 60% 60%)" opacity={0.7} />
      <Label x={90} y={150} size={8} anchor="middle">base</Label>
      <Label x={230} y={150} size={8} anchor="middle">complement?</Label>
      <path d="M 40 176 L 280 176" stroke={INK} strokeWidth="5" opacity="0.15" strokeLinecap="round" />
      <circle cx="200" cy="176" r="6" fill="var(--paper)" stroke={INK} strokeWidth="1" opacity="0.8" />
      <Label x={280} y={200} size={8} anchor="end">streak 7</Label>
    </>
  ),

};

export function ProjectSketch({ kind }: { kind: SketchKind }) {
  return <>{SKETCHES[kind]()}</>;
}
