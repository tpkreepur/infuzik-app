'use client';
import { useState, useEffect, useCallback } from 'react';
import { AudioEngine } from '@/lib/audio-engine';
import { IoMoonOutline, IoBulbOutline } from 'react-icons/io5';
import { IoMdPlay, IoMdPause } from 'react-icons/io';

interface AudioPlayerProps {
  defaultPreset?: 'sleep' | 'focus';
}

const AudioPlayer = ({ defaultPreset = 'focus' }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [engine, setEngine] = useState<AudioEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let audioEngine: AudioEngine | null = null;

    const init = async () => {
      try {
        audioEngine = new AudioEngine();
        await audioEngine.initialize();
        if (mounted) {
          setEngine(audioEngine);
          audioEngine.setPreset(defaultPreset);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to initialize audio engine');
          setIsLoading(false);
          console.error('Audio initialization error:', err);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (audioEngine) {
        audioEngine.stop();
      }
    };
  }, [defaultPreset]);

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
      // Pass the raw volume value to the engine
      engine.setVolume(newVolume);
    }
  };

  const setPreset = (preset: 'sleep' | 'focus') => {
    if (!engine) return;
    engine.setPreset(preset);
  };

  if (error) {
    return <div className="p-4 text-red-500 bg-red-100 rounded">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-platinum/5 rounded-xl backdrop-blur-sm">
      <div className="flex gap-4">
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-accent hover:bg-accent/80 transition-colors"
        >
          {isPlaying ? <IoMdPause size={32} /> : <IoMdPlay size={32} />}
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
          aria-label="Volume control"
          title="Volume control"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volume}
        />
        <span className="text-sm w-8" aria-hidden="true">{volume}%</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setPreset('sleep')}
          className="p-3 rounded-full hover:bg-platinum/10 transition-colors"
          title="Sleep preset"
        >
          <IoMoonOutline size={24} />
        </button>
        <button
          onClick={() => setPreset('focus')}
          className="p-3 rounded-full hover:bg-platinum/10 transition-colors"
          title="Focus preset"
        >
          <IoBulbOutline size={24} />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
