import * as Tone from 'tone';
import { useEffect, useState } from 'react';

interface PresetType {
  carrier: number;
  modulation: number;
  binaural: number;
  isochronic: number;
  noise: number;
  level: number;
}

export default function TonePlayer() {
  const [synths, setSynths] = useState<{
    left: Tone.Oscillator | null;
    right: Tone.Oscillator | null;
    noise: Tone.Noise | null;
    lfo: Tone.LFO | null;
  }>({ left: null, right: null, noise: null, lfo: null });

  const initAudio = async () => {
    await Tone.start();

    const leftOsc = new Tone.Oscillator(440, 'sine');
    const rightOsc = new Tone.Oscillator(440, 'sine');
    const noise = new Tone.Noise('white').start();

    const leftGain = new Tone.Gain().toDestination();
    const rightGain = new Tone.Gain().toDestination();
    const noiseGain = new Tone.Gain().toDestination();

    leftOsc.connect(leftGain);
    rightOsc.connect(rightGain);
    noise.connect(noiseGain);

    const lfo = new Tone.LFO('sine', 0, 1).start();
    lfo.connect(leftGain.gain);

    setSynths({ left: leftOsc, right: rightOsc, noise, lfo });
  };

  const loadPreset = (preset: PresetType) => {
    if (!synths.left || !synths.right || !synths.noise) return;

    synths.left.frequency.value = preset.carrier + preset.binaural / 2;
    synths.right.frequency.value = preset.carrier - preset.binaural / 2;

    synths.noise.volume.value = Tone.gainToDb(preset.noise * 0.1);

    synths.lfo?.set({
      frequency: preset.modulation,
      amplitude: preset.isochronic / 100,
    });
  };

  const togglePlay = () => {
    if (synths.left?.state === 'started') {
      synths.left.stop();
      synths.right?.stop();
      synths.noise?.stop();
    } else {
      synths.left?.start();
      synths.right?.start();
      synths.noise?.start();
    }
  };

  useEffect(() => {
    initAudio();
    return () => {
      synths.left?.dispose();
      synths.right?.dispose();
      synths.noise?.dispose();
    };
  }, []);

  return (
    <div>
      <button onClick={togglePlay} className="bg-gold px-4 py-2 rounded-md">
        Play / Stop
      </button>
      <button
        onClick={() =>
          loadPreset({
            carrier: 440,
            modulation: 10,
            binaural: 10,
            isochronic: 50,
            noise: 0.5,
            level: 0.8,
          })
        }
        className="bg-gold px-4 py-2 rounded-md"
      >
        Load Preset
      </button>
    </div>
  );
}
