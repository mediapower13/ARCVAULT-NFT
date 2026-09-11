import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientSound: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleSound = () => {
    if (!isPlaying) {
      // Start ethereal soundscape
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Frequencies for deep ambient meditation (A chord with low octave & sub harmonic)
        const freqs = [110, 164.81, 220, 329.63, 440];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle frequency modulation / slow beating
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.18 / (idx + 1), ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);

          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsPlaying(true);
      } catch (e) {
        console.error('Audio initialization failed', e);
      }
    } else {
      // Fade out and stop
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try { osc.stop(); } catch (e) {}
          });
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          setIsPlaying(false);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute Ambient Gallery Soundscape' : 'Enable Ethereal Gallery Soundscape'}
      className={`p-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 text-xs font-mono tracking-wider ${
        isPlaying
          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
          : 'bg-white/5 border-white/10 text-[#9E9EA7] hover:text-[#F5F5F7] hover:border-white/20'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span className="hidden md:inline">SOUNDSCAPE ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="hidden md:inline">ATMOSPHERE</span>
        </>
      )}
    </button>
  );
};
