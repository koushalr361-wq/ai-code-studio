"use client";

import React, { useState } from "react";

interface ModelOption {
  id: string;
  name: string;
  specs: string;
}

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModel, setActiveModel] = useState<ModelOption>({
    id: "opus-47",
    name: "Claude 4.7 Opus",
    specs: "Advanced reasoning model for complex full-stack layout synthesis"
  });

  const models: ModelOption[] = [
    { id: "opus-48", name: "Claude 4.8 Opus", specs: "Anthropic flagship system node layer" },
    { id: "opus-47", name: "Claude 4.7 Opus", specs: "Advanced reasoning model for complex full-stack layout synthesis" },
    { id: "sonnet-46", name: "Claude 4.6 Sonnet", specs: "Versatile modular build agent with fast execution ticks" },
    { id: "sonnet-45", name: "Claude 4.5 Sonnet", specs: "200k optimized structural template parsing mesh" }
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-xs font-medium text-zinc-300 hover:bg-white/[0.05] transition-all"
      >
        <span className="w-2 height w-2 rounded-full bg-orange-500 animate-pulse" />
        {activeModel.name} <span className="text-zinc-500">▾</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-zinc-950 border border-white/[0.06] rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => {
                setActiveModel(model);
                setIsOpen(false);
              }}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                activeModel.id === model.id ? "bg-white/[0.04] text-white" : "text-zinc-400 hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              <div className="text-xs font-semibold">{model.name}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5 leading-normal">{model.specs}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
