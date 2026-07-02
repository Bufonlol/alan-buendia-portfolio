"use client";

let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
  }
  return ctx;
}

export function isSoundEnabled() {
  return typeof window !== "undefined" && localStorage.getItem("ab-sound") === "1";
}

export function setSoundEnabled(on: boolean) {
  localStorage.setItem("ab-sound", on ? "1" : "0");
  if (on) unlockAudio();
}

/** Must be called synchronously inside a user-gesture handler (no await before it). */
export function unlockAudio() {
  const c = getCtx();
  if (c && c.state === "suspended") c.resume();
  unlocked = true;
}

export function tick(freq = 720, dur = 0.06) {
  if (!isSoundEnabled() || !unlocked) return;
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, c.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + dur + 0.02);
}

/** Short tick for nav/link interactions. */
export function tickLink() {
  tick(800, 0.05);
}

/** Slightly lower/longer tick for primary CTA confirmations. */
export function tickConfirm() {
  tick(500, 0.08);
}
