
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileExport } from "lucide-react"; // Using allowed Lucide icon

interface ExportButtonProps {
  section: string;
  sensors: {
    id: string;
    name: string;
    value: number;
    timestamp: string;
    values?: { value: number; timestamp: string }[];
  }[];
}

function convertToCSV(sensors: ExportButtonProps['sensors']) {
  const rows = [
    ['Sensor Name', 'Latest Value (°C)', 'Timestamp', 'History (most recent first)'],
    ...sensors.map(sensor => [
      sensor.name,
      sensor.value,
      sensor.timestamp,
      sensor.values
        ? sensor.values
            .map(v => `${v.value} (${new Date(v.timestamp).toLocaleString()})`)
            .join(' | ')
        : '',
    ]),
  ];
  return rows.map(r => r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')).join('\n');
}

const TemperatureExportButton: React.FC<ExportButtonProps> = ({ section, sensors }) => {
  const handleExport = () => {
    const csv = convertToCSV(sensors);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${section.replace(/\s+/g, '_').toLowerCase()}_temperature_data.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline" className="gap-1">
      <FileExport className="w-4 h-4" />
      Export CSV
    </Button>
  );
};

export default TemperatureExportButton;
