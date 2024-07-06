import { useState, useEffect } from 'react';

const BatteryStatus = () => {
  const [batteryPercentage, setBatteryPercentage] = useState(null);

  useEffect(() => {
    const updateBatteryStatus = (battery: { level: number; }) => {
      setBatteryPercentage(Math.round(battery.level * 100));
    };

    const getBatteryStatus = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          updateBatteryStatus(battery);

          battery.addEventListener('levelchange', () => updateBatteryStatus(battery));

          return () => battery.removeEventListener('levelchange', () => updateBatteryStatus(battery));
        } catch (error) {
          console.error('Error getting battery status:', error);
        }
      } else {
        console.log('Battery Status API not supported');
      }
    };

    getBatteryStatus();
  }, []);

  return (
    <div>
      {batteryPercentage !== null ? (
        <p>Battery: {batteryPercentage}%</p>
      ) : (
        <p>Battery status not available</p>
      )}
    </div>
  );
};

export default BatteryStatus;