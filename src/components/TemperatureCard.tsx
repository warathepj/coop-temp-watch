
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

interface TemperatureCardProps {
  title: string;
  temperature: number;
  timestamp: string;
}

const getTemperatureColor = (temp: number) => {
  if (temp >= 35) return "text-temp-critical";
  if (temp >= 30) return "text-temp-warning";
  return "text-temp-normal";
};

const TemperatureCard = ({ title, temperature, timestamp }: TemperatureCardProps) => {
  const tempColor = getTemperatureColor(temperature);

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
          Last updated: {timestamp}
        </p>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard;
