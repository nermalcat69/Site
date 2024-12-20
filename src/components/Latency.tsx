import { useState, useEffect } from 'react';

const Latency = () => {
    const [latency, setLatency] = useState<number | null>(null);

    const measureLatency = async () => {
        try {
            const start = performance.now();
            const response = await fetch('https://api.github.com/'); // Using GitHub's API as an example
            const end = performance.now();
            
            if (response.ok) {
                setLatency(Math.round(end - start));
            }
        } catch (error) {
            console.error('Failed to measure latency:', error);
        }
    };

    useEffect(() => {
        measureLatency();
        const interval = setInterval(measureLatency, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-sm text-gray-500">
            {latency !== null ? `Latency: ${latency}ms` : 'Measuring latency...'}
        </div>
    );
};

export default Latency; 