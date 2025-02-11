
// params
const TABS = 5;
let G: number; // current gen
let MULTI = 0;
const CARRIER = [220, 30, 150, 432, 9000]; //Hz
const FCARMIN = 27.5;
const FMODMIN = 0.1;
const OCTCAR = 9;
const OCTMOD = 10;
const MOD = [15, 0.5, 1.95, 3, 0.2]; //Hz
const ISOCHRONIC = [50, 100, 0, 0, 100]; //%
const BINAURAL = [100, 100, 100, 0, 100]; //%
const BILATERAL = [0, 0, 0, 100, 100]; //%
const FM = [0, 100, 0, 0, 100]; //%
const LEVEL = [50, 0, 0, 0, 0]; //%
const NOISE = [0, 0, 0, 0, 0];
let bWEBAUDIO = 0;
// let bSUSPENDED = 0;
let bMute = 0;
let msgTimer: NodeJS.Timeout;
let settingName: string;

// WEBAUDIO ELEMENTS
let context: AudioContext;
const oscL: OscillatorNode[] = [];
const oscR: OscillatorNode[] = [];
const noiseL: AudioBufferSourceNode[] = [];
const noiseR: AudioBufferSourceNode[] = [];
const lfo: OscillatorNode[] = [];
const lfoHalf: OscillatorNode[] = [];
const gainL: GainNode[] = [];
const gainR: GainNode[] = [];
const merger: ChannelMergerNode[] = [];
const gainI: GainNode[] = [];
const bilatGain: GainNode[] = [];
const noiseGainL: GainNode[] = [];
const noiseGainR: GainNode[] = [];
const noiseGainRL: GainNode[] = [];
const noiseGainRR: GainNode[] = [];
const filterL: BiquadFilterNode[] = [];
const filterR: BiquadFilterNode[] = [];
const oscGainL: GainNode[] = [];
const oscGainR: GainNode[] = [];
const bilatInvertedGain: GainNode[] = [];
const lfoGain: GainNode[] = [];
const fmGain: GainNode[] = [];
const filterGain: GainNode[] = [];
const gainGlobal: GainNode[] = [];

function webAudioContextCheck(): void {
  if (context.state === 'suspended') {
    bSUSPENDED = 1;
    document.getElementById('myWarning')!.onclick = resumeContext;
    openWarning();
  }
}

function resumeContext(): void {
  context.resume();
  document.getElementById('myWarning')!.removeAttribute('onclick');
  bSUSPENDED = 0;
  closeWarning();
}

