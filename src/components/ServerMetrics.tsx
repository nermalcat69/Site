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

  const fetchMetrics = async () => {
    console.log('🔄 Fetching metrics from server...');
    try {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        const data = await response.json() as Metric[];
        console.log('📊 Received metrics:', data);
        setMetrics(data);

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
      const response = await fetch('/api/health');
      
      if (response.ok) {
        const end = performance.now();
        const responseTime = Math.round(end - start);
        console.log('⚡ Measured response time:', responseTime + 'ms');
        
        // Send measurement to server
        await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseTime })
        });

        // Fetch updated metrics immediately
        await fetchMetrics();
      }
    } catch (error) {
      console.error('❌ Response time measurement failed:', error);
    }
  };

  useEffect(() => {
    console.log('🚀 ServerMetrics component mounted');
    
    // Initial measurement and fetch
    measureAndSendResponseTime();
    
    // Set up intervals
    const measureInterval = setInterval(measureAndSendResponseTime, 30000);
    const fetchInterval = setInterval(fetchMetrics, 5000);
    
    return () => {
      console.log('💤 Cleaning up interval');
      clearInterval(measureInterval);
      clearInterval(fetchInterval);
    };
  }, []);

  if (metrics.length === 0) {
    return (
        <div className="relative">
        <span className="absolute right-0 -top-10 group">
            <img 
                draggable="false" 
                src="/gopher.svg" 
                alt="Server" 
                className="w-20 h-20 duration-300 hover:rotate-12" 
            />
            <div className="absolute bottom-full left-10 mb-2 invisible group-hover:visible w-[260px]">
                <div className="bg-white border border-gray-200 text-gray-800 text-xs text-center rounded py-1.5 px-1.5">
                    Response time relies on the user's internet speed, processing time by the server and the user's distance to the server.
                </div>
            </div>
        </span>
        <div className="flex z-10 flex-col bg-white border border-[#E7E7E7] p-3 px-5 px-4 py-4 mb-5 sm:mb-10">
      <div className="text-sm space-y-2">
        <motion.div 
          className="flex items-center gap-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
        >
          <div className="text-gray-600">Average Response Time:</div>
          <div className="font-medium text-gray-700">
            {metrics.length === 0 ? '--' : `${average}ms`}
          </div>
        </motion.div>
        <div className="flex gap-1.5 h-8">
          <AnimatePresence mode="wait">
            {metrics.length === 0 ? (
              <motion.div 
                key="fallback"
                className="flex gap-1.5 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
              >
                {[...Array(35)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-[6px] h-full bg-gray-100 rounded-full"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="metrics"
                className="flex gap-1.5 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
              >
                {metrics.map((metric, index) => (
                  <motion.div 
                    key={metric.timestamp}
                    className="relative group w-[6px]"
                  >
                    <div className="h-full bg-gray-200 rounded-full relative">
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(metric.responseTime / maxResponseTime) * 100}%`
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeIn"
                        }}
                      />
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {metric.responseTime}ms
                      <br />
                      {index === metrics.length - 1 ? 'Your request' : metric.timeAgo}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-xs text-neutral-400 ">
            Last {metrics.length} requests are used to calculate the average response time
        </p>
      </div>
    </div>
        </div>
    );
  }

  const maxResponseTime = Math.max(...metrics.map(m => m.responseTime));
  console.log('📊 Current max response time:', maxResponseTime + 'ms');

  return (
    <div className="relative">
        <span className="absolute right-0 -top-10 group">
            <img 
                draggable="false" 
                src="/gopher.svg" 
                alt="Server" 
                className="w-20 h-20 duration-300 hover:rotate-12" 
            />
            <div className="absolute bottom-full left-10 mb-2 invisible group-hover:visible w-[260px]">
                <div className="bg-white border border-gray-200 text-gray-800 text-xs text-center rounded py-1.5 px-1.5">
                    Response time relies on the user's internet speed, processing time by the server and the user's distance to the server.
                </div>
            </div>
        </span>
    <div className="flex z-10 flex-col bg-white border border-[#E7E7E7] p-3 px-5 px-4 py-4 mb-5 sm:mb-10">
      <div className="text-sm space-y-2">
        <motion.div 
          className="flex items-center gap-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <div className="text-gray-500">Average Response Time:</div>
        <div className="font-medium text-gray-700">
          {metrics.length === 0 ? '--' : `${average}ms`}
        </div>
      </motion.div>
      <div className="flex gap-1.5 h-8">
        <AnimatePresence mode="wait">
          {metrics.length === 0 ? (
            <motion.div 
              key="fallback"
              className="flex gap-1.5 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              {[...Array(35)].map((_, i) => (
                <div 
                  key={i}
                  className="w-[6px] h-full bg-gray-100 rounded-full"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="metrics"
              className="flex gap-1.5 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            >
              {metrics.map((metric, index) => (
                <motion.div 
                  key={metric.timestamp}
                  className="relative group w-[6px]"
                >
                  <div className="h-full bg-gray-200 rounded-full relative">
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${(metric.responseTime / maxResponseTime) * 100}%`
                      }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeIn"
                      }}
                    />
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {metric.responseTime}ms
                    <br />
                    {index === metrics.length - 1 ? 'Your request' : metric.timeAgo}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs text-neutral-400 ">
            Last {metrics.length} requests are used to calculate the average response time
        </p>
    </div>
    </div>
    </div>
  );
};

export default ServerMetrics; 
