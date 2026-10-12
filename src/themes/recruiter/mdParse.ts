import { slugify } from './slug';

export type Block =
  | { t: 'h'; level: 1 | 2 | 3; text: string }
  | { t: 'p'; lines: string[] }
  | { t: 'ul'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'hr' };

const cells = (line: string) =>
  line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
const isSep = (line: string) => /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(line);

export function parseMarkdown(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) { blocks.push({ t: 'h', level: h[1].length as 1 | 2 | 3, text: h[2].trim() }); i++; continue; }
    if (/^---+\s*$/.test(line)) { blocks.push({ t: 'hr' }); i++; continue; }
    if (line.startsWith('|') && i + 1 < lines.length && isSep(lines[i + 1])) {
      const head = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].startsWith('|')) rows.push(cells(lines[i++]));
      blocks.push({ t: 'table', head, rows });
      continue;
    }
    if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i])) items.push(lines[i++].slice(2).trim());
      blocks.push({ t: 'ul', items });
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length && lines[i].trim() && !/^#{1,3}\s/.test(lines[i]) && !/^---+\s*$/.test(lines[i]) &&
      !/^- /.test(lines[i]) && !lines[i].startsWith('|')
    ) para.push(lines[i++]);
    blocks.push({ t: 'p', lines: para });
  }
  return blocks;
}

/** Blocks under the `## ` heading whose slug is `id`, up to the next `## ` (heading excluded). */
export function sectionOf(blocks: Block[], id: string): Block[] {
  const start = blocks.findIndex((b) => b.t === 'h' && b.level === 2 && slugify(b.text) === id);
  if (start < 0) return [];
  const rest = blocks.slice(start + 1);
  const end = rest.findIndex((b) => b.t === 'h' && b.level === 2);
  const body = end < 0 ? rest : rest.slice(0, end);
  return body.filter((b, i) => !(b.t === 'hr' && i === body.length - 1));
}

/** Everything from the first `## ` on, minus the sections named in `skip`. */
export function withoutSections(blocks: Block[], skip: string[]): Block[] {
  const out: Block[] = [];
  let drop = true; // before the first ## is the page header: dropped too
  for (const b of blocks) {
    if (b.t === 'h' && b.level === 2) drop = skip.includes(slugify(b.text));
    if (!drop) out.push(b);
  }
  return out;
}

export const headingsOf = (blocks: Block[]) =>
  blocks.flatMap((b) => (b.t === 'h' && b.level === 2 ? [{ id: slugify(b.text), label: b.text }] : []));

