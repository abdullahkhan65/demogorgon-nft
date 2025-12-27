// Simple sound utility using Web Audio API for atmospheric effects

export const playLowBassNote = (duration: number = 800) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create oscillator for deep bass
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set frequency to low bass (40-60 Hz range)
    oscillator.frequency.value = 45;
    oscillator.type = 'sine';

    // Envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);

    // Clean up
    setTimeout(() => {
      audioContext.close();
    }, duration + 100);
  } catch (error) {
    console.log('Audio not available');
  }
};

export const playGlitchSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Glitch-like frequency sweep
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);

    setTimeout(() => {
      audioContext.close();
    }, 200);
  } catch (error) {
    console.log('Audio not available');
  }
};

export const playVecnaRumble = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create multiple oscillators for a rich, ominous sound
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Deep frequencies
    osc1.frequency.value = 40;
    osc2.frequency.value = 41; // Slight detuning for richness
    osc1.type = 'sine';
    osc2.type = 'triangle';

    // Envelope with tremolo effect
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.3);

    for (let i = 0; i < 10; i++) {
      const time = audioContext.currentTime + 0.3 + (i * 0.15);
      gainNode.gain.linearRampToValueAtTime(0.3, time);
      gainNode.gain.linearRampToValueAtTime(0.35, time + 0.075);
    }

    gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 2.5);

    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 3);
    osc2.stop(audioContext.currentTime + 3);

    setTimeout(() => {
      audioContext.close();
    }, 3100);
  } catch (error) {
    console.log('Audio not available');
  }
};
