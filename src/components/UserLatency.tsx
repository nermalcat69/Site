import { useState } from 'react';

const UserLatency = () => {
  const [average, setAverage] = useState<number | null>(null);

  const measureLatency = async () => {
    try {
      const start = performance.now();
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (response.ok) {
        const end = performance.now();
        const latency = Math.round(end - start);
        
        await fetch('/api/latency', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseTime: latency })
        });
        
        setAverage(latency);
      }
    } catch (error) {
      console.error('Latency measurement failed:', error);
    }
  };

  // Initial measurement on component mount
  measureLatency();

  if (average === null) {
    return <div className="text-sm text-gray-500">Measuring latency...</div>;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-gray-500">Your latency:</div>
      <div className="font-medium text-gray-700">{average}ms</div>
    </div>
  );
};

export default UserLatency; 