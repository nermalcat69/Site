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
  const [measuring, setMeasuring] = useState(false);
  const [currentMeasurement, setCurrentMeasurement] = useState(0);
  const [nextUpdate, setNextUpdate] = useState(0);

  const measureServerResponse = async () => {
    try {
      // Only measure if it's time for the next update
      const now = Date.now();
      if (now < nextUpdate) return;

      setMeasuring(true);
      setCurrentMeasurement(0);
      setNextUpdate(now + INTERVAL_TIME);
      
      const start = performance.now();
      const healthResponse = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });
      const end = performance.now();
      const responseTime = Math.round(end - start);
      
      setCurrentMeasurement(responseTime);

      if (healthResponse.ok) {
        const data = await healthResponse.json();
        console.log('📊 New measurement:', data.processingTime + 'ms');
        
        // Fetch updated metrics
        const metricsResponse = await fetch('/api/metrics');
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json() as Metric[];
          setMetrics(metricsData);
          
          if (metricsData.length > 0) {
            const avg = Math.round(
              metricsData.reduce((sum, m) => sum + m.responseTime, 0) / 
              metricsData.length
            );
            setAverage(avg);
          }
        }

        // Keep measuring indicator visible briefly
        setTimeout(() => setMeasuring(false), 2000);
      }
    } catch (error) {
      console.error('Failed to measure server response:', error);
      setMeasuring(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Starting server metrics monitoring');
    measureServerResponse(); // Initial measurement
    
    const interval = setInterval(measureServerResponse, 1000); // Check every second
    
    return () => {
      console.log('Cleaning up metrics monitoring');
      clearInterval(interval);
    };
  }, []);

  const maxResponseTime = Math.max(...metrics.map(m => m.responseTime), currentMeasurement);

  // Calculate time until next update
  const timeUntilNext = Math.max(0, nextUpdate - Date.now());
  const progressPercent = ((INTERVAL_TIME - timeUntilNext) / INTERVAL_TIME) * 100;

  return (
    <div className="text-sm space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">Server Response Time:</div>
        <div className="font-medium text-gray-700">{average}ms</div>
        <div className="text-xs text-gray-400">
          Next update in {Math.ceil(timeUntilNext / 1000)}s
        </div>
      </div>
      <div className="flex gap-1.5 h-8">
        {measuring && (
          <motion.div 
            className="relative group"
            initial={{ width: 6, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full bg-gray-200 rounded-full relative">
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-full"
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Measuring...
              <br />
              {currentMeasurement}ms
            </div>
          </motion.div>
        )}
        <AnimatePresence mode="popLayout">
          {metrics.map((metric) => (
            <motion.div 
              key={metric.timestamp}
              className="relative group"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 6, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full bg-gray-200 rounded-full relative">
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ 
                    height: `${(metric.responseTime / maxResponseTime) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
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