'use client';
import { useState, useEffect } from 'react';

export default function CoordinatesPage() {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [isTracking, setIsTracking] = useState(false); // Track if location is being watched

  useEffect(() => {
    let watchId; // Store the watch ID

    if (isTracking) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }

    // Cleanup the watchPosition when the component unmounts or tracking stops
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  const handleGetCoordinates = () => {
    console.log('Getting coordinates...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(
            `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
          );
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://user-data.up.railway.app/coordinates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminid: 'your_admin_id', // Replace with actual admin ID
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          radius: 100, // Example radius
        }),
      });

      if (response.ok) {
        console.log('Coordinates submitted successfully!');
      } else {
        console.error('Error submitting coordinates:', response.status);
      }
    } catch (error) {
      console.error('Error submitting coordinates:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Current Coordinates</h1>
        <p>Latitude: {coordinates.latitude}</p>
        <p>Longitude: {coordinates.longitude}</p>
      </div>
      <button onClick={handleGetCoordinates}>Get Coordinates</button>
      <button onClick={handleSubmit}>Submit Coordinates</button>
    </main>
  );
}
