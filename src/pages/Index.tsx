
import React from 'react';
import MonitoringSection from '@/components/MonitoringSection';

const mockData = {
  coops: [
    { id: 'coop-a', name: 'Coop A', value: 25.5, timestamp: '2025-04-22 10:30:00' },
    { id: 'coop-b', name: 'Coop B', value: 26.2, timestamp: '2025-04-22 10:30:00' },
    { id: 'coop-c', name: 'Coop C', value: 28.7, timestamp: '2025-04-22 10:30:00' },
  ],
  ventilation: [
    { id: 'vent-1', name: 'Main Vent', value: 22.1, timestamp: '2025-04-22 10:30:00' },
    { id: 'vent-2', name: 'Secondary Vent', value: 23.4, timestamp: '2025-04-22 10:30:00' },
  ],
  processing: [
    { id: 'proc-1', name: 'Processing Area 1', value: 18.5, timestamp: '2025-04-22 10:30:00' },
    { id: 'proc-2', name: 'Storage Room', value: 16.8, timestamp: '2025-04-22 10:30:00' },
    { id: 'proc-3', name: 'Packaging Zone', value: 19.2, timestamp: '2025-04-22 10:30:00' },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Temperature Monitoring Dashboard</h1>
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <MonitoringSection title="Coop Temperatures" temperatures={mockData.coops} />
          <MonitoringSection title="Ventilation System" temperatures={mockData.ventilation} />
          <MonitoringSection title="Processing Areas" temperatures={mockData.processing} />
        </div>
      </div>
    </div>
  );
};

export default Index;