function init(): void {
  // Startup checks

  // Supports WebAudio?
  if (typeof webkitAudioContext !== 'undefined') bWEBAUDIO = 1;
  if (typeof AudioContext !== 'undefined') bWEBAUDIO = 1;

  if (bWEBAUDIO) {
    if (typeof AudioContext !== 'undefined') context = new AudioContext();
    else context = new webkitAudioContext();

    for (let t = 0; t < TABS; t++) {
      // creating oscillators
      oscL[t] = context.createOscillator();
      oscL[t].type = 'sine';
      oscL[t].frequency.value = CARRIER[t] + (MOD[t] / 2) * (BINAURAL[t] / 100); // value in hertz

      oscR[t] = context.createOscillator();
      oscR[t].type = 'sine';
      oscR[t].frequency.value = CARRIER[t] - (MOD[t] / 2) * (BINAURAL[t] / 100); // value in hertz

      lfo[t] = context.createOscillator();
      lfo[t].type = 'sine';
      lfo[t].frequency.value = MOD[t]; // value in hertz
      lfoHalf[t] = context.createOscillator();
      lfoHalf[t].type = 'sine';
      lfoHalf[t].frequency.value = MOD[t] / 2; // value in hertz

      // noises
      const bufferSize = 6 * context.sampleRate;
      const noiseBuffer = context.createBuffer(
        1,
        bufferSize,
        context.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = 3 * (Math.random() * 2 - 1);
      }

      noiseL[t] = context.createBufferSource();
      noiseL[t].buffer = noiseBuffer;
      noiseL[t].loop = true;
      noiseR[t] = context.createBufferSource();
      noiseR[t].buffer = noiseBuffer;
      noiseR[t].loop = true;

      // filters for the noise
      filterR[t] = context.createBiquadFilter();
      filterL[t] = context.createBiquadFilter();
      filterR[t].type = 'bandpass';
      filterR[t].frequency.value = CARRIER[t];
      filterR[t].Q.value = 2;
      filterL[t].type = 'bandpass';
      filterL[t].frequency.value = CARRIER[t];
      filterL[t].Q.value = 2;

      // tone+noise
      noiseGainL[t] = context.createGain();
      noiseGainR[t] = context.createGain();
      noiseGainRL[t] = context.createGain();
      noiseGainRR[t] = context.createGain();
      oscGainL[t] = context.createGain();
      oscGainR[t] = context.createGain();
      noiseGainL[t].gain.value = 0;
      noiseGainR[t].gain.value = 0;
      oscGainL[t].gain.value = 1;
      oscGainR[t].gain.value = 1;
      noiseGainRL[t].gain.value = 0;
      noiseGainRR[t].gain.value = 1;
      noiseL[t].connect(noiseGainL[t]);
      noiseL[t].connect(noiseGainRL[t]);
      noiseR[t].connect(noiseGainRR[t]);
      noiseGainRR[t].connect(noiseGainR[t]);
      noiseGainRL[t].connect(noiseGainR[t]);
      noiseGainL[t].connect(filterL[t]);
      noiseGainR[t].connect(filterR[t]);
      oscL[t].connect(oscGainL[t]);
      oscR[t].connect(oscGainR[t]);

      // creating gain nodes and connecting them to the oscs
      bilatGain[t] = context.createGain();
      bilatGain[t].gain.value = (BILATERAL[t] / 100) * 0.25;
      bilatInvertedGain[t] = context.createGain();
      bilatInvertedGain[t].gain.value = -1;
      bilatGain[t].connect(bilatInvertedGain[t]);
      lfoHalf[t].connect(bilatGain[t]);

      lfoGain[t] = context.createGain(); // lfo[t] varies between -1 and 1
      lfo[t].connect(lfoGain[t]); // we will couple lfo[t] with lfoGain[t] to change the output range

      fmGain[t] = context.createGain();
      fmGain[t].gain.value = (FM[t] / 100) * CARRIER[t];
      filterGain[t] = context.createGain();
      filterGain[t].gain.value = (FM[t] / 150) * CARRIER[t];
      lfo[t].connect(fmGain[t]);
      lfo[t].connect(filterGain[t]);
      fmGain[t].connect(oscL[t].frequency);
      fmGain[t].connect(oscR[t].frequency);
      filterGain[t].connect(filterL[t].frequency);
      filterGain[t].connect(filterR[t].frequency);

      gainL[t] = context.createGain();
      gainR[t] = context.createGain();
      gainI[t] = context.createGain();
      gainL[t].gain.value = 0.25;
      gainR[t].gain.value = 0.25;
      bilatInvertedGain[t].connect(gainL[t].gain);
      bilatGain[t].connect(gainR[t].gain);

      gainI[t].gain.value = 0.5;
      lfoGain[t].connect(gainI[t].gain);
      lfoGain[t].gain.value = (ISOCHRONIC[t] / 100) * gainI[t].gain.value;

      oscGainL[t].connect(gainL[t]);
      oscGainR[t].connect(gainR[t]);
      filterL[t].connect(gainL[t]);
      filterR[t].connect(gainR[t]);

      merger[t] = context.createChannelMerger(2);
      merger[t].connect(gainI[t]);

      gainL[t].connect(merger[t], 0, 0);
      gainR[t].connect(merger[t], 0, 1);

      gainGlobal[t] = context.createGain();
      gainGlobal[t].gain.value = LEVEL[t] / 100;
      gainI[t].connect(gainGlobal[t]);
      gainGlobal[t].connect(context.destination);

      // everything is ready and connected, start!
      lfo[t].start();
      lfoHalf[t].start();
      oscL[t].start();
      oscR[t].start();
      noiseR[t].start(0, 3);
      noiseL[t].start();
    }
  } else {
    alert(
      'Web Audio API is missing. To enjoy Brainaural, please use a recent version of Chrome, Edge, Safari or Firefox (basically everything but Internet Explorer).'
    );
  }

  buildUI();
  setG(0);

  // Suspended Policy by Mobile Browsers and Chrome!
  setTimeout(function () {
    webAudioContextCheck();
  }, 500); // race condition, set in a timer

  setLevel(LEVEL[G], G);
}

