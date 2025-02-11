import * as Tone from 'tone';

export interface AudioState {
  carrier: number;
  modulation: number;
  binaural: number;
  bilateral: number;
  isochronic: number;
  noise: number;
  fm: number;
  level: number;
}

export interface ToneNodes {
  oscLeft: Tone.Oscillator;
  oscRight: Tone.Oscillator;
  noiseLeft: Tone.Noise;
  noiseRight: Tone.Noise;
  lfo: Tone.LFO;
  lfoHalf: Tone.LFO;
  merger: Tone.Merge;
  panner: Tone.Panner;
  filter: Tone.Filter;
  masterGain: Tone.Gain;
}

export class AudioEngine {
  private nodes: ToneNodes[];
  private state: AudioState[];
  private activeTab: number = 0;
  private isMulti: boolean = false;

  constructor() {
    this.nodes = Array(5)
      .fill(null)
      .map(() => this.createNodes());
    this.state = Array(5).fill(this.getDefaultState());
  }

  private createNodes(): ToneNodes {
    return {
      oscLeft: new Tone.Oscillator({
        type: 'sine',
        volume: -12,
      }),
      oscRight: new Tone.Oscillator({
        type: 'sine',
        volume: -12,
      }),
      noiseLeft: new Tone.Noise({
        type: 'white',
        volume: -24,
      }),
      noiseRight: new Tone.Noise({
        type: 'white',
        volume: -24,
      }),
      lfo: new Tone.LFO({
        type: 'sine',
        min: -1,
        max: 1,
        frequency: 0.5,
      }),
      lfoHalf: new Tone.LFO({
        type: 'sine',
        min: -1,
        max: 1,
        frequency: 0.25,
      }),
      merger: new Tone.Merge(),
      panner: new Tone.Panner(0),
      filter: new Tone.Filter({
        type: 'bandpass',
        Q: 2,
      }),
      masterGain: new Tone.Gain(0.5),
    };
  }

  private getDefaultState(): AudioState {
    return {
      carrier: 220,
      modulation: 15,
      binaural: 100,
      bilateral: 0,
      isochronic: 50,
      noise: 0,
      fm: 0,
      level: 50,
    };
  }

  public async initialize() {
    await Tone.start();
    this.nodes.forEach((node, index) => this.setupRouting(node, index));
  }

  private setupRouting(node: ToneNodes, index: number) {
    const state = this.state[index];

    // Oscillator routing
    node.oscLeft.connect(node.merger, 0, 0);
    node.oscRight.connect(node.merger, 0, 1);

    // Noise routing
    node.noiseLeft.connect(node.filter);
    node.noiseRight.connect(node.filter);
    node.filter.connect(node.merger);

    // LFO connections
    node.lfo.connect(node.masterGain.gain);
    node.lfoHalf.connect(node.panner.pan);

    // Final output
    node.merger.connect(node.panner);
    node.panner.connect(node.masterGain);
    node.masterGain.toDestination();

    this.updateParameters(index);
  }

  public updateParameters(index: number) {
    const node = this.nodes[index];
    const state = this.state[index];

    // Update frequencies for binaural beats
    const leftFreq =
      state.carrier + (state.modulation / 2) * (state.binaural / 100);
    const rightFreq =
      state.carrier - (state.modulation / 2) * (state.binaural / 100);

    node.oscLeft.frequency.value = leftFreq;
    node.oscRight.frequency.value = rightFreq;

    // Update LFO rates
    node.lfo.frequency.value = state.modulation;
    node.lfoHalf.frequency.value = state.modulation / 2;

    // Update gains and filters
    node.masterGain.gain.value = (state.level * state.level) / 10000;
    node.filter.frequency.value = state.carrier;

    // Update noise level
    node.noiseLeft.volume.value = Tone.gainToDb(state.noise / 100);
    node.noiseRight.volume.value = Tone.gainToDb(state.noise / 100);
  }

  public start() {
    this.nodes.forEach((node) => {
      node.oscLeft.start();
      node.oscRight.start();
      node.noiseLeft.start();
      node.noiseRight.start();
      node.lfo.start();
      node.lfoHalf.start();
    });
  }

  public stop() {
    this.nodes.forEach((node) => {
      node.oscLeft.stop();
      node.oscRight.stop();
      node.noiseLeft.stop();
      node.noiseRight.stop();
      node.lfo.stop();
      node.lfoHalf.stop();
    });
  }

  public setPreset(preset: string) {
    const presetState = this.getPresetState(preset);
    const targets = this.isMulti
      ? Array(5)
          .fill(0)
          .map((_, i) => i)
      : [this.activeTab];

    targets.forEach((index) => {
      this.state[index] = { ...presetState };
      this.updateParameters(index);
    });
  }

  private getPresetState(preset: string): AudioState {
    const presets = {
      sleep: {
        carrier: 220,
        modulation: 2,
        binaural: 100,
        bilateral: 0,
        isochronic: 50,
        noise: 20,
        fm: 0,
        level: 30,
      },
      focus: {
        carrier: 220,
        modulation: 45,
        binaural: 100,
        bilateral: 0,
        isochronic: 50,
        noise: 0,
        fm: 0,
        level: 25,
      },
      // Add more presets here
    };

    return presets[preset] || this.getDefaultState();
  }
}
