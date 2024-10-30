import React, { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

interface DataUploadProps {
  onNext: () => void;
  onDataUpload: (data: any) => void;
}

const sampleData = {
  retail: [
    { date: '2024-01', sales: 12500, customers: 450 },
    { date: '2024-02', sales: 13200, customers: 480 },
    { date: '2024-03', sales: 14800, customers: 520 }
  ],
  ecommerce: [
    { date: '2024-01', sales: 28500, visitors: 12000 },
    { date: '2024-02', sales: 31200, visitors: 13500 },
    { date: '2024-03', sales: 35800, visitors: 15000 }
  ],
  monthly: [
    { date: '2024-01', sales: 45000 },
    { date: '2024-02', sales: 48000 },
    { date: '2024-03', sales: 52000 }
  ]
};

export default function DataUpload({ onNext, onDataUpload }: DataUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In a real app, we would process the file here
    setError('File upload is disabled in this demo. Please use sample data.');
  };

  const loadSampleData = (type: keyof typeof sampleData) => {
    setData(sampleData[type]);
    onDataUpload(sampleData[type]);
  };

  return (
    <div className="space-y-8">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Drop your CSV file here</h3>
        <p className="text-gray-500 mb-4">or click to browse</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Select File
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Or try with sample data:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.keys(sampleData).map((type) => (
            <button
              key={type}
              onClick={() => loadSampleData(type as keyof typeof sampleData)}
              className="flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              <span className="capitalize">{type} Sales</span>
            </button>
          ))}
        </div>
      </div>

      {data && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Preview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(data[0]).map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row: any, i: number) => (
                  <tr key={i}>
                    {Object.values(row).map((value: any, j: number) => (
                      <td
                        key={j}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Model Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}