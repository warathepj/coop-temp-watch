import React, { useEffect, useState } from 'react'
import MonitoringSection from '@/components/MonitoringSection';

interface TemperatureMessage {
  topic: string;
  data: any;
}

const defaultThreshold = { low: 20, warning: 28, high: 34 };

// Helper function to transform coop data
const transformCoopData = (topic: string, data: any) => {
  const coopId = topic.split('/')[2]; // Extract 'a', 'b', or 'c'
  return Object.entries(data).map(([location, value]) => ({
    id: `${coopId}-${location}`,
    name: `Coop ${coopId.toUpperCase()} ${location}`,
    value: value as number,
    timestamp: new Date().toISOString()
  }));
};

const Dashboard = () => {
  const [data, setData] = useState<{
    coops: Array<{
      id: string;
      name: string;
      value: number;
      timestamp: string;
      values?: Array<{ value: number; timestamp: string }>;
    }>;
    ventilation: Array<{
      id: string;
      name: string;
      value: number;
      timestamp: string;
      values?: Array<{ value: number; timestamp: string }>;
    }>;
    processing: Array<{
      id: string;
      name: string;
      value: number;
      timestamp: string;
      values?: Array<{ value: number; timestamp: string }>;
    }>;
  }>({
    coops: [],
    ventilation: [],
    processing: []
  });
  const [error, setError] = useState<string | null>(null);
  
  // Add threshold states
  const [coopThresholds, setCoopThresholds] = useState({ ...defaultThreshold });
  const [ventThresholds, setVentThresholds] = useState({ ...defaultThreshold });
  const [procThresholds, setProcThresholds] = useState({ ...defaultThreshold });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const message: TemperatureMessage = JSON.parse(event.data);
        
        // Transform the data based on the topic
        switch (message.topic) {
          case 'farm/coops/a/temperature':
          case 'farm/coops/b/temperature':
          case 'farm/coops/c/temperature':
            const newCoopData = transformCoopData(message.topic, message.data);
            setData(prev => {
              // Create a map of existing coops by ID for easy lookup
              const coopMap = new Map(prev.coops.map(coop => [coop.id, coop]));
              
              // Add or update with new coop data
              newCoopData.forEach(coop => {
                coopMap.set(coop.id, coop);
              });
              
              return {
                ...prev,
                coops: Array.from(coopMap.values())
              };
            });
            break;
          case 'farm/ventilation/temperature':
            setData(prev => ({
              ...prev,
              ventilation: Object.entries(message.data).map(([id, value]) => ({
                id,
                name: id.charAt(0).toUpperCase() + id.slice(1),
                value: value as number,
                timestamp: new Date().toISOString()
              }))
            }));
            break;
          case 'farm/processing/temperature':
            setData(prev => ({
              ...prev,
              processing: Object.entries(message.data).map(([id, value]) => ({
                id,
                name: id.charAt(0).toUpperCase() + id.slice(1),
                value: value as number,
                timestamp: new Date().toISOString()
              }))
            }));
            break;
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onerror = (event) => {
      setError('WebSocket error occurred');
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="jupiter min-h-screen bg-background p-6">
      <div className="mars mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Temperature Monitoring Dashboard</h1>
        <div className="neptune grid gap-6 grid-cols-1 lg:grid-cols-3">
          <MonitoringSection
            title="Coop Temperatures"
            temperatures={data.coops}
            thresholds={coopThresholds}
            onThresholdChange={setCoopThresholds}
          />
          <MonitoringSection
            title="Ventilation System"
            temperatures={data.ventilation}
            thresholds={ventThresholds}
            onThresholdChange={setVentThresholds}
          />
          <MonitoringSection
            title="Processing Areas"
            temperatures={data.processing}
            thresholds={procThresholds}
            onThresholdChange={setProcThresholds}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
