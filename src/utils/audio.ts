/**
 * Simple Web Audio API sound synthesizer for workout timers
 * No external audio files required, works offline seamlessly
 */
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playBeep(freq = 600, duration = 0.15, type: OscillatorType = 'sine', volume = 0.2) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio playback error safely ignored
  }
}

export function playCountdownBeep(isFinal = false) {
  if (isFinal) {
    playBeep(880, 0.4, 'triangle', 0.25);
  } else {
    playBeep(440, 0.12, 'sine', 0.15);
  }
}

export function playSwitchSideBeep() {
  playBeep(520, 0.12, 'triangle', 0.2);
  setTimeout(() => {
    playBeep(659, 0.2, 'triangle', 0.25);
  }, 140);
}

export function playRestBeep() {
  playBeep(440, 0.15, 'sine', 0.18);
  setTimeout(() => {
    playBeep(330, 0.3, 'sine', 0.18);
  }, 160);
}

export function playCompleteFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playBeep(freq, 0.3, 'triangle', 0.25);
    }, idx * 160);
  });
}