function buildUI(): void {
  $(() => {
    $('#carrier').slider({
      animate: 'fast',
      min: 0,
      max: OCTCAR,
      step: 0.01,
      slide: function (e, ui) {
        setCarrier(Math.pow(2, ui.value) * FCARMIN);
      },
    });
  });

  $(() => {
    $('#noise').slider({
      animate: 'fast',
      min: 0,
      max: 100,
      step: 1,
      slide: function (e, ui) {
        setNoise(ui.value);
      },
    });
  });

  $(() => {
    $('#mod').slider({
      animate: 'fast',
      min: 0,
      max: OCTMOD,
      step: 0.01,
      slide: function (e, ui) {
        setMod(Math.pow(2, ui.value) * FMODMIN);
      },
    });
  });

  $(() => {
    $('#binaural').slider({
      animate: 'fast',
      min: 0,
      max: 100,
      step: 1,
      slide: function (e, ui) {
        setBinaural(ui.value);
      },
    });
  });

  $(() => {
    $('#bilateral').slider({
      animate: 'fast',
      min: 0,
      max: 100,
      step: 1,
      slide: function (e, ui) {
        setBilateral(ui.value);
      },
    });
  });

  $(() => {
    $('#isochronic').slider({
      animate: 'fast',
      min: 0,
      max: 100,
      step: 1,
      slide: function (e, ui) {
        setIsochronic(ui.value);
      },
    });
  });

  $(() => {
    $('#fm').slider({
      animate: 'fast',
      min: 0,
      max: 100,
      step: 1,
      slide: function (e, ui) {
        setFm(ui.value);
      },
    });
  });

  $(() => {
    $('#level').slider({
      animate: 'fast',
      min: 0,
      max: 100,
      step: 1,
      slide: function (e, ui) {
        setLevel(ui.value);
      },
    });
  });
}

function setCarrier(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleCarrier(val, t, bNoMsg);
  else setSingleCarrier(val, g, bNoMsg);
}

function setMod(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleMod(val, t, bNoMsg);
  else setSingleMod(val, g, bNoMsg);
}

function setBinaural(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleBinaural(val, t, bNoMsg);
  else setSingleBinaural(val, g, bNoMsg);
}

function setBilateral(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleBilateral(val, t, bNoMsg);
  else setSingleBilateral(val, g, bNoMsg);
}

function setIsochronic(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleIsochronic(val, t, bNoMsg);
  else setSingleIsochronic(val, g, bNoMsg);
}

function setFm(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleFm(val, t, bNoMsg);
  else setSingleFm(val, g, bNoMsg);
}

function setNoise(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleNoise(val, t, bNoMsg);
  else setSingleNoise(val, g, bNoMsg);
}

function setLevel(val: number, g?: number, bNoMsg?: boolean): void {
  if (g === undefined) g = G;
  if (MULTI) for (let t = 0; t < TABS; t++) setSingleLevel(val, t, bNoMsg);
  else setSingleLevel(val, g, bNoMsg);
}

