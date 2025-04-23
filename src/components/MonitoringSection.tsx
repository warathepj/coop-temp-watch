
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemperatureCard from './TemperatureCard';
import TemperatureTrendChart from './TemperatureTrendChart';
import TemperatureThresholdConfig from './TemperatureThresholdConfig';
import TemperatureExportButton from './TemperatureExportButton';
import TemperatureAlertHistory from './TemperatureAlertHistory';

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

type AlertType = "low" | "high" | "warning";
interface AlertEvent {
  sensorName: string;
  value: number;
  timestamp: string;
  alertType: AlertType;
}

// Helper to check if value crosses thresholds
function getAlertType(value: number, thresholds: { low: number; warning: number; high: number }): AlertType | null {
  if (value >= thresholds.high) return "high";
  if (value >= thresholds.warning) return "warning";
  if (value <= thresholds.low) return "low";
  return null;
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

  // Alert History State (recent alerts: newest first; only alert events)
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  // For deduplication and only logging new threshold events as they happen on render
  const lastAlertMap = useRef<{ [sensorId: string]: AlertType | null }>({});

  useEffect(() => {
    temperatures.forEach((temp) => {
      const alertType = getAlertType(temp.value, thresholds);
      const prevAlert = lastAlertMap.current[temp.id];

      if (alertType && (!prevAlert || prevAlert !== alertType)) {
        setAlerts((prev) => [
          {
            sensorName: temp.name,
            value: temp.value,
            timestamp: temp.timestamp,
            alertType,
          },
          ...prev.slice(0,19), // keep max 20 alerts
        ]);
      }
      lastAlertMap.current[temp.id] = alertType;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatures, thresholds]);

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-col gap-2 items-start md:items-stretch">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-wrap gap-2 items-center">
          <TemperatureExportButton section={title} sensors={temperatures} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <TemperatureThresholdConfig
          thresholds={thresholds}
          onChange={onThresholdChange}
          labelPrefix={title}
        />
        <TemperatureTrendChart data={historyData} />
        <TemperatureAlertHistory alerts={alerts} />
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
