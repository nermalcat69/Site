import { useState, useEffect } from 'react';

interface Metric {
  timestamp: number;
  responseTime: number;
  timeAgo?: string;
}

const UserLatency = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [average, setAverage] = useState<number | null>(null);

  const measureResponseTime = async () => {
    try {
      const start = performance.now();
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (response.ok) {
        const end = performance.now();
        const responseTime = Math.round(end - start);
        
        await fetch('/api/user-latency', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseTime })
        });
        
        const metricsResponse = await fetch('/api/user-latency');
        const latencyData = await metricsResponse.json();
        
        setMetrics(latencyData);
        setAverage(Math.round(
          latencyData.reduce((sum: number, m: Metric) => sum + m.responseTime, 0) / latencyData.length
        ));
      }
    } catch (error) {
      console.error('Response time measurement failed:', error);
    }
  };

  useEffect(() => {
    measureResponseTime();
    const interval = setInterval(measureResponseTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (metrics.length === 0) {
    return <div className="text-sm text-gray-500">Measuring response times...</div>;
  }

  return (
    <div className="text-sm space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">Average Response Time:</div>
        <div className="font-medium text-gray-700">{average}ms</div>
      </div>
      <div className="flex gap-2">
        {metrics.map((metric, i) => (
          <div 
            key={metric.timestamp}
            className="h-8 w-2 bg-gray-200 rounded-full relative group"
          >
            <div 
              className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full transition-all duration-300"
              style={{ 
                height: `${(metric.responseTime / Math.max(...metrics.map(m => m.responseTime))) * 100}%`
              }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {metric.responseTime}ms
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLatency; 