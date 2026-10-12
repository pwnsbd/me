import { useEffect } from 'react';

/**
 * Synthesises a pencil-scratch sound ("shhss shshs shh") via Web Audio API
 * and fires it whenever an <a> element is clicked anywhere in the document.
 */
export function usePencilSound() {
  useEffect(() => {
    const ctx = new AudioContext();

    function scratch() {
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const duration = 0.38; // total scratch length (s)

      // ── noise source (white noise buffer) ─────────────────────────────────
      const bufLen = Math.ceil(ctx.sampleRate * duration);
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buf;

      // ── bandpass — pencil scratch sits around 2–6 kHz ────────────────────
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 3800;
      bp.Q.value = 0.9;

      // ── highpass to cut low rumble ────────────────────────────────────────
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 1800;

      // ── amplitude envelope — 3 short strokes ─────────────────────────────
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);

      const strokes = [
        { t: 0.00, peak: 0.28, len: 0.10 },
        { t: 0.13, peak: 0.22, len: 0.09 },
        { t: 0.24, peak: 0.18, len: 0.08 },
      ];

      for (const s of strokes) {
        const t0 = now + s.t;
        gain.gain.linearRampToValueAtTime(s.peak, t0 + 0.018);
        gain.gain.linearRampToValueAtTime(s.peak * 0.6, t0 + s.len * 0.5);
        gain.gain.linearRampToValueAtTime(0, t0 + s.len);
      }

      // ── slight pitch wobble (tremolo on filter freq) ──────────────────────
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 28;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 400;
      lfo.connect(lfoGain);
      lfoGain.connect(bp.frequency);
      lfo.start(now);
      lfo.stop(now + duration + 0.02);

      // ── routing ───────────────────────────────────────────────────────────
      noise.connect(hp);
      hp.connect(bp);
      bp.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration + 0.02);
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a')) scratch();
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
