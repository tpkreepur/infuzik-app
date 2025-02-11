import * as Tone from 'tone';

/**
 * Represents all adjustable parameters in a preset or custom setting.
 */
export interface AudioState {
  /**
   * Base oscillator frequency (in Hz) around which binaural beats occur.
   */
  carrier: number;

  /**
   * Range of frequency deviation (in Hz) used for modulation or binaural beats.
   */
  modulation: number;

  /**
   * Strength of the binaural effect (0 to 100%). Determines how far frequencies
   * deviate from the carrier frequency between left and right channels.
   */
  binaural: number;

  /**
   * Placeholder parameter for potential bilateral mixing (not fully implemented in this code).
   */
  bilateral: number;

  /**
   * Placeholder parameter for an isochronic effect (not fully implemented in this code).
   */
  isochronic: number;

  /**
   * Amount of white noise (0 to 100%).
   */
  noise: number;

  /**
   * Placeholder parameter for frequency modulation depth (not fully implemented in this code).
   */
  fm: number;

  /**
   * (Deprecated in this version) Track-level volume. Unused if you prefer a single master volume.
   */
  level: number;
}

/**
 * Holds references to all Tone.js nodes needed for a single track.
 */
export interface ToneNodes {
  /** Left-channel oscillator for binaural or standard tone. */
  oscLeft: Tone.Oscillator;
  /** Right-channel oscillator for binaural or standard tone. */
  oscRight: Tone.Oscillator;
  /** Left-channel noise generator. */
  noiseLeft: Tone.Noise;
  /** Right-channel noise generator. */
  noiseRight: Tone.Noise;
  /** An LFO for amplitude or other modulations. */
  lfo: Tone.LFO;
  /** A slower LFO, potentially used for panning or subtler modulations. */
  lfoHalf: Tone.LFO;
  /** Merges left/right channels or multiple sources into a stereo signal. */
  merger: Tone.Merge;
  /** Panner for stereo positioning. */
  panner: Tone.Panner;
  /** Simple bandpass filter for noise or oscillators. */
  filter: Tone.Filter;
}

/**
 * The main audio engine managing multiple tracks (up to 5 in this example).
 * Users primarily interact via presets and simple media controls (play, pause, stop).
 */
export class AudioEngine {
  /** Up to 5 tracks, each with its own Tone.js nodes. */
  private nodes: ToneNodes[];

  /** Each track's state/preset values. */
  private state: AudioState[];

  /**
   * The index of the current "active tab" or track.
   * Used if you only want to modify one track at a time.
   */
  private activeTab: number = 0;

  /**
   * Whether to apply certain actions (like `setPreset`) to all tracks simultaneously.
   */
  private isMulti: boolean = false;

  /**
   * A single global master gain node to control the overall volume.
   * This is the "volume slider" that the user would typically adjust.
   */
  private globalMasterGain: Tone.Gain;

  /**
   * Internal flag to track if we are in the process of setting volume
   * so we don't accidentally override other volume logic.
   */
  private _volumeBeingSet: boolean = false;

  /**
   * Tracks whether the engine is playing. This helps manage play/pause logic.
   */
  private _isPlaying: boolean = false;

  /**
   * Creates an audio engine with 5 separate tracks and initializes their states.
   * Each track has its own set of Tone.js nodes (oscillators, noise, LFO, filter).
   */
  constructor() {
    // Create our global master gain node for overall volume control
    this.globalMasterGain = new Tone.Gain(0.5); // start at 50% volume
    this.globalMasterGain.toDestination();

    // Create 5 sets of nodes and states
    this.nodes = Array(5)
      .fill(null)
      .map(() => this.createNodes());
    this.state = Array(5).fill(this.getDefaultState());
  }