function setSingleCarrier(val: number, t: number, bNoMsg?: boolean): void {
  CARRIER[t] = val;
  oscL[t].frequency.value = CARRIER[t] - (MOD[t] / 2) * (BINAURAL[t] / 100);
  oscR[t].frequency.value = CARRIER[t] + (MOD[t] / 2) * (BINAURAL[t] / 100);
  filterL[t].frequency.value = CARRIER[t];
  filterR[t].frequency.value = CARRIER[t];

  fmGain[t].gain.value = (FM[t] / 100) * CARRIER[t];
  filterGain[t].gain.value = (FM[t] / 150) * CARRIER[t];
  const fmax = Math.pow(2, OCTCAR) * FCARMIN;
  gainI[t].gain.value =
    0.5 * (1 - 0.5 * (CARRIER[t] / fmax)) * (1 - 0.6 * (CARRIER[t] / fmax));
  $('#carval').val(parseInt(val.toString()) + 'Hz');
  if (!bNoMsg) {
    if (val > 1000) msg('A high as you can hear!');
    else msg('Make it low, but still audible');
  }
}

function setSingleMod(val: number, t: number, bNoMsg?: boolean): void {
  const cT = context.currentTime;
  MOD[t] = val;
  oscL[t].frequency.value = CARRIER[t] + (val / 2) * (BINAURAL[t] / 100);
  oscR[t].frequency.value = CARRIER[t] - (val / 2) * (BINAURAL[t] / 100);
  lfo[t].frequency.setTargetAtTime(val, cT, 0.001); // Safari bug, next line didn't work
  //lfo[t].frequency.value=val;
  lfoHalf[t].frequency.setTargetAtTime(val / 2, cT, 0.001); // Safari bug, next line didn't work
  //lfoHalf[t].frequency.value=val/2;
  $('#modval').val(parseInt((val * 100).toString()) / 100 + 'Hz'); //This is where the 100 max slide right is set
  let text: string;
  if (val < 0.5) text = 'Ultra-Low Delta';
  if (val > 0.5) text = 'Delta';
  if (val > 4) text = 'Theta';
  if (val > 8) text = 'Alpha';
  if (val > 12) text = 'Beta';
  if (val > 30) text = 'Gamma';
  if (val > 60) text = 'High Gamma';
  if (!bNoMsg) msg(text);
}

function setSingleBinaural(val: number, t: number, bNoMsg?: boolean): void {
  BINAURAL[t] = val;
  oscL[t].frequency.value = CARRIER[t] + (MOD[t] / 2) * (BINAURAL[t] / 100);
  oscR[t].frequency.value = CARRIER[t] - (MOD[t] / 2) * (BINAURAL[t] / 100);
  noiseGainRR[t].gain.value = val / 100;
  noiseGainRL[t].gain.value = 1 - val / 100;
  $('#binval').val(parseInt(val.toString()) + '%');
  if (!bNoMsg) msg('Best for Headphones');
}

function setSingleBilateral(val: number, t: number, bNoMsg?: boolean): void {
  BILATERAL[t] = val;
  bilatGain[t].gain.value = (BILATERAL[t] / 100) * 0.25;
  $('#bilval').val(parseInt(val + '') + '%');
  if (!bNoMsg) msg('For Stereo Speakers and Headphones');
}

function setSingleIsochronic(val: number, t: number, bNoMsg?: boolean): void {
  ISOCHRONIC[t] = val;
  lfoGain[t].gain.value = (ISOCHRONIC[t] / 100) * gainI[t].gain.value;
  $('#isoval').val(parseInt(val + '') + '%');
  if (!bNoMsg) msg('Best for Single Speaker use');
}

function setSingleFm(val: number, t: number, bNoMsg?: boolean): void {
  FM[t] = val;
  fmGain[t].gain.value = (FM[t] / 100) * CARRIER[t];
  filterGain[t].gain.value = (FM[t] / 150) * CARRIER[t];
  $('#fmval').val(parseInt(val + '') + '%');
  if (!bNoMsg) msg('Works with everything!');
}

function setSingleNoise(val: number, t: number, bNoMsg?: boolean): void {
  NOISE[t] = val;
  noiseGainL[t].gain.value = val / 100;
  noiseGainR[t].gain.value = val / 100;
  oscGainL[t].gain.value = 1 - val / 100;
  oscGainR[t].gain.value = 1 - val / 100;
  $('#noiseval').val(parseInt(val + '') + '%');
  if (!bNoMsg) msg('Works with everything!');
}

