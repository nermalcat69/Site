import { useState, useEffect } from 'react';

interface Metric {
  timestamp: number;
  responseTime: number;
  timeAgo: string;
}

const ServerMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [average, setAverage] = useState<number | null>(null);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
        
        // Calculate average
        if (data.length > 0) {
          const avg = Math.round(
            data.reduce((sum: number, m: Metric) => sum + m.responseTime, 0) / data.length
          );
          setAverage(avg);
        }
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const measureAndSendResponseTime = async () => {
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
        
        // Send metric to server
        await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseTime })
        });

        // Fetch updated metrics
        await fetchMetrics();
      }
    } catch (error) {
      console.error('Response time measurement failed:', error);
    }
  };

  useEffect(() => {
    // Initial measurement and fetch
    measureAndSendResponseTime();
    
    // Update every 30 seconds
    const interval = setInterval(measureAndSendResponseTime, 30000);
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
      <div className="flex gap-1.5">
        {metrics.map((metric) => (
          <div 
            key={metric.timestamp}
            className="h-8 w-1.5 bg-gray-200 rounded-full relative group"
          >
            <div 
              className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full transition-all duration-300"
              style={{ 
                height: `${(metric.responseTime / Math.max(...metrics.map(m => m.responseTime))) * 100}%`
              }}
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {metric.responseTime}ms
              <br />
              {metric.timeAgo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerMetrics; 