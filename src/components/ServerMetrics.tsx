import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Metric {
  timestamp: number;
  responseTime: number;
  timeAgo: string;
  url: string;
}

const INTERVAL_TIME = 30000; // 30 seconds in milliseconds

const ServerMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [average, setAverage] = useState<number | null>(null);

  const fetchMetrics = async () => {
    try {
      const metricsResponse = await fetch('/api/metrics');
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json() as Metric[];
        // Only include server-health metrics
        const validMetrics = metricsData.filter(m => m.url === 'server-health' && m.responseTime > 0);
        setMetrics(validMetrics);
        
        if (validMetrics.length > 0) {
          const avg = Math.round(
            validMetrics.reduce((sum, m) => sum + m.responseTime, 0) / 
            validMetrics.length
          );
          setAverage(avg);
        }
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  useEffect(() => {
    console.log('🚀 Starting metrics monitoring');
    fetchMetrics(); // Initial fetch
    
    const interval = setInterval(fetchMetrics, INTERVAL_TIME);
    
    return () => {
      console.log('Cleaning up metrics monitoring');
      clearInterval(interval);
    };
  }, []);

  const maxResponseTime = Math.max(...metrics.map(m => m.responseTime), 0);

  return (
    <div className="text-sm space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">Server Response Time:</div>
        <div className="font-medium text-gray-700">{average}ms</div>
      </div>
      <div className="flex gap-1.5 h-8">
        <AnimatePresence mode="popLayout">
          {metrics.map((metric) => (
            <motion.div 
              key={metric.timestamp}
              className="relative group"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 6, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <div className="h-full bg-gray-200 rounded-full relative">
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${(metric.responseTime / maxResponseTime) * 100}%`
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                />
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {metric.responseTime}ms
                <br />
                {metric.timeAgo}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServerMetrics; 