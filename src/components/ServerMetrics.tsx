import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Metric {
  timestamp: number;
  responseTime: number;
  timeAgo: string;
}

const ServerMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  const fetchMetrics = async () => {
    console.log('🔄 Fetching metrics from server...');
    try {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        const data = await response.json() as Metric[];
        console.log('📊 Received metrics:', data);
        
        // Update metrics without resetting animations
        setMetrics(prevMetrics => {
          // Only animate new metrics by comparing timestamps
          const newMetrics = data.filter((newMetric: Metric) => 
            !prevMetrics.some((oldMetric: Metric) => oldMetric.timestamp === newMetric.timestamp)
          );
          
          console.log('🆕 New metrics found:', newMetrics.length);
          if (newMetrics.length > 0) {
            console.log('📈 Latest measurement:', {
              responseTime: newMetrics[newMetrics.length - 1].responseTime,
              timeAgo: newMetrics[newMetrics.length - 1].timeAgo
            });
          }
          
          // Combine existing and new metrics
          const updatedMetrics = [...prevMetrics, ...newMetrics].slice(-25);
          console.log('📝 Total metrics after update:', updatedMetrics.length);
          return updatedMetrics;
        });

        // Calculate average
        if (data.length > 0) {
          const avg = Math.round(
            data.reduce((sum: number, m: Metric) => sum + m.responseTime, 0) / data.length
          );
          setAverage(avg);
          console.log('📊 New average response time:', avg + 'ms');
        }
      }
    } catch (error) {
      console.error('❌ Failed to fetch metrics:', error);
    }
  };

  const measureAndSendResponseTime = async () => {
    console.log('⏱️ Starting response time measurement...');
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
        console.log('⚡ Measured response time:', responseTime + 'ms');
        
        console.log('📤 Sending measurement to server...');
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
      console.error('❌ Response time measurement failed:', error);
    }
  };

  const startMonitoring = () => {
    setIsActive(true);
    measureAndSendResponseTime();
  };

  const stopMonitoring = () => {
    setIsActive(false);
  };

  useEffect(() => {
    console.log('🚀 ServerMetrics component mounted');
    
    let interval: NodeJS.Timeout;
    if (isActive) {
      console.log('⏰ Setting up 30-second interval for measurements');
      interval = setInterval(measureAndSendResponseTime, 30000);
    }
    
    return () => {
      if (interval) {
        console.log('💤 Clearing measurement interval');
        clearInterval(interval);
      }
    };
  }, [isActive]);

  if (metrics.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-500">No measurements yet</div>
        <button 
          onClick={startMonitoring}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Monitoring
        </button>
      </div>
    );
  }

  const maxResponseTime = Math.max(...metrics.map(m => m.responseTime));
  console.log('📊 Current max response time:', maxResponseTime + 'ms');

  return (
    <div className="text-sm space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-gray-500">Average Response Time:</div>
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
              transition={{ duration: 0.3 }}
              onAnimationStart={() => console.log('🎭 Starting animation for metric:', metric.timestamp)}
              onAnimationComplete={() => console.log('✨ Completed animation for metric:', metric.timestamp)}
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
      
      <div className="mt-4">
        <button 
          onClick={isActive ? stopMonitoring : startMonitoring}
          className={`px-4 py-2 rounded ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isActive ? 'Stop Monitoring' : 'Resume Monitoring'}
        </button>
      </div>
    </div>
  );
};

export default ServerMetrics; 
