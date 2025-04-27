
import React, { useState } from 'react';
import MonitoringSection from '@/components/MonitoringSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const now = new Date();
const mockValues = (base: number) =>
  Array.from({ length: 24 }, (_, i) => ({
    value: base + Math.sin(i / 3) * 2 + Math.random(),
    timestamp: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).toISOString(),
  }));

const mockData = {
  coops: [
    { id: 'coop-a', name: 'Coop A', value: 25.5, timestamp: now.toISOString(), values: mockValues(25.5) },
    { id: 'coop-b', name: 'Coop B', value: 26.2, timestamp: now.toISOString(), values: mockValues(26.2) },
    { id: 'coop-c', name: 'Coop C', value: 28.7, timestamp: now.toISOString(), values: mockValues(28.7) },
  ],
  ventilation: [
    { id: 'vent-1', name: 'Main Vent', value: 22.1, timestamp: now.toISOString(), values: mockValues(22.1) },
    { id: 'vent-2', name: 'Secondary Vent', value: 23.4, timestamp: now.toISOString(), values: mockValues(23.4) },
  ],
  processing: [
    { id: 'proc-1', name: 'Processing Area 1', value: 18.5, timestamp: now.toISOString(), values: mockValues(18.5) },
    { id: 'proc-2', name: 'Storage Room', value: 16.8, timestamp: now.toISOString(), values: mockValues(16.8) },
    { id: 'proc-3', name: 'Packaging Zone', value: 19.2, timestamp: now.toISOString(), values: mockValues(19.2) },
  ],
};

const defaultThreshold = { low: 20, warning: 28, high: 34 };

const Index = () => {
  const [coopThresholds, setCoopThresholds] = useState({ ...defaultThreshold });
  const [ventThresholds, setVentThresholds] = useState({ ...defaultThreshold });
  const [procThresholds, setProcThresholds] = useState({ ...defaultThreshold });

  return (
    <div className="jupiter min-h-screen bg-background p-6">
      <Button asChild><Link to="/dashboard">Dashboard</Link></Button>
      <div className="mars mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Temperature Monitoring Dashboard</h1>
        <div className="neptune grid gap-6 grid-cols-1 lg:grid-cols-3">
          <MonitoringSection
            title="Coop Temperatures"
            temperatures={mockData.coops}
            thresholds={coopThresholds}
            onThresholdChange={setCoopThresholds}
          />
          <MonitoringSection
            title="Ventilation System"
            temperatures={mockData.ventilation}
            thresholds={ventThresholds}
            onThresholdChange={setVentThresholds}
          />
          <MonitoringSection
            title="Processing Areas"
            temperatures={mockData.processing}
            thresholds={procThresholds}
            onThresholdChange={setProcThresholds}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
