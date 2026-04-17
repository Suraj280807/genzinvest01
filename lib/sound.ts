"use client";

let audioContext: AudioContext | null = null;

export const playFlipSound = () => {
    try {
        if (typeof window === "undefined") return;

        if (!audioContext) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                audioContext = new AudioContext();
            }
        }

        if (!audioContext) return;

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const now = audioContext.currentTime;

        // "Soft Tactile Pop" - Clean and Smooth
        // A pure sine wave impulse that drops in pitch rapidly
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.15); // Drop makes it sound like a "tap"

        // Smooth volume envelope (No harsh clicking)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Soft attack (10ms)
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15); // Smooth decay

        osc.start(now);
        osc.stop(now + 0.2);

    } catch (error) {
        console.error("Audio playback failed:", error);
    }
};
