
import React from 'react';
import { Input } from "@/components/ui/input";

interface Thresholds {
  low: number;
  warning: number;
  high: number;
}

interface Props {
  thresholds: Thresholds;
  onChange: (t: Thresholds) => void;
  labelPrefix: string;
}

const TemperatureThresholdConfig: React.FC<Props> = ({ thresholds, onChange, labelPrefix }) => {
  return (
    <div className="flex flex-row gap-4 mb-2 items-end">
      <div>
        <label className="block text-xs font-medium mb-0.5">{labelPrefix} Low (Blue)</label>
        <Input
          type="number"
          min={-50}
          max={thresholds.warning - 1}
          value={thresholds.low}
          onChange={e => onChange({ ...thresholds, low: Number(e.target.value) })}
          className="w-16"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-0.5">{labelPrefix} Warn (Orange)</label>
        <Input
          type="number"
          min={thresholds.low + 1}
          max={thresholds.high - 1}
          value={thresholds.warning}
          onChange={e => onChange({ ...thresholds, warning: Number(e.target.value) })}
          className="w-16"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-0.5">{labelPrefix} High (Red)</label>
        <Input
          type="number"
          min={thresholds.warning + 1}
          max={100}
          value={thresholds.high}
          onChange={e => onChange({ ...thresholds, high: Number(e.target.value) })}
          className="w-16"
        />
      </div>
    </div>
  );
};

export default TemperatureThresholdConfig;
