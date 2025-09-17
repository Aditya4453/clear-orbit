import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

// Helper to color points by urgency
function getUrgencyColor(score) {
  if (score > 70) return 'red';
  if (score >= 40) return 'orange';
  return 'green';
}

export default function GlobeViz({ debris }) {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    function handleResize() {
      const container = document.querySelector('.globe-container');
      if (container) {
        const containerWidth = container.clientWidth;
        const maxWidth = Math.min(containerWidth - 40, 900); // 40px for padding
        const height = Math.min(maxWidth * 0.75, 650);
        setDimensions({
          width: maxWidth,
          height: height
        });
      }
    }
    
    // Initial sizing
    setTimeout(handleResize, 100); // Small delay to ensure container is rendered
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate sample coordinates since debris data lacks lat/lng
  // In a real app, this would come from the actual orbital data
  const pointsData = debris.slice(0, 100).map((d, index) => {
    // Generate realistic orbital distribution
    const isLEO = d.orbit_type === 'LEO';
    const isMEO = d.orbit_type === 'MEO';
    
    let lat, lng;
    if (isLEO) {
      // LEO objects more concentrated around equatorial regions
      lat = (Math.random() - 0.5) * 120; // -60 to 60 degrees
      lng = (Math.random() - 0.5) * 360; // Full longitude range
    } else if (isMEO) {
      // MEO objects more spread out
      lat = (Math.random() - 0.5) * 140; // -70 to 70 degrees
      lng = (Math.random() - 0.5) * 360;
    } else {
      // GEO objects mostly equatorial
      lat = (Math.random() - 0.5) * 30; // -15 to 15 degrees
      lng = (Math.random() - 0.5) * 360;
    }

    return {
      lat: lat,
      lng: lng,
      color: getUrgencyColor(d.urgency_score),
      id: d.id,
      name: d.name,
      urgency_score: d.urgency_score,
      orbit_type: d.orbit_type,
      altitude: d.altitude
    };
  });

  const globeLabel = (p) =>
    `<div style="background: rgba(0,0,0,0.8); color: white; padding: 8px; border-radius: 4px; font-size: 12px; max-width: 200px;">
      <strong>${p.name}</strong><br/>
      ID: ${p.id}<br/>
      Orbit: ${p.orbit_type}<br/>
      Altitude: ${p.altitude}km<br/>
      Urgency: ${p.urgency_score.toFixed(1)}
    </div>`;

  return (
    <div className="globe-container w-full flex justify-center items-center py-4">
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700" 
           style={{ width: dimensions.width + 'px', height: dimensions.height + 'px' }}>
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={1.2}
          pointColor="color"
          pointLabel={globeLabel}
          pointResolution={8}
          atmosphereColor="rgba(100, 149, 237, 0.2)"
          atmosphereAltitude={0.12}
          onPointClick={point => {
            alert(`🛰️ ${point.name}\n📊 Urgency Score: ${point.urgency_score.toFixed(1)}\n🌍 Orbit: ${point.orbit_type}\n📏 Altitude: ${point.altitude}km`);
          }}
          enablePointerInteraction={true}
        />
        
        {/* Overlay info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs rounded-lg p-3 pointer-events-none">
          <div className="font-semibold mb-1">🌍 Earth View</div>
          <div>Showing {pointsData.length} objects</div>
          <div className="text-gray-300">Click points for details</div>
        </div>
      </div>
    </div>
  );
}
