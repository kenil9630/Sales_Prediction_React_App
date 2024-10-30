import React, { useState } from 'react';
import { Brain, Layers, Settings2 } from 'lucide-react';

interface ModelConfigProps {
  onNext: () => void;
}

const modelTypes = [
  { id: 'dense', name: 'Dense Neural Network', icon: Brain },
  { id: 'lstm', name: 'LSTM', icon: Layers },
  { id: 'gru', name: 'GRU', icon: Settings2 }
];

export default function ModelConfig({ onNext }: ModelConfigProps) {
  const [selectedModel, setSelectedModel] = useState('dense');
  const [epochs, setEpochs] = useState(100);
  const [batchSize, setBatchSize] = useState(32);
  const [layers, setLayers] = useState(2);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Model Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {modelTypes.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedModel(id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedModel === id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h4 className="font-medium text-center">{name}</h4>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Model Parameters</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Epochs: {epochs}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              value={epochs}
              onChange={(e) => setEpochs(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size: {batchSize}
            </label>
            <input
              type="range"
              min="8"
              max="128"
              step="8"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Layers: {layers}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={layers}
              onChange={(e) => setLayers(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Layer Configuration</h4>
          <div className="grid gap-4">
            {Array.from({ length: layers }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-500">
                  Layer {i + 1}
                </span>
                <input
                  type="number"
                  placeholder="Units"
                  className="flex-1 px-3 py-2 border rounded-md"
                  min="1"
                  defaultValue={64}
                />
                <select className="px-3 py-2 border rounded-md">
                  <option>ReLU</option>
                  <option>Sigmoid</option>
                  <option>Tanh</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Training
        </button>
      </div>
    </div>
  );
}