function setSingleLevel(val: number, t: number, bNoMsg?: boolean): void {
  LEVEL[t] = val;
  gainGlobal[t].gain.value = (LEVEL[t] * LEVEL[t]) / 10000;
  $('#levval').val(parseInt(val + '') + '%');
  if (!bNoMsg) {
    if (LEVEL > 0.5) msg('A loud as you want, but not louder!');
    else msg('As quiet as you want, but audible');
  }
}

function setSliderMod(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#mod').slider('value', Math.log2(val / FMODMIN));
  setSingleMod(val, g, true);
}

function setSliderIso(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#isochronic').slider('value', val);
  setSingleIsochronic(val, g, true);
}

function setSliderBin(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#binaural').slider('value', val);
  setSingleBinaural(val, g, true);
}

function setSliderBil(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#bilateral').slider('value', val);
  setSingleBilateral(val, g, true);
}

function setSliderFm(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#fm').slider('value', val);
  setSingleFm(val, g, true);
}

function setSliderCar(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#carrier').slider('value', Math.log2(val / FCARMIN));
  setSingleCarrier(val, g, true);
}

function setSliderLvl(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#level').slider('value', val);
  setSingleLevel(val, g, true);
}

function setSliderNoise(val: number, g?: number): void {
  if (typeof g === 'undefined') g = G;
  val = parseFloat(val.toString());
  $('#noise').slider('value', val);
  setSingleNoise(val, g, true);
}

function setSliders(
  mod: number,
  car: number,
  noi: number,
  iso: number,
  bin: number,
  bil: number,
  fm: number,
  lvl: number,
  g?: number
): void {
  if (typeof g === 'undefined') g = G;
  setSliderMod(mod, g);
  setSliderCar(car, g);
  setSliderNoise(noi, g);
  setSliderIso(iso, g);
  setSliderBin(bin, g);
  setSliderBil(bil, g);
  setSliderFm(fm, g);
  setSliderLvl(lvl, g);
}

function refreshSliders(g: number): void {
  if (MULTI) {
    // no need to do anything actually
  } else {
    $('#mod').slider('value', Math.log2(MOD[g] / FMODMIN));
    $('#modval').val(parseInt(MOD[g] * 100 + '') / 100 + 'Hz');
    $('#carrier').slider('value', Math.log2(CARRIER[g] / FCARMIN));
    $('#carval').val(parseInt(CARRIER[g] * 100 + '') / 100 + 'Hz');
    $('#noise').slider('value', NOISE[g]);
    $('#noiseval').val(parseInt(NOISE[g] + '') + '%');
    $('#isochronic').slider('value', ISOCHRONIC[g]);
    $('#isoval').val(parseInt(ISOCHRONIC[g] + '') + '%');
    $('#binaural').slider('value', BINAURAL[g]);
    $('#binval').val(parseInt(BINAURAL[g] + '') + '%');
    $('#bilateral').slider('value', BILATERAL[g]);
    $('#bilval').val(parseInt(BILATERAL[g] + '') + '%');
    $('#fm').slider('value', FM[g]);
    $('#fmval').val(parseInt(FM[g] + '') + '%');
    $('#level').slider('value', LEVEL[g]);
    $('#levval').val(parseInt(LEVEL[g] + '') + '%');
  }
}

function msg(txt: string): void {
  $('#msg').html(txt);
  clearTimeout(msgTimer);
  msgTimer = setTimeout(function () {
    msg(
      "<b class='mod'>In the Top Left Nav Bar, click on Learn</b> for more instructions..."
    );
  }, 5000);
}

