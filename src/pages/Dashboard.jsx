import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';

export default function Dashboard() {
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

  // Calculate statistics
  const totalObjects = debris.length;
  const criticalObjects = debris.filter(item => item.urgency_score >= 100).length;
  const highRiskObjects = debris.filter(item => item.urgency_score >= 80).length;

  // Sort debris by urgency descending and take top 10
  const topDebris = [...debris]
    .sort((a, b) => b.urgency_score - a.urgency_score);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading debris data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-white">
            🛰️ <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ClearOrbit
            </span> Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time monitoring and tracking of space debris objects
          </p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-100 mb-2">Total Objects</h2>
                <div className="text-4xl font-bold text-white">{totalObjects.toLocaleString()}</div>
                <p className="text-blue-200 text-sm">Currently tracked</p>
              </div>
              <div className="text-4xl text-blue-200">📊</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-red-100 mb-2">Critical Risk</h2>
                <div className="text-4xl font-bold text-white">{criticalObjects}</div>
                <p className="text-red-200 text-sm">Urgency ≥ 100</p>
              </div>
              <div className="text-4xl text-red-200">⚠️</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-orange-100 mb-2">High Risk</h2>
                <div className="text-4xl font-bold text-white">{highRiskObjects}</div>
                <p className="text-orange-200 text-sm">Urgency ≥ 80</p>
              </div>
              <div className="text-4xl text-orange-200">🚨</div>
            </div>
          </div>
        </div>

        {/* Top Debris Table Section */}
        <section className="tablebck bg-opacity-50 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              🎯 Top 10 High Urgency Debris
            </h2>
            {/* <div className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
              Updated: {new Date().toLocaleTimeString()}
            </div> */}
          </div>
          <DataTable debris={topDebris} />
        </section>
      </div>
    </div>
  );
}

