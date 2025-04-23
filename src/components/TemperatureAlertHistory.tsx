
import React from 'react';

interface AlertEvent {
  sensorName: string;
  value: number;
  timestamp: string;
  alertType: "low" | "high" | "warning";
}

interface TemperatureAlertHistoryProps {
  alerts: AlertEvent[];
}

const alertTypeColor = {
  high: "text-temp-critical",
  low: "text-blue-500",
  warning: "text-temp-warning",
};

const alertTypeLabel = {
  high: "High",
  low: "Low",
  warning: "Warning",
};

const TemperatureAlertHistory: React.FC<TemperatureAlertHistoryProps> = ({ alerts }) => {
  if (!alerts.length) {
    return <div className="text-xs text-muted-foreground">No alert history.</div>;
  }
  return (
    <div className="border rounded-lg p-2 bg-muted/40 max-h-40 overflow-y-auto text-xs space-y-1">
      <div className="font-semibold mb-1">Recent Alerts</div>
      {alerts.map((alert, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className={`${alertTypeColor[alert.alertType]} font-medium`}>
            {alertTypeLabel[alert.alertType]} alert
          </span>
          <span className="font-mono">{alert.value}°C</span>
          <span className="text-muted-foreground">{alert.sensorName}</span>
          <span className="ml-auto">{new Date(alert.timestamp).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default TemperatureAlertHistory;