function newSet(setting: string): void {
  let mod: number,
    car: number,
    iso: number,
    bin: number,
    bil: number,
    fm: number,
    lvl: number;
  let fmin: number, fmax: number;
  mod = MOD[G];
  car = CARRIER[G];
  iso = ISOCHRONIC[G];
  bin = BINAURAL[G];
  bil = BILATERAL[G];
  fm = FM[G];
  lvl = LEVEL[G];
  let start: number, end: number;
  let noi = 1;
  if (MULTI) {
    start = 0;
    end = TABS;
  } else {
    start = G;
    end = G + 1;
  }
  for (let t = start; t < end; t++) {
    switch (setting) {
      case 'anything':
        mod = Math.pow(2, Math.random() * OCTMOD) * FMODMIN;
        car = Math.pow(2, Math.random() * Math.random() * OCTCAR) * FCARMIN;
        iso = Math.floor(Math.random() * 100);
        bin = Math.floor(Math.random() * 100);
        bil = Math.floor(Math.random() * 100);
        fm = Math.floor(Math.random() * 100);
        noi = Math.floor(Math.random() * 100);
        break;
      case 'sleep':
        fmin = 0.25;
        fmax = 2;
        mod = (fmax - fmin) * Math.random() + fmin;
        settingName = 'Sleep';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'dream':
        fmin = 2;
        fmax = 6;
        mod = (fmax - fmin) * Math.random() + fmin;
        settingName = 'Dream';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'creative':
        fmin = 6;
        fmax = 8;
        mod = (fmax - fmin) * Math.random() + fmin;
        settingName = 'Creativity';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'relax':
        fmin = 8;
        fmax = 14;
        mod = (fmax - fmin) * Math.random() + fmin;
        iso = 50;
        bin = 100;
        bil = 0;
        fm = 0;
        car = 220;
        lvl = 30;
        settingName = 'Relaxation';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'productivity':
        fmin = 14;
        fmax = 20;
        mod = 16;
        iso = 50;
        bin = 100;
        bil = 0;
        fm = 0;
        car = 220;
        lvl = 30;
        settingName = 'Productivity';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'focus':
        fmin = 20;
        fmax = 60;
        mod = 45;
        iso = 50;
        bin = 100;
        bil = 0;
        fm = 0;
        car = 220;
        lvl = 25;
        settingName = 'Focus';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'hyperfocus':
        fmin = 14;
        fmax = 20;
        mod = 76;
        iso = 67;
        bin = 43;
        bil = 63;
        fm = 37;
        car = 220;
        lvl = 15;
        settingName = 'Hyperfocus';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'gamma':
        fmin = 14;
        fmax = 20;
        mod = 102.4;
        iso = 50;
        bin = 100;
        bil = 0;
        fm = 0;
        car = 220;
        lvl = 15;
        settingName = 'Hi-Gamma';
        document.getElementById('myText').innerHTML = settingName;
        break;
      case 'hearing':
        fmin = 8000;
        fmax = 14000;
        car = (fmax - fmin) * Math.random() + fmin;
        fmin = 1;
        fmax = 30;
        mod = (fmax - fmin) * Math.random() + fmin;
        bin = 0;
        bil = Math.floor(Math.random() * 100);
        iso = Math.floor(Math.random() * 100);
        fm = 100;
        break;
    }
    setSliders(mod, car, noi, iso, bin, bil, fm, lvl, t);
  }
}

function setG(mode: string | number): void {
  if (mode === 'm') {
    for (let t = 0; t < TABS; t++) {
      $('#g' + t).addClass('active');
    }
    MULTI = true;
    G = 0;
  } else {
    for (let t = 0; t < TABS; t++) {
      $('#g' + t).removeClass('active');
    }
    $('#g' + mode).addClass('active');
    G = mode as number;
    MULTI = false;
  }
  refreshSliders(G);
}

function muteOutput(): void {
  bMute = !bMute;
  if (bMute) {
    $('#mute').addClass('superactive');
    for (let t = 0; t < TABS; t++) gainGlobal[t].gain.value = 0;
  } else {
    $('#mute').removeClass('superactive');
    for (let t = 0; t < TABS; t++)
      gainGlobal[t].gain.value = (LEVEL[t] * LEVEL[t]) / 10000;
  }
}
