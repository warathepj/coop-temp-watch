
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemperatureCard from './TemperatureCard';
import TemperatureTrendChart from './TemperatureTrendChart';
import TemperatureThresholdConfig from './TemperatureThresholdConfig';

interface MonitoringSectionProps {
  title: string;
  temperatures: {
    id: string;
    name: string;
    value: number;
    timestamp: string;
    values?: { value: number; timestamp: string }[]; // for trend chart
  }[];
  thresholds: {
    low: number;
    warning: number;
    high: number;
  };
  onThresholdChange: (t: { low: number; warning: number; high: number }) => void;
}

const MonitoringSection = ({
  title,
  temperatures,
  thresholds,
  onThresholdChange
}: MonitoringSectionProps) => {
  // For trend chart: pass the history for each sensor, default to [latest value] if missing
  const historyData = temperatures.map(temp => ({
    id: temp.id,
    name: temp.name,
    values: temp.values ?? [{ value: temp.value, timestamp: temp.timestamp }],
  }));

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TemperatureThresholdConfig
          thresholds={thresholds}
          onChange={onThresholdChange}
          labelPrefix={title}
        />
        <TemperatureTrendChart data={historyData} />
        <div className="grid gap-4 grid-cols-1">
          {temperatures.map((temp) => (
            <TemperatureCard
              key={temp.id}
              title={temp.name}
              temperature={temp.value}
              timestamp={temp.timestamp}
              thresholds={thresholds}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringSection;
