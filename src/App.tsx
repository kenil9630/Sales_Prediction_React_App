import React, { useState } from 'react';
import { Upload, ChevronRight, BarChart3, Brain, LineChart } from 'lucide-react';
import DataUpload from './components/DataUpload';
import ModelConfig from './components/ModelConfig';
import Training from './components/Training';
import Results from './components/Results';

type Stage = 'upload' | 'config' | 'training' | 'results';

function App() {
  const [stage, setStage] = useState<Stage>('upload');
  const [data, setData] = useState<any>(null);

  const stages = [
    { id: 'upload', icon: Upload, title: 'Upload Data' },
    { id: 'config', icon: Brain, title: 'Configure Model' },
    { id: 'training', icon: BarChart3, title: 'Train Model' },
    { id: 'results', icon: LineChart, title: 'View Results' }
  ];

  const renderStage = () => {
    switch (stage) {
      case 'upload':
        return <DataUpload onNext={() => setStage('config')} onDataUpload={setData} />;
      case 'config':
        return <ModelConfig onNext={() => setStage('training')} />;
      case 'training':
        return <Training onNext={() => setStage('results')} />;
      case 'results':
        return <Results data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
            Sales Prediction AI
          </h1>
          <p className="text-gray-600 text-center">
            Powerful predictions with advanced machine learning
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {stages.map((s, index) => (
              <React.Fragment key={s.id}>
                <div
                  className={`flex items-center space-x-2 ${
                    stage === s.id
                      ? 'text-blue-600'
                      : stages.indexOf({ id: stage } as any) > index
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stage === s.id
                        ? 'bg-blue-100'
                        : stages.indexOf({ id: stage } as any) > index
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`hidden sm:block font-medium ${
                      stage === s.id
                        ? 'text-blue-600'
                        : stages.indexOf({ id: stage } as any) > index
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < stages.length - 1 && (
                  <ChevronRight
                    className={`w-5 h-5 ${
                      stages.indexOf({ id: stage } as any) > index
                        ? 'text-green-600'
                        : 'text-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 min-h-[500px]">
          {renderStage()}
        </div>
      </div>
    </div>
  );
}

export default App;