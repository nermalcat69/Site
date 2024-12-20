import { useState, useEffect } from 'react';

const Latency = () => {
    const [metrics, setMetrics] = useState({
        latency: null as number | null,
        responseTime: null as number | null
    });

    const measureMetrics = async () => {
        try {
            const latencyStart = performance.now();
            const response = await fetch('https://api.github.com/', {
                method: 'HEAD'
            });
            const latencyTime = Math.round(performance.now() - latencyStart);

            const responseStart = performance.now();
            const fullResponse = await fetch('https://api.github.com/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            const responseTime = Math.round(performance.now() - responseStart);

            if (response.ok && fullResponse.ok) {
                setMetrics({
                    latency: latencyTime,
                    responseTime: responseTime
                });
            }
        } catch (error) {
            console.error('Failed to measure metrics:', error);
        }
    };

    useEffect(() => {
        measureMetrics();
        const interval = setInterval(measureMetrics, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-sm text-gray-500 space-y-1">
            <div>
                {metrics.latency !== null 
                    ? `Network Latency: ${metrics.latency}ms` 
                    : 'Measuring latency...'}
            </div>
            <div>
                {metrics.responseTime !== null 
                    ? `Total Response Time: ${metrics.responseTime}ms` 
                    : 'Measuring response time...'}
            </div>
            {metrics.responseTime !== null && metrics.latency !== null && (
                <div>
                    Server Processing Time: ~{Math.max(0, metrics.responseTime - metrics.latency)}ms
                </div>
            )}
        </div>
    );
};

export default Latency; 