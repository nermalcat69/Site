import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Metric {
  timestamp: number;
  responseTime: number;
  timeAgo: string;
}

const ServerMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [average, setAverage] = useState<number | null>(null);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
        
        // Reset visible count when new data arrives
        setVisibleCount(0);
        
        // Gradually show metrics
        const interval = setInterval(() => {
          setVisibleCount(prev => {
            if (prev >= data.length) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 50); // Show new bar every 50ms

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
        
        await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseTime })
        });

        await fetchMetrics();
      }
    } catch (error) {
      console.error('Response time measurement failed:', error);
    }
  };

  useEffect(() => {
    measureAndSendResponseTime();
    const interval = setInterval(measureAndSendResponseTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (metrics.length === 0) {
    return <div className="text-sm text-gray-500">Measuring response times...</div>;
  }

  const maxResponseTime = Math.max(...metrics.map(m => m.responseTime));

  return (
    <div className="text-sm space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">Average Response Time:</div>
        <div className="font-medium text-gray-700">{average}ms</div>
      </div>
      <div className="flex gap-1.5 h-8">
        <AnimatePresence>
          {metrics.slice(0, visibleCount).map((metric, index) => (
            <motion.div 
              key={metric.timestamp}
              className="relative group"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 32, // 8rem
                opacity: 1 
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05
              }}
            >
              <div className="w-1.5 h-full bg-gray-200 rounded-full relative">
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${(metric.responseTime / maxResponseTime) * 100}%`
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05 + 0.2
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