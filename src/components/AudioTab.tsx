import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { AudioParams } from "@/types/AudioParams";

interface AudioTabProps {
  params: AudioParams;
}

const AudioTab: React.FC<AudioTabProps> = ({ params }) => {
  const leftOscRef = useRef<Tone.Oscillator | null>(null);
  const rightOscRef = useRef<Tone.Oscillator | null>(null);
  const leftGainRef = useRef<Tone.Gain | null>(null);
  const rightGainRef = useRef<Tone.Gain | null>(null);
  const noiseRef = useRef<Tone.Noise | null>(null);
  const noiseGainRef = useRef<Tone.Gain | null>(null);
  const fmLFORef = useRef<Tone.LFO | null>(null);

  useEffect(() => {
    // Initialize oscillators for left/right channels with binaural frequency offsets
    leftOscRef.current = new Tone.Oscillator({
      frequency: params.carrier + ((params.mod / 2) * params.binaural) / 100,
      type: "sine",
    }).start();
    rightOscRef.current = new Tone.Oscillator({
      frequency: params.carrier - ((params.mod / 2) * params.binaural) / 100,
      type: "sine",
    }).start();

    // Create gain nodes for left and right channels
    leftGainRef.current = new Tone.Gain(0).toDestination();
    rightGainRef.current = new Tone.Gain(0).toDestination();

    leftOscRef.current.connect(leftGainRef.current);
    rightOscRef.current.connect(rightGainRef.current);

    // Create an LFO for FM modulation
    fmLFORef.current = new Tone.LFO({
      frequency: params.mod,
      min: (-params.fm / 100) * params.carrier,
      max: (params.fm / 100) * params.carrier,
    }).start();
    fmLFORef.current.connect(leftOscRef.current.frequency);
    fmLFORef.current.connect(rightOscRef.current.frequency);

    // Create a noise source with a gain control
    noiseRef.current = new Tone.Noise("white");
    noiseGainRef.current = new Tone.Gain(0);
    noiseRef.current.connect(noiseGainRef.current);
    noiseGainRef.current.connect(leftGainRef.current);
    noiseGainRef.current.connect(rightGainRef.current);
    noiseRef.current.start();

    return () => {
      // Cleanup Tone.js nodes
      leftOscRef.current?.dispose();
      rightOscRef.current?.dispose();
      leftGainRef.current?.dispose();
      rightGainRef.current?.dispose();
      noiseRef.current?.dispose();
      noiseGainRef.current?.dispose();
      fmLFORef.current?.dispose();
    };
  }, []);

  // Update nodes when parameters change
  useEffect(() => {
    if (leftOscRef.current && rightOscRef.current) {
      leftOscRef.current.frequency.value =
        params.carrier + ((params.mod / 2) * params.binaural) / 100;
      rightOscRef.current.frequency.value =
        params.carrier - ((params.mod / 2) * params.binaural) / 100;
    }
    if (fmLFORef.current) {
      fmLFORef.current.frequency.value = params.mod;
      fmLFORef.current.min = (-params.fm / 100) * params.carrier;
      fmLFORef.current.max = (params.fm / 100) * params.carrier;
    }
    if (noiseGainRef.current) {
      noiseGainRef.current.gain.value = params.noise / 100;
    }
    const levelGain = params.level / 100;
    if (leftGainRef.current && rightGainRef.current) {
      // Use the bilateral parameter to adjust left/right volume balance
      leftGainRef.current.gain.value = levelGain * (params.bilateral / 100);
      rightGainRef.current.gain.value =
        levelGain * ((100 - params.bilateral) / 100);
    }
  }, [params]);

  return null; // This component does not render any UI—it manages audio only.
};

export default AudioTab;
