
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";
import { format } from 'date-fns';

interface TemperatureCardProps {
  title: string;
  temperature: number;
  timestamp: string;
  thresholds: {
    low: number;
    high: number;
    warning: number;
  };
}

const getTemperatureColor = (
  temp: number,
  { low, warning, high }: { low: number; warning: number; high: number }
) => {
  if (temp >= high) return "text-temp-critical"; // Red
  if (temp >= warning) return "text-temp-warning"; // Orange
  if (temp <= low) return "text-blue-500"; // Blue
  return "text-temp-normal"; // Green
};

const TemperatureCard = ({ title, temperature, timestamp, thresholds }: TemperatureCardProps) => {
  const tempColor = getTemperatureColor(temperature, thresholds);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Thermometer className={`h-4 w-4 ${tempColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <span className={tempColor}>{temperature}°C</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Last updated: {format(new Date(timestamp), 'PPpp')}
        </p>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard;
