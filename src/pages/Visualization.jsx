import React, { useEffect, useState } from 'react';
import GlobeViz from '../components/GlobeViz';

export default function Visualization() {
  const [debris, setDebris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/debris.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch debris data');
        }
        return res.json();
      })
      .then(data => {
        setDebris(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load debris data', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg text-gray-600">Loading debris data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Space Debris
          </span> Visualization
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
          Interactive 3D globe showing real-time positions of tracked space objects
        </p>
        <div className="inline-flex items-center space-x-4 bg-gray-800 bg-opacity-60 rounded-full px-6 py-2">
          <span className="text-gray-300">Total objects:</span>
          <span className="font-bold text-white text-lg">{debris.length.toLocaleString()}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-300">Displaying:</span>
          <span className="font-bold text-blue-400">{Math.min(debris.length, 100)}</span>
        </div>
      </div>

      {/* Centered Globe Container */}
      <div className="flex justify-center items-center px-4 py-4">
        <div className="w-full max-w-6xl">
          <GlobeViz debris={debris} />
        </div>
      </div>

      {/* Enhanced Legend and Controls */}
      <div className="pb-8">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 bg-opacity-60 rounded-2xl p-6 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Legend */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  Risk Level Legend
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                    <div>
                      <div className="text-white font-medium">High Risk</div>
                      <div className="text-gray-400 text-sm">Score &gt; 70</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full shadow-lg"></div>
                    <div>
                      <div className="text-white font-medium">Medium Risk</div>
                      <div className="text-gray-400 text-sm">Score 40-70</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                    <div>
                      <div className="text-white font-medium">Low Risk</div>
                      <div className="text-gray-400 text-sm">Score &lt; 40</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  📊 Orbit Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <span className="text-gray-300 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      LEO (Low Earth Orbit)
                    </span>
                    <span className="text-white font-semibold">
                      {debris.filter(d => d.orbit_type === 'LEO').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <span className="text-gray-300 flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      MEO (Medium Earth Orbit)
                    </span>
                    <span className="text-white font-semibold">
                      {debris.filter(d => d.orbit_type === 'MEO').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 bg-opacity-50 rounded-lg p-3">
                    <span className="text-gray-300 flex items-center">
                      <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                      GEO (Geostationary Orbit)
                    </span>
                    <span className="text-white font-semibold">
                      {debris.filter(d => d.orbit_type === 'GEO').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 pt-6 border-t border-gray-600">
              <div className="text-center text-gray-400">
                <p className="mb-2">🖱️ <strong>Interact with the globe:</strong> Drag to rotate • Scroll to zoom • Click points for details</p>
                {/* <p className="text-sm">Data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
