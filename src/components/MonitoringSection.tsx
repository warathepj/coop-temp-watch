
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemperatureCard from './TemperatureCard';

interface MonitoringSectionProps {
  title: string;
  temperatures: {
    id: string;
    name: string;
    value: number;
    timestamp: string;
  }[];
}

const MonitoringSection = ({ title, temperatures }: MonitoringSectionProps) => {
  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-1">
        {temperatures.map((temp) => (
          <TemperatureCard
            key={temp.id}
            title={temp.name}
            temperature={temp.value}
            timestamp={temp.timestamp}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MonitoringSection;
