// components/AudioEngine.tsx
"use client";
import { useState } from "react";
import AudioTab from "./AudioTab";
import Slider from "./Slider";
import PresetGrid from "./PresetGrid";
import { AudioParams } from "@/types/AudioParams";
import { PresetType } from "@/types/AudioPresets";
import { getPresetParams } from "@/utils/presets";

const initialTabs: AudioParams[] = [
  {
    mod: 1,
    carrier: 220,
    noise: 0,
    isochronic: 50,
    binaural: 100,
    bilateral: 100,
    fm: 0,
    level: 50,
  },
  {
    mod: 0.5,
    carrier: 30,
    noise: 0,
    isochronic: 100,
    binaural: 100,
    bilateral: 0,
    fm: 100,
    level: 0,
  },
  {
    mod: 1.95,
    carrier: 150,
    noise: 0,
    isochronic: 0,
    binaural: 100,
    bilateral: 0,
    fm: 0,
    level: 0,
  },
  {
    mod: 3,
    carrier: 432,
    noise: 0,
    isochronic: 0,
    binaural: 0,
    bilateral: 100,
    fm: 0,
    level: 0,
  },
  {
    mod: 0.2,
    carrier: 9000,
    noise: 0,
    isochronic: 100,
    binaural: 100,
    bilateral: 100,
    fm: 100,
    level: 0,
  },
];

const AudioEngine: React.FC = () => {
  const [tabs, setTabs] = useState<AudioParams[]>(initialTabs);
  const [activeTab, setActiveTab] = useState(0);

  const updateParam = (
    tabIndex: number,
    key: keyof AudioParams,
    value: number
  ) => {
    setTabs((prev) => {
      const newTabs = [...prev];
      newTabs[tabIndex] = { ...newTabs[tabIndex], [key]: value };
      return newTabs;
    });
  };

  const applyPreset = (preset: PresetType) => {
    const newParams = getPresetParams(preset);
    setTabs((prev) => {
      const newTabs = [...prev];
      newTabs[activeTab] = newParams;
      return newTabs;
    });
  };

  const activeParams = tabs[activeTab];

  return (
    <div>
      <div className="mb-4 flex space-x-2">
        {tabs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 border rounded ${
              activeTab === idx
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Tab {idx + 1}
          </button>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-2">Presets</h2>
      <PresetGrid onApplyPreset={applyPreset} />
      <div className="mt-6 space-y-4">
        <Slider
          label="Carrier Frequency (Hz)"
          min={20}
          max={10000}
          step={1}
          value={activeParams.carrier}
          onChange={(value) => updateParam(activeTab, "carrier", value)}
        />
        <Slider
          label="Modulation Frequency (Hz)"
          min={0.1}
          max={60}
          step={0.1}
          value={activeParams.mod}
          onChange={(value) => updateParam(activeTab, "mod", value)}
        />
        <Slider
          label="Noise (%)"
          min={0}
          max={100}
          step={1}
          value={activeParams.noise}
          onChange={(value) => updateParam(activeTab, "noise", value)}
        />
        <Slider
          label="Isochronic (%)"
          min={0}
          max={100}
          step={1}
          value={activeParams.isochronic}
          onChange={(value) => updateParam(activeTab, "isochronic", value)}
        />
        <Slider
          label="Binaural (%)"
          min={0}
          max={100}
          step={1}
          value={activeParams.binaural}
          onChange={(value) => updateParam(activeTab, "binaural", value)}
        />
        <Slider
          label="Bilateral (%)"
          min={0}
          max={100}
          step={1}
          value={activeParams.bilateral}
          onChange={(value) => updateParam(activeTab, "bilateral", value)}
        />
        <Slider
          label="FM (%)"
          min={0}
          max={100}
          step={1}
          value={activeParams.fm}
          onChange={(value) => updateParam(activeTab, "fm", value)}
        />
        <Slider
          label="Level (%)"
          min={0}
          max={100}
          step={1}
          value={activeParams.level}
          onChange={(value) => updateParam(activeTab, "level", value)}
        />
      </div>
      {/* The AudioTab component creates and updates the Tone.js nodes */}
      <AudioTab params={activeParams} />
    </div>
  );
};

export default AudioEngine;
