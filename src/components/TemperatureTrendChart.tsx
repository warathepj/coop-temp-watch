
import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';

interface TemperatureTrendChartProps {
  data: {
    id: string;
    name: string;
    values: { value: number; timestamp: string }[];
  }[];
}

const tooltipFormatter = (value: number, name: string) => `${value}°C`;

const TemperatureTrendChart = ({ data }: TemperatureTrendChartProps) => {
  // Combine temperature histories by time for all sensors in the section
  if (!data.length) return null;
  
  // For this demo, we only show chart for the first sensor in the list
  const sensor = data[0];
  const chartData = sensor.values.map(point => ({
    time: format(new Date(point.timestamp), 'HH:mm'),
    value: point.value,
  }));

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['dataMin-3', 'dataMax+3']} />
          <Tooltip formatter={tooltipFormatter} />
          <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureTrendChart;
