import React from 'react';
import ScoreBadge from './ScoreBadge';

export default function DataTable({ debris }) {
  if (!debris || debris.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">No debris data available</p>
      </div>
    );
  }

  return (
    <div className=" rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black">
            <tr>
               <th className="px-6 py-3 text-left text-3xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
               <th className="px-6 py-3 text-left text-3xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
               <th className="px-6 py-3 text-left text-3xs font-medium text-gray-300 uppercase tracking-wider">
                Orbit
              </th>
               <th className="px-6 py-3 text-left text-3xs font-medium text-gray-300 uppercase tracking-wider">
                Altitude (km)
              </th>
               <th className="px-6 py-3 text-left text-3xs font-medium text-gray-300 uppercase tracking-wider">
                Urgency Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {debris.map((item) => (
              <tr key={item.id} className=" ">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {item.name}
                  </div>
                  <div className="text-sm text-white">ID: {item.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.object_type === 'Debris' 
                      ? 'bg-red-100 text-red-800'
                      : item.object_type === 'Rocket Body'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.object_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.orbit_type === 'LEO' 
                      ? 'bg-green-100 text-green-800'
                      : item.orbit_type === 'MEO'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.orbit_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {item.altitude?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ScoreBadge score={item.urgency_score} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