  /**
   * Creates a set of Tone.js nodes for a single track.
   */
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
    };
  }

  /**
   * Default state for any track (used if a preset does not match or is unknown).
   */
  private getDefaultState(): AudioState {
    return {
      carrier: 220,
      modulation: 15,
      binaural: 100,
      bilateral: 0,
      isochronic: 50,
      noise: 0,
      fm: 0,
      level: 50, // unused in this approach, since we have a global master volume
    };
  }

  /**
   * Initializes the engine by asking Tone.js to start the AudioContext.
   * Sets up routing for each track. Call this at least once before `play()`.
   */
  public async initialize() {
    await Tone.start();
    this.nodes.forEach((node, index) => this.setupRouting(node, index));
  }

  /**
   * Routes each track's nodes into the global master gain. Also updates parameters
   * so the track is ready to go once it is played.
   *
   * @param node The set of Tone.js nodes for this track.
   * @param index Index of the track in the `nodes` array.
   */
  private setupRouting(node: ToneNodes, index: number) {
    // Oscillators -> stereo merger
    node.oscLeft.connect(node.merger, 0, 0);
    node.oscRight.connect(node.merger, 0, 1);

    // Noise -> bandpass filter -> stereo merger
    node.noiseLeft.connect(node.filter);
    node.noiseRight.connect(node.filter);
    node.filter.connect(node.merger);

    // LFO -> panning or gain (if needed)
    // In this example, we feed the LFO to the panner,
    // and we could also feed it to other parameters if desired.
    node.lfoHalf.connect(node.panner.pan);

    // Merge tracks into global master output
    node.merger.connect(node.panner);
    node.panner.connect(this.globalMasterGain);

    // Set initial parameters for this track
    this.updateParameters(index);
  }

  /**
   * Updates all parameter values (frequency, noise, filter, etc.) for a given track.
   * Typically called internally by `setPreset` or directly if you want fine control.
   *
   * @param index Which track to update.
   */
  public updateParameters(index: number) {
    const node = this.nodes[index];
    const state = this.state[index];

    // Compute left/right frequencies for binaural beats
    const leftFreq =
      state.carrier + (state.modulation / 2) * (state.binaural / 100);
    const rightFreq =
      state.carrier - (state.modulation / 2) * (state.binaural / 100);

    node.oscLeft.frequency.value = leftFreq;
    node.oscRight.frequency.value = rightFreq;

    // LFO rates
    node.lfo.frequency.value = state.modulation;
    node.lfoHalf.frequency.value = state.modulation / 2;

    // Filter frequency
    node.filter.frequency.value = state.carrier;

    // Noise level
    node.noiseLeft.volume.value = Tone.gainToDb(state.noise / 100);
    node.noiseRight.volume.value = Tone.gainToDb(state.noise / 100);
  }

  /**
   * Plays the audio engine. If the oscillators are not started yet, it starts them.
   * If they are merely paused, it unmutes the global gain to resume audio.
   */
  public play() {
    // If we haven't started the nodes yet, do so:
    if (!this._isPlaying) {
      this.nodes.forEach((node) => {
        node.oscLeft.start();
        node.oscRight.start();
        node.noiseLeft.start();
        node.noiseRight.start();
        node.lfo.start();
        node.lfoHalf.start();
      });
      this._isPlaying = true;
    }

    // Unmute the global output (if paused)
    this.globalMasterGain.mute = false;
  }

  /**
   * Pauses the audio engine without stopping oscillators.
   * Internally, it mutes the global master gain so that
   * audio can be resumed with the same phase/position.
   */
  public pause() {
    if (this._isPlaying) {
      // Mute the master gain, effectively pausing audio output
      this.globalMasterGain.mute = true;
    }
  }

  /**
   * Fully stops the audio engine by stopping all oscillators and noise sources.
   * This resets their phase. Subsequent calls to `play()` will restart them anew.
   */
  public stop() {
    if (this._isPlaying) {
      this.nodes.forEach((node) => {
        node.oscLeft.stop();
        node.oscRight.stop();
        node.noiseLeft.stop();
        node.noiseRight.stop();
        node.lfo.stop();
        node.lfoHalf.stop();
      });
      this._isPlaying = false;
      // Also unmute, so if `play()` is called again, we'll hear audio
      this.globalMasterGain.mute = false;
    }
  }

  /**
   * Sets all parameters for either the current active track or all tracks (if in multi mode)
   * to the values defined in a named preset.
   *
   * @param preset The name of the preset to apply. Must be one of: 'sleep', 'focus', 'meditation', 'creativity'.
   */
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

  /**
   * Returns an `AudioState` corresponding to a named preset.
   * If the preset name is unrecognized, returns the default state.
   */
  private getPresetState(preset: string): AudioState {
    const presets: Record<string, AudioState> = {
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
      meditation: {
        carrier: 136.1,
        modulation: 4,
        binaural: 100,
        bilateral: 0,
        isochronic: 40,
        noise: 10,
        fm: 0,
        level: 20,
      },
      creativity: {
        carrier: 440,
        modulation: 8,
        binaural: 100,
        bilateral: 0,
        isochronic: 60,
        noise: 5,
        fm: 0,
        level: 25,
      },
      hyperfocus: {
        carrier: 220,
        modulation: 76,
        binaural: 43,
        bilateral: 63,
        isochronic: 67,
        noise: 0,
        fm: 0,
        level: 15,
      },
    };

    return presets[preset] || this.getDefaultState();
  }

  /**
   * Sets the global master volume for the entire engine.
   * Use values between 0 and 100 for a typical volume slider.
   *
   * @param volume A percentage-based volume control (0 - 100).
   */
  public setVolume(volume: number) {
    this._volumeBeingSet = true;
    // Convert from 0-100 range to 0.0-1.0 for the Gain node
    const normalizedVolume = Math.min(Math.max(volume / 100, 0), 1);

    // Use exponential ramping for smoother volume transitions
    this.globalMasterGain.gain.exponentialRampToValueAtTime(
      normalizedVolume,
      Tone.now() + 0.1
    );

    this._volumeBeingSet = false;
  }

  /**
   * Gets the current global master volume (0 - 100).
   */
  public getVolume(): number {
    // Convert from 0.0-1.0 back to 0-100
    return this.globalMasterGain.gain.value * 100;
  }

  /**
   * Optionally enable or disable multi-mode. When true, actions like `setPreset`
   * apply to all tracks at once. When false, only the `activeTab` track is updated.
   */
  public setMultiMode(isMulti: boolean) {
    this.isMulti = isMulti;
  }

  /**
   * Sets which track (0-4) is currently 'active' for single-track updates.
   */
  public setActiveTab(tabIndex: number) {
    if (tabIndex < 0 || tabIndex > 4) {
      throw new Error('Tab index out of range. Must be between 0 and 4.');
    }
    this.activeTab = tabIndex;
  }
}
