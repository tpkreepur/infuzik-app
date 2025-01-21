'use client';
import { useState, useEffect } from 'react';
import { AudioEngine } from '@/lib/audio-engine';
import { IoMoonOutline, IoBulbOutline } from 'react-icons/io5';
import { IoMdPlay, IoMdPause } from 'react-icons/io';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [engine, setEngine] = useState<AudioEngine | null>(null);

  useEffect(() => {
    const audioEngine = new AudioEngine();
    audioEngine.initialize().then(() => {
      setEngine(audioEngine);
    });
    return () => {
      if (isPlaying) audioEngine.stop();
    };
  }, []);

  const togglePlay = () => {
    if (!engine) return;
    if (isPlaying) {
      engine.stop();
    } else {
      engine.start();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (engine) {
      engine.state[0].level = newVolume;
      engine.updateParameters(0);
    }
  };

  const setPreset = (preset: 'sleep' | 'focus') => {
    if (!engine) return;
    engine.setPreset(preset);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-platinum/5 rounded-xl backdrop-blur-sm">
      <div className="flex gap-4">
        <button
          onClick={() => setPreset('sleep')}
          className="p-3 rounded-full hover:bg-platinum/10 transition-colors"
          title="Sleep preset"
        >
          <IoMoonOutline size={24} />
        </button>
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-accent hover:bg-accent/80 transition-colors"
        >
          {isPlaying ? <IoMdPause size={32} /> : <IoMdPlay size={32} />}
        </button>
        <button
          onClick={() => setPreset('focus')}
          className="p-3 rounded-full hover:bg-platinum/10 transition-colors"
          title="Focus preset"
        >
          <IoBulbOutline size={24} />
        </button>
      </div>
      <div className="w-full max-w-xs flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
        />
        <span className="text-sm w-8">{volume}%</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
