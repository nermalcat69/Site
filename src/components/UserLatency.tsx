import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

      if (!response.ok) {
        console.error('Health check failed:', response.status);
        return;
      }

      const end = performance.now();
      const responseTime = Math.round(end - start);
      
      const postResponse = await fetch('/api/user-latency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responseTime })
      });

      if (!postResponse.ok) {
        console.error('Failed to store latency:', postResponse.status);
        return;
      }
      
      const metricsResponse = await fetch('/api/user-latency');
      if (!metricsResponse.ok) {
        console.error('Failed to fetch metrics:', metricsResponse.status);
        return;
      }

      const latencyData = await metricsResponse.json();
      if (!Array.isArray(latencyData) || latencyData.length === 0) {
        console.error('Invalid metrics data:', latencyData);
        return;
      }
      
      setMetrics(latencyData);
      setAverage(Math.round(
        latencyData.reduce((sum: number, m: Metric) => sum + m.responseTime, 0) / latencyData.length
      ));
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
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <div className="text-gray-500">Average Response Time:</div>
        <motion.div 
          key={average}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="font-medium text-gray-700"
        >
          {average}ms
        </motion.div>
      </motion.div>
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric, i) => (
          <motion.div 
            key={metric.timestamp}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              delay: i * 0.05
            }}
            className="relative group cursor-pointer"
          >
            <motion.div 
              className="h-8 w-8 bg-gray-200 rounded"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="absolute inset-0 bg-blue-500 rounded"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: metric.responseTime / Math.max(...metrics.map(m => m.responseTime))
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <motion.div 
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs pointer-events-none"
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {metric.responseTime}ms
              <div className="text-gray-300 text-[10px]">{metric.timeAgo}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserLatency; 