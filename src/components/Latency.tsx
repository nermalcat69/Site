import { useState, useEffect } from 'react';

const Latency = () => {
    const [responseTime, setResponseTime] = useState<number | null>(null);

    const measureResponseTime = async () => {
        try {
            const start = Date.now();
            const response = await fetch('https://api.github.com/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (response.ok) {
                const timeHeader = response.headers.get('x-response-time') || 
                                 response.headers.get('x-server-response-time') ||
                                 (Date.now() - start).toString();
                                 
                setResponseTime(parseInt(timeHeader));
            }
        } catch (error) {
            console.error('Failed to measure response time:', error);
        }
    };

    useEffect(() => {
        measureResponseTime();
        const interval = setInterval(measureResponseTime, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-sm text-gray-500">
            {responseTime !== null 
                ? `Server Response Time: ${responseTime}ms` 
                : 'Measuring response time...'}
        </div>
    );
};

export default Latency; 