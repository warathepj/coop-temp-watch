
import React from 'react';

interface Temperature {
  id: string;
  name: string;
  value: number;
  timestamp: string;
}

interface ThresholdRange {
  min: number;
  max: number;
}

interface MonitoringSectionProps {
  title: string;
  temperatures: Temperature[];
  thresholds: ThresholdRange;
  onThresholdChange: (thresholds: ThresholdRange) => void;
}

const MonitoringSection: React.FC<MonitoringSectionProps> = ({
  title,
  temperatures,
  thresholds,
  onThresholdChange
}) => {
  // Function to check if temperature is out of range
  const isOutOfRange = (value: number): boolean => {
    return value < thresholds.min || value > thresholds.max;
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {/* Threshold controls */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Min (°C)</label>
          <input
            type="number"
            value={thresholds.min}
            onChange={(e) => onThresholdChange({ ...thresholds, min: Number(e.target.value) })}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Max (°C)</label>
          <input
            type="number"
            value={thresholds.max}
            onChange={(e) => onThresholdChange({ ...thresholds, max: Number(e.target.value) })}
            className="w-full p-1 border rounded"
          />
        </div>
      </div>
      
      {/* Temperature readings */}
      <div className="space-y-2">
        {temperatures.length === 0 ? (
          <p className="text-muted-foreground">No data available</p>
        ) : (
          temperatures.map((temp) => (
            <div key={temp.id} className="flex justify-between items-center border-b pb-2">
              <span>{temp.name}</span>
              <span 
                className={isOutOfRange(temp.value) ? "text-red-600 font-bold" : ""}
              >
                {temp.value.toFixed(1)}°C
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MonitoringSection;
