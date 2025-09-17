import React from 'react';

export default function ScoreBadge({ score }) {
  if (score === undefined || score === null) {
    return <span className="text-gray-400">N/A</span>;
  }

  // Determine color based on urgency score
  const getScoreColor = (score) => {
    if (score >= 100) {
      return 'bg-red-100 text-red-800 border-red-200'; // Critical
    } else if (score >= 80) {
      return 'bg-orange-100 text-orange-800 border-orange-200'; // High
    } else if (score >= 60) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // Medium
    } else {
      return 'bg-green-100 text-green-800 border-green-200'; // Low
    }
  };

  const getScoreLabel = (score) => {
    if (score >= 100) {
      return 'Critical';
    } else if (score >= 80) {
      return 'High';
    } else if (score >= 60) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  const colorClasses = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="flex flex-col items-center">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${colorClasses}`}>
        {score.toFixed(1)}
      </span>
       <span className="text-xs text-gray-300 mt-1">{label}</span>
    </div>
  );
}